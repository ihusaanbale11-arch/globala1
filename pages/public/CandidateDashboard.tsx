
import React, { useEffect, useState } from 'react';
import { useData } from '../../context/DataContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, Briefcase, MapPin, Clock, FileText, CheckCircle, RefreshCw, 
  AlertCircle, MessageSquare, TrendingUp, Search, Star, Award, Upload, X, Eye,
  Trophy, Target, Rocket, ShieldCheck, Zap, Compass, HeartPulse, Layers, ArrowRight, ShieldAlert, CheckCircle2
} from 'lucide-react';

const CandidateDashboard: React.FC = () => {
  const { currentCandidate, jobApplications, inquiries, refreshData, jobVacancies, updateCandidate } = useData();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [previewFile, setPreviewFile] = useState<{url: string, title: string} | null>(null);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  if (!currentCandidate) return null;

  const handleRefresh = () => {
      setIsRefreshing(true);
      refreshData();
      setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'certificate') => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onloadend = () => {
          if (typeof reader.result === 'string') {
              const updatedCandidate = { ...currentCandidate, [type === 'resume' ? 'resumeUrl' : 'certificateUrl']: reader.result };
              updateCandidate(updatedCandidate);
          }
      };
      reader.readAsDataURL(file);
  };

  const removeDocument = (type: 'resume' | 'certificate') => {
      if (confirm(`Delete your ${type}?`)) {
          const updatedCandidate = { ...currentCandidate, [type === 'resume' ? 'resumeUrl' : 'certificateUrl']: '' };
          updateCandidate(updatedCandidate);
      }
  }

  const myApplications = jobApplications.filter(app => (app.email || '').toLowerCase() === currentCandidate.email.toLowerCase());
  const myMessages = inquiries.filter(inq => (inq.email || '').toLowerCase() === currentCandidate.email.toLowerCase());
  const recommendedJobs = jobVacancies.slice(0, 3);

  let profileScore = 40;
  if(currentCandidate.imageUrl) profileScore += 10;
  if(currentCandidate.skills && currentCandidate.skills.length > 0) profileScore += 20;
  if(currentCandidate.experience > 0) profileScore += 10;
  if(currentCandidate.isVerified) profileScore += 20;

  return (
    <div className="bg-white min-h-screen">
      {/* VERIFICATION WARNING BANNER */}
      {!currentCandidate.isVerified && (
        <div className="bg-gradient-to-r from-amber-600 to-rose-700 text-white px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-top duration-500">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                    <ShieldAlert size={20} />
                </div>
                <div className="text-center md:text-left">
                    <p className="font-black text-xs uppercase tracking-widest">Profile Status: Pending Vetting</p>
                    <p className="text-xs font-medium opacity-80 mt-0.5">Application privileges are restricted during technical background vetting by Glow HQ.</p>
                </div>
            </div>
            <button onClick={() => navigate('/contact')} className="px-6 py-2 bg-white text-rose-700 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-all active:scale-95">
                Contact Recruiters
            </button>
        </div>
      )}

       {/* Cinematic Talent Hero */}
       <div className="relative bg-slate-950 pb-44 pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-950 to-purple-900 opacity-95"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-10 items-center md:items-end mb-12">
                <div className="relative">
                    <img src={currentCandidate.imageUrl} alt={currentCandidate.name} className="relative w-32 h-32 rounded-[2.2rem] border-4 border-white/20 shadow-2xl overflow-hidden" />
                    <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-2xl border-4 border-slate-900 flex items-center justify-center ${currentCandidate.isVerified ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                        <ShieldCheck size={14} className="text-white"/>
                    </div>
                </div>
                <div className="flex-1 text-center md:text-left text-white">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">{currentCandidate.name}</h1>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-4">
                        <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-2xl text-xs font-bold border border-white/10">{currentCandidate.profession}</span>
                    </div>
                </div>
                <button onClick={handleRefresh} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white">
                    <RefreshCw size={24} className={`${isRefreshing ? "animate-spin" : ""}`} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white shadow-2xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] mb-2">Live Applications</p>
                    <h3 className="text-5xl font-black tracking-tighter">{myApplications.length}</h3>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-rose-600 rounded-[2.5rem] p-8 text-white shadow-2xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] mb-2">Registry Rank</p>
                    <h3 className="text-5xl font-black tracking-tighter">{currentCandidate.isVerified ? 'A+' : 'P'}</h3>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[2.5rem] p-8 text-white shadow-2xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] mb-2">Wait Pool</p>
                    <h3 className="text-2xl font-black tracking-tight">{currentCandidate.status}</h3>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
                <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
                    <div className="p-8 border-b border-slate-50 bg-slate-50/30">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Application Roadmap</h2>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {myApplications.length > 0 ? (
                            myApplications.map((app) => (
                                <div key={app.id} className="p-10 hover:bg-slate-50 transition">
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">{app.vacancyTitle}</h3>
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 ${
                                        app.status === 'New' ? 'bg-indigo-50 text-indigo-700' : 'bg-amber-50 text-amber-700'
                                    }`}>{app.status}</span>
                                </div>
                            ))
                        ) : (
                            <div className="p-24 text-center text-slate-300 font-black uppercase tracking-widest">No Active Applications</div>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-10">
                 <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-8 relative">
                    <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tighter">Profile Momentum</h3>
                    <div className="relative pt-1">
                        <div className="flex mb-4 items-end justify-between">
                            <span className="text-3xl font-black text-indigo-600 tracking-tighter">{profileScore}%</span>
                        </div>
                        <div className="overflow-hidden h-4 mb-6 flex rounded-2xl bg-indigo-50">
                            <div style={{ width: `${profileScore}%` }} className="bg-gradient-to-r from-indigo-500 to-rose-500"></div>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">
                            {currentCandidate.isVerified ? "Profile fully authorized." : "Verification pending profile review."}
                        </p>
                    </div>
                 </div>

                 <div className="bg-slate-900 rounded-[3rem] shadow-2xl p-8 text-white relative overflow-hidden group">
                     <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                        <Layers size={20} className="text-indigo-400" /> Secure Vault
                     </h3>
                     <div className="space-y-6">
                         <div className="bg-white/5 p-5 rounded-[2rem] border border-white/10">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300 mb-4">Curriculum Vitae</p>
                            {currentCandidate.resumeUrl ? (
                                <div className="flex gap-3">
                                    <button onClick={() => setPreviewFile({url: currentCandidate.resumeUrl!, title: "Resume"})} className="flex-1 bg-white/10 py-3 rounded-xl font-black text-[10px] uppercase">Preview</button>
                                    <button onClick={() => removeDocument('resume')} className="w-12 bg-rose-500/20 text-rose-300 rounded-xl">X</button>
                                </div>
                            ) : (
                                <label className="block w-full cursor-pointer">
                                    <div className="w-full bg-blue-600 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] text-center">Upload PDF</div>
                                    <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleFileUpload(e, 'resume')}/>
                                </label>
                            )}
                         </div>
                     </div>
                 </div>
            </div>
        </div>
      </div>

       {previewFile && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-6" onClick={() => setPreviewFile(null)}>
           <div className="bg-white rounded-[3rem] w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
             <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
               <h2 className="text-2xl font-black text-slate-900 tracking-tighter flex items-center gap-3"><Eye size={20}/> {previewFile.title}</h2>
               <button onClick={() => setPreviewFile(null)} className="text-slate-400 p-2"><X size={32}/></button>
             </div>
             <div className="flex-1 bg-slate-100 p-6">
                <iframe src={previewFile.url} className="w-full h-full border-none rounded-[1.5rem]" title={previewFile.title}></iframe>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default CandidateDashboard;