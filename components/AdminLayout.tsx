
import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
    LayoutDashboard, Users, Briefcase, MessageSquare, BarChart, 
    LogOut, Shield, Globe, FileText, PlusCircle, ClipboardCheck, 
    Network, Receipt, DollarSign, Settings, Wallet, Menu, X, Landmark,
    Monitor, PenTool, Layout, Star, Users2, ShieldCheck, Mail, PieChart, Activity
} from 'lucide-react';
import { useData } from '../context/DataContext';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdminLoggedIn, logoutAdmin } = useData();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Vacancies', path: '/admin/vacancies', icon: PlusCircle },
    { name: 'Candidates', path: '/admin/candidates', icon: Users },
    { name: 'Agents', path: '/admin/agents', icon: Network },
    { name: 'Recruited Records', path: '/admin/recruited-candidates', icon: ClipboardCheck },
    { name: 'Clients', path: '/admin/clients', icon: Briefcase },
    { name: 'Applications', path: '/admin/applications', icon: FileText },
    { name: 'Inquiries', path: '/admin/inquiries', icon: MessageSquare },
  ];

  const userManagementItems = [
    { name: 'Candidate Profiles', path: '/admin/website/users/candidates', icon: Users2 },
    { name: 'Client Verification', path: '/admin/website/users/verification', icon: ShieldCheck },
    { name: 'Agent Verification', path: '/admin/website/users/agents', icon: ShieldCheck },
    { name: 'Newsletter Hub', path: '/admin/website/users/newsletters', icon: Mail },
    { name: 'User Insights', path: '/admin/website/users/analytics', icon: PieChart },
    { name: 'Communication Desk', path: '/admin/website/users/communications', icon: Activity },
  ];

  const financeItems = [
    { name: 'Finance Hub', path: '/admin/finance/dashboard', icon: Landmark },
    { name: 'Invoicing Ledger', path: '/admin/finance/invoices', icon: Receipt },
    { name: 'Expense Control', path: '/admin/finance/expenses', icon: Wallet },
  ];

  const websiteItems = [
    { name: 'CMS Dashboard', path: '/admin/website/dashboard', icon: Monitor },
    { name: 'Page Architect', path: '/admin/website/pages', icon: Layout },
    { name: 'Editorial Blog', path: '/admin/website/blog', icon: PenTool },
    { name: 'Social Proof', path: '/admin/website/testimonials', icon: Star },
    { name: 'Team Registry', path: '/admin/website/team', icon: Users2 },
  ];

  const NavContent = () => (
    <div className="flex flex-col h-full">
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-400" />
            <span className="font-bold text-lg text-white tracking-tighter">GLOW <span className="text-blue-500">ADMIN</span></span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto custom-scrollbar">
          <div>
            <p className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Operations</p>
            <div className="space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`${isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'} group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all`}
                    >
                        <Icon className="mr-3 h-5 w-5" />
                        {item.name}
                    </Link>
                    );
                })}
            </div>
          </div>

          <div>
            <p className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">User Relations</p>
            <div className="space-y-1">
                {userManagementItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`${isActive ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'} group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all`}
                    >
                        <Icon className="mr-3 h-5 w-5" />
                        {item.name}
                    </Link>
                    );
                })}
            </div>
          </div>

          <div>
            <p className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Website Mgmt</p>
            <div className="space-y-1">
                {websiteItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`${isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'} group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all`}
                    >
                        <Icon className="mr-3 h-5 w-5" />
                        {item.name}
                    </Link>
                    );
                })}
            </div>
          </div>

          <div>
            <p className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Finance</p>
            <div className="space-y-1">
                {financeItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`${isActive ? 'bg-purple-600 text-white' : 'text-slate-300 hover:bg-slate-800'} group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all`}
                    >
                        <Icon className="mr-3 h-5 w-5" />
                        {item.name}
                    </Link>
                    );
                })}
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-400 hover:bg-slate-800 rounded-md transition-colors">
            <LogOut className="mr-3 h-5 w-5" /> Sign Out
          </button>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col flex-shrink-0">
        <NavContent />
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8">
             <div className="flex items-center gap-4">
                <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-slate-500"><Menu size={24}/></button>
                <h2 className="text-lg font-bold text-slate-900">Glow Tours Executive Console</h2>
             </div>
        </header>
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto"><Outlet /></div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;