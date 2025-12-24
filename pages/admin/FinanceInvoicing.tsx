




import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { 
  Receipt, Plus, Search, Filter, Clock, CheckCircle, 
  AlertCircle, DollarSign, ArrowRight, Calendar, Building2,
  TrendingUp, FileText, Send, Download, Mail, Eye, X, PlusCircle, Trash2, LayoutGrid, Zap
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Invoice, InvoiceLineItem } from '../../types';

const FinanceInvoicing: React.FC = () => {
  const { invoices, clients, addInvoice } = useData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModal, setActiveModal] = useState<'smart' | 'manual' | null>(null);

  // Smart Invoice Form State (Requires linked client)
  const [smartFormData, setSmartFormData] = useState({
    clientId: '',
    annualSalary: 0,
    feePercent: 20,
    dueDate: '',
    isRecurring: false,
    currency: 'USD' as const
  });

  // Manual Invoice Form State (Allows manual client entry)
  const [manualFormData, setManualFormData] = useState({
    clientName: '',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    currency: 'USD' as 'USD' | 'MVR',
    notes: '',
    lineItems: [{ id: '1', description: '', quantity: 1, unitPrice: 0, amount: 0 }]
  });

  const filteredInvoices = invoices.filter(inv => 
    inv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a,b) => b.issueDate.localeCompare(a.issueDate));

  // Outstanding Calculation (Simplified sum for USD-only, better logic for mixed would be needed for production)
  const totalOutstanding = invoices
    .filter(i => (i.status === 'Sent' || i.status === 'Overdue') && i.currency === 'USD')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  // Settled amounts for current month (USD and MVR)
  const settledUSD = invoices
    .filter(i => i.status === 'Paid' && i.currency === 'USD')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  const settledMVR = invoices
    .filter(i => i.status === 'Paid' && i.currency === 'MVR')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  const handleGenerateSmart = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find(c => c.id === smartFormData.clientId);
    if (!client) return;

    const subtotal = (smartFormData.annualSalary * (smartFormData.feePercent / 100));
    const taxAmount = subtotal * 0.16;
    const totalAmount = subtotal + taxAmount;

    const newInvoice: Invoice = {
        id: Date.now().toString(),
        invoiceNumber: `SMT-${new Date().getFullYear()}-${(invoices.length + 1).toString().padStart(3, '0')}`,
        clientId: client.id,
        clientName: client.companyName,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: smartFormData.dueDate,
        status: 'Sent',
        currency: smartFormData.currency,
        exchangeRate: 15.42,
        lineItems: [
            { 
                id: Date.now().toString() + '-1', 
                description: `Professional Placement Fee (${smartFormData.feePercent}% of Annual Salary)`, 
                quantity: 1, 
                unitPrice: subtotal, 
                amount: subtotal 
            }
        ],
        subtotal,
        taxRate: 0.16,
        taxAmount,
        totalAmount,
        isRecurring: smartFormData.isRecurring
    };

    addInvoice(newInvoice);
    setActiveModal(null);
  };

  const handleGenerateManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualFormData.clientName.trim()) return;

    const subtotal = manualFormData.lineItems.reduce((acc, curr) => acc + (curr.quantity * curr.unitPrice), 0);
    const taxAmount = subtotal * 0.16;
    const totalAmount = subtotal + taxAmount;

    // Check if typed name matches an existing client to link ID, otherwise use generic manual ID
    const existingClient = clients.find(c => c.companyName.toLowerCase() === manualFormData.clientName.toLowerCase());

    const newInvoice: Invoice = {
        id: Date.now().toString(),
        invoiceNumber: `MAN-${new Date().getFullYear()}-${(invoices.length + 1).toString().padStart(3, '0')}`,
        clientId: existingClient ? existingClient.id : `MANUAL-${Date.now()}`,
        clientName: manualFormData.clientName,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: manualFormData.dueDate,
        status: 'Sent',
        currency: manualFormData.currency,
        exchangeRate: 15.42,
        lineItems: manualFormData.lineItems.map(item => ({
            ...item,
            amount: item.quantity * item.unitPrice
        })),
        subtotal,
        taxRate: 0.16,
        taxAmount,
        totalAmount,
        isRecurring: false,
        notes: manualFormData.notes
    };

    addInvoice(newInvoice);
    setActiveModal(null);
    // Reset form
    setManualFormData({
        clientName: '',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        currency: 'USD' as 'USD' | 'MVR',
        notes: '',
        lineItems: [{ id: '1', description: '', quantity: 1, unitPrice: 0, amount: 0 }]
    });
  };

  const addManualLineItem = () => {
    setManualFormData({
        ...manualFormData,
        lineItems: [...manualFormData.lineItems, { id: Date.now().toString(), description: '', quantity: 1, unitPrice: 0, amount: 0 }]
    });
  };

  const removeManualLineItem = (id: string) => {
    if (manualFormData.lineItems.length === 1) return;
    setManualFormData({
        ...manualFormData,
        lineItems: manualFormData.lineItems.filter(item => item.id !== id)
    });
  };

  const updateManualLineItem = (id: string, field: keyof InvoiceLineItem, value: string | number) => {
    setManualFormData({
        ...manualFormData,
        lineItems: manualFormData.lineItems.map(item => {
            if (item.id === id) {
                const updated = { ...item, [field]: value };
                if (field === 'quantity' || field === 'unitPrice') {
                    updated.amount = Number(updated.quantity) * Number(updated.unitPrice);
                }
                return updated;
            }
            return item;
        })
    });
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-900 p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2 italic leading-none">Invoicing <span className="text-blue-400">Ledger</span></h1>
          <p className="text-slate-400 font-medium text-lg">Manage professional placements and manual agency billings.</p>
        </div>
        <div className="flex flex-wrap gap-4 relative z-10">
            <button 
                onClick={() => setActiveModal('manual')}
                className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 shadow-xl transition-all active:scale-95 flex items-center gap-2"
            >
                <LayoutGrid size={18} /> Manual Invoice
            </button>
            <button 
                onClick={() => setActiveModal('smart')}
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-blue-500 transition-all active:scale-95 flex items-center gap-2"
            >
                <Zap size={18} /> Smart Placement
            </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
            { label: 'Receivables (USD)', val: `$${totalOutstanding.toLocaleString()}`, icon: DollarSign, color: 'blue' },
            { label: 'Overdue Volume', val: `$${invoices.filter(i => i.status === 'Overdue' && i.currency === 'USD').reduce((a,c) => a+c.totalAmount, 0).toLocaleString()}`, icon: AlertCircle, color: 'rose' },
            { label: 'Avg Payment Cycle', val: '18 Days', icon: Clock, color: 'amber' },
            { 
                label: 'Settled this Month', 
                val: (
                    <div className="flex flex-col">
                        <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter leading-tight">${settledUSD.toLocaleString()}</span>
                        <span className="text-sm font-bold text-slate-400">Rf {settledMVR.toLocaleString()}</span>
                    </div>
                ), 
                icon: CheckCircle, 
                color: 'emerald',
                isCustom: true
            }
        ].map((kpi, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 group hover:shadow-xl transition-all duration-500 min-h-[140px] flex flex-col justify-between">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{kpi.label}</p>
                <div className="flex justify-between items-end">
                    {kpi.isCustom ? kpi.val : <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{kpi.val}</h3>}
                    <div className={`p-2 bg-${kpi.color}-50 text-${kpi.color}-600 rounded-xl`}>
                        <kpi.icon size={20} />
                    </div>
                </div>
            </div>
        ))}
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row justify-between gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search by client or invoice number..." 
                    className="w-full pl-12 pr-6 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-600 transition-all font-medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex gap-2">
                <button className="p-3 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 transition"><Filter size={20}/></button>
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Invoice</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Entity</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date / Due</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Total Amount</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filteredInvoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-50/50 transition duration-300">
                            <td className="px-8 py-6">
                                <p className="font-black text-slate-900 tracking-tight">{inv.invoiceNumber}</p>
                                {inv.isRecurring && <span className="text-[9px] font-black text-blue-600 uppercase flex items-center gap-1 mt-1"><Clock size={10}/> Recurring</span>}
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-black text-xs">
                                        {inv.clientName.charAt(0)}
                                    </div>
                                    <p className="font-bold text-slate-700 text-sm">{inv.clientName}</p>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <p className="text-xs font-bold text-slate-500">{inv.issueDate}</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase">Due: {inv.dueDate}</p>
                            </td>
                            <td className="px-8 py-6">
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                    inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                    inv.status === 'Overdue' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                                    'bg-amber-50 text-amber-700 border-amber-100'
                                }`}>
                                    {inv.status}
                                </span>
                            </td>
                            <td className="px-8 py-6 text-right">
                                <p className="font-black text-slate-900 text-lg tracking-tighter">{inv.currency} {inv.totalAmount.toLocaleString()}</p>
                            </td>
                            <td className="px-8 py-6 text-right">
                                <div className="flex justify-end gap-2">
                                    <button 
                                      onClick={() => navigate(`/admin/finance/invoices/${inv.id}`)}
                                      className="p-2 text-slate-400 hover:text-blue-600 transition" 
                                      title="View / PDF"
                                    >
                                        <Eye size={18} />
                                    </button>
                                    <button className="p-2 text-slate-400 hover:text-slate-900 transition" title="Send Email"><Mail size={18}/></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* Smart Generator Modal */}
      {activeModal === 'smart' && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6">
           <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in duration-300">
             <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                        <Zap size={24}/>
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">Smart Placement Invoice</h2>
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-1">Automated Fee Calculation</p>
                    </div>
                </div>
               <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-rose-600 p-2"><X size={32}/></button>
             </div>
             
             <form onSubmit={handleGenerateSmart} className="p-10 space-y-8">
                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Corporate Client</label>
                        <select 
                            required 
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 focus:ring-4 focus:ring-blue-50 focus:border-blue-600 outline-none transition-all font-bold text-slate-900 appearance-none cursor-pointer"
                            value={smartFormData.clientId}
                            onChange={(e) => setSmartFormData({...smartFormData, clientId: e.target.value})}
                        >
                            <option value="">Select Client Entity...</option>
                            {clients.map(c => <option key={c.id} value={c.id}>{c.companyName}</option>)}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Annual Salary (USD)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input 
                                    required 
                                    type="number" 
                                    className="w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-600 outline-none transition-all font-bold" 
                                    placeholder="e.g. 24000"
                                    value={smartFormData.annualSalary || ''}
                                    onChange={(e) => setSmartFormData({...smartFormData, annualSalary: Number(e.target.value)})}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Fee %</label>
                            <input 
                                required 
                                type="number" 
                                className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-600 outline-none transition-all font-bold" 
                                value={smartFormData.feePercent}
                                onChange={(e) => setSmartFormData({...smartFormData, feePercent: Number(e.target.value)})}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Due Date</label>
                            <input 
                                required 
                                type="date" 
                                className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-600 outline-none transition-all font-bold"
                                value={smartFormData.dueDate}
                                onChange={(e) => setSmartFormData({...smartFormData, dueDate: e.target.value})}
                            />
                        </div>
                         <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Currency</label>
                            <select 
                                required 
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 focus:ring-4 focus:ring-blue-50 focus:border-blue-600 outline-none transition-all font-bold text-slate-900 appearance-none cursor-pointer"
                                value={smartFormData.currency}
                                onChange={(e) => setSmartFormData({...smartFormData, currency: e.target.value as any})}
                            >
                                <option value="USD">USD ($)</option>
                                <option value="MVR">MVR (Rf)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm font-bold text-slate-500">
                            <span>Base Placement Fee</span>
                            <span>${(smartFormData.annualSalary * (smartFormData.feePercent/100)).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-emerald-600">
                            <span>T-GST (16%)</span>
                            <span>+ ${(smartFormData.annualSalary * (smartFormData.feePercent/100) * 0.16).toLocaleString()}</span>
                        </div>
                        <div className="pt-4 border-t border-blue-200 flex justify-between items-end">
                            <span className="text-lg font-black text-slate-900">Net Billable</span>
                            <span className="text-3xl font-black text-blue-600 tracking-tighter">${(smartFormData.annualSalary * (smartFormData.feePercent/100) * 1.16).toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => setActiveModal(null)} className="px-8 py-5 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-600">Cancel</button>
                    <button type="submit" className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-blue-700 transition-all transform active:scale-95">Send Smart Invoice</button>
                </div>
             </form>
           </div>
        </div>
      )}

      {/* Manual Generator Modal */}
      {activeModal === 'manual' && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-6">
           <div className="bg-white rounded-[3rem] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.5)] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 duration-500">
             <div className="px-10 py-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-2xl">
                        <FileText size={32}/>
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tighter leading-none mb-1">Agency Manual Billing</h2>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Custom Service Ledger Entry</p>
                    </div>
                </div>
               <button onClick={() => setActiveModal(null)} className="text-slate-300 hover:text-rose-600 bg-white p-4 rounded-full shadow-xl transition-all"><X size={32}/></button>
             </div>
             
             <form onSubmit={handleGenerateManual} className="p-10 flex-1 overflow-y-auto custom-scrollbar space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Client Name</label>
                        <input 
                            required 
                            type="text"
                            className="w-full bg-slate-50 border-4 border-slate-50 rounded-2xl p-5 focus:bg-white focus:border-slate-900 outline-none transition-all font-bold text-slate-900"
                            placeholder="Enter legal entity name..."
                            value={manualFormData.clientName}
                            onChange={(e) => setManualFormData({...manualFormData, clientName: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Expiry Date</label>
                        <input 
                            required 
                            type="date" 
                            className="w-full bg-slate-50 border-4 border-slate-50 rounded-2xl p-5 focus:bg-white focus:border-slate-900 outline-none transition-all font-bold"
                            value={manualFormData.dueDate}
                            onChange={(e) => setManualFormData({...manualFormData, dueDate: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Currency Base</label>
                        <select 
                            required 
                            className="w-full bg-slate-50 border-4 border-slate-50 rounded-2xl p-5 focus:bg-white focus:border-slate-900 outline-none transition-all font-bold"
                            value={manualFormData.currency}
                            onChange={(e) => setManualFormData({...manualFormData, currency: e.target.value as any})}
                        >
                            <option value="USD">USD ($)</option>
                            <option value="MVR">MVR (Rf)</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                        <h3 className="text-xl font-black text-slate-900 tracking-tighter">Line Items</h3>
                        <button 
                            type="button" 
                            onClick={addManualLineItem}
                            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 px-4 py-2 rounded-xl"
                        >
                            <Plus size={14}/> Add Service Row
                        </button>
                    </div>

                    <div className="space-y-4">
                        {manualFormData.lineItems.map((item, index) => (
                            <div key={item.id} className="grid grid-cols-12 gap-4 items-center bg-slate-50/50 p-4 rounded-3xl border border-slate-100 animate-in slide-in-from-left duration-300">
                                <div className="col-span-1 text-center font-black text-slate-300">#{index+1}</div>
                                <div className="col-span-6">
                                    <input 
                                        required
                                        placeholder="Service description (e.g. Visa Processing Fees)"
                                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-bold focus:border-slate-900 outline-none"
                                        value={item.description}
                                        onChange={(e) => updateManualLineItem(item.id, 'description', e.target.value)}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <input 
                                        required
                                        type="number"
                                        min="1"
                                        placeholder="Qty"
                                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-bold focus:border-slate-900 outline-none text-center"
                                        value={item.quantity}
                                        onChange={(e) => updateManualLineItem(item.id, 'quantity', e.target.value)}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <input 
                                        required
                                        type="number"
                                        step="0.01"
                                        placeholder="Price"
                                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-bold focus:border-slate-900 outline-none text-right"
                                        value={item.unitPrice || ''}
                                        onChange={(e) => updateManualLineItem(item.id, 'unitPrice', e.target.value)}
                                    />
                                </div>
                                <div className="col-span-1 text-right font-black text-slate-900 text-sm">
                                    ${(item.quantity * item.unitPrice).toLocaleString()}
                                </div>
                                <div className="col-span-1 text-right">
                                    <button 
                                        type="button" 
                                        onClick={() => removeManualLineItem(item.id)}
                                        className="text-slate-300 hover:text-rose-500 transition-colors"
                                    >
                                        <Trash2 size={18}/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-slate-100">
                    <div className="space-y-4">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Internal Notes / Terms</label>
                         <textarea 
                            rows={4}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 font-medium text-slate-600 focus:bg-white focus:border-slate-900 outline-none transition-all"
                            placeholder="Add payment instructions or special project terms..."
                            value={manualFormData.notes}
                            onChange={(e) => setManualFormData({...manualFormData, notes: e.target.value})}
                         />
                    </div>
                    <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 space-y-6 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                        <div className="flex justify-between items-center text-sm font-bold text-slate-400 uppercase tracking-widest">
                            <span>Project Subtotal</span>
                            <span>{manualFormData.currency} {manualFormData.lineItems.reduce((acc, curr) => acc + (curr.quantity * curr.unitPrice), 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-bold text-blue-400 uppercase tracking-widest">
                            <span>T-GST (16%)</span>
                            <span>+ {manualFormData.currency} {(manualFormData.lineItems.reduce((acc, curr) => acc + (curr.quantity * curr.unitPrice), 0) * 0.16).toLocaleString()}</span>
                        </div>
                        <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">Final Authorization Amount</p>
                                <p className="text-5xl font-black tracking-tighter leading-none">
                                    {manualFormData.currency} {(manualFormData.lineItems.reduce((acc, curr) => acc + (curr.quantity * curr.unitPrice), 0) * 1.16).toLocaleString()}
                                </p>
                            </div>
                            <button type="submit" className="bg-blue-600 text-white p-6 rounded-3xl hover:bg-blue-500 transition-all shadow-xl active:scale-95 group">
                                <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
             </form>
           </div>
        </div>
      )}

    </div>
  );
};

export default FinanceInvoicing;





