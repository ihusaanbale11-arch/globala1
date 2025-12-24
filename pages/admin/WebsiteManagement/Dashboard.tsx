
import React, { useMemo } from 'react';
import { useData } from '../../../context/DataContext';
import { 
    Monitor, Layout, PenTool, Star, Users2, Activity,
    TrendingUp, Eye, MousePointer2, Share2, AlertCircle,
    CheckCircle2, Clock, Globe, Zap, Search, ShieldCheck
} from 'lucide-react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';

const WebsiteDashboard: React.FC = () => {
  const { webPages, blogPosts, testimonials, teamMembers } = useData();

  // Mock Traffic Data
  const trafficData = [
    { name: 'Mon', views: 2400, conv: 400 },
    { name: 'Tue', views: 1398, conv: 300 },
    { name: 'Wed', views: 9800, conv: 2000 },
    { name: 'Thu', views: 3908, conv: 2780 },
    { name: 'Fri', views: 4800, conv: 1890 },
    { name: 'Sat', views: 3800, conv: 2390 },
    { name: 'Sun', views: 4300, conv: 3490 },
  ];

  const editorialStats = useMemo(() => ({
    pagesCount: webPages.length,
    blogCount: blogPosts.length,
    pendingTestimonials: testimonials.filter(t => t.status === 'Pending').length,
    publicTeam: teamMembers.filter(tm => tm.isPublic).length,
    avgSeoScore: blogPosts.length > 0 
        ? Math.round(blogPosts.reduce((acc, curr) => acc + curr.seoScore, 0) / blogPosts.length)
        : 0
  }), [webPages, blogPosts, testimonials, teamMembers]);

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-700">
      {/* CMS Strategic Header */}
      <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 px-4 py-1.5 rounded-full text-indigo-300 font-black text-[10px] uppercase tracking-[0.3em] mb-4 border border-indigo-500/30 backdrop-blur-md">
                <Globe size={14} className="text-indigo-400" /> Digital Presence Command
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none italic">Website <span className="text-indigo-400">Management</span></h1>
            <p className="text-slate-400 mt-4 text-lg font-medium max-w-xl">Centralized control for Glow Tours' public interface, content velocity, and brand authority.</p>
        </div>
      </div>

      {/* KPI Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
            { label: 'Site Visibility', val: '24.2K', icon: Eye, color: 'blue', sub: 'Unique Visitors' },
            { label: 'Conversion Rate', val: '4.8%', icon: MousePointer2, color: 'emerald', sub: '+1.2% from last wk' },
            { label: 'SEO Health', val: `${editorialStats.avgSeoScore}/100`, icon: Search, color: 'indigo', sub: 'Optimization Index' },
            { label: 'Review Queue', val: editorialStats.pendingTestimonials, icon: AlertCircle, color: 'rose', sub: 'Testimonials Awaiting' }
        ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-50 rounded-bl-[2.5rem] -mr-8 -mt-8 transition-transform group-hover:scale-125`}></div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{stat.label}</p>
                <div className="flex items-end justify-between relative z-10">
                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stat.val}</h3>
                    <div className={`p-3 bg-${stat.color}-50 text-${stat.color}-600 rounded-xl`}>
                        <stat.icon size={24} />
                    </div>
                </div>
                <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.sub}</p>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* Engagement Trajectory */}
        <div className="xl:col-span-8 bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm flex flex-col h-[500px]">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-none mb-1">Engagement Dynamics</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Views vs Conversions • Last 7 Days</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                        <span className="text-[10px] font-black uppercase text-slate-500">Visitors</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                        <span className="text-[10px] font-black uppercase text-slate-500">Inquiries</span>
                    </div>
                </div>
            </div>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trafficData}>
                        <defs>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} />
                        <Tooltip 
                            contentStyle={{borderRadius: '1.5rem', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '1rem'}}
                        />
                        <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorViews)" />
                        <Area type="monotone" dataKey="conv" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorConv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Content Status Breakdown */}
        <div className="xl:col-span-4 space-y-8">
            <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-200">
                <h4 className="text-lg font-black text-slate-900 tracking-tighter mb-6 flex items-center gap-2">
                    <Activity size={20} className="text-indigo-600" /> Content Velocity
                </h4>
                <div className="space-y-4">
                    {[
                        { label: 'Published Articles', val: editorialStats.blogCount, color: 'blue' },
                        { label: 'Total Site Pages', val: editorialStats.pagesCount, color: 'purple' },
                        { label: 'Public Profiles', val: editorialStats.publicTeam, color: 'emerald' }
                    ].map((row, i) => (
                        <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 flex justify-between items-center group">
                            <div>
                                <p className="text-xs font-black text-slate-900 truncate tracking-tight">{row.label}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Glow Tours Repository</p>
                            </div>
                            <div className="text-right">
                                <p className={`text-xl font-black text-${row.color}-600`}>{row.val}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Strategy Card */}
            <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                <Zap size={32} className="text-yellow-400 mb-6 group-hover:rotate-12 transition-transform" />
                <h3 className="text-xl font-black mb-2 italic">Automated Indexing</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">System detects new published content and notifies Google Search Console via API.</p>
                <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">Manual Crawl Trigger</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteDashboard;