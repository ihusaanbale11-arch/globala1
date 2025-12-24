import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line
} from 'recharts';
import { Users, FileText, Briefcase, TrendingUp, RefreshCw, Trash2, DownloadCloud } from 'lucide-react';
import { useData } from '../../context/DataContext';

const Dashboard: React.FC = () => {
  const { stats, candidates, recruitedCandidates, resetToDefaults, clearAllData } = useData();
  const navigate = useNavigate();

  // Calculate dynamic sector data
  const sectorCounts: Record<string, number> = {};
  candidates.forEach(c => {
    let sector = 'Other';
    const prof = c.profession.toLowerCase();
    if (prof.includes('engineer') || prof.includes('construct') || prof.includes('labor') || prof.includes('mason')) sector = 'Construction';
    else if (prof.includes('chef') || prof.includes('wait') || prof.includes('hotel') || prof.includes('hospitality') || prof.includes('guest')) sector = 'Hospitality';
    else if (prof.includes('nurse') || prof.includes('doctor') || prof.includes('medical')) sector = 'Healthcare';
    else if (prof.includes('tech') || prof.includes('developer') || prof.includes('it')) sector = 'IT';
    else if (prof.includes('accountant') || prof.includes('admin') || prof.includes('office')) sector = 'Corporate';
    else if (prof.includes('teacher') || prof.includes('tutor') || prof.includes('lecturer') || prof.includes('professor') || prof.includes('school') || prof.includes('academic') || prof.includes('educat')) sector = 'Education';
    
    sectorCounts[sector] = (sectorCounts[sector] || 0) + 1;
  });

  const dataSectors = Object.keys(sectorCounts).map(name => ({ name, candidates: sectorCounts[name] }));
  
  // Calculate dynamic recruitment trends (Last 6 Months)
  const getTrendData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 5; i >= 0; i--) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const monthName = d.toLocaleString('default', { month: 'short' });
        const year = d.getFullYear();
        const month = d.getMonth();
        
        // Count recruited candidates with arrivalDate in this month/year
        const count = recruitedCandidates.filter(c => {
            if(!c.arrivalDate) return false;
            const cDate = new Date(c.arrivalDate);
            return cDate.getMonth() === month && cDate.getFullYear() === year;
        }).length;

        data.push({ name: monthName, hired: count });
    }
    return data;
  };

  const dataRecruitment = getTrendData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
         <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
         <div className="flex gap-2">
            <button 
                onClick={resetToDefaults}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm transition font-medium border border-blue-200"
                title="Load sample data for testing"
            >
                <DownloadCloud size={14} /> Load Demo Data
            </button>
            <button 
                onClick={clearAllData}
                className="flex items-center gap-2 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm transition font-medium border border-red-200"
                title="Wipe database clean for real usage"
            >
                <Trash2 size={14} /> Clear Database
            </button>
         </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Candidates</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.totalCandidates}</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="text-blue-600 h-6 w-6" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2 flex items-center"><TrendingUp size={14} className="mr-1"/> Updated just now</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Clients</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.activeClients}</h3>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <Briefcase className="text-purple-600 h-6 w-6" />
            </div>
          </div>
           <p className="text-xs text-gray-500 mt-2">Active business partners</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Inquiries</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.pendingInquiries}</h3>
            </div>
            <div className="p-2 bg-yellow-50 rounded-lg">
              <FileText className="text-yellow-600 h-6 w-6" />
            </div>
          </div>
           <p className="text-xs text-red-500 mt-2">Action needed</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Hired</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.successfulPlacements}</h3>
            </div>
             <div className="p-2 bg-green-50 rounded-lg">
              <Users className="text-green-600 h-6 w-6" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">Placements</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recruitment Trends (6 Months)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataRecruitment}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="hired" stroke="#2563eb" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">Based on "Arrival Date" of Recruited Candidates</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Candidates by Sector</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataSectors} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" allowDecimals={false} />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="candidates" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Links / Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <button 
                onClick={() => navigate('/admin/candidates')}
                className="flex items-center justify-center gap-2 p-4 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-blue-600 transition"
             >
                <Users size={20} /> Manage Candidates
             </button>
             <button 
                onClick={() => navigate('/admin/clients')}
                className="flex items-center justify-center gap-2 p-4 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-blue-600 transition"
             >
                <Briefcase size={20} /> Manage Clients
             </button>
             <button 
                onClick={() => navigate('/admin/applications')}
                className="flex items-center justify-center gap-2 p-4 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-blue-600 transition"
             >
                <FileText size={20} /> View Recent Applications
             </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;