
import React, { useState } from 'react';
import { useData } from '../../../../context/DataContext';
import { 
    Users, ShieldCheck, CheckCircle, AlertCircle, Trash2, 
    Download, Eye, Filter, Search, MoreVertical, ShieldAlert,
    Smartphone, Mail, Lock, UserCheck, FileText, Activity
} from 'lucide-react';
const CandidateProfileManager: React.FC = () => {
  const { candidates, verifyCandidate, deleteCandidate, jobApplications } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = candidates.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCompletenessColor = (score: number) => {
    if (score > 85) return 'text-emerald-500';
    if (score > 60) return 'text-amber-500';
    return 'text-rose-500';
  };

  const handleGdprExport = (id: string) => {
    const candidate = candidates.find(c => c.id === id);
    if (!candidate) return;
    const blob = new Blob([JSON.stringify(candidate, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gdpr-data-export-${candidate.name.replace(/\s/g, '_')}.json`;
    link.click();
  };

  const handleForgetMe = (id: string) => {
    if (confirm("GDPR RIGHT TO BE FORGOTTEN: Are you sure you want to permanently delete ALL data for this candidate? This cannot be undone.")) {
      deleteCandidate(id);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-200 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-32 -mt-32 opacity-40 group-hover:scale-150 transition-transform duration-1000"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-emerald-100">
                    <ShieldCheck size={14} /> Identity Governance
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Candidate <span className="text-emerald-500">Registry</span></h1>
                <p className="text-slate-500 font-medium mt-2">Manage profile integrity, verify credentials, and execute GDPR protocols.</p>
            </div>
            <div className="flex gap-4">
                <div className="bg-slate-50 border border-slate-100 px-6 py-3 rounded-2xl text-center">
                    <p className="text-2xl font-black text-slate-900">{candidates.filter(c => c.isVerified).length}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Verified Users</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 px-6 py-3 rounded-2xl text-center">
                    <p className="text-2xl font-black text-slate-900">{candidates.filter(c => c.completenessScore < 70).length}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Stale Profiles</p>
                </div>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row justify-between gap-4 bg-slate-50/30">
            <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search candidate identity..." 
                    className="w-full pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 outline-none transition-all font-medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition">
                <Filter size={16}/> Filter Attributes
            </button>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Candidate Profile</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Completeness</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Verification</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">History</th>
                        <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Privacy Tools</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map(c => (
                        <tr key={c.id} className="hover:bg-slate-50/50 transition group">
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                    <img src={c.imageUrl} className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-md" alt="" />
                                    <div>
                                        <p className="font-black text-slate-900 tracking-tight leading-none mb-1">{c.name}</p>
                                        <p className="text-xs text-slate-400 font-bold">{c.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-8 py-6 text-center">
                                <p className={`text-xl font-black ${getCompletenessColor(c.completenessScore)}`}>{c.completenessScore}%</p>
                                <div className="w-20 h-1 bg-slate-100 rounded-full mx-auto mt-2 overflow-hidden">
                                    <div className={`h-full ${getCompletenessColor(c.completenessScore).replace('text-', 'bg-')}`} style={{width: `${c.completenessScore}%`}}></div>
                                </div>
                            </td>
                            <td className="px-8 py-6 text-center">
                                {c.isVerified ? (
                                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-black uppercase border border-emerald-100">
                                        <UserCheck size={10} /> Verified
                                    </span>
                                ) : (
                                    <button 
                                        onClick={() => verifyCandidate(c.id)}
                                        className="inline-flex items-center gap-1.5 bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-1 rounded-full text-[9px] font-black uppercase border border-slate-100 hover:border-emerald-100 transition-all"
                                    >
                                        Mark Verified
                                    </button>
                                )}
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex gap-1.5">
                                    <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center" title="Application History">
                                        <FileText size={14} />
                                    </div>
                                    <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center" title="Activity Logs">
                                        <Activity size={14} />
                                    </div>
                                </div>
                            </td>
                            <td className="px-8 py-6 text-right">
                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleGdprExport(c.id)} title="GDPR Data Export" className="p-2 text-slate-400 hover:text-blue-600 bg-white border border-slate-100 rounded-lg shadow-sm"><Download size={16}/></button>
                                    <button onClick={() => handleForgetMe(c.id)} title="Right to be Forgotten" className="p-2 text-slate-400 hover:text-rose-600 bg-white border border-slate-100 rounded-lg shadow-sm"><ShieldAlert size={16}/></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfileManager;