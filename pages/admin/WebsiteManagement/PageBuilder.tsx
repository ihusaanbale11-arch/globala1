
import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { 
    Layout, Smartphone, Tablet, Monitor, Plus, 
    Trash2, ChevronUp, ChevronDown, Save, Eye,
    Type, Image as ImageIcon, LayoutGrid, Zap, 
    ArrowUpRight, Target, ShieldCheck, X, Settings2
} from 'lucide-react';
import { WebPage, PageBlock } from '../../../types';

const PageBuilder: React.FC = () => {
  const { webPages, updateWebPage } = useData();
  const [selectedPageId, setSelectedPageId] = useState<string>(webPages[0]?.id || '');
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const selectedPage = webPages.find(p => p.id === selectedPageId);

  const addBlock = (type: PageBlock['type']) => {
    if (!selectedPage) return;
    const newBlock: PageBlock = {
      id: Date.now().toString(),
      type,
      content: type === 'Hero' ? { title: 'New Catchy Headline', sub: 'Supporting subtext here...' } : {},
      order: selectedPage.blocks.length
    };
    updateWebPage({
      ...selectedPage,
      blocks: [...selectedPage.blocks, newBlock]
    });
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (!selectedPage) return;
    const newBlocks = [...selectedPage.blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newBlocks.length) return;
    
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    updateWebPage({ ...selectedPage, blocks: newBlocks });
  };

  const deleteBlock = (id: string) => {
    if (!selectedPage) return;
    updateWebPage({
      ...selectedPage,
      blocks: selectedPage.blocks.filter(b => b.id !== id)
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 pb-20 animate-in fade-in duration-500">
      {/* Sidebar - Navigation & Library */}
      <div className="lg:w-80 space-y-10">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl">
             <h3 className="text-xl font-black text-slate-900 tracking-tighter mb-6 flex items-center gap-3">
                <Monitor size={20} className="text-blue-600"/> Viewport Agent
             </h3>
             <div className="flex gap-2 p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
                {(['mobile', 'tablet', 'desktop'] as const).map(v => (
                    <button 
                        key={v}
                        onClick={() => setViewport(v)}
                        className={`flex-1 p-3 rounded-xl transition-all flex justify-center ${viewport === v ? 'bg-white text-blue-600 shadow-xl' : 'text-slate-400 hover:text-slate-700'}`}
                    >
                        {v === 'mobile' ? <Smartphone size={18}/> : v === 'tablet' ? <Tablet size={18}/> : <Monitor size={18}/>}
                    </button>
                ))}
             </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
             <h3 className="text-lg font-black text-white tracking-tighter mb-8 italic">Block Architecture</h3>
             <div className="grid grid-cols-1 gap-4">
                 {[
                     { type: 'Hero', icon: Zap, color: 'text-yellow-400' },
                     { type: 'Features', icon: LayoutGrid, color: 'text-blue-400' },
                     { type: 'Stats', icon: Target, color: 'text-emerald-400' },
                     { type: 'CTA', icon: ArrowUpRight, color: 'text-rose-400' }
                 ].map(item => (
                     <button 
                        key={item.type}
                        onClick={() => addBlock(item.type as any)}
                        className="w-full flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
                     >
                        <span className="text-xs font-black uppercase tracking-widest text-slate-300">{item.type} Section</span>
                        <item.icon size={18} className={`${item.color} group-hover:scale-125 transition-transform`} />
                     </button>
                 ))}
             </div>
          </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col items-center">
          {/* Canvas Wrapper */}
          <div className={`transition-all duration-700 ease-in-out border-8 border-slate-200 rounded-[4rem] shadow-2xl overflow-hidden bg-slate-50 min-h-[800px] ${
              viewport === 'mobile' ? 'w-[375px]' : viewport === 'tablet' ? 'w-[768px]' : 'w-full max-w-5xl'
          }`}>
              <div className="h-full w-full overflow-y-auto custom-scrollbar flex flex-col">
                  {/* Internal Site Header Mock */}
                  <div className="bg-white h-20 border-b border-slate-100 flex items-center justify-between px-10 flex-shrink-0">
                      <div className="flex items-center gap-2 font-black text-xs uppercase tracking-tighter"><div className="w-5 h-5 bg-blue-600 rounded"></div> Glow Tours</div>
                      <div className="flex gap-4">
                          {[1,2,3].map(i => <div key={i} className="w-8 h-1.5 bg-slate-100 rounded-full"></div>)}
                      </div>
                  </div>

                  {/* Dynamic Blocks */}
                  <div className="flex-1 space-y-2 p-4">
                      {selectedPage?.blocks.map((block, idx) => (
                          <div key={block.id} className="group relative bg-white border-2 border-transparent hover:border-blue-500/50 rounded-[2rem] transition-all overflow-hidden cursor-default">
                              {/* Block Overlay Controls */}
                              <div className="absolute top-4 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                  <button onClick={() => moveBlock(idx, 'up')} className="p-2 bg-white shadow-xl border border-slate-100 rounded-xl hover:text-blue-600 transition"><ChevronUp size={16}/></button>
                                  <button onClick={() => moveBlock(idx, 'down')} className="p-2 bg-white shadow-xl border border-slate-100 rounded-xl hover:text-blue-600 transition"><ChevronDown size={16}/></button>
                                  <button onClick={() => setIsEditorOpen(true)} className="p-2 bg-white shadow-xl border border-slate-100 rounded-xl hover:text-emerald-600 transition"><Settings2 size={16}/></button>
                                  <button onClick={() => deleteBlock(block.id)} className="p-2 bg-white shadow-xl border border-slate-100 rounded-xl hover:text-rose-600 transition"><Trash2 size={16}/></button>
                              </div>

                              {/* Render Content Specifics */}
                              {block.type === 'Hero' && (
                                  <div className="py-20 px-10 text-center bg-slate-50 relative overflow-hidden">
                                      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]"></div>
                                      <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">{block.content.title || 'Dynamic Hero Title'}</h2>
                                      <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-lg mx-auto">{block.content.sub || 'Subtext describing the section context.'}</p>
                                      <div className="mt-10 flex justify-center gap-4">
                                          <div className="w-40 h-12 bg-blue-600 rounded-full"></div>
                                          <div className="w-40 h-12 border-2 border-slate-200 rounded-full"></div>
                                      </div>
                                  </div>
                              )}

                              {block.type === 'Features' && (
                                  <div className="py-20 px-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                                      {[1,2,3].map(i => (
                                          <div key={i} className="bg-slate-50/50 border border-slate-100 p-8 rounded-[2.5rem] flex flex-col items-center text-center">
                                              <div className="w-12 h-12 bg-blue-100 rounded-xl mb-6"></div>
                                              <div className="w-24 h-4 bg-slate-200 rounded-full mb-3"></div>
                                              <div className="w-full h-2 bg-slate-100 rounded-full"></div>
                                              <div className="w-3/4 h-2 bg-slate-100 rounded-full mt-2"></div>
                                          </div>
                                      ))}
                                  </div>
                              )}

                              {block.type === 'Stats' && (
                                  <div className="py-16 bg-slate-900 text-white flex justify-around">
                                      {[1,2,3,4].map(i => (
                                          <div key={i} className="text-center">
                                              <p className="text-3xl font-black text-blue-400">8.4k</p>
                                              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Metadata</p>
                                          </div>
                                      ))}
                                  </div>
                              )}

                              {block.type === 'CTA' && (
                                  <div className="py-16 px-10 flex flex-col md:flex-row items-center justify-between gap-10 bg-indigo-50">
                                      <div className="max-w-md text-center md:text-left">
                                          <h3 className="text-2xl font-black text-indigo-950 tracking-tight leading-none mb-2">Ready to Initialize?</h3>
                                          <p className="text-indigo-900/60 font-medium">Join the league of premium partners today.</p>
                                      </div>
                                      <div className="w-48 h-14 bg-indigo-600 rounded-full shadow-2xl shadow-indigo-200"></div>
                                  </div>
                              )}
                          </div>
                      ))}
                      
                      {(!selectedPage || selectedPage.blocks.length === 0) && (
                          <div className="flex-1 flex flex-col items-center justify-center py-40 text-center space-y-4">
                              <div className="w-20 h-20 bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-slate-300">
                                  <Layout size={40}/>
                              </div>
                              <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em]">Empty Canvas Interface</p>
                              <p className="text-slate-400 text-sm max-w-[200px]">Drag or click blocks from the sidebar to architect the page.</p>
                          </div>
                      )}
                  </div>

                  {/* Internal Site Footer Mock */}
                  <div className="bg-slate-950 p-12 flex-shrink-0 mt-auto">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                          {[1,2,3,4].map(i => (
                              <div key={i} className="space-y-3">
                                  <div className="w-16 h-2 bg-white/10 rounded-full"></div>
                                  <div className="w-12 h-1.5 bg-white/5 rounded-full"></div>
                                  <div className="w-10 h-1.5 bg-white/5 rounded-full"></div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* Editor Modal Simulation */}
      {isEditorOpen && (
          <div className="fixed inset-0 z-[200] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-6">
              <div className="bg-white rounded-[3.5rem] w-full max-w-2xl shadow-[0_60px_120px_-30px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in duration-300">
                   <div className="px-12 py-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                       <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Edit Block Attributes</h2>
                       <button onClick={() => setIsEditorOpen(false)} className="text-slate-300 hover:text-rose-600 transition-all"><X size={32}/></button>
                   </div>
                   <div className="p-12 space-y-8">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-3">Primary Heading</label>
                            <input className="w-full bg-slate-50 border-4 border-slate-50 rounded-2xl p-6 font-black text-xl text-slate-900 focus:bg-white focus:border-blue-600 outline-none transition-all shadow-inner" placeholder="Enter headline..." />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-3">Subtext Description</label>
                            <textarea rows={4} className="w-full bg-slate-50 border-4 border-slate-50 rounded-[2rem] p-6 font-medium text-slate-700 focus:bg-white focus:border-blue-600 outline-none transition-all shadow-inner custom-scrollbar" placeholder="Enter narrative text..." />
                        </div>
                        <div className="flex justify-end gap-4 border-t border-slate-100 pt-8">
                            <button onClick={() => setIsEditorOpen(false)} className="px-8 py-5 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-600">Discard</button>
                            <button onClick={() => setIsEditorOpen(false)} className="px-12 py-5 bg-blue-600 text-white rounded-[1.8rem] font-black text-xs uppercase tracking-widest shadow-3xl hover:bg-blue-700 transition-all flex items-center gap-2">
                                <Save size={18}/> Commit Changes
                            </button>
                        </div>
                   </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default PageBuilder;