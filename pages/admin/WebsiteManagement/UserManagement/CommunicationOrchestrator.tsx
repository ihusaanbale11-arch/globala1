
import React, { useState, useMemo } from 'react';
import { useData } from '../../../../context/DataContext';
import { 
    Activity, Mail, Smartphone, MessageSquare, 
    CheckCircle, XCircle, Clock, ArrowRight,
    Lock, ShieldCheck, UserCheck, Search, Filter,
    Send, Info, Shield, RefreshCw, X, Radio,
    CloudLightning, Server, Terminal, Key
} from 'lucide-react';
import { CommunicationLog } from '../../../../types';

const CommunicationOrchestrator: React.FC = () => {
  const { commLogs, logCommunication, candidates, clients } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Email' | 'SMS' | 'System'>('All');
  const [selectedLog, setSelectedLog] = useState<CommunicationLog | null>(null);
  const [isManualDispatchOpen, setIsManualDispatchOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Manual Dispatch State
  const [dispatchData, setDispatchData] = useState({
      targetType: 'Candidate' as 'Candidate' | 'Client',
      targetId: '',
      channel: 'Email' as 'Email' | 'SMS',
      subject: '',
      body: ''
  });

  const filteredLogs = useMemo(() => {
      return commLogs.filter(log => {
          const matchesSearch = log.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                               log.subject.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesFilter = filterType === 'All' || log.type === filterType;
          return matchesSearch && matchesFilter;
      }).sort((a,b) => b.timestamp.localeCompare(a.timestamp));
  }, [commLogs, searchTerm, filterType]);

  const handleManualDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const target = dispatchData.targetType === 'Candidate' 
        ? candidates.find(c => c.id === dispatchData.targetId)
        : clients.find(c => c.id === dispatchData.targetId);

    if (!target) {
        alert("Invalid target selected.");
        setIsSending(false);
        return;
    }

    // Simulate "Gateway Handshake"
    setTimeout(() => {
        logCommunication({
            userId: target.id,
            userName: dispatchData.targetType === 'Candidate' ? (target as any).name : (target as any).companyName,
            type: dispatchData.channel,
            direction: 'Outbound',
            subject: dispatchData.subject,
            timestamp: new Date().toISOString(),
            status: 'Delivered'
        });
        setIsSending(false);
        setIsManualDispatchOpen(false);
        setDispatchData({ targetType: 'Candidate', targetId: '', channel: 'Email', subject: '', body: '' });
    }, 1500);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Strategic Command Header */}
      <div className="bg-slate-950 p-12 rounded-[4rem] text-white shadow-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] -mr-64 -mt-64 group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-center gap-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 px-5 py-2 rounded-full text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em] mb-6 border border-indigo-500/30 backdrop-blur-md">
              <Radio size={14} className="animate-pulse" /> Global Broadcast Node
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4 italic">Comm <span className="text-indigo-400">Orchestrator</span></h1>
            <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">Centralized oversight of all outbound signals, gateway health, and automated notification sequences.</p>
          </div>
          <button 
            onClick={() => setIsManualDispatchOpen(true)}
            className="bg-indigo-600 text-white hover:bg-indigo-500 px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-3xl transition-all active:scale-95 flex items-center gap-3"
          >
            <Send size={24} /> Manual Dispatch
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Live Ledger Section */}
        <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-[3.5rem] shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/30">
                    <div className="flex gap-2">
                        {['All', 'Email', 'SMS', 'System'].map(t => (
                            <button 
                                key={t}
                                onClick={() => setFilterType(t as any)}
                                className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${filterType === t ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Filter transmissions..." 
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:border-indigo-500"
                        />
                    </div>
                </div>

                <div className="divide-y divide-slate-100 min-h-[400px]">
                    {filteredLogs.map(log => (
                        <div 
                            key={log.id} 
                            onClick={() => setSelectedLog(log)}
                            className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-all group cursor-pointer"
                        >
                            <div className="flex items-center gap-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-transform group-hover:scale-110 ${
                                    log.type === 'Email' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                    log.type === 'SMS' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                    'bg-indigo-50 text-indigo-600 border-indigo-100'
                                }`}>
                                    {log.type === 'Email' ? <Mail size={24}/> : log.type === 'SMS' ? <Smartphone size={24}/> : <Activity size={24}/>}
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{log.userName} • {log.type}</p>
                                    <h4 className="font-black text-slate-900 text-lg tracking-tight leading-none mb-1 group-hover:text-indigo-600 transition-colors">{log.subject}</h4>
                                    <div className="flex items-center gap-2">
                                        <Clock size={10} className="text-slate-300" />
                                        <p className="text-[10px] text-slate-400 font-bold">{new Date(log.timestamp).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border animate-pulse ${
                                    log.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                    log.status === 'Failed' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                                    'bg-blue-50 text-blue-700 border-blue-100'
                                }`}>
                                    {log.status}
                                </span>
                                <ArrowRight size={20} className="text-slate-200 group-hover:text-indigo-600 transition-colors group-hover:translate-x-1" />
                            </div>
                        </div>
                    ))}
                    {filteredLogs.length === 0 && (
                        <div className="p-32 text-center flex flex-col items-center justify-center grayscale opacity-30">
                            {/* Changed CloudZap to CloudLightning to fix the compilation error */}
                            <CloudLightning size={64} className="mb-6" />
                            <p className="text-xl font-black uppercase tracking-[0.3em]">No Traffic Detected</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Infrastructure Sidebar */}
        <div className="lg:col-span-4 space-y-8">
            {/* System Health Card */}
            <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white shadow-3xl relative overflow-hidden border border-white/5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <h3 className="text-xl font-black tracking-tight mb-8 flex items-center gap-3">
                    <Server size={22} className="text-indigo-400" /> Infrastructure Status
                </h3>
                <div className="space-y-4">
                    {[
                        { label: 'SMTP Gateway', status: 'Online', color: 'emerald', icon: Mail },
                        { label: 'SMS Provider', status: 'Offline', color: 'rose', icon: Smartphone },
                        { label: 'Auth Node', status: 'Ready', color: 'blue', icon: Key },
                        { label: 'Database Sync', status: 'Active', color: 'indigo', icon: RefreshCw }
                    ].map((svc, i) => (
                        <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-3">
                                <svc.icon size={14} className="text-slate-400" />
                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{svc.label}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full bg-${svc.color}-500 animate-pulse`}></div>
                                <span className={`text-[10px] font-black text-${svc.color}-400 uppercase`}>{svc.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Privacy Compliance Monitor */}
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-xl relative overflow-hidden group">
                <ShieldCheck size={32} className="text-emerald-500 mb-6" />
                <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">Policy Enforcer</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">System is automatically purging non-consented metadata every 24 hours.</p>
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
                    <span className="text-[10px] font-black text-emerald-700 uppercase">GDPR Shield</span>
                    <span className="text-[10px] font-black text-emerald-500">ACTIVE</span>
                </div>
            </div>

            {/* Terminal Mockup */}
            <div className="bg-black p-6 rounded-3xl font-mono text-[10px] text-emerald-500 shadow-2xl">
                <div className="flex gap-1.5 mb-4">
                    <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                </div>
                <p className="mb-1">{">"} initializing_broadcast_service...</p>
                <p className="mb-1">{">"} listeners_attached: 1,429</p>
                <p className="mb-1">{">"} queue_load: 0.02%</p>
                <p className="text-white animate-pulse">{">"} _</p>
            </div>
        </div>
      </div>

      {/* Log Detail Modal */}
      {selectedLog && (
          <div className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-3xl flex items-center justify-center p-6 overflow-y-auto">
              <div className="bg-white rounded-[4rem] w-full max-w-3xl shadow-3xl overflow-hidden animate-in zoom-in duration-500">
                  <div className="px-12 py-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                      <div className="flex items-center gap-6">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl ${
                                selectedLog.type === 'Email' ? 'bg-blue-600' : 'bg-indigo-600'
                          }`}>
                              <Terminal size={32}/>
                          </div>
                          <div>
                              <h2 className="text-2xl font-black text-slate-900 tracking-tighter leading-none mb-1">Packet Inspection</h2>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{selectedLog.id}</p>
                          </div>
                      </div>
                      <button onClick={() => setSelectedLog(null)} className="text-slate-300 hover:text-rose-600 p-4 bg-white rounded-full shadow-xl transition-all"><X size={32}/></button>
                  </div>

                  <div className="p-12 space-y-10">
                      <div className="grid grid-cols-2 gap-8">
                          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                              <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest block mb-1">Recipient Node</label>
                              <p className="font-black text-slate-900 text-lg">{selectedLog.userName}</p>
                              <p className="text-xs text-indigo-600 font-bold uppercase">{selectedLog.userId}</p>
                          </div>
                          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                              <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest block mb-1">Status Signal</label>
                              <div className="flex items-center gap-2 mt-1">
                                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                                  <p className="font-black text-emerald-600 text-lg uppercase">{selectedLog.status}</p>
                              </div>
                              <p className="text-xs text-slate-400 font-bold">{new Date(selectedLog.timestamp).toLocaleTimeString()}</p>
                          </div>
                      </div>

                      <div className="space-y-4">
                          <label className="text-[11px] font-black uppercase text-slate-400 tracking-[0.3em] ml-2">Header Subject</label>
                          <div className="p-6 bg-slate-900 text-indigo-300 rounded-[2rem] font-mono text-sm border-l-8 border-indigo-500">
                              {selectedLog.subject}
                          </div>
                      </div>

                      <div className="space-y-4">
                          <label className="text-[11px] font-black uppercase text-slate-400 tracking-[0.3em] ml-2">Digital Signature</label>
                          <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 relative overflow-hidden">
                              <div className="absolute top-4 right-6 opacity-5"><Shield size={80}/></div>
                              <p className="text-slate-600 font-medium text-lg leading-relaxed italic">"Transmission cryptographically signed by Glow Tours CA. Verified for delivery via enterprise {selectedLog.type} relay."</p>
                          </div>
                      </div>

                      <div className="flex justify-end pt-4">
                          <button onClick={() => setSelectedLog(null)} className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl hover:bg-black transition-all">Close Inspector</button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Manual Dispatch Modal */}
      {isManualDispatchOpen && (
          <div className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-3xl flex items-center justify-center p-6 overflow-y-auto">
              <div className="bg-white rounded-[4rem] w-full max-w-2xl shadow-3xl overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
                  <div className="px-12 py-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                      <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-2xl">
                              <Send size={28}/>
                          </div>
                          <div>
                              <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Direct Messenger</h2>
                              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-1">Manual Signal Override</p>
                          </div>
                      </div>
                      <button onClick={() => setIsManualDispatchOpen(false)} className="text-slate-300 hover:text-rose-600 transition-all"><X size={36}/></button>
                  </div>

                  <form onSubmit={handleManualDispatch} className="p-12 space-y-8">
                      <div className="grid grid-cols-2 gap-6">
                          <div>
                              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 ml-1">Target Class</label>
                              <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
                                  {['Candidate', 'Client'].map(t => (
                                      <button 
                                        key={t}
                                        type="button"
                                        onClick={() => setDispatchData({...dispatchData, targetType: t as any, targetId: ''})}
                                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${dispatchData.targetType === t ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                                      >
                                          {t}
                                      </button>
                                  ))}
                              </div>
                          </div>
                          <div>
                              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 ml-1">Relay Channel</label>
                              <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
                                  {['Email', 'SMS'].map(t => (
                                      <button 
                                        key={t}
                                        type="button"
                                        onClick={() => setDispatchData({...dispatchData, channel: t as any})}
                                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${dispatchData.channel === t ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                                      >
                                          {t}
                                      </button>
                                  ))}
                              </div>
                          </div>
                      </div>

                      <div>
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 ml-1">Bill/Talent Entity</label>
                          <select 
                            required 
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 font-bold outline-none focus:border-indigo-600 appearance-none cursor-pointer"
                            value={dispatchData.targetId}
                            onChange={(e) => setDispatchData({...dispatchData, targetId: e.target.value})}
                          >
                              <option value="">Select Recipient Identity...</option>
                              {dispatchData.targetType === 'Candidate' 
                                ? candidates.map(c => <option key={c.id} value={c.id}>{c.name}</option>)
                                : clients.map(cl => <option key={cl.id} value={cl.id}>{cl.companyName}</option>)
                              }
                          </select>
                      </div>

                      <div>
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 ml-1">Subject Meta</label>
                          <input 
                            required 
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 font-bold focus:bg-white focus:border-indigo-600 outline-none transition-all"
                            placeholder="Enter transmission subject..."
                            value={dispatchData.subject}
                            onChange={(e) => setDispatchData({...dispatchData, subject: e.target.value})}
                          />
                      </div>

                      <div>
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 ml-1">Message Body</label>
                          <textarea 
                            required rows={4}
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] p-6 font-medium focus:bg-white focus:border-indigo-600 outline-none transition-all custom-scrollbar"
                            placeholder="Compose direct message content..."
                            value={dispatchData.body}
                            onChange={(e) => setDispatchData({...dispatchData, body: e.target.value})}
                          />
                      </div>

                      <div className="flex justify-end gap-5 pt-4 border-t border-slate-100">
                          <button type="button" onClick={() => setIsManualDispatchOpen(false)} className="px-8 py-5 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-600">Cancel</button>
                          <button 
                            type="submit" 
                            disabled={isSending}
                            className="px-16 py-5 bg-slate-900 text-white rounded-[1.8rem] font-black text-sm uppercase tracking-widest shadow-3xl hover:bg-indigo-600 transition-all active:scale-95 flex items-center gap-3"
                          >
                              {isSending ? <RefreshCw className="animate-spin" size={20}/> : <Send size={20}/>}
                              {isSending ? 'Authenticating Gateway...' : 'Initialize Transmission'}
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};

export default CommunicationOrchestrator;