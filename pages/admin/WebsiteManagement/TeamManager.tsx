
import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { 
    Users2, Plus, Edit2, Trash2, Globe, Mail, 
    Linkedin, Award, Briefcase, Layout, Filter,
    Eye, EyeOff, Save, X, PlusCircle, UserCheck, 
    ShieldCheck, Activity, Target, Sparkles
} from 'lucide-react';
import { TeamMember } from '../../../types';

const TeamManager: React.FC = () => {
  const { teamMembers, updateTeamMember, addTeamMember, deleteTeamMember } = useData();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const handleTogglePublic = (member: TeamMember) => {
      updateTeamMember({ ...member, isPublic: !member.isPublic });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Team Roster Header */}
      <div className="bg-slate-900 p-12 rounded-[4rem] shadow-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -mr-64 -mt-64 group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-center gap-10">
          <div>
            <div className="inline-flex items-center gap-3 bg-emerald-500/20 px-5 py-2 rounded-full text-emerald-400 font-black text-[10px] uppercase tracking-[0.3em] mb-6 border border-emerald-500/30">
              <Users2 size={14} className="animate-pulse" /> Organizational Roster
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-4 italic">Executive <span className="text-emerald-400">Team</span></h1>
            <p className="text-slate-400 text-xl font-medium max-w-2xl">Manage the human capital representing Glow Tours. Control public-facing bios, expertise matrix, and social authority.</p>
          </div>
          <button 
            onClick={() => { setEditingMember(null); setIsEditorOpen(true); }}
            className="bg-emerald-500 text-white hover:bg-emerald-400 px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl transition-all active:scale-95 flex items-center gap-3 group/btn"
          >
            <PlusCircle size={24} className="group-hover/btn:rotate-90 transition-transform" /> Add Executive
          </button>
        </div>
      </div>

      {/* Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map(member => (
              <div key={member.id} className="group bg-white rounded-[3.5rem] border border-slate-200 shadow-xl relative overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500">
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                      <img src={member.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt=""/>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                      <div className="absolute top-6 right-6">
                           <button 
                             onClick={() => handleTogglePublic(member)}
                             className={`p-3 rounded-2xl border backdrop-blur-md transition-all ${
                               member.isPublic ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-slate-900/40 text-slate-300 border-white/10'
                             }`}
                           >
                               {member.isPublic ? <Eye size={18}/> : <EyeOff size={18}/>}
                           </button>
                      </div>
                      <div className="absolute bottom-6 left-6">
                          <p className="text-white font-black text-xl tracking-tight leading-none mb-1">{member.name}</p>
                          <p className="text-blue-300 text-[10px] font-black uppercase tracking-widest">{member.role}</p>
                      </div>
                  </div>
                  <div className="p-8 space-y-6 flex-1 flex flex-col">
                      <div className="flex gap-1.5 flex-wrap">
                          {member.skills.slice(0, 3).map((s, i) => (
                              <span key={i} className="text-[9px] font-black uppercase tracking-widest bg-slate-50 text-slate-500 px-3 py-1.5 rounded-lg border border-slate-100">{s}</span>
                          ))}
                      </div>
                      <p className="text-slate-500 text-xs font-medium leading-relaxed italic line-clamp-3">"{member.bio}"</p>
                      
                      <div className="mt-auto flex justify-between items-center pt-6 border-t border-slate-50">
                          <div className="flex gap-2">
                               <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"><Linkedin size={14}/></div>
                               <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><Mail size={14}/></div>
                          </div>
                          <div className="flex gap-2">
                               <button className="p-2 text-slate-300 hover:text-blue-600 transition-colors"><Edit2 size={16}/></button>
                               <button onClick={() => deleteTeamMember(member.id)} className="p-2 text-slate-300 hover:text-rose-600 transition-colors"><Trash2 size={16}/></button>
                          </div>
                      </div>
                  </div>
              </div>
          ))}
          {teamMembers.length === 0 && (
              <div className="col-span-full py-40 text-center bg-white rounded-[4rem] border-4 border-dashed border-slate-100 flex flex-col items-center">
                  <Users2 size={64} className="text-slate-100 mb-6" />
                  <p className="text-xl font-black uppercase tracking-[0.3em] text-slate-300">Council Registry Empty</p>
              </div>
          )}
      </div>

      {/* Editor Modal Simulation */}
      {isEditorOpen && (
          <div className="fixed inset-0 z-[200] bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-6 overflow-y-auto">
              <div className="bg-white rounded-[3.5rem] w-full max-w-2xl shadow-[0_60px_120px_-30px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in duration-300">
                   <div className="px-12 py-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                       <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Profile Configuration</h2>
                       <button onClick={() => setIsEditorOpen(false)} className="text-slate-300 hover:text-rose-600 transition-all"><X size={32}/></button>
                   </div>
                   <div className="p-12 space-y-8">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-3">Full Identity</label>
                                <input className="w-full bg-slate-50 border-4 border-slate-50 rounded-2xl p-6 font-black text-lg text-slate-900 focus:bg-white focus:border-emerald-500 outline-none transition-all shadow-inner" placeholder="e.g. John Doe" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-3">Professional Title</label>
                                <input className="w-full bg-slate-50 border-4 border-slate-50 rounded-2xl p-6 font-black text-lg text-slate-900 focus:bg-white focus:border-emerald-500 outline-none transition-all shadow-inner" placeholder="e.g. Head of Ops" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-3">Executive Narrative (Bio)</label>
                            <textarea rows={4} className="w-full bg-slate-50 border-4 border-slate-50 rounded-[2rem] p-6 font-medium text-slate-700 focus:bg-white focus:border-emerald-500 outline-none transition-all shadow-inner" placeholder="Define background and impact..." />
                        </div>
                        <div className="flex justify-end gap-4 border-t border-slate-100 pt-8">
                            <button onClick={() => setIsEditorOpen(false)} className="px-8 py-5 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-600">Cancel</button>
                            <button onClick={() => setIsEditorOpen(false)} className="px-12 py-5 bg-emerald-500 text-white rounded-[1.8rem] font-black text-xs uppercase tracking-widest shadow-3xl hover:bg-emerald-600 transition-all flex items-center gap-2">
                                <ShieldCheck size={18}/> Authorize Profile
                            </button>
                        </div>
                   </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default TeamManager;