
import React, { useMemo } from 'react';
import { useData } from '../../../../context/DataContext';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
    TrendingUp, Users, UserPlus, ShieldCheck, 
    Globe, PieChart as PieIcon, Activity, Target
} from 'lucide-react';

const UserAnalytics: React.FC = () => {
  const { candidates, clients } = useData();

  // Nationalities Breakdown
  const nationalityData = useMemo(() => {
    const counts: Record<string, number> = {};
    candidates.forEach(c => counts[c.nationality] = (counts[c.nationality] || 0) + 1);
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [candidates]);

  // Activity Trends (Mock)
  const growthData = [
    { name: 'Jan', candidates: 400, clients: 20 },
    { name: 'Feb', candidates: 520, clients: 25 },
    { name: 'Mar', candidates: 680, clients: 35 },
    { name: 'Apr', candidates: 900, clients: 48 },
    { name: 'May', candidates: 1200, clients: 60 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  const stats = useMemo(() => ({
    totalUsers: candidates.length + clients.length,
    activeCandidates: candidates.filter(c => c.completenessScore > 80).length,
    trustIndex: Math.round((candidates.filter(c => c.isVerified).length / candidates.length) * 100) || 0
  }), [candidates, clients]);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="bg-slate-950 p-12 rounded-[4rem] text-white shadow-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -mr-64 -mt-64 group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 px-5 py-2 rounded-full text-emerald-400 font-black text-[10px] uppercase tracking-[0.3em] mb-6 border border-emerald-500/20 backdrop-blur-md">
                    <PieIcon size={14} /> Demographic Intelligence
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4 italic">User <span className="text-emerald-400">Insights</span></h1>
                <p className="text-slate-400 text-xl font-medium max-w-2xl">High-fidelity analysis of network growth, user quality, and global sourcing velocity.</p>
            </div>
            <div className="bg-white/5 border border-white/10 px-10 py-6 rounded-[2.5rem] backdrop-blur-md text-right">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Network Capacity</p>
                <p className="text-5xl font-black text-emerald-400 tracking-tighter">{stats.totalUsers.toLocaleString()}</p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-6">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Verified Ratio</p>
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><ShieldCheck size={20}/></div>
            </div>
            <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stats.trustIndex}%</h3>
            <p className="text-xs font-bold text-emerald-500 mt-2 flex items-center gap-1.5"><TrendingUp size={14}/> +4% from last period</p>
         </div>
         <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-6">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">High Impact Talent</p>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Target size={20}/></div>
            </div>
            <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stats.activeCandidates}</h3>
            <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Profiles &gt; 80% completeness</p>
         </div>
         <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-6">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Growth Delta</p>
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><UserPlus size={20}/></div>
            </div>
            <h3 className="text-4xl font-black text-slate-900 tracking-tighter">+240</h3>
            <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">New enrollments this month</p>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-xl flex flex-col h-[500px]">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">Population Trajectory</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enrollment Growth • 2024</p>
                </div>
            </div>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={growthData}>
                        <defs>
                            <linearGradient id="colorCand" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} />
                        <Tooltip contentStyle={{borderRadius: '1.5rem', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)'}} />
                        <Area type="monotone" dataKey="candidates" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorCand)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-xl flex flex-col h-[500px]">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">Global Distribution</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Source Countries Breakdown</p>
                </div>
                <Globe className="text-slate-100" size={40} />
            </div>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={nationalityData}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {nationalityData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserAnalytics;