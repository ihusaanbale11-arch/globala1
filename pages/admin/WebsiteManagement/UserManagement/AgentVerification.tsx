
import React, { useState, useMemo } from 'react';
import { useData } from '../../../../context/DataContext';
// Added 'Mail' icon to the imports to fix "Cannot find name 'Mail'" error
import { 
    ShieldCheck, Network, Globe, CheckCircle, XCircle, Eye, 
    FileText, Search, AlertCircle, Award, Clock, Fingerprint,
    ShieldAlert, Activity, ArrowRight, UserCheck, X, Zap, Mail
} from 'lucide-react';
import { Agent } from '../../../../types';

const AgentVerification: React.FC = () => {
  const { agents, updateAgentStatus, logAction } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const pendingAgents = useMemo(() => agents.filter(a => 
    a.status === 'Pending' && 
    (a.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) || a.email.toLowerCase().includes(searchTerm.toLowerCase()))
  ), [agents, searchTerm]);

  const activeAgents = useMemo(() => agents.filter(a => a.status === 'Active'), [agents]);

  const handleVerify = (agentId: string) => {
    setIsVerifying(true);
    // Simulate deep vetting delay
    setTimeout(() => {
        updateAgentStatus(agentId, 'Active');
        logAction('AGENT_VERIFIED', 'UserRelations', `Authorized agency: ${selectedAgent?.agencyName} for global sourcing.`);
        setIsVerifying(false);
        setSelectedAgent(null);
    }, 1500);
  };

  const handleReject = (agentId: string) => {
    if (window.confirm("Mark this agency as Suspended? This will block their portal access immediately.")) {
        updateAgentStatus(agentId, 'Suspended');
        logAction('AGENT_SUSPENDED', 'UserRelations', `Denied access to agency: ${selectedAgent?.agencyName}.`);
        setSelectedAgent(null);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* High-Security Header */}
      <div className="bg-slate-950 p-12 rounded-[4rem] text-white shadow-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] -mr-64 -mt-64 group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <div className="inline-flex items-center gap-3 bg-emerald-500/20 px-5 py-2 rounded-full text-emerald-400 font-black text-[10px] uppercase tracking-[0.3em] mb-6 border border-emerald-500/30 backdrop-blur-md">
              <Fingerprint size={14} className="animate-pulse" /> International Audit Protocol
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4 italic">Agent <span className="text-emerald-400">Vetting</span></h1>
            <p className="text-slate-400 text-xl font-medium max-w-2xl">Validate international agency licenses, country-of-origin compliance, and identity footprints before enabling portal access.</p>
          </div>
          <div className="bg-white/5 border border-white/10 px-10 py-6 rounded-[2.5rem] backdrop-blur-md text-right">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Authenticated Network</p>
              <p className="text-5xl font-black text-emerald-400 tracking-tighter">{activeAgents.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Verification Queue */}
        <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-[3.5rem] shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/30">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tighter leading-none mb-1">Awaiting Authorization</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pending Regulatory Review</p>
                    </div>
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Filter queue..." 
                            className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl text-xs font-bold focus:border-emerald-500 outline-none shadow-inner"
                        />
                    </div>
                </div>

                <div className="divide-y divide-slate-100">
                    {pendingAgents.map(agent => (
                        <div key={agent.id} className="p-8 hover:bg-slate-50/50 transition-all flex flex-col md:flex-row justify-between items-center gap-8 group">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[1.8rem] flex items-center justify-center border-2 border-blue-100 shadow-xl group-hover:scale-110 transition-transform">
                                    <Network size={28} />
                                </div>
                                <div>
                                    <p className="font-black text-slate-900 text-xl tracking-tight mb-1">{agent.agencyName}</p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Globe size={12}/> {agent.country}</span>
                                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{agent.email}</span>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => setSelectedAgent(agent)}
                                className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
                            >
                                Start Audit <ArrowRight size={14}/>
                            </button>
                        </div>
                    ))}
                    {pendingAgents.length === 0 && (
                        <div className="p-32 text-center flex flex-col items-center justify-center">
                            <ShieldCheck size={64} className="text-slate-100 mb-6" />
                            <p className="text-xl font-black text-slate-300 uppercase tracking-[0.3em]">Compliance Queue Clear</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Global Stats/Audit Trail */}
        <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                <Activity size={32} className="text-emerald-500 mb-6" />
                <h3 className="text-xl font-black text-slate-900 tracking-tighter mb-4">Integrity Monitoring</h3>
                <div className="space-y-4">
                    {[
                        { label: 'KYC Checks', val: '100%', icon: UserCheck },
                        { label: 'Country Lockouts', val: '2 Active', icon: ShieldAlert },
                        { label: 'Sourcing Volume', val: 'High', icon: Zap }
                    ].map((row, i) => (
                        <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex items-center gap-3">
                                <row.icon size={14} className="text-slate-400" />
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{row.label}</span>
                            </div>
                            <span className="text-xs font-black text-slate-900">{row.val}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-indigo-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                <Award size={32} className="text-indigo-400 mb-6" />
                <h3 className="text-xl font-black italic tracking-tight mb-2">Category A Status</h3>
                <p className="text-indigo-100/60 text-sm leading-relaxed font-medium mb-8">All active agents are bonded and authorized to recruit for Maldivian resort portfolios.</p>
                <button className="w-full py-4 bg-white/10 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">Audit active partners</button>
            </div>
        </div>
      </div>

      {/* Audit Detail Modal */}
      {selectedAgent && (
          <div className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-6 overflow-y-auto">
              <div className="bg-white rounded-[4rem] w-full max-w-4xl shadow-3xl overflow-hidden animate-in slide-in-from-bottom-10 duration-500 border border-white/20">
                  <div className="px-12 py-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                      <div className="flex items-center gap-6">
                          <div className="w-20 h-20 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center shadow-2xl">
                              <ShieldCheck size={40}/>
                          </div>
                          <div>
                              <h2 className="text-3xl font-black text-slate-900 tracking-tighter leading-none mb-2">Verification Desk</h2>
                              <p className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.3em]">Credentials Audit Node</p>
                          </div>
                      </div>
                      <button onClick={() => setSelectedAgent(null)} className="text-slate-300 hover:text-rose-600 bg-white p-5 rounded-full shadow-xl transition-all"><X size={36}/></button>
                  </div>

                  <div className="p-12 space-y-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div className="space-y-8">
                              <div>
                                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-2 block">Agency Dossier</label>
                                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                      <h3 className="text-2xl font-black text-slate-900 mb-1">{selectedAgent.agencyName}</h3>
                                      <p className="text-slate-500 font-medium mb-4">{selectedAgent.contactPerson}</p>
                                      <div className="space-y-2">
                                          <div className="flex items-center gap-2 text-sm text-slate-600 font-bold"><Mail size={14} className="text-blue-500"/> {selectedAgent.email}</div>
                                          <div className="flex items-center gap-2 text-sm text-slate-600 font-bold"><Globe size={14} className="text-blue-500"/> {selectedAgent.country} Registry</div>
                                      </div>
                                  </div>
                              </div>

                              <div className="space-y-4">
                                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 block">Security Flags</label>
                                  <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
                                      <CheckCircle size={20} className="text-emerald-500" />
                                      <p className="text-xs font-black text-emerald-700 uppercase tracking-widest">No sanctions detected</p>
                                  </div>
                                  <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-4">
                                      <Globe size={20} className="text-blue-500" />
                                      <p className="text-xs font-black text-blue-700 uppercase tracking-widest">Compliant operating region</p>
                                  </div>
                              </div>
                          </div>

                          <div className="space-y-8">
                              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-2 block">License Vault</label>
                              <div className="grid grid-cols-2 gap-4">
                                  <div className="aspect-[3/4] bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-6 text-center group cursor-pointer hover:bg-slate-50 transition-all">
                                      <FileText size={32} className="text-slate-300 group-hover:text-blue-600 mb-4" />
                                      <p className="text-[10px] font-black text-slate-400 uppercase leading-tight group-hover:text-slate-900">Operating License</p>
                                  </div>
                                  <div className="aspect-[3/4] bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-6 text-center group cursor-pointer hover:bg-slate-50 transition-all">
                                      <ShieldCheck size={32} className="text-slate-300 group-hover:text-emerald-600 mb-4" />
                                      <p className="text-[10px] font-black text-slate-400 uppercase leading-tight group-hover:text-slate-900">ISO Certification</p>
                                  </div>
                              </div>
                              <div className="bg-slate-900 p-6 rounded-3xl text-white">
                                  <h4 className="text-xs font-black uppercase text-indigo-400 tracking-[0.2em] mb-2">Internal Note</h4>
                                  <p className="text-xs text-slate-400 font-medium leading-relaxed italic">"Verified primary contact via secure call. Agency represents high-volume hospitality staff for premium Maldives projects."</p>
                              </div>
                          </div>
                      </div>

                      <div className="flex justify-end gap-6 pt-10 border-t border-slate-100">
                          <button 
                            disabled={isVerifying}
                            onClick={() => setSelectedAgent(null)}
                            className="px-10 py-5 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-600 transition-colors"
                          >
                              Discard Audit
                          </button>
                          <button 
                            disabled={isVerifying}
                            onClick={() => handleReject(selectedAgent.id)}
                            className="px-10 py-5 bg-rose-50 text-rose-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-100 transition-all border border-rose-100"
                          >
                              Flag & Suspend
                          </button>
                          <button 
                            disabled={isVerifying}
                            onClick={() => handleVerify(selectedAgent.id)}
                            className="px-16 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-3xl hover:bg-emerald-600 transition-all transform active:scale-95 flex items-center gap-3"
                          >
                              {isVerifying ? <Clock className="animate-spin" size={18}/> : <ShieldCheck size={18}/>}
                              {isVerifying ? 'Verifying...' : 'Authorize Agency'}
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default AgentVerification;