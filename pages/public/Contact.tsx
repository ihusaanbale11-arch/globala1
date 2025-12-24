import React, { useState, useEffect } from 'react';
// Added missing icons: Layers, Coffee, HardHat
import { 
  Mail, Phone, MapPin, Send, Info, Clock, MessageSquare, 
  Sparkles, ShieldCheck, Globe, Zap, Headphones, 
  Building2, Scale, Users, CheckCircle2, Bookmark, ExternalLink,
  LifeBuoy, FileSearch, ShieldPlus, Landmark, Layers, Coffee, HardHat
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const Contact: React.FC = () => {
  const { addInquiry, currentUser, currentCandidate } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (currentUser) setFormData(prev => ({ ...prev, name: currentUser.companyName, email: currentUser.email }));
    else if (currentCandidate) setFormData(prev => ({ ...prev, name: currentCandidate.name, email: currentCandidate.email }));
  }, [currentUser, currentCandidate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInquiry({
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      status: 'New',
      date: new Date().toISOString().split('T')[0]
    });
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isLoggedIn = !!currentUser || !!currentCandidate;

  return (
    <div className="bg-white min-h-screen">
      {/* Cinematic Hero */}
      <div className="relative py-32 bg-slate-950 overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-950 to-blue-900 opacity-90"></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
         
         <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse"></div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-500/10 text-blue-300 font-black text-[10px] uppercase tracking-[0.4em] mb-8 border border-blue-500/20 backdrop-blur-md">
                <Zap size={14} className="text-yellow-400" /> Maldivian Excellence Since 2014
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                Connect with our <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300">Expert Council</span>
            </h1>
            <p className="text-xl text-blue-100/70 max-w-3xl mx-auto leading-relaxed font-medium">
                Glow Tours & Trade operates specialized desks to ensure every inquiry is met with domain-specific intelligence and Category A speed.
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Essential Contact Channels */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-50 rounded-full opacity-50 group-hover:scale-150 transition-transform"></div>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl mb-8 group-hover:rotate-6 transition-transform">
                        <MapPin size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Main Headquarters</h3>
                    <p className="text-slate-500 font-medium leading-relaxed mb-6">
                        H. Glow Building, 2nd Floor<br />
                        Boduthakurufaanu Magu<br />
                        Malé, Republic of Maldives
                    </p>
                    <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] cursor-pointer group/link">
                        Open Navigation <ExternalLink size={12} className="group-hover/link:translate-x-1 transition-transform" />
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-50 rounded-full opacity-50 group-hover:scale-150 transition-transform"></div>
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-xl mb-8 group-hover:rotate-6 transition-transform">
                        <Phone size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Hotline Support</h3>
                    <p className="text-emerald-600 font-black text-2xl mb-4 tracking-tighter">+960 333 4444</p>
                    <div className="space-y-2">
                        <p className="text-xs text-slate-400 flex items-center gap-2 font-bold uppercase tracking-wider">
                            <Clock size={14} className="text-emerald-500"/> Sun-Thu: 09:00 - 17:00
                        </p>
                        <p className="text-xs text-emerald-600/70 flex items-center gap-2 font-bold uppercase tracking-wider">
                            <CheckCircle2 size={14}/> 15-Minute Callback Promise
                        </p>
                    </div>
                </div>

                <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl text-white hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white/5 rounded-full"></div>
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white shadow-xl mb-8 group-hover:rotate-6 transition-transform">
                        <Mail size={28} />
                    </div>
                    <h3 className="text-2xl font-black mb-4 tracking-tight">Digital Transmission</h3>
                    <p className="text-indigo-200 font-medium mb-1 truncate text-lg">info@glowtours.mv</p>
                    <p className="text-indigo-300/60 font-medium truncate text-sm">recruitment@glowtours.mv</p>
                    <div className="mt-8 pt-6 border-t border-white/10">
                        <p className="text-[10px] font-black uppercase text-white/30 tracking-[0.3em] mb-1">Response Velocity</p>
                        <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Avg. 2.4 Hours</p>
                    </div>
                </div>
            </div>

            {/* Main Engagement Form */}
            <div className="lg:col-span-2">
                <div className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden h-full flex flex-col">
                    <div className="p-8 md:p-16 flex-grow">
                        <div className="mb-12">
                             <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner">
                                    <MessageSquare size={28}/>
                                </div>
                                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Initialize Dialogue</h2>
                             </div>
                             <p className="text-slate-500 text-xl font-medium leading-relaxed">Our senior partners monitor this transmission channel directly. Please provide specific details for an immediate assessment.</p>
                        </div>

                        {submitted ? (
                            <div className="text-center py-20 bg-emerald-50/50 rounded-[3rem] border-2 border-dashed border-emerald-200 animate-in fade-in duration-500">
                                <div className="w-24 h-24 bg-emerald-100 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 animate-bounce shadow-xl">
                                    <Send className="text-emerald-600 h-10 w-10" />
                                </div>
                                <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Transmission Successful</h3>
                                <p className="text-slate-600 text-lg max-w-md mx-auto mb-10 font-medium">Your inquiry has been encrypted and routed to the relevant desk. A counselor will respond shortly.</p>
                                <button onClick={() => { setSubmitted(false); setFormData(prev => ({...prev, subject:'', message:''}))}} 
                                    className="px-10 py-5 bg-slate-950 text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition shadow-2xl transform active:scale-[0.98] flex items-center justify-center gap-4">
                                    <Send size={24} /> Transmit Inquiry
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {isLoggedIn && (
                                    <div className="flex items-start gap-4 bg-indigo-50 p-6 rounded-[2rem] text-indigo-800 border border-indigo-100 shadow-sm">
                                        <Info size={24} className="mt-0.5 text-indigo-600 flex-shrink-0" />
                                        <div>
                                            <p className="font-black uppercase text-[10px] tracking-widest mb-1 text-indigo-400">Authenticated Session</p>
                                            <p className="font-medium text-lg tracking-tight">Direct routing active for: <span className="font-black text-indigo-900 underline">{currentUser?.companyName || currentCandidate?.name}</span></p>
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2.5">
                                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-1">Legal Identity</label>
                                        <input required type="text" name="name" value={formData.name} onChange={handleChange} readOnly={isLoggedIn}
                                            className={`w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 focus:outline-none transition font-bold text-lg ${isLoggedIn ? 'text-slate-400' : 'text-slate-900'}`}
                                            placeholder="Your Legal Name" />
                                    </div>
                                    <div className="space-y-2.5">
                                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-1">Digital Identity</label>
                                        <input required type="email" name="email" value={formData.email} onChange={handleChange} readOnly={isLoggedIn}
                                            className={`w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 focus:outline-none transition font-bold text-lg ${isLoggedIn ? 'text-slate-400' : 'text-slate-900'}`}
                                            placeholder="you@organization.com" />
                                    </div>
                                </div>

                                <div className="space-y-2.5">
                                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-1">Transmission Subject</label>
                                    <input required type="text" name="subject" value={formData.subject} onChange={handleChange}
                                        className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 focus:outline-none transition font-bold text-lg text-slate-900"
                                        placeholder="e.g. Bulk Manpower Requirement - Resort Opening" />
                                </div>
                                
                                <div className="space-y-2.5">
                                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-1">Narrative Message</label>
                                    <textarea required name="message" rows={5} value={formData.message} onChange={handleChange}
                                        className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 focus:outline-none transition font-bold text-lg text-slate-900"
                                        placeholder="Please provide specifics regarding positions, deadlines, and project scope..." />
                                </div>

                                <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-[0.2em] hover:shadow-[0_20px_60px_-10px_rgba(79,70,229,0.5)] transition-all transform active:scale-[0.98] flex items-center justify-center gap-4">
                                    <Send size={24} /> Transmit Inquiry
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* Specialized Departmental Directory */}
        <div className="mt-32">
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-[0.4em] mb-4">
                    <Layers size={14} /> Domain Intelligence
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">Departmental Directory</h2>
                <p className="text-slate-500 font-medium text-lg leading-relaxed">Bypass the main queue by contacting our specialized operational units directly for time-sensitive or highly technical matters.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { name: "Hospitality Desk", desk: "Resorts & Hotels", icon: Coffee, color: "text-rose-500", bg: "bg-rose-50", email: "resorts@glowtours.mv", stat: "15m SLA" },
                    { name: "Legal Desk", desk: "Visas & Compliance", icon: Scale, color: "text-blue-500", bg: "bg-blue-50", email: "legal@glowtours.mv", stat: "Category A" },
                    { name: "Supply Desk", desk: "Industrial & Infra", icon: HardHat, color: "text-amber-600", bg: "bg-amber-50", email: "supply@glowtours.mv", stat: "Bulk Experts" },
                    { name: "Concierge Desk", desk: "Candidate Support", icon: LifeBuoy, color: "text-purple-500", bg: "bg-purple-50", email: "concierge@glowtours.mv", stat: "24/7 Support" }
                ].map((desk, didx) => (
                    <div key={didx} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col">
                        <div className={`absolute top-0 right-0 w-16 h-16 ${desk.bg} rounded-bl-[2rem] opacity-40 group-hover:scale-150 transition-transform`}></div>
                        <div className={`w-14 h-14 ${desk.bg} ${desk.color} rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform`}>
                            <desk.icon size={28} />
                        </div>
                        <h4 className="text-xl font-black text-slate-900 mb-1">{desk.name}</h4>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">{desk.desk}</p>
                        
                        <div className="mt-auto space-y-4">
                            <p className="text-sm font-bold text-indigo-600 underline underline-offset-4 decoration-2 truncate">{desk.email}</p>
                            <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-slate-300">
                                <span>Benchmarking</span>
                                <span className={desk.color}>{desk.stat}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Reach & Trust Section */}
        <div className="mt-32 p-12 md:p-24 bg-slate-900 rounded-[4rem] text-white relative overflow-hidden group border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-black"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] group-hover:scale-110 transition-transform duration-1000"></div>
            
            <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
                <div className="lg:w-3/5">
                    <div className="inline-flex items-center gap-2 bg-blue-500/20 px-5 py-2 rounded-full text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] mb-10 border border-blue-500/20">
                        <Globe size={16} /> Global Operational Footprint
                    </div>
                    <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-none mb-8">
                        The Maldives is <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 drop-shadow-2xl">Just the Beginning.</span>
                    </h2>
                    <p className="text-slate-400 text-xl leading-relaxed mb-12 font-medium">
                        Our recruitment engine spans 12+ nations with dedicated vetting hubs in Colombo, Dhaka, Kathmandu, and Manila. We don't just find workers; we curate international careers.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="flex items-start gap-5">
                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg">
                                <ShieldCheck size={28} className="text-blue-400" />
                            </div>
                            <div>
                                <h4 className="font-black text-lg text-white mb-1">State Vetted</h4>
                                <p className="text-sm text-slate-500 font-medium">Fully government-approved Category A desks.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-5">
                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg">
                                <Landmark size={28} className="text-purple-400" />
                            </div>
                            <div>
                                <h4 className="font-black text-lg text-white mb-1">Regulatory Core</h4>
                                <p className="text-sm text-slate-500 font-medium">100% compliant with Maldives Labor Laws.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="lg:w-2/5 w-full aspect-square bg-white/[0.03] rounded-[4rem] border border-white/10 flex items-center justify-center relative group/inner overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10"></div>
                    <div className="text-center relative z-10 px-8">
                        <Globe size={140} className="text-blue-600/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/inner:scale-125 transition-transform duration-1000" />
                        <div className="relative">
                            <p className="text-[9rem] font-black tracking-tighter text-white/90 leading-none mb-2 drop-shadow-2xl">12+</p>
                            <p className="text-xs font-black uppercase tracking-[0.6em] text-blue-400">Global Hub Nations</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;