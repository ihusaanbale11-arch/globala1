
import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { 
    Star, CheckCircle, XCircle, Trash2, 
    MessageSquare, Building2, User, Award, 
    Check, X, ShieldAlert, Zap, Globe, Sparkles, Video, Eye, Play
} from 'lucide-react';

const TestimonialManager: React.FC = () => {
  const { testimonials, updateTestimonialStatus, toggleFeaturedTestimonial } = useData();
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Moderation Header */}
      <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[100px] -mr-64 -mt-64 group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-3 bg-rose-500/10 px-5 py-2 rounded-full text-rose-600 font-black text-[10px] uppercase tracking-[0.3em] mb-6 border border-rose-100">
            <Star size={14} className="fill-rose-600" /> Social Proof Moderation
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-4">Sentiment <span className="text-rose-600">Vault</span></h1>
          <p className="text-slate-500 text-xl font-medium max-w-2xl italic">"Verify the voices of success. Moderate and feature the most impactful corporate and candidate narratives."</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {testimonials.map(item => (
              <div key={item.id} className={`group relative bg-white rounded-[3.5rem] p-10 border-2 transition-all duration-500 hover:shadow-2xl overflow-hidden ${
                  item.status === 'Approved' ? 'border-emerald-100' : 
                  item.status === 'Rejected' ? 'border-rose-100 opacity-60' : 'border-slate-100'
              }`}>
                  {item.isFeatured && (
                      <div className="absolute top-6 right-6 z-10 flex items-center gap-1 bg-amber-100 text-amber-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-200 shadow-sm animate-pulse">
                          <Zap size={10} className="fill-amber-600" /> Featured
                      </div>
                  )}

                  <div className="flex items-center gap-6 mb-8">
                      <div className="w-20 h-20 bg-slate-50 rounded-[2.2rem] flex items-center justify-center text-slate-300 relative overflow-hidden group-hover:scale-105 transition-transform border border-slate-100 shadow-inner">
                          {item.imageUrl ? <img src={item.imageUrl} className="w-full h-full object-cover" alt=""/> : <User size={32}/>}
                      </div>
                      <div className="flex-1">
                          <div className="flex justify-between items-start">
                              <div>
                                  <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">{item.authorName}</h3>
                                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{item.position} • {item.company}</p>
                              </div>
                              {item.videoUrl && (
                                  <button 
                                    onClick={() => setVideoPreview(item.videoUrl!)}
                                    className="p-3 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 hover:bg-rose-100 transition-all flex items-center gap-2"
                                  >
                                      <Video size={18} />
                                      <span className="text-[9px] font-black uppercase tracking-widest">Preview Video</span>
                                  </button>
                              )}
                          </div>
                          <div className="flex gap-1 mt-3">
                              {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={14} className={i < item.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"} />
                              ))}
                          </div>
                      </div>
                  </div>

                  <div className="bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100 mb-8 relative italic">
                      <MessageSquare size={64} className="absolute top-4 right-6 opacity-[0.03] text-slate-900" />
                      <p className="text-slate-600 font-medium text-lg leading-relaxed relative z-10">"{item.content}"</p>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-100">
                      <div className="flex items-center gap-4">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Industry:</span>
                          <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase border border-blue-100 tracking-widest">{item.industry}</span>
                          <span className="text-[10px] font-bold text-slate-300">{item.date}</span>
                      </div>
                      
                      <div className="flex gap-3">
                          {item.status === 'Pending' && (
                              <>
                                  <button 
                                    onClick={() => updateTestimonialStatus(item.id, 'Rejected')}
                                    className="p-4 bg-rose-50 text-rose-500 rounded-2xl border border-rose-100 hover:bg-rose-100 transition-all"
                                  >
                                      <X size={20}/>
                                  </button>
                                  <button 
                                    onClick={() => updateTestimonialStatus(item.id, 'Approved')}
                                    className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-emerald-600 transition-all"
                                  >
                                      Approve Voice
                                  </button>
                              </>
                          )}
                          {item.status === 'Approved' && (
                              <div className="flex gap-2">
                                <button 
                                    onClick={() => updateTestimonialStatus(item.id, 'Rejected')}
                                    className="px-6 py-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-50 hover:text-rose-600 transition-all"
                                >
                                    Unpublish
                                </button>
                                <button 
                                    onClick={() => toggleFeaturedTestimonial(item.id)}
                                    className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                                        item.isFeatured ? 'bg-amber-100 text-amber-600 border border-amber-200' : 'bg-slate-900 text-white shadow-xl'
                                    }`}
                                >
                                    {item.isFeatured ? 'Standard Listing' : 'Spotlight Feature'}
                                </button>
                              </div>
                          )}
                          {item.status === 'Rejected' && (
                              <button 
                                onClick={() => updateTestimonialStatus(item.id, 'Approved')}
                                className="px-8 py-4 bg-blue-50 text-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-100 transition-all"
                              >
                                  Restore Submission
                              </button>
                          )}
                      </div>
                  </div>
              </div>
          ))}
          {testimonials.length === 0 && (
               <div className="col-span-full py-40 text-center bg-white rounded-[4rem] border-4 border-dashed border-slate-100 flex flex-col items-center">
                    <Award size={64} className="text-slate-100 mb-6" />
                    <p className="text-xl font-black uppercase tracking-[0.3em] text-slate-300">No Sentiment data found</p>
                </div>
          )}
      </div>

      {/* Video Preview Modal */}
      {videoPreview && (
          <div className="fixed inset-0 z-[200] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-6" onClick={() => setVideoPreview(null)}>
              <div className="bg-black rounded-[3rem] w-full max-w-4xl aspect-video relative overflow-hidden shadow-3xl border border-white/10" onClick={e => e.stopPropagation()}>
                  <button onClick={() => setVideoPreview(null)} className="absolute top-8 right-8 z-20 text-white/50 hover:text-white transition-colors bg-white/10 p-4 rounded-full backdrop-blur-xl"><X size={32}/></button>
                  <video src={videoPreview} className="w-full h-full object-contain" controls autoPlay />
              </div>
          </div>
      )}
    </div>
  );
};

export default TestimonialManager;
