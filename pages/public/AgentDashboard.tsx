
import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, RefreshCw, PlusCircle, Globe, Mail, Phone, MapPin, 
  Briefcase, CheckCircle, Clock, Search, X, Upload,
  Network, Zap, ShieldCheck, Activity, BarChart3, Fingerprint,
  ArrowRight, Layers, Award, Sparkles, Filter, ChevronRight, FileText,
  ShieldAlert, Lock, Info
} from 'lucide-react';
import { Candidate } from '../../types';

const AgentDashboard: React.FC = () => {
  const { currentAgent, candidates, addCandidate, refreshData } = useData();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const initialFormState = {
    name: '',
    email: '',
    profession: '',
    nationality: '',
    experience: 0,
    skills: '',
    imageUrl: '',
    resumeUrl: '',
    certificateUrl: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  if (!currentAgent) return null;

  const isVerified = currentAgent.status === 'Active';

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshData();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const myCandidates = candidates.filter(c => c.agentId === currentAgent.id);
  const filteredCandidates = myCandidates.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.profession.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
      total: myCandidates.length,
      available: myCandidates.filter(c => c.status === 'Available').length,
      processing: myCandidates.filter(c => c.status === 'Processing').length,
      hired: myCandidates.filter(c => c.status === 'Hired').length
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'imageUrl' | 'resumeUrl' | 'certificateUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File max 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) return; // Final gate

    const newCandidate: Candidate = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        profession: formData.profession,
        nationality: formData.nationality,
        experience: Number(formData.experience),
        status: 'Available',
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        resumeUrl: formData.resumeUrl,
        certificateUrl: formData.certificateUrl,
        agentId: currentAgent.id,
        isVerified: false,
        completenessScore: 60,
        communicationPrefs: { email: true, sms: false, whatsapp: false },
        privacyConsentedDate: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString().split('T')[0]
    };
    addCandidate(newCandidate);
    setIsModalOpen(false);
    setFormData(initialFormState);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* VERIFICATION WARNING BANNER */}
      {!isVerified && (
        <div className="bg-gradient-to-r from-purple-700 to-indigo-900 text-white px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-top duration-500 sticky top-20 z-[40]">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                    <ShieldAlert size={20} className="text-purple-200" />
                </div>
                <div className="text-center md:text-left">
                    <p className="font-black text-xs uppercase tracking-widest">Portal Restricted: Pending Vetting</p>
                    <p className="text-xs font-medium opacity-80 mt-0.5">Your agency is undergoing regulatory audit. Supply operations and candidate enrollments are currently locked.</p>
                </div>
            </div>
            <div className="flex gap-3">
                <button onClick={() => navigate('/contact')} className="px-6 py-2 bg-white text-indigo-900 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-all active:scale-95">
                    Contact Vetting Desk
                </button>
            </div>
        </div>
      )}

      {/* Cinematic Agent Hero */}
      <div className="relative bg-slate-950 pb-44 pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-slate-950 to-indigo-900 opacity-95"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-8">
                <div className="text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-1.5 rounded-full text-purple-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4 border border-purple-500/20 backdrop-blur-md">
                        {isVerified ? <ShieldCheck size={14} className="text-emerald-400" /> : <Lock size={14} className="text-amber-400" />}
                        {isVerified ? 'Authorized Supply Partner' : 'Verification In-Progress'}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-3">Supply <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-300">Command</span></h1>
                    <p className="text-purple-100/60 font-medium text-lg max-w-xl">{currentAgent.agencyName} ({currentAgent.country})</p>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => isVerified && setIsModalOpen(true)}
                        disabled={!isVerified}
                        className={`px-10 py-5 rounded-[1.8rem] font-black text-lg uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3 ${
                            isVerified 
                            ? 'bg-purple-600 text-white hover:bg-purple-500 hover:shadow-purple-500/30 active:scale-95' 
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
                        }`}
                    >
                        {isVerified ? <PlusCircle size={22} /> : <Lock size={22} />}
                        {isVerified ? 'Add Candidate' : 'Operations Locked'}
                    </button>
                    <button 
                        onClick={handleRefresh}
                        className="p-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all shadow-2xl active:scale-95 group"
                    >
                        <RefreshCw size={24} className={`${isRefreshing ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-700"}`} />
                    </button>
                </div>
            </div>

            {/* Performance Matrix */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${!isVerified ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                <div className="group bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 text-white hover:bg-white/10 transition-all duration-500">
                    <p className="text-purple-300/60 text-[10px] font-black uppercase tracking-[0.25em] mb-4">Total Inventory</p>
                    <div className="flex justify-between items-end">
                        <h3 className="text-4xl font-black tracking-tighter">{stats.total}</h3>
                        <Users className="text-purple-400/50" size={32} />
                    </div>
                </div>
                 <div className="group bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 text-white hover:bg-white/10 transition-all duration-500">
                    <p className="text-emerald-300/60 text-[10px] font-black uppercase tracking-[0.25em] mb-4">Available</p>
                    <div className="flex justify-between items-end">
                        <h3 className="text-4xl font-black tracking-tighter text-emerald-400">{stats.available}</h3>
                        <CheckCircle className="text-emerald-400/50" size={32} />
                    </div>
                </div>
                <div className="group bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 text-white hover:bg-white/10 transition-all duration-500">
                    <p className="text-amber-300/60 text-[10px] font-black uppercase tracking-[0.25em] mb-4">Processing</p>
                    <div className="flex justify-between items-end">
                        <h3 className="text-4xl font-black tracking-tighter text-amber-400">{stats.processing}</h3>
                        <Clock className="text-amber-400/50" size={32} />
                    </div>
                </div>
                <div className="group bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 text-white hover:bg-white/10 transition-all duration-500">
                    <p className="text-blue-300/60 text-[10px] font-black uppercase tracking-[0.25em] mb-4">Hired</p>
                    <div className="flex justify-between items-end">
                        <h3 className="text-4xl font-black tracking-tighter text-blue-400">{stats.hired}</h3>
                        <Award className="text-blue-400/50" size={32} />
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20 pb-24">
          <div className={`bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden ${!isVerified ? 'opacity-60 blur-[1px] select-none' : ''}`}>
              <div className="p-8 md:p-10 border-b border-slate-50 bg-slate-50/30 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Supply Registry</h2>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Global Pipeline Management</p>
                  </div>
                  <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        disabled={!isVerified}
                        placeholder={isVerified ? "Search your candidates..." : "Portal locked..."}
                        className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:ring-4 focus:ring-purple-50 focus:border-purple-600 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
              </div>

              <div className="overflow-x-auto">
                  <table className="w-full text-left">
                      <thead className="bg-slate-50/80">
                          <tr>
                              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Candidate</th>
                              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Designation</th>
                              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nationality</th>
                              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                          {filteredCandidates.map(c => (
                              <tr key={c.id} className="hover:bg-slate-50/50 transition duration-300">
                                  <td className="px-10 py-6">
                                      <div className="flex items-center gap-4">
                                          <img src={c.imageUrl} className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-md" alt="" />
                                          <div>
                                              <p className="font-black text-slate-900 tracking-tight leading-none mb-1">{c.name}</p>
                                              <p className="text-xs text-slate-400 font-bold">{c.email}</p>
                                          </div>
                                      </div>
                                  </td>
                                  <td className="px-10 py-6">
                                      <p className="text-sm font-bold text-slate-700">{c.profession}</p>
                                  </td>
                                  <td className="px-10 py-6 text-sm font-bold text-slate-500 uppercase tracking-widest">
                                      {c.nationality}
                                  </td>
                                  <td className="px-10 py-6">
                                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border-2 ${
                                          c.status === 'Available' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                          c.status === 'Processing' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                          'bg-blue-50 text-blue-700 border-blue-100'
                                      }`}>
                                          {c.status}
                                      </span>
                                  </td>
                                  <td className="px-10 py-6 text-right">
                                      <button className="p-3 text-slate-300 hover:text-purple-600 transition-colors"><ChevronRight size={20}/></button>
                                  </td>
                              </tr>
                          ))}
                          {filteredCandidates.length === 0 && (
                              <tr>
                                  <td colSpan={5} className="py-20 text-center text-slate-300 font-black uppercase tracking-widest">No candidates found in registry</td>
                              </tr>
                          )}
                      </tbody>
                  </table>
              </div>
          </div>
          
          {!isVerified && (
            <div className="mt-12 p-16 bg-white rounded-[4rem] border-4 border-dashed border-slate-100 text-center animate-in fade-in duration-1000">
                <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-xl border border-indigo-100">
                    <Fingerprint size={48} />
                </div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-6">Verification Node Locked</h2>
                <p className="text-xl text-slate-500 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                    To maintain Maldives' IRIS ethical sourcing standards, your agency credentials must be authorized by our executive compliance team before you can manage professional inventory.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-6 max-w-3xl mx-auto">
                    <div className="flex-1 bg-slate-50 p-8 rounded-3xl text-left border border-slate-100">
                        <div className="flex items-center gap-3 mb-4">
                            <Clock className="text-indigo-600" size={20} />
                            <span className="font-black text-[10px] uppercase tracking-widest text-slate-400">Current Phase</span>
                        </div>
                        <p className="text-sm font-bold text-slate-700">License Authentication & Bond Verification</p>
                    </div>
                    <div className="flex-1 bg-indigo-50 p-8 rounded-3xl text-left border border-indigo-100">
                        <div className="flex items-center gap-3 mb-4">
                            <Info className="text-indigo-600" size={20} />
                            <span className="font-black text-[10px] uppercase tracking-widest text-indigo-400">Next Step</span>
                        </div>
                        <p className="text-sm font-bold text-indigo-900">An officer from Glow HQ will contact your primary representative within 24-48 hours.</p>
                    </div>
                </div>
            </div>
          )}
      </div>

      {/* Add Candidate Modal */}
      {isModalOpen && isVerified && (
          <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-6 overflow-y-auto">
              <div className="bg-white rounded-[4rem] w-full max-w-4xl shadow-3xl overflow-hidden animate-in zoom-in duration-500 border border-white/20">
                  <div className="px-12 py-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                      <div className="flex items-center gap-6">
                          <div className="w-20 h-20 bg-purple-600 text-white rounded-[2rem] flex items-center justify-center shadow-2xl">
                              <Fingerprint size={40}/>
                          </div>
                          <div>
                              <h2 className="text-3xl font-black text-slate-900 tracking-tighter leading-none mb-2">Enroll Professional</h2>
                              <p className="text-[11px] font-black text-purple-600 uppercase tracking-[0.3em]">Supply Matrix Initialization</p>
                          </div>
                      </div>
                      <button onClick={() => setIsModalOpen(false)} className="text-slate-300 hover:text-rose-600 bg-white p-5 rounded-full shadow-xl transition-all"><X size={32}/></button>
                  </div>

                  <form onSubmit={handleSubmit} className="p-12 space-y-10 overflow-y-auto custom-scrollbar">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                              <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-2">Full Legal Identity</label>
                              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-6 bg-slate-50 border-4 border-slate-50 rounded-3xl font-black text-xl text-slate-900 focus:bg-white focus:border-purple-500 outline-none transition-all shadow-inner" placeholder="As per Passport..." />
                          </div>
                          <div className="space-y-3">
                              <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-2">Digital Identity (Email)</label>
                              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-6 bg-slate-50 border-4 border-slate-50 rounded-3xl font-bold text-slate-900 outline-none focus:bg-white focus:border-purple-500 shadow-inner" placeholder="email@domain.com" />
                          </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                              <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-2">Primary Profession</label>
                              <input required value={formData.profession} onChange={e => setFormData({...formData, profession: e.target.value})} className="w-full p-6 bg-slate-50 border-4 border-slate-50 rounded-3xl font-black text-lg text-slate-900 focus:bg-white focus:border-purple-500 shadow-inner" placeholder="e.g. Executive Pastry Chef" />
                          </div>
                          <div className="space-y-3">
                              <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-2">Nationality</label>
                              <input required value={formData.nationality} onChange={e => setFormData({...formData, nationality: e.target.value})} className="w-full p-6 bg-slate-50 border-4 border-slate-50 rounded-3xl font-bold text-slate-900 outline-none focus:bg-white focus:border-purple-500 shadow-inner" placeholder="e.g. Philippines" />
                          </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                              <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-2">Professional Experience (Years)</label>
                              <input required type="number" value={formData.experience} onChange={e => setFormData({...formData, experience: Number(e.target.value)})} className="w-full p-6 bg-slate-50 border-4 border-slate-50 rounded-3xl font-black text-xl text-slate-900 focus:bg-white focus:border-purple-500 shadow-inner" />
                          </div>
                          <div className="space-y-3">
                              <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-2">Core Skills (Comma Separated)</label>
                              <input required value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} className="w-full p-6 bg-slate-50 border-4 border-slate-50 rounded-3xl font-bold text-slate-900 outline-none focus:bg-white focus:border-purple-500 shadow-inner" placeholder="e.g. PADI, First Aid, HR Mgmt" />
                          </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-slate-100">
                          <div className="space-y-3">
                              <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-2">Profile Avatar</label>
                              <label className="cursor-pointer group block">
                                  <div className="w-full p-6 border-4 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-3 group-hover:bg-purple-50 transition-all">
                                      <Upload size={24} className="text-slate-300 group-hover:text-purple-600" />
                                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-purple-600">Upload Image</span>
                                  </div>
                                  <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'imageUrl')} />
                              </label>
                          </div>
                          <div className="space-y-3">
                              <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-2">Curriculum Vitae (PDF)</label>
                              <label className="cursor-pointer group block">
                                  <div className="w-full p-6 border-4 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-3 group-hover:bg-purple-50 transition-all">
                                      <FileText size={24} className="text-slate-300 group-hover:text-purple-600" />
                                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-purple-600">Attach CV</span>
                                  </div>
                                  <input type="file" className="hidden" accept=".pdf" onChange={e => handleFileUpload(e, 'resumeUrl')} />
                              </label>
                          </div>
                          <div className="space-y-3">
                              <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-2">Certifications (PDF)</label>
                              <label className="cursor-pointer group block">
                                  <div className="w-full p-6 border-4 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-3 group-hover:bg-purple-50 transition-all">
                                      <Layers size={24} className="text-slate-300 group-hover:text-purple-600" />
                                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-purple-600">Attach Portfolio</span>
                                  </div>
                                  <input type="file" className="hidden" accept=".pdf" onChange={e => handleFileUpload(e, 'certificateUrl')} />
                              </label>
                          </div>
                      </div>

                      <div className="flex justify-end gap-5 border-t border-slate-100 pt-10">
                          <button type="button" onClick={() => setIsModalOpen(false)} className="px-10 py-5 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-600 transition-colors">Discard</button>
                          <button type="submit" className="px-16 py-6 bg-purple-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-3xl hover:bg-purple-700 transition-all transform active:scale-95 flex items-center gap-3">
                              <Sparkles size={20}/> Enroll Candidate
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};

export default AgentDashboard;