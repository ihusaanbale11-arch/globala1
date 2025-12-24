







import React, { useState, useMemo } from 'react';
import { useData } from '../../../../context/DataContext';
import { 
    ShieldCheck, Building2, CheckCircle, XCircle, Eye, 
    FileText, Search, AlertCircle, Landmark, Award, Clock,
    ChevronRight, ShieldAlert, History, Filter, UserX, ExternalLink,
    Zap, Activity
} from 'lucide-react';

const ClientVerification: React.FC = () => {
  const { clients, verifyClient, updateClientStatus } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'pending' | 'verified'>('pending');

  const pendingClients = useMemo(() => clients.filter(c => 
    !c.isVerified && 
    (c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase()))
  ), [clients, searchTerm]);

  const verifiedClients = useMemo(() => clients.filter(c => 
    c.isVerified && 
    (c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase()))
  ), [clients, searchTerm]);

  const handleSuspend = (id: string) => {
    if (window.confirm("Suspend this entity? They will lose access to all recruitment pipelines immediately.")) {
        updateClientStatus(id, 'Suspended');
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* High-Security Header */}
      <div className="bg-slate-950 p-12 rounded-[4rem] text-white shadow-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -mr-64 -mt-64 group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-center gap-10">
          <div>
            <div className="inline-flex items-center gap-3 bg-blue-500/20 px-5 py-2 rounded-full text-blue-400 font-black text-[10px] uppercase tracking-[0.3em] mb-6 border border-blue-500/30 backdrop-blur-md">
              <ShieldCheck size={14} className="animate-pulse" /> Identity Governance Protocol
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4 italic">Client <span className="text-blue-400">Authority</span></h1>
            <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">Manage corporate authentication, regulatory compliance checks, and authorized recruitment mandates.</p>
          </div>
          <div className="flex gap-4">
              <div className="bg-white/5 border border-white/10 px-10 py-6 rounded-[2.5rem] backdrop-blur-md text-right">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Authenticated Nodes</p>
                  <p className="text-5xl font-black text-blue-400 tracking-tighter">{clients.filter(c => c.isVerified).length}</p>
              </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-8">
            {/* View Toggle / Tabs */}
            <div className="flex gap-4 p-2 bg-slate-100 rounded-[2.5rem] w-fit border border-slate-200">
                <button 
                    onClick={() => setActiveTab('pending')}
                    className={`flex items-center gap-3 px-8 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'pending' ? 'bg-white text-blue-600 shadow-xl' : 'text-slate-500 hover:text-slate-800'}`}
                >
                    <Clock size={16} /> Audit Queue ({pendingClients.length})
                </button>
                <button 
                    onClick={() => setActiveTab('verified')}
                    className={`flex items-center gap-3 px-8 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'verified' ? 'bg-white text-emerald-600 shadow-xl' : 'text-slate-500 hover:text-slate-800'}`}
                >
                    <ShieldCheck size={16} /> Verified Directory ({verifiedClients.length})
                </button>
            </div>

            <div className="bg-white rounded-[4rem] shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/30">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tighter leading-none mb-1">
                            {activeTab === 'pending' ? 'Registration Audit' : 'Authorized Network'}
                        </h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {activeTab === 'pending' ? 'Awaiting Executive Clearance' : 'Active Recruitment Partners'}
                        </p>
                    </div>
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Filter registry..." 
                            className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl text-xs font-bold focus:border-blue-500 outline-none shadow-inner"
                        />
                    </div>
                </div>

                <div className="divide-y divide-slate-100 min-h-[400px]">
                    {activeTab === 'pending' ? (
                        pendingClients.map(c => (
                            <div key={c.id} className="p-10 hover:bg-slate-50/50 transition flex flex-col md:flex-row justify-between items-center gap-10 group">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[1.8rem] flex items-center justify-center border-2 border-blue-100 shadow-xl group-hover:scale-110 transition-transform">
                                        <Building2 size={28} />
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-900 text-xl tracking-tight mb-1">{c.companyName}</p>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{c.email}</span>
                                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Submitted: Today</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 w-full md:w-auto">
                                    <button className="flex-1 md:flex-none px-6 py-4 bg-slate-100 text-slate-500 hover:text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-200 transition">
                                        View Docs
                                    </button>
                                    <button 
                                        onClick={() => verifyClient(c.id)}
                                        className="flex-1 md:flex-none px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-emerald-600 transition-all active:scale-95"
                                    >
                                        Approve Entity
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        verifiedClients.map(c => (
                            <div key={c.id} className="p-10 hover:bg-slate-50/50 transition flex flex-col md:flex-row justify-between items-center gap-10 group">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-[1.8rem] flex items-center justify-center border-2 border-emerald-100 shadow-xl group-hover:scale-110 transition-transform">
                                        <ShieldCheck size={28} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="font-black text-slate-900 text-xl tracking-tight">{c.companyName}</p>
                                            <CheckCircle size={14} className="text-emerald-500" />
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Authorized Partner</span>
                                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{c.email}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3 w-full md:w-auto">
                                    <button 
                                        onClick={() => handleSuspend(c.id)}
                                        className="flex-1 md:flex-none p-4 bg-white text-slate-300 hover:text-rose-600 rounded-2xl border border-slate-100 hover:border-rose-100 hover:bg-rose-50 transition-all"
                                        title="Revoke Verification"
                                    >
                                        <UserX size={20}/>
                                    </button>
                                    <button className="flex-1 md:flex-none px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-all">
                                        Account Dossier
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                    
                    {((activeTab === 'pending' && pendingClients.length === 0) || (activeTab === 'verified' && verifiedClients.length === 0)) && (
                        <div className="p-32 text-center flex flex-col items-center justify-center">
                            <Landmark size={64} className="text-slate-100 mb-6" />
                            <p className="text-xl font-black text-slate-300 uppercase tracking-[0.3em]">Registry Segment Clear</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-[3rem] -mr-8 -mt-8 transition-transform group-hover:scale-125"></div>
                <Activity size={32} className="text-blue-500 mb-8" />
                <h3 className="text-xl font-black text-slate-900 tracking-tighter mb-4">Sourcing Capacity</h3>
                <div className="space-y-4">
                    {[
                        { label: 'Authorized Limit', val: 'Unlimited', icon: ShieldCheck, color: 'emerald' },
                        { label: 'Compliance Tier', val: 'Category A', icon: Award, color: 'blue' },
                        { label: 'Pending Audits', val: pendingClients.length, icon: Clock, color: 'amber' }
                    ].map((row, i) => (
                        <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex items-center gap-3">
                                <row.icon size={14} className={`text-${row.color}-500`} />
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{row.label}</span>
                            </div>
                            <span className="text-xs font-black text-slate-900">{row.val}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-indigo-900 p-10 rounded-[3.5rem] text-white shadow-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                <Zap size={32} className="text-yellow-400 mb-6 group-hover:rotate-12 transition-transform" />
                <h3 className="text-xl font-black italic tracking-tight mb-2">Automated KYC</h3>
                <p className="text-indigo-100/60 text-sm leading-relaxed font-medium mb-8">System is cross-referencing business licenses with the Maldives Ministry of Economic Development database.</p>
                <div className="flex items-center gap-3 text-emerald-400 font-black text-[10px] uppercase tracking-widest">
                    <CheckCircle size={14} /> Link Active
                </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-200">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-6 flex items-center gap-2">
                    <History size={14}/> Audit Log Highlights
                </h4>
                <div className="space-y-4">
                    {[
                        "Entity 'Sunrise Resorts' verified.",
                        "License 429-C expired for 'Blue Sea'.",
                        "New audit triggered for 'Apex Infra'."
                    ].map((log, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 flex-shrink-0"></div>
                            <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-tight">{log}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ClientVerification;
