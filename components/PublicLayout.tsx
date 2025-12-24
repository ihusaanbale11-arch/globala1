import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, LogIn, User, LogOut, LayoutDashboard, Briefcase, Shield, Network } from 'lucide-react';
import { useData } from '../context/DataContext';

const PublicLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logoutClient, currentCandidate, logoutCandidate, currentAgent, logoutAgent, isAdminLoggedIn } = useData();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Candidates', path: '/candidates' },
    { name: 'Contact', path: '/contact' },
    { name: 'Jobs', path: '/jobs' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
      if (currentUser) logoutClient();
      if (currentCandidate) logoutCandidate();
      if (currentAgent) logoutAgent();
      navigate('/');
      setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-t-4 border-transparent bg-clip-border" style={{borderImage: 'linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899) 1'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-blue-600 to-violet-600 p-2 rounded-lg text-white group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 leading-none">GLOBE TOURS</h1>
                <p className="text-xs text-blue-600 font-bold tracking-wider">& TRADE PVT LTD</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`${
                    isActive(link.path)
                      ? 'text-blue-600 font-bold'
                      : 'text-gray-500 hover:text-blue-600'
                  } px-1 pt-1 pb-1 text-sm font-medium transition-colors duration-200 relative group`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              ))}
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-4">
              {/* If Client Logged In */}
              {currentUser && (
                  <div className="flex items-center gap-4">
                      <Link to="/client/dashboard" className="flex items-center gap-2 text-gray-700 bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 px-3 py-1.5 rounded-full transition">
                          <div className="bg-blue-100 p-1 rounded-full text-blue-600">
                             <User size={14}/>
                          </div>
                          <span className="text-sm font-medium max-w-[150px] truncate">{currentUser.companyName}</span>
                      </Link>
                      <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition p-2" title="Logout">
                        <LogOut size={20} />
                      </button>
                  </div>
              )}

              {/* If Candidate Logged In */}
              {currentCandidate && (
                  <div className="flex items-center gap-4">
                      <Link to="/candidate/dashboard" className="flex items-center gap-2 text-gray-700 bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-purple-200 px-3 py-1.5 rounded-full transition">
                           <div className="bg-purple-100 p-1 rounded-full text-purple-600">
                             <Briefcase size={14}/>
                          </div>
                          <span className="text-sm font-medium max-w-[150px] truncate">{currentCandidate.name}</span>
                      </Link>
                      <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition p-2" title="Logout">
                        <LogOut size={20} />
                      </button>
                  </div>
              )}

              {/* If Agent Logged In */}
              {currentAgent && (
                  <div className="flex items-center gap-4">
                      <Link to="/agent/dashboard" className="flex items-center gap-2 text-gray-700 bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-orange-200 px-3 py-1.5 rounded-full transition">
                           <div className="bg-orange-100 p-1 rounded-full text-orange-600">
                             <Network size={14}/>
                          </div>
                          <span className="text-sm font-medium max-w-[150px] truncate">{currentAgent.agencyName}</span>
                      </Link>
                      <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition p-2" title="Logout">
                        <LogOut size={20} />
                      </button>
                  </div>
              )}

              {/* If No One Logged In */}
              {!currentUser && !currentCandidate && !currentAgent && (
                  <div className="flex items-center gap-3">
                    {/* Added Admin/Agent Links */}
                    <Link to="/admin/login" className="text-xs font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-wide flex items-center gap-1">
                        <Shield size={12} />
                    </Link>
                    <Link to="/agent/login" className="text-xs font-bold text-slate-400 hover:text-orange-600 uppercase tracking-wide flex items-center gap-1 mr-2" title="Agent Login">
                        <Network size={12} /> Agent
                    </Link>

                    <div className="h-4 w-px bg-gray-300"></div>

                    <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">
                        Log In
                    </Link>
                    <Link to="/register" className="ml-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300">
                        Register
                    </Link>
                  </div>
              )}
              
              {/* Admin Dashboard Link (Only visible if admin is logged in) */}
              {isAdminLoggedIn && !currentUser && !currentCandidate && !currentAgent && (
                  <Link to="/admin/dashboard" className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full hover:bg-indigo-100 transition-colors ml-2 flex items-center gap-1">
                    <Shield size={12}/> Admin Panel
                  </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-blue-600 focus:outline-none transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full z-50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`${
                    isActive(link.path) ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } block px-3 py-2 rounded-md text-base font-medium`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-gray-100 pt-4 mt-2">
                {currentUser ? (
                    <div className="px-3 space-y-3">
                         <div className="flex items-center gap-2 text-blue-800 font-medium">
                            <User size={18} /> {currentUser.companyName}
                         </div>
                         <Link to="/client/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 w-full text-left text-gray-600 hover:text-gray-900 py-2">
                            <LayoutDashboard size={18} /> Client Dashboard
                         </Link>
                         <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left text-red-600 py-2">
                            <LogOut size={18} /> Sign Out
                         </button>
                    </div>
                ) : currentCandidate ? (
                    <div className="px-3 space-y-3">
                         <div className="flex items-center gap-2 text-blue-800 font-medium">
                            <Briefcase size={18} /> {currentCandidate.name}
                         </div>
                         <Link to="/candidate/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 w-full text-left text-gray-600 hover:text-gray-900 py-2">
                            <LayoutDashboard size={18} /> Candidate Portal
                         </Link>
                         <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left text-red-600 py-2">
                            <LogOut size={18} /> Sign Out
                         </button>
                    </div>
                ) : currentAgent ? (
                    <div className="px-3 space-y-3">
                         <div className="flex items-center gap-2 text-blue-800 font-medium">
                            <Network size={18} /> {currentAgent.agencyName}
                         </div>
                         <Link to="/agent/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 w-full text-left text-gray-600 hover:text-gray-900 py-2">
                            <LayoutDashboard size={18} /> Agent Dashboard
                         </Link>
                         <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left text-red-600 py-2">
                            <LogOut size={18} /> Sign Out
                         </button>
                    </div>
                ) : (
                    <div className="space-y-2 p-2">
                        <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                        Client Login
                        </Link>
                        <Link to="/candidate/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                        Candidate Portal
                        </Link>
                        <Link to="/agent/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                        Agent Portal
                        </Link>
                        <Link to="/admin/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50">
                        Admin Portal
                        </Link>
                        <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block w-full text-center px-3 py-2 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                        Register Now
                        </Link>
                    </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-16 pb-8 relative overflow-hidden">
        {/* Footer Gradient Decor */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-white/10 p-2 rounded-lg">
                    <Globe className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                    <span className="text-xl font-bold tracking-tight">Globe Tours & Trade</span>
                    <span className="block text-xs text-blue-400 uppercase tracking-widest">Recruitment Experts</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
                Empowering businesses with top-tier talent from around the globe.
                Licensed Category A Employment Agency committed to excellence and compliance.
              </p>
              <div className="flex gap-4">
                  {/* Social placeholders */}
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition cursor-pointer">
                      <span className="font-bold">fb</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition cursor-pointer">
                      <span className="font-bold">in</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition cursor-pointer">
                      <span className="font-bold">ig</span>
                  </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6 text-white border-b border-slate-800 pb-2 inline-block">Quick Links</h3>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><Link to="/about" className="hover:text-blue-400 transition flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> About Us</Link></li>
                <li><Link to="/services" className="hover:text-purple-400 transition flex items-center gap-2"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span> Our Services</Link></li>
                <li><Link to="/candidates" className="hover:text-pink-400 transition flex items-center gap-2"><span className="w-1.5 h-1.5 bg-pink-500 rounded-full"></span> Find Talent</Link></li>
                <li><Link to="/jobs" className="hover:text-pink-400 transition flex items-center gap-2"><span className="w-1.5 h-1.5 bg-pink-500 rounded-full"></span> Explore Jobs</Link></li>
                <li><Link to="/contact" className="hover:text-orange-400 transition flex items-center gap-2"><span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> Contact Us</Link></li>
                <li><Link to="/agent/login" className="hover:text-green-400 transition flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Agent Portal</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6 text-white border-b border-slate-800 pb-2 inline-block">Contact Info</h3>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="flex items-start gap-3">
                    <div className="bg-slate-800 p-1.5 rounded text-blue-400 mt-0.5">
                        <User size={14} />
                    </div>
                    <span>H. Globe Building, 2nd Floor<br/>Boduthakurufaanu Magu<br/>Malé, Maldives</span>
                </li>
                <li className="flex items-center gap-3">
                     <div className="bg-slate-800 p-1.5 rounded text-green-400">
                        <Briefcase size={14} />
                    </div>
                    <span>+960 333 4444</span>
                </li>
                <li className="flex items-center gap-3">
                     <div className="bg-slate-800 p-1.5 rounded text-yellow-400">
                        <Globe size={14} />
                    </div>
                    <span>info@globe.mv</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} Glow Tours and Trade Pvt Ltd. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
                <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;