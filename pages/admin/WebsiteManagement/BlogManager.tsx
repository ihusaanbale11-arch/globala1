import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
/* Added missing PlusCircle import */
import { 
    PenTool, Plus, Search, Filter, Calendar, Clock, 
    CheckCircle, MoreVertical, Eye, Trash2, Edit2, 
    Share2, AlertCircle, ChevronRight, X, Image as ImageIcon,
    Tag, Send, Save, Layout, PlusCircle
} from 'lucide-react';
import { BlogPost } from '../../../types';

const BlogManager: React.FC = () => {
  const { blogPosts, addBlogPost, deleteBlogPost, updateBlogPost } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const initialForm = {
    title: '',
    excerpt: '',
    category: 'Industry News',
    status: 'Draft' as const,
    tags: [] as string[]
  };

  const filteredPosts = blogPosts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateNew = () => {
    setEditingPost(null);
    setIsEditorOpen(true);
  };

  const handleStatusToggle = (post: BlogPost, newStatus: BlogPost['status']) => {
      updateBlogPost({ ...post, status: newStatus });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Editorial Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-slate-900 p-12 rounded-[4rem] shadow-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -mr-64 -mt-64 group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-3 bg-blue-500/20 px-5 py-2 rounded-full text-blue-400 font-black text-[10px] uppercase tracking-[0.3em] mb-6 border border-blue-500/30 backdrop-blur-md">
            <PenTool size={14} className="animate-pulse"/> Intellectual Repository
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-4 italic">Editorial <span className="text-blue-400">Desk</span></h1>
          <p className="text-slate-400 text-xl font-medium max-w-2xl">Publish thought leadership, industry updates, and regulatory insights to establish domain authority.</p>
        </div>
        <div className="flex flex-wrap gap-4 relative z-10">
            <button 
                onClick={handleCreateNew}
                className="bg-blue-600 text-white hover:bg-blue-500 px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl transition-all active:scale-95 flex items-center gap-3 group/btn"
            >
                {/* Fixed: PlusCircle is now correctly imported */}
                <PlusCircle size={24} className="group-hover/btn:rotate-90 transition-transform" /> New Article
            </button>
        </div>
      </div>

      {/* Post Registry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
              <div key={post.id} className="group bg-white rounded-[3.5rem] border border-slate-200 shadow-xl relative overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="h-56 bg-slate-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                      <div className="absolute top-6 left-6 z-10">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md ${
                              post.status === 'Published' ? 'bg-emerald-500/20 text-emerald-300' :
                              post.status === 'Scheduled' ? 'bg-blue-500/20 text-blue-300' :
                              'bg-slate-500/20 text-slate-300'
                          }`}>
                              {post.status}
                          </span>
                      </div>
                      <div className="absolute bottom-6 left-6 right-6">
                          <p className="text-white font-black text-xl tracking-tight line-clamp-2 leading-tight group-hover:text-blue-300 transition-colors">{post.title}</p>
                      </div>
                  </div>
                  <div className="p-10 flex flex-col flex-1">
                      <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 line-clamp-3">"{post.excerpt}"</p>
                      
                      <div className="mt-auto space-y-6">
                          <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-400">
                              <span className="flex items-center gap-1.5"><Calendar size={12}/> {post.publishDate}</span>
                              <span className="flex items-center gap-1.5 text-blue-600"><Tag size={12}/> {post.category}</span>
                          </div>
                          
                          <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                              <div className="flex gap-2">
                                  <button className="p-3 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-xl transition-all hover:bg-blue-50"><Edit2 size={16}/></button>
                                  <button onClick={() => deleteBlogPost(post.id)} className="p-3 bg-slate-50 text-slate-400 hover:text-rose-600 rounded-xl transition-all hover:bg-rose-50"><Trash2 size={16}/></button>
                              </div>
                              <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-black text-slate-400 uppercase">SEO Score</span>
                                  <span className={`text-lg font-black ${post.seoScore > 80 ? 'text-emerald-500' : 'text-amber-500'}`}>{post.seoScore}</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          ))}
          {filteredPosts.length === 0 && (
              <div className="col-span-full py-40 text-center bg-white rounded-[4rem] border-4 border-dashed border-slate-100 flex flex-col items-center">
                  <PenTool size={64} className="text-slate-100 mb-6" />
                  <p className="text-xl font-black uppercase tracking-[0.3em] text-slate-300">Journal Empty</p>
              </div>
          )}
      </div>

      {/* Article Editor Modal */}
      {isEditorOpen && (
          <div className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-6 overflow-y-auto">
              <div className="bg-white rounded-[4rem] w-full max-w-5xl shadow-[0_60px_150px_-30px_rgba(0,0,0,0.6)] flex flex-col h-[90vh] overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
                  <div className="px-12 py-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                      <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-2xl">
                              <PenTool size={28}/>
                          </div>
                          <div>
                              <h2 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">Compose Article</h2>
                              <p className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em] mt-1">Rich-Text Editorial Protocol</p>
                          </div>
                      </div>
                      <button onClick={() => setIsEditorOpen(false)} className="text-slate-300 hover:text-rose-600 transition-all"><X size={36}/></button>
                  </div>

                  <div className="flex-1 flex overflow-hidden">
                      {/* Form Area */}
                      <div className="w-2/3 p-12 overflow-y-auto custom-scrollbar space-y-10">
                          <div className="space-y-3">
                              <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-2">Article Headline</label>
                              <input className="w-full p-8 bg-slate-50 border-4 border-slate-50 rounded-3xl font-black text-4xl text-slate-900 focus:bg-white focus:border-blue-600 outline-none transition-all shadow-inner" placeholder="The Future of Manpower..." />
                          </div>
                          <div className="space-y-3">
                              <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-2">Main Body Content</label>
                              <div className="bg-slate-50 border-4 border-slate-50 rounded-[2.5rem] p-8 min-h-[400px] focus-within:bg-white focus-within:border-blue-600 transition-all shadow-inner">
                                  {/* Toolbar Simulation */}
                                  <div className="flex gap-4 mb-6 border-b border-slate-200 pb-4">
                                      <div className="flex gap-1">
                                          <button className="p-2 font-serif font-black hover:bg-slate-200 rounded">B</button>
                                          <button className="p-2 italic font-serif hover:bg-slate-200 rounded">I</button>
                                          <button className="p-2 underline font-serif hover:bg-slate-200 rounded">U</button>
                                      </div>
                                      <div className="w-px h-8 bg-slate-200"></div>
                                      <button className="p-2 hover:bg-slate-200 rounded"><ImageIcon size={18}/></button>
                                      <button className="p-2 hover:bg-slate-200 rounded"><Layout size={18}/></button>
                                  </div>
                                  <textarea className="w-full bg-transparent outline-none font-medium text-lg text-slate-700 leading-relaxed min-h-[300px] custom-scrollbar" placeholder="Commence the narrative here..." />
                              </div>
                          </div>
                      </div>

                      {/* Meta Sidebar */}
                      <div className="w-1/3 bg-slate-50 border-l border-slate-100 p-12 overflow-y-auto custom-scrollbar space-y-10">
                          <div className="space-y-6">
                              <h3 className="text-xl font-black text-slate-900 tracking-tighter mb-4">Metadata Engine</h3>
                              <div>
                                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">Target Category</label>
                                  <select className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-bold outline-none appearance-none cursor-pointer focus:border-blue-600">
                                      <option>Industry News</option>
                                      <option>Legal Compliance</option>
                                      <option>Case Study</option>
                                      <option>Corporate Announcement</option>
                                  </select>
                              </div>
                              <div>
                                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">Publish Status</label>
                                  <select className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-bold outline-none appearance-none cursor-pointer focus:border-blue-600">
                                      <option>Draft</option>
                                      <option>Published</option>
                                      <option>Scheduled</option>
                                  </select>
                              </div>
                              <div>
                                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">Estimated Read Time</label>
                                  <input className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-bold outline-none" placeholder="e.g. 5 mins" />
                              </div>
                          </div>

                          <div className="bg-emerald-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                              <CheckCircle size={32} className="text-emerald-400 mb-4" />
                              <h4 className="text-xl font-black tracking-tighter italic">SEO Verification</h4>
                              <p className="text-emerald-100/70 text-sm font-medium mt-2 leading-relaxed">System analysis indicates 92% optimization for keywords: "Maldives Recruitment".</p>
                          </div>
                      </div>
                  </div>

                  <div className="px-12 py-8 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-5">
                      <button onClick={() => setIsEditorOpen(false)} className="px-8 py-5 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-600">Discard Draft</button>
                      <button onClick={() => setIsEditorOpen(false)} className="px-16 py-5 bg-blue-600 text-white rounded-[1.8rem] font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-blue-700 transition-all flex items-center gap-3 active:scale-95">
                          <Send size={20}/> Dispatch Article
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default BlogManager;