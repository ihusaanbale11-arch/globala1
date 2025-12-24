




import React, { useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { 
    TrendingUp, TrendingDown, DollarSign, Clock, AlertCircle, 
    CheckCircle2, ArrowUpRight, ArrowDownRight, Wallet, 
    Receipt, Landmark, Activity, Zap, ShieldAlert, ChevronRight,
    Target, BarChart3, PieChart, Users, Calculator, RefreshCw, Award
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';

const FinanceDashboard: React.FC = () => {
  const { invoices, expenses, payments, budgets, refreshData, stats } = useData();
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  // --- 1. CORE METRICS CALCULATIONS ---
  const todayRevenue = useMemo(() => {
    return (payments ?? [])
      .filter(p => p.paymentDate === today)
      .reduce((acc, curr) => acc + (curr.amount ?? 0), 0);
  }, [payments, today]);

  const outstandingSummary = useMemo(() => {
    const overdue = (invoices ?? []).filter(i => i.status === 'Overdue').reduce((a, c) => a + (c.totalAmount ?? 0), 0);
    const sent = (invoices ?? []).filter(i => i.status === 'Sent').reduce((a, c) => a + (c.totalAmount ?? 0), 0);
    return { overdue, sent, total: overdue + sent };
  }, [invoices]);

  const expenseAlerts = useMemo(() => {
    const flagged = (expenses ?? []).filter(e => e.status === 'Flagged').length;
    const pending = (expenses ?? []).filter(e => e.status === 'Pending').length;
    return { flagged, pending };
  }, [expenses]);

  const cashFlow = useMemo(() => {
    const totalIn = (payments ?? []).reduce((a, c) => a + (c.amount ?? 0), 0);
    const totalOut = (expenses ?? [])
        .filter(e => e.status === 'Approved' || e.status === 'Reimbursed')
        .reduce((a, c) => a + (c.amount ?? 0), 0);
    return { totalIn, totalOut, net: totalIn - totalOut };
  }, [payments, expenses]);

  // --- 2. EXECUTIVE RECRUITMENT KPIs ---
  const executiveKpis = useMemo(() => {
    const mrr = (invoices ?? [])
        .filter(i => i.isRecurring && i.status !== 'Cancelled')
        .reduce((acc, curr) => acc + (curr.totalAmount ?? 0), 0);

    const placementInvoices = (invoices ?? []).filter(i => i.status === 'Paid');
    const avgPlacementFee = placementInvoices.length > 0 
        ? placementInvoices.reduce((a, c) => a + (c.totalAmount ?? 0), 0) / placementInvoices.length 
        : 0;

    const recruitmentExpenses = (expenses ?? [])
        .filter(e => (e.category === 'Recruitment Ads' || e.category === 'Travel' || e.category === 'Logistics') && (e.status === 'Approved' || e.status === 'Reimbursed'))
        .reduce((a, c) => a + (c.amount ?? 0), 0);
    const costPerHire = stats.successfulPlacements > 0 ? recruitmentExpenses / stats.successfulPlacements : 0;

    const settledInvoices = (invoices ?? []).filter(i => i.status === 'Paid');
    let totalDays = 0;
    settledInvoices.forEach(inv => {
        const payRecord = payments.find(p => p.invoiceId === inv.id);
        if (payRecord) {
            const diffTime = Math.abs(new Date(payRecord.paymentDate).getTime() - new Date(inv.issueDate).getTime());
            totalDays += Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }
    });
    const dso = settledInvoices.length > 0 ? Math.round(totalDays / settledInvoices.length) : 0;

    const totalRevenue = (payments ?? []).reduce((a, c) => a + (c.amount ?? 0), 0);
    const margin = totalRevenue > 0 ? ((totalRevenue - cashFlow.totalOut) / totalRevenue) * 100 : 0;

    return { mrr, avgPlacementFee, costPerHire, dso, margin };
  }, [invoices, payments, expenses, stats.successfulPlacements, cashFlow.totalOut]);

  // --- 3. CHART DATA ---
  const cashFlowChartData = useMemo(() => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const dayIn = (payments ?? []).filter(p => p.paymentDate === dateStr).reduce((a, c) => a + (c.amount ?? 0), 0);
        const dayOut = (expenses ?? []).filter(e => e.date === dateStr && (e.status === 'Approved' || e.status === 'Reimbursed')).reduce((a, c) => a + (c.amount ?? 0), 0);
        
        data.push({
            name: date.toLocaleDateString('default', { weekday: 'short' }),
            inflow: dayIn,
            outflow: dayOut
        });
    }
    return data;
  }, [payments, expenses]);

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-700">
      <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
                <div className="inline-flex items-center gap-2 bg-blue-500/20 px-4 py-1.5 rounded-full text-blue-300 font-black text-[10px] uppercase tracking-[0.3em] mb-4 border border-blue-500/30 backdrop-blur-md">
                    <Activity size={14} className="text-blue-400" /> Fiscal Command Center
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none italic">Enterprise <span className="text-blue-400">Finance</span></h1>
                <p className="text-slate-400 mt-4 text-lg font-medium max-w-xl">Real-time oversight of Glow Tours' liquidity, receivables, and institutional burn.</p>
            </div>
            <div className="flex gap-4">
                <button onClick={refreshData} className="p-4 bg-white/5 border border-white/10 text-white rounded-2xl hover:bg-white/10 transition-all shadow-xl active:scale-95">
                    <Zap size={24} />
                </button>
                <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl text-right backdrop-blur-md">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Net Liquidity</p>
                    <p className="text-3xl font-black text-emerald-400 tracking-tighter">${(cashFlow.net ?? 0).toLocaleString()}</p>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <RefreshCw size={12} className="text-blue-500"/> MRR
              </p>
              <h4 className="text-2xl font-black text-slate-900 tracking-tighter">${(executiveKpis.mrr ?? 0).toLocaleString()}</h4>
              <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">Monthly Recurring Revenue</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Award size={12} className="text-purple-500"/> Avg Fee
              </p>
              <h4 className="text-2xl font-black text-slate-900 tracking-tighter">${(Math.round(executiveKpis.avgPlacementFee) ?? 0).toLocaleString()}</h4>
              <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">Per Professional Placement</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Users size={12} className="text-orange-500"/> Cost / Hire
              </p>
              <h4 className="text-2xl font-black text-slate-900 tracking-tighter">${(Math.round(executiveKpis.costPerHire) ?? 0).toLocaleString()}</h4>
              <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">Recruitment Acquisition Cost</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Clock size={12} className="text-indigo-500"/> DSO
              </p>
              <h4 className="text-2xl font-black text-slate-900 tracking-tighter">{(executiveKpis.dso ?? 0)} Days</h4>
              <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">Days Sales Outstanding</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Calculator size={12} className="text-emerald-500"/> Gross Margin
              </p>
              <h4 className="text-2xl font-black text-emerald-600 tracking-tighter">{(executiveKpis.margin ?? 0).toFixed(1)}%</h4>
              <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">Financial Efficiency</p>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[2.5rem] -mr-8 -mt-8 transition-transform group-hover:scale-125"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Today's Collections</p>
            <div className="flex items-end justify-between relative z-10">
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter">${(todayRevenue ?? 0).toLocaleString()}</h3>
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                    <TrendingUp size={24} />
                </div>
            </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-[2.5rem] -mr-8 -mt-8 transition-transform group-hover:scale-125"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Receivables</p>
            <div className="flex items-end justify-between relative z-10">
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter">${(outstandingSummary.total ?? 0).toLocaleString()}</h3>
                <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                    <Clock size={24} />
                </div>
            </div>
            <div className="mt-4 text-[10px] font-bold text-rose-600 uppercase tracking-widest">
                ${(outstandingSummary.overdue ?? 0).toLocaleString()} Overdue
            </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-[2.5rem] -mr-8 -mt-8 transition-transform group-hover:scale-125"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Approval Queue</p>
            <div className="flex items-end justify-between relative z-10">
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{(expenseAlerts.pending ?? 0)}</h3>
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                    <Landmark size={24} />
                </div>
            </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-[2.5rem] -mr-8 -mt-8 transition-transform group-hover:scale-125"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Institutional Burn</p>
            <div className="flex items-end justify-between relative z-10">
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter">${(cashFlow.totalOut ?? 0).toLocaleString()}</h3>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <TrendingDown size={24} />
                </div>
            </div>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
        <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-8 italic">Revenue <span className="text-blue-600">Concentration</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(invoices ?? []).slice(0, 4).map((inv, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center justify-between group hover:bg-blue-50 transition-all">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Entity Revenue</p>
                        <p className="text-lg font-black text-slate-900 truncate max-w-[120px]">{inv.clientName}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-black text-blue-600 tracking-tighter">${(inv.totalAmount ?? 0).toLocaleString()}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">Settled</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;