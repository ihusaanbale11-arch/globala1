//
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { 
  Wallet, Plus, Search, Filter, Camera, 
  CheckCircle, XCircle, AlertTriangle, DollarSign, 
  Clock, TrendingUp, PieChart, Layers, ArrowRight,
  ShieldCheck, Smartphone, Zap, Sparkles, RefreshCw, X, FileText,
  ClipboardList, PlusCircle, LayoutGrid, Trash2
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Expense, Budget } from '../../types';

const FinanceExpenses: React.FC = () => {
  const { expenses, budgets, addExpense, updateExpenseStatus, addBudget, deleteBudget } = useData();
  const [activeTab, setActiveTab] = useState<'hub' | 'budgets' | 'approvals'>('hub');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [budgetToRemove, setBudgetToRemove] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Manual Expense Form State
  const initialFormState = {
    title: '',
    vendor: '',
    amount: 0,
    currency: 'USD' as 'USD' | 'MVR',
    date: new Date().toISOString().split('T')[0],
    category: '',
    budgetId: '',
    notes: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  // Manual Budget Form State
  const initialBudgetForm = {
    category: '',
    department: '',
    allocated: 0,
    period: `2025-Q${Math.floor(new Date().getMonth() / 3) + 1}`
  };
  const [budgetData, setBudgetData] = useState(initialBudgetForm);

  // Analytical Calculations
  const totalBurnThisMonth = expenses
    .filter(e => e.status === 'Approved' || e.status === 'Reimbursed')
    .reduce((acc, curr) => acc + (curr.amount ?? 0), 0);

  const pendingApprovals = expenses.filter(e => e.status === 'Pending');

  const filteredExpenses = expenses.filter(e => 
    e.vendor.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a,b) => b.date.localeCompare(a.date));

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.budgetId || !formData.vendor || formData.amount <= 0) return;

    const budget = budgets.find(b => b.id === formData.budgetId);
    const violation = budget && (budget.spent + formData.amount > budget.allocated) 
        ? "Budget Threshold Breach Detected" 
        : undefined;

    const newExpense: Expense = {
        id: Date.now().toString(),
        title: formData.title || `${formData.vendor} - ${formData.category}`,
        vendor: formData.vendor,
        amount: formData.amount,
        currency: formData.currency,
        date: formData.date,
        category: formData.category || (budget?.category || 'General'),
        budgetId: formData.budgetId,
        status: violation ? 'Flagged' : 'Pending',
        submittedBy: 'Admin Console',
        aiProcessed: false,
        policyViolation: violation,
        notes: formData.notes
    };

    addExpense(newExpense);
    setIsModalOpen(false);
    setFormData(initialFormState);
  };

  const handleCreateBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!budgetData.category || !budgetData.department || budgetData.allocated <= 0) return;

    const newBudget: Budget = {
        id: 'b-' + Date.now().toString(),
        category: budgetData.category,
        department: budgetData.department,
        allocated: budgetData.allocated,
        spent: 0,
        remaining: budgetData.allocated,
        period: budgetData.period
    };

    addBudget(newBudget);
    setIsBudgetModalOpen(false);
    setBudgetData(initialBudgetForm);
  };

  const handleDeleteBudget = () => {
    if (budgetToRemove) {
      deleteBudget(budgetToRemove);
      setBudgetToRemove(null);
    }
  };

  const handleApprove = (id: string) => {
      updateExpenseStatus(id, 'Approved');
  };

  const handleReject = (id: string) => {
      updateExpenseStatus(id, 'Rejected');
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-slate-900 p-12 rounded-[4rem] shadow-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] -mr-64 -mt-64 group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-3 bg-emerald-500/20 px-5 py-2 rounded-full text-emerald-400 font-black text-[10px] uppercase tracking-[0.3em] mb-6 border border-emerald-500/30 backdrop-blur-md">
            <Zap size={14} className="animate-pulse"/> Fiscal Outflow Engine
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-4 italic">Expense <span className="text-emerald-400">Hub</span></h1>
          <p className="text-slate-400 text-xl font-medium max-w-2xl">Manual disbursement entry with real-time budget guardrails and automated approval sequences.</p>
        </div>
        <div className="flex flex-wrap gap-4 relative z-10">
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl transition-all active:scale-95 flex items-center gap-3 group/btn"
            >
                <PlusCircle size={24} className="group-hover/btn:rotate-90 transition-transform" /> New Expense
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
            { label: 'Total Burn (MTD)', val: `$${(totalBurnThisMonth ?? 0).toLocaleString()}`, icon: TrendingUp, color: 'emerald' },
            { label: 'Awaiting Approval', val: (pendingApprovals.length ?? 0), icon: Clock, color: 'amber', unit: 'Items' },
            { label: 'Budget Utilization', val: '64%', icon: PieChart, color: 'indigo' },
            { label: 'System Compliance', val: '99.2%', icon: ShieldCheck, color: 'blue' }
        ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-50 rounded-bl-[2.5rem] -mr-8 -mt-8 transition-transform group-hover:scale-125`}></div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-2">{stat.label}</p>
                <div className="flex items-end justify-between relative z-10">
                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stat.val}</h3>
                    <div className={`p-4 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl`}>
                        <stat.icon size={24} />
                    </div>
                </div>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex gap-4 p-2 bg-slate-100 rounded-[2.5rem] w-fit border border-slate-200">
                  {[
                      { id: 'hub', label: 'Disbursement Ledger', icon: Wallet },
                      { id: 'budgets', label: 'Department Budgets', icon: Layers },
                      { id: 'approvals', label: 'Approval Queue', icon: CheckCircle }
                  ].map(tab => (
                      <button 
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`flex items-center gap-3 px-8 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white text-emerald-600 shadow-xl' : 'text-slate-500 hover:text-slate-800'}`}
                      >
                          <tab.icon size={16} /> {tab.label}
                      </button>
                  ))}
              </div>
            </div>

            {activeTab === 'hub' && (
                <div className="bg-white rounded-[4rem] border border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-10 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                placeholder="Search vendor, category or title..." 
                                className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:border-emerald-500 shadow-inner"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/80">
                                <tr>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Disbursement Detail</th>
                                    <th className="px-10 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Volume</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredExpenses.map(exp => (
                                    <tr key={exp.id} className="hover:bg-slate-50/50 transition-all group">
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all border border-slate-200 group-hover:border-emerald-100">
                                                    <Wallet size={24}/>
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 text-lg tracking-tight leading-none mb-2">{exp.vendor}</p>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter flex items-center gap-1"><Clock size={10}/> {exp.date}</span>
                                                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-tighter">{exp.category}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <p className="font-black text-slate-900 text-2xl tracking-tighter">{exp.currency} {(exp.amount ?? 0).toLocaleString()}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'budgets' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {budgets.map(budget => {
                        const progress = (budget.spent / budget.allocated) * 100;
                        const isOver = budget.spent > budget.allocated;
                        return (
                            <div key={budget.id} className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-xl group relative overflow-hidden">
                                <div className="flex justify-between items-start mb-8 pr-10">
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-1">{budget.category}</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{budget.department} Allocation</p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-slate-400 uppercase">Institutional Spent</p>
                                            <p className="text-3xl font-black text-slate-900 tracking-tighter">${(budget.spent ?? 0).toLocaleString()}</p>
                                        </div>
                                        <div className="text-right space-y-1">
                                            <p className="text-[9px] font-black text-slate-400 uppercase">Limit</p>
                                            <p className="text-xl font-bold text-slate-600">${(budget.allocated ?? 0).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner relative">
                                        <div 
                                            className={`h-full rounded-full transition-all duration-1000 ${isOver ? 'bg-rose-500' : 'bg-emerald-500'}`}
                                            style={{ width: `${Math.min(progress, 100)}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <span>Utilized: {progress.toFixed(1)}%</span>
                                        <span className={budget.remaining < 0 ? 'text-rose-500' : 'text-emerald-500'}>
                                            {budget.remaining < 0 ? `Overbudget by $${(Math.abs(budget.remaining) ?? 0).toLocaleString()}` : `Remaining: $${(budget.remaining ?? 0).toLocaleString()}`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default FinanceExpenses;//
