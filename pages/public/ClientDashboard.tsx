





import React, { useEffect, useState } from 'react';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, Clock, User, HelpCircle, RefreshCw, MessageSquare, 
  Briefcase, CheckCircle, TrendingUp, Search, PlusCircle, ArrowRight,
  PieChart, ShieldCheck, Activity, Zap, Sparkles, Building2, Layers,
  ChevronRight, Users2, Target, Receipt, DollarSign, Wallet, ShieldAlert
} from 'lucide-react';

const ClientDashboard: React.FC = () => {
  const { currentUser, inquiries, refreshData, recruitedCandidates, candidates, invoices } = useData();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'requests' | 'billing'>('requests');

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  if (!currentUser) return null;

  const handleRefresh = () => {
      setIsRefreshing(true);
      refreshData();
      setTimeout(() => setIsRefreshing(false), 500); 
  };

  const myRequests = inquiries
    .filter(inq => inq.email.toLowerCase() === currentUser.email.toLowerCase())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const hiredCount = recruitedCandidates.filter(c => 
    c.employer.toLowerCase().includes(currentUser.companyName.toLowerCase())
  ).length;

  const myInvoices = invoices
    .filter(inv => inv.clientId === currentUser.id)
    .sort((a,b) => b.issueDate.localeCompare(a.issueDate));

  const outstandingBalance = myInvoices
    .filter(i => i.status !== 'Paid' && i.status !== 'Cancelled')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  return (
    <div className="bg-slate-50/50 min-h-screen">
      {/* VERIFICATION WARNING BANNER */}
      {!currentUser.isVerified && (
        <div className="bg-gradient-to-r from-amber-600 to-rose-700 text-white px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-top duration-500">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                    <ShieldAlert size={20} />
                </div>
                <div className="text-center md:text-left">
                    <p className="font-black text-xs uppercase tracking-widest">Account Status: Pending Authentication</p>
                    <p className="text-xs font-medium opacity-80 mt-0.5">Your entity is currently restricted from creating manpower requisitions until verified by Glow HQ.</p>
                </div>
            </div>
            <button onClick={() => navigate('/contact')} className="px-6 py-2 bg-white text-rose-700 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-all active:scale-95">
                Contact Support
            </button>
        </div>
      )}

      {/* Cinematic Hero Section */}
      <div className="relative bg-slate-950 pb-32 pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-950 to-blue-900 opacity-95"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-6">
                <div className="text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-blue-500/10 px-4 py-1.5 rounded-full text-blue-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4 border border-blue-500/20 backdrop-blur-md">
                        <ShieldCheck size={14} className={currentUser.isVerified ? "text-emerald-400" : "text-amber-400"} /> 
                        {currentUser.isVerified ? 'Category A Authorized' : 'Pending Authorization'}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-3">Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Command</span></h1>
                    <p className="text-blue-100/60 font-medium text-base max-w-xl">{currentUser.companyName} Unified Ecosystem</p>
                </div>
                <button onClick={handleRefresh} className="p-3.5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all shadow-2xl active:scale-95">
                    <RefreshCw size={20} className={`${isRefreshing ? "animate-spin" : ""}`} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-7 text-white shadow-2xl hover:-translate-y-1.5 transition-all relative overflow-hidden">
                    <p className="text-blue-100/70 text-[9px] font-black uppercase tracking-[0.25em] mb-1.5">Active Pipelines</p>
                    <h3 className="text-4xl font-black tracking-tighter mb-1">{myRequests.length}</h3>
                </div>
                <div className="group bg-gradient-to-br from-purple-600 to-fuchsia-700 rounded-[2rem] p-7 text-white shadow-2xl hover:-translate-y-1.5 transition-all relative overflow-hidden">
                    <p className="text-purple-100/70 text-[9px] font-black uppercase tracking-[0.25em] mb-1.5">Outstanding Balance</p>
                    <h3 className="text-4xl font-black tracking-tighter mb-1">${outstandingBalance.toLocaleString()}</h3>
                </div>
                <div className="group bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[2rem] p-7 text-white shadow-2xl hover:-translate-y-1.5 transition-all relative overflow-hidden">
                    <p className="text-emerald-100/70 text-[9px] font-black uppercase tracking-[0.25em] mb-1.5">Hired Talent</p>
                    <h3 className="text-4xl font-black tracking-tighter mb-1">{hiredCount}</h3>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-24">
        <div className="flex gap-4 p-2 bg-white/80 backdrop-blur-xl rounded-[2.5rem] w-fit shadow-xl border border-white mb-8 mx-auto md:mx-0">
            <button onClick={() => setActiveTab('requests')} className={`flex items-center gap-2 px-8 py-4 rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'requests' ? 'bg-slate-900 text-white' : 'text-slate-400'}`}>
                <Activity size={16}/> Requests
            </button>
            <button onClick={() => setActiveTab('billing')} className={`flex items-center gap-2 px-8 py-4 rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'billing' ? 'bg-slate-900 text-white' : 'text-slate-400'}`}>
                <Receipt size={16}/> Billing
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {activeTab === 'requests' ? (
                    <>
                         <div className={`bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group ${!currentUser.isVerified ? 'opacity-70 grayscale cursor-not-allowed' : ''}`}>
                            <div className="relative z-10 flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                        <Sparkles size={20} />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Expand Your Team</h3>
                                </div>
                                <p className="text-slate-500 font-medium text-sm max-w-lg">Initiate a formal manpower requisition.</p>
                            </div>
                            <button 
                                onClick={() => currentUser.isVerified && navigate('/request-manpower')}
                                disabled={!currentUser.isVerified}
                                className={`relative z-10 px-8 py-4 rounded-2xl font-black text-base uppercase tracking-widest transition-all flex items-center gap-3 ${
                                    currentUser.isVerified ? 'bg-slate-900 text-white hover:bg-indigo-600 shadow-xl' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                }`}
                            >
                                <PlusCircle size={20} /> {currentUser.isVerified ? 'Initialize' : 'Locked'}
                            </button>
                         </div>

                        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
                            <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/30">
                                <h2 className="text-xl font-black text-slate-900 tracking-tighter">Operational Timeline</h2>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {myRequests.map((request) => (
                                    <div key={request.id} className="p-8 hover:bg-slate-50 transition">
                                        <h3 className="text-xl font-black text-slate-900 mb-2">{request.subject}</h3>
                                        <div className="flex items-center text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] gap-4">
                                            <span>{request.date}</span>
                                            <span className={`px-2 py-0.5 rounded border ${request.status === 'Replied' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'}`}>{request.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
                        <div className="px-8 py-8 border-b border-slate-50 bg-slate-50/30">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Fiscal Journal</h2>
                        </div>
                        <div className="p-12 text-center text-slate-300 font-black uppercase tracking-widest">No invoices issued.</div>
                    </div>
                )}
            </div>

            <div className="space-y-8">
                <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 rounded-[2.5rem] shadow-2xl text-white p-8">
                    <div className="flex flex-col items-center text-center">
                        <Target size={40} className="text-blue-400 mb-6" />
                        <h3 className="text-2xl font-black mb-3">Enterprise Desk</h3>
                        <p className="text-[13px] text-blue-100/60 font-medium mb-8">Our executive desk is available 24/7 for resort partners.</p>
                        <button onClick={() => navigate('/contact')} className="w-full bg-white text-indigo-950 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-xl">
                            Contact Account Manager
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;