    
import React, { useState } from 'react';
import { useData } from '../../../../context/DataContext';
import { 
    Mail, Send, PlusCircle, Trash2, Eye, 
    BarChart3, Users, Briefcase, Layout, X, Save,
    CheckCircle, Clock, Search
} from 'lucide-react';
import { Newsletter } from '../../../../types';

const NewsletterBuilder: React.FC = () => {
  const { newsletters, addNewsletter, deleteNewsletter, sendNewsletter } = useData();
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState<Partial<Newsletter>>({
    subject: '',
    content: '',
    targetAudience: 'Candidates',
    status: 'Draft'
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newNl: Newsletter = {
      id: Date.now().toString(),
      subject: formData.subject || 'No Subject',
      content: formData.content || '',
      targetAudience: formData.targetAudience as any,
      status: 'Draft',
      stats: { opens: 0, clicks: 0, delivered: 0 }
    };
    addNewsletter(newNl);
    setIsComposerOpen(false);
    setFormData({ subject: '', content: '', targetAudience: 'Candidates' });
  };

  const filtered = newsletters.filter(n => n.subject.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -mr-64 -mt-64 group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
                <div className="inline-flex items-center gap-2 bg-blue-500/20 px-4 py-1.5 rounded-full text-blue-300 font-black text-[10px] uppercase tracking-[0.3em] mb-4 border border-blue-500/30 backdrop-blur-md">
                    <Mail size={14} className="text-blue-400" /> Marketing Hub
                </div>
                <h1 className="text-4xl font-black text-white tracking-tighter italic leading-none">Newsletter <span className="text-blue-400">Architect</span></h1>
                <p className="text-slate-400 mt-2 font-medium">Broadcast thought leadership and job alerts to your global network.</p>
            </div>
            <button 
                onClick={() => setIsComposerOpen(true)}
                className="bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-blue-500 transition-all active:scale-95 flex items-center gap-3"
            >
                <PlusCircle size={24} /> New Campaign
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(nl => (
              <div key={nl.id} className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col">
                  <div className="p-8 flex-1">
                      <div className="flex justify-between items-start mb-6">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border-2 ${
                              nl.status === 'Sent' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                          }`}>
                              {nl.status}
                          </span>
                          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
                              {nl.targetAudience === 'Candidates' ? <Users size={12}/> : <Briefcase size={12}/>}
                              {nl.targetAudience}
                          </span>
                      </div>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight mb-4 group-hover:text-blue-600 transition-colors">{nl.subject}</h3>
                      <p className="text-slate-500 text-sm font-medium line-clamp-3 mb-8">"{nl.content.substring(0, 100)}..."</p>
                      
                      {nl.status === 'Sent' && (
                          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                              <div className="text-center">
                                  <p className="text-lg font-black text-slate-900">{nl.stats.delivered}</p>
                                  <p className="text-[8px] font-bold text-slate-400 uppercase">Sent</p>
                              </div>
                              <div className="text-center">
                                  <p className="text-lg font-black text-blue-600">{nl.stats.opens}</p>
                                  <p className="text-[8px] font-bold text-slate-400 uppercase">Opens</p>
                              </div>
                              <div className="text-center">
                                  <p className="text-lg font-black text-emerald-600">{nl.stats.clicks}</p>
                                  <p className="text-[8px] font-bold text-slate-400 uppercase">Clicks</p>
                              </div>
                          </div>
                      )}
                  </div>
                  <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
                      <div className="flex gap-2">
                        <button onClick={() => deleteNewsletter(nl.id)} className="p-2.5 text-slate-300 hover:text-rose-600 transition-colors"><Trash2 size={18}/></button>
                        <button className="p-2.5 text-slate-300 hover:text-blue-600 transition-colors"><Eye size={18}/></button>
                      </div>
                      {nl.status !== 'Sent' && (
                        <button 
                            onClick={() => sendNewsletter(nl.id)}
                            className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest hover:text-blue-800 transition-colors"
                        >
                            Dispatch Now <Send size={14}/>
                        </button>
                      )}
                  </div>
              </div>
          ))}
      </div>

      {isComposerOpen && (
          <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-6 overflow-y-auto">
              <div className="bg-white rounded-[3.5rem] w-full max-w-2xl shadow-3xl overflow-hidden animate-in zoom-in duration-500">
                  <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                      <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Compose Broadcast</h2>
                      <button onClick={() => setIsComposerOpen(false)} className="text-slate-300 hover:text-rose-600 transition-all"><X size={32}/></button>
                  </div>
                  <form onSubmit={handleCreate} className="p-10 space-y-8">
                      <div>
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-2">Subject Header</label>
                          <input required className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 font-bold text-lg text-slate-900 focus:bg-white focus:border-blue-600 outline-none transition-all" placeholder="Enter campaign subject..." 
                              value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
                      </div>
                      <div>
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-2">Target Demographic</label>
                          <div className="flex gap-4 p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
                              {['Candidates', 'Clients', 'All'].map(t => (
                                  <button 
                                      key={t}
                                      type="button"
                                      onClick={() => setFormData({...formData, targetAudience: t as any})}
                                      className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.targetAudience === t ? 'bg-white text-blue-600 shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                                  >
                                      {t}
                                  </button>
                              ))}
                          </div>
                      </div>
                      <div>
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-2">Campaign Content</label>
                          <textarea required rows={8} className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] p-8 font-medium text-slate-700 focus:bg-white focus:border-blue-600 outline-none transition-all custom-scrollbar" placeholder="Draft your newsletter message here..."
                              value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
                      </div>
                      <div className="pt-4 flex justify-end gap-4 border-t border-slate-100">
                          <button type="button" onClick={() => setIsComposerOpen(false)} className="px-8 py-5 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-600">Discard</button>
                          <button type="submit" className="px-12 py-5 bg-blue-600 text-white rounded-[1.8rem] font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2">
                              <Save size={18}/> Save as Draft
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};

export default NewsletterBuilder;