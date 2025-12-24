import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { 
  ArrowLeft, User, Briefcase, Globe, Shield, Network, 
  Sparkles, CheckCircle, ShieldCheck, Zap, Star, 
  Building2, UserCheck, Lock, Mail, Phone, MapPin,
  Trophy, Heart, Rocket, Fingerprint, Clock, ShieldAlert,
  Compass, Landmark, Activity, Award, ShieldPlus, Key
} from 'lucide-react';

interface AuthProps {
  type: 'login' | 'register';
  role: 'client' | 'admin' | 'candidate' | 'agent';
}

export const AuthPage: React.FC<AuthProps> = ({ type, role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    addClient, loginAdmin, clients, loginClient,
    addCandidate, candidates, loginCandidate,
    addAgent, agents, loginAgent,
    currentUser, currentCandidate, currentAgent, isAdminLoggedIn 
  } = useData();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  // Extra fields for Candidate/Agent Register
  const [profession, setProfession] = useState('');
  const [nationality, setNationality] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');

  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || 
               (role === 'admin' ? '/admin/dashboard' : 
                role === 'candidate' ? '/candidate/dashboard' : 
                role === 'agent' ? '/agent/dashboard' : '/');

  // Redirect if already logged in
  useEffect(() => {
    if (role === 'admin' && isAdminLoggedIn) {
        navigate('/admin/dashboard', { replace: true });
    } else if (role === 'client' && currentUser) {
        navigate('/client/dashboard', { replace: true });
    } else if (role === 'candidate' && currentCandidate) {
        navigate('/candidate/dashboard', { replace: true });
    } else if (role === 'agent' && currentAgent) {
        navigate('/agent/dashboard', { replace: true });
    }
  }, [role, currentUser, currentCandidate, currentAgent, isAdminLoggedIn, navigate]);

  // Auto-fill demo credentials for Admin
  useEffect(() => {
    if (role === 'admin' && type === 'login') {
      setEmail('admin@glowtours.mv');
      setPassword('admin123');
    }
  }, [role, type]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // REGISTER CLIENT
    if (type === 'register' && role === 'client') {
        if (!name || !email || !password) {
            setError("All fields are required.");
            return;
        }
        const newClient = {
            id: Date.now().toString(),
            companyName: name,
            contactPerson: 'Pending Contact', 
            email: email,
            status: 'Pending' as const,
              isVerified: false,
        }; 
        addClient(newClient);
        loginClient(newClient);
        navigate(from, { replace: true });
        return;
    }

    // REGISTER CANDIDATE
    if (type === 'register' && role === 'candidate') {
        if (!name || !email || !password || !profession || !nationality) {
            setError("All fields are required.");
            return;
        }
        
        if (candidates.some(c => (c.email || '').toLowerCase() === email.toLowerCase())) {
            setError("An account with this email already exists.");
            return;
        }

        const newCandidate = {
            id: Date.now().toString(),
            name: name,
            email: email,
            profession: profession,
            nationality: nationality,
            experience: 0,
            status: 'Available' as const,
            skills: [],
            imageUrl: 'https://picsum.photos/200/200?random=' + Math.floor(Math.random() * 1000),
            isVerified: false, // Added missing property
         completenessScore: 0, // Added missing property
           communicationPrefs: {  // Changed from string to object
            email: true,
            sms: false,
            whatsapp: false
        },
        privacyConsentedDate: new Date().toISOString(), // Added missing property
        lastActive: new Date().toISOString() // Added missing property
        };
        addCandidate(newCandidate);
        loginCandidate(newCandidate);
        navigate(from, { replace: true });
        return;
    }

    // REGISTER AGENT
    if (type === 'register' && role === 'agent') {
        if (!name || !email || !password || !country || !phone) {
            setError("All fields are required.");
            return;
        }

        if (agents.some(a => a.email.toLowerCase() === email.toLowerCase())) {
            setError("An agent account with this email already exists.");
            return;
        }

        const newAgent = {
            id: Date.now().toString(),
            agencyName: name, 
            contactPerson: 'Admin User', 
            email: email,
            phone: phone,
            country: country,
            status: 'Pending' as const
        };
        addAgent(newAgent);
        loginAgent(newAgent);
        navigate(from, { replace: true });
        return;
    }

    // LOGIN LOGIC
    if (role === 'admin') {
      if (email === 'admin@glowtours.mv' && password === 'admin123') {
         loginAdmin();
         navigate(from, { replace: true });
      } else {
         setError('Invalid admin credentials.');
      }
      return;
    } 

    if (role === 'client' && type === 'login') {
      const foundClient = clients.find(c => c.email.toLowerCase() === email.toLowerCase());
      if (foundClient) {
          loginClient(foundClient);
          navigate(from, { replace: true });
      } else {
          setError('No account found with this email. Please register.');
      }
      return;
    }

    if (role === 'candidate' && type === 'login') {
        const foundCandidate = candidates.find(c => (c.email || '').toLowerCase() === email.toLowerCase());
        if (foundCandidate) {
            loginCandidate(foundCandidate);
            navigate(from, { replace: true });
        } else {
            setError('No candidate account found with this email.');
        }
        return;
    }

    if (role === 'agent' && type === 'login') {
        const foundAgent = agents.find(a => a.email.toLowerCase() === email.toLowerCase());
        if (foundAgent) {
            loginAgent(foundAgent);
            navigate(from, { replace: true });
        } else {
            setError('No agent account found with this email.');
        }
        return;
    }
  };

  const isRegister = type === 'register';

  const getRoleUI = () => {
    switch(role) {
        case 'client':
            return {
                icon: Building2,
                gradient: "from-blue-600 via-indigo-600 to-sky-700",
                buttonGradient: "from-blue-600 to-sky-500",
                shadow: "shadow-blue-500/20",
                title: "Elite Client Hub",
                loginDesc: "Orchestrate your workforce management with absolute precision. Access your secure command center to track deployments and legal compliance.",
                registerDesc: "Join the Maldives' most prestigious business network. Register to unlock immediate access to triple-vetted global talent pools.",
                accent: "text-blue-600",
                bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
                highlights: [
                    { icon: ShieldCheck, text: "Category A Standard", color: "text-emerald-400" },
                    { icon: Activity, text: "Real-time Tracking", color: "text-sky-400" },
                    { icon: Landmark, text: "Legal Fortification", color: "text-amber-400" }
                ]
            };
        case 'candidate':
            return {
                icon: UserCheck,
                gradient: "from-purple-600 via-fuchsia-600 to-rose-600",
                buttonGradient: "from-purple-600 to-rose-500",
                shadow: "shadow-purple-500/20",
                title: "Career Discovery Portal",
                loginDesc: "Accelerate your professional trajectory. Sign in to update your profile and track luxury resort applications in the Maldives.",
                registerDesc: "Your gateway to paradise starts here. Join our exclusive database and get discovered by top-tier resorts and corporate leaders.",
                accent: "text-purple-600",
                bgImage: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1974&auto=format&fit=crop",
                highlights: [
                    { icon: Award, text: "Premium Matching", color: "text-yellow-400" },
                    { icon: Globe, text: "Global Standards", color: "text-blue-400" },
                    { icon: Zap, text: "Fast-Track Hiring", color: "text-orange-400" }
                ]
            };
        case 'agent':
            return {
                icon: Network,
                gradient: "from-orange-500 via-amber-600 to-yellow-600",
                buttonGradient: "from-orange-500 to-amber-500",
                shadow: "shadow-orange-500/20",
                title: "Global Supply Network",
                loginDesc: "Empower your agency operations. Manage your candidate pipeline and monitor visa processing through our unified supply portal.",
                registerDesc: "Scale your recruitment reach. Become a certified global partner and leverage our Maldivian presence to deploy talent at scale.",
                accent: "text-orange-600",
                bgImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop",
                highlights: [
                    { icon: Compass, text: "Market Intelligence", color: "text-blue-400" },
                    { icon: ShieldPlus, text: "Bonded Security", color: "text-emerald-400" },
                    { icon: Network, text: "Unified Pipeline", color: "text-indigo-400" }
                ]
            };
        case 'admin':
            return {
                icon: Shield,
                gradient: "from-slate-800 via-slate-900 to-black",
                buttonGradient: "from-slate-700 to-slate-950",
                shadow: "shadow-slate-500/20",
                title: "Administrative Command",
                loginDesc: "Secure access for authorized personnel. Oversee national recruitment cycles and maintain regulatory compliance protocols.",
                registerDesc: "Restricted Administrative Area. Access requires multi-factor authorization and verified biometric credentials.",
                accent: "text-slate-900",
                bgImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
                highlights: [
                    { icon: Lock, text: "Encrypted Session", color: "text-slate-400" },
                    { icon: Rocket, text: "High-Velocity Ops", color: "text-blue-400" },
                    { icon: Star, text: "Elite Governance", color: "text-yellow-400" }
                ]
            };
    }
  };

  const ui = getRoleUI();
  const Icon = ui.icon;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans py-8">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
          <img 
            src={ui.bgImage} 
            alt="Background" 
            className="w-full h-full object-cover transition-all duration-1000 transform scale-105"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${ui.gradient} opacity-40 mix-blend-multiply`}></div>
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"></div>
      </div>

      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-3 text-white/70 hover:text-white transition-all font-black text-[9px] uppercase tracking-[0.4em] group z-30"
      >
        <div className="w-9 h-9 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:border-white group-hover:bg-white/20 transition-all group-hover:-translate-x-1">
            <ArrowLeft size={14} /> 
        </div>
        Return Home
      </Link>

      {/* Main Container - Balanced "Average" Size */}
      <div className="max-w-4xl w-full mx-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white rounded-[2.5rem] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col lg:flex-row border border-white/20">
            
            {/* Split Pane - Sidebar */}
            <div className={`lg:w-[38%] bg-gradient-to-br ${ui.gradient} p-10 text-white flex flex-col relative overflow-hidden`}>
                {/* Texture Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.08] mix-blend-overlay"></div>
                
                <div className="relative z-10 flex-1 flex flex-col">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-2xl rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-xl group hover:scale-105 transition-transform duration-500">
                        <Icon size={32} className="text-white drop-shadow-md" />
                    </div>
                    
                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-white/90 font-black text-[8px] uppercase tracking-[0.4em] mb-6 border border-white/10">
                        <Sparkles size={12} className="text-yellow-300" /> Maldivian Excellence
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-black mb-6 tracking-tighter leading-[0.95]">
                        {isRegister ? 'Begin Your' : 'Elite Portal'} <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/60">
                            {ui.title.split(' ').pop()}
                        </span>
                    </h2>

                    <p className="text-white/70 text-sm leading-relaxed font-medium mb-10">
                        {isRegister ? ui.registerDesc : ui.loginDesc}
                    </p>

                    <div className="space-y-6 mb-8">
                        {ui.highlights.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 group cursor-default">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/5 group-hover:bg-white/20 transition-all shadow-lg">
                                    <item.icon size={18} className={item.color} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 group-hover:opacity-100 transition-opacity">{item.text}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto pt-8 flex items-center gap-4 border-t border-white/10">
                        <div className="w-10 h-10 bg-white p-2 rounded-xl shadow-lg">
                             <img src="https://img.icons8.com/color/48/maldives.png" alt="MV" className="w-full h-full opacity-80" />
                        </div>
                        <div className="text-[9px] font-black uppercase tracking-[0.3em] leading-tight">
                            Glow Tours <br/>
                            <span className="text-white/40">Category A Agency</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Split Pane - Form Content */}
            <div className="lg:w-[62%] p-10 lg:p-14 flex flex-col justify-center bg-white relative">
                <div className="mb-10">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-2 leading-none">
                        {isRegister ? 'Profile Initialization' : 'Identity Verification'}
                    </h3>
                    <p className="text-slate-400 text-sm font-medium">Please provide your authorized credentials.</p>
                </div>

                {error && (
                    <div className="bg-rose-50 text-rose-600 p-4 rounded-2xl text-xs font-bold border border-rose-100 mb-8 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 shadow-sm">
                        <ShieldAlert size={18} className="text-rose-500" />
                        {error}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6">
                        {isRegister && (
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2.5 ml-1">
                                    {role === 'client' ? "Legal Entity Name" : role === 'agent' ? "Agency Organization" : "Legal Full Name"}
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-slate-900 transition-colors">
                                        {role === 'agent' ? <Globe size={20} /> : <User size={20} />}
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="block w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-normal focus:bg-white focus:border-indigo-600/30 focus:ring-4 focus:ring-indigo-600/5 focus:outline-none transition-all placeholder-slate-300 shadow-sm"
                                        placeholder={role === 'client' ? "e.g. Resort Holdings Pvt Ltd" : role === 'agent' ? "e.g. South Asia Sourcing" : "e.g. Ibrahim Ali"}
                                    />
                                </div>
                            </div>
                        )}

                        {isRegister && role === 'candidate' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2.5 ml-1">Primary Skill</label>
                                    <input
                                        required
                                        type="text"
                                        value={profession}
                                        onChange={(e) => setProfession(e.target.value)}
                                        className="block w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-normal focus:bg-white focus:border-indigo-600/30 focus:ring-4 focus:ring-indigo-600/5 focus:outline-none transition-all placeholder-slate-300 shadow-sm"
                                        placeholder="e.g. Executive Chef"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2.5 ml-1">Nationality</label>
                                    <input
                                        required
                                        type="text"
                                        value={nationality}
                                        onChange={(e) => setNationality(e.target.value)}
                                        className="block w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-normal focus:bg-white focus:border-indigo-600/30 focus:ring-4 focus:ring-indigo-600/5 focus:outline-none transition-all placeholder-slate-300 shadow-sm"
                                        placeholder="e.g. Sri Lankan"
                                    />
                                </div>
                            </div>
                        )}

                        {isRegister && role === 'agent' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2.5 ml-1">Operating Country</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-orange-600 transition-colors">
                                            <MapPin size={20} />
                                        </div>
                                        <input
                                            required
                                            type="text"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            className="block w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-normal focus:bg-white focus:border-orange-600/30 focus:ring-4 focus:ring-orange-600/5 focus:outline-none transition-all placeholder-slate-300 shadow-sm"
                                            placeholder="e.g. Bangladesh"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2.5 ml-1">Official Contact</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-orange-600 transition-colors">
                                            <Phone size={20} />
                                        </div>
                                        <input
                                            required
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="block w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-normal focus:bg-white focus:border-orange-600/30 focus:ring-4 focus:ring-orange-600/5 focus:outline-none transition-all placeholder-slate-300 shadow-sm"
                                            placeholder="+880..."
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2.5 ml-1">Corporate Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-slate-900 transition-colors">
                                    <Mail size={20} />
                                </div>
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-normal focus:bg-white focus:border-slate-300 focus:ring-4 focus:ring-slate-50 focus:outline-none transition-all placeholder-slate-300 shadow-sm"
                                    placeholder="user@organization.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2.5 ml-1">Security Access Key</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-slate-900 transition-colors">
                                    <Key size={20} />
                                </div>
                                <input
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-normal focus:bg-white focus:border-slate-300 focus:ring-4 focus:ring-slate-50 focus:outline-none transition-all placeholder-slate-300 shadow-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-8">
                        <button
                            type="submit"
                            className={`w-full py-5 rounded-2xl text-white font-black text-lg uppercase tracking-widest shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 bg-gradient-to-r ${ui.buttonGradient} ${ui.shadow} hover:shadow-2xl`}
                        >
                            {isRegister ? 'Finalize Registration' : 'Authenticate Session'}
                        </button>
                    </div>
                </form>
                
                <div className="mt-12 text-center">
                    <p className="text-slate-400 text-sm font-medium">
                        {isRegister ? "Already have an account?" : "New to the platform?"}
                        <button 
                            onClick={() => navigate(isRegister ? (role === 'agent' ? '/agent/login' : role === 'candidate' ? '/candidate/login' : '/login') : (role === 'agent' ? '/agent/register' : role === 'candidate' ? '/candidate/register' : '/register'))} 
                            className={`ml-2 font-black uppercase text-[10px] tracking-[0.2em] underline decoration-2 underline-offset-4 transition-all hover:tracking-[0.3em] ${ui.accent}`}
                        >
                            {isRegister ? "Log In" : "Register Profile"}
                        </button>
                    </p>
                    
                    {/* Portal Switcher - Modern & Compact (Admin Removed) */}
                    {!isRegister && (
                        <div className="mt-10 pt-10 border-t border-slate-50">
                             <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.5em] mb-6">Switch Entry Point</p>
                             <div className="flex flex-wrap justify-center gap-3">
                                {[
                                    { r: 'client', p: '/login', label: 'Client', color: 'text-blue-500 bg-blue-50 hover:bg-blue-100' },
                                    { r: 'candidate', p: '/candidate/login', label: 'Candidate', color: 'text-purple-500 bg-purple-50 hover:bg-purple-100' },
                                    { r: 'agent', p: '/agent/login', label: 'Agent', color: 'text-orange-500 bg-orange-50 hover:bg-orange-100' }
                                ].filter(x => x.r !== role).map((portal, pidx) => (
                                    <Link key={pidx} to={portal.p} className={`px-5 py-2 rounded-xl text-[9px] font-black transition-all border border-transparent uppercase tracking-widest shadow-sm hover:-translate-y-0.5 ${portal.color}`}>
                                        {portal.label}
                                    </Link>
                                ))}
                             </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
