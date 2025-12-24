import React from 'react';
import { 
  ShieldCheck, Target, Lightbulb, Users, Globe, Award, Briefcase, 
  CheckCircle, ArrowRight, Star, Heart, Zap, Sparkles, 
  Handshake, Shield, Rocket, BarChart, Compass, Bookmark, Building2,
  Fingerprint, Eye, Scale, Gem, Landmark, TrendingUp, Linkedin, Twitter, Mail,
  Quote, ShieldAlert, Cpu, Network, Layers, ShieldPlus, ZapOff, Sparkle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const coreValues = [
    { 
        icon: ShieldCheck, 
        title: "Ethical Integrity", 
        principle: "The Gold Standard",
        desc: "We maintain the highest standards of professional ethics as a Category A licensed entity. Our operations are built on a foundation of absolute transparency, ensuring that every candidate placement and business contract is handled with rigorous legal precision and moral clarity, safeguarding the interests of both employers and employees.",
        gradient: "from-emerald-400 via-teal-500 to-green-600",
        bgLight: "bg-emerald-50/50",
        border: "border-emerald-100",
        shadow: "shadow-emerald-200/50",
        textColor: "text-emerald-700"
    },
    { 
        icon: Heart, 
        title: "People-Centricity", 
        principle: "Human First",
        desc: "At Glow, we believe people are the heartbeat of any organization. We focus on the holistic well-being of our candidates, ensuring they are placed in supportive environments where they can flourish professionally. By matching individuals to cultures, not just job descriptions, we ensure long-term harmony and high productivity.",
        gradient: "from-rose-400 via-pink-500 to-red-600",
        bgLight: "bg-rose-50/50",
        border: "border-rose-100",
        shadow: "shadow-rose-200/50",
        textColor: "text-rose-700"
    },
    { 
        icon: Globe, 
        title: "Global Intelligence", 
        principle: "Borderless Reach",
        desc: "Our sourcing network transcends traditional boundaries. We leverage hyper-local intelligence in over 12 countries across South Asia, ASEAN, and Europe. This allow us to identify rising stars and seasoned veterans who bring not just skills, but global perspectives ready to adapt to the unique Maldivian landscape.",
        gradient: "from-blue-400 via-indigo-500 to-blue-700",
        bgLight: "bg-blue-50/50",
        border: "border-blue-100",
        shadow: "shadow-blue-200/50",
        textColor: "text-blue-700"
    },
    { 
        icon: Zap, 
        title: "Operational Agility", 
        principle: "Velocity & Precision",
        desc: "In a fast-paced economy, time-to-hire is a critical competitive advantage. We have re-engineered our internal workflows to provide rapid response cycles and streamlined document processing. Our Category A status grants us priority processing, reducing deployment lead times by 30% compared to industry averages.",
        gradient: "from-amber-400 via-orange-500 to-yellow-600",
        bgLight: "bg-amber-50/50",
        border: "border-amber-100",
        shadow: "shadow-amber-200/50",
        textColor: "text-amber-700"
    },
    { 
        icon: Handshake, 
        title: "Strategic Partnership", 
        principle: "Consultative Ally",
        desc: "We don't just fill vacancies; we architect workforce solutions. We act as a strategic extension of your HR department, providing deep-dive consultancy on labor market trends, Maldivian Employment Act compliance, salary benchmarking, and organizational design to maximize your human capital ROI.",
        gradient: "from-purple-400 via-violet-500 to-fuchsia-600",
        bgLight: "bg-purple-50/50",
        border: "border-purple-100",
        shadow: "shadow-purple-200/50",
        textColor: "text-purple-700"
    },
    { 
        icon: BarChart, 
        title: "Sustainable Growth", 
        principle: "Economic Catalyst",
        desc: "Our vision is intrinsically linked to the economic prosperity of the Maldives. By providing the right human capital at the right time, we empower businesses to scale, innovate, and contribute to the national vision. We measure our success not just in placements, but in the sustained growth of the enterprises we serve.",
        gradient: "from-cyan-400 via-blue-500 to-sky-600",
        bgLight: "bg-cyan-50/50",
        border: "border-cyan-100",
        shadow: "shadow-cyan-200/50",
        textColor: "text-cyan-700"
    }
  ];

  const executiveTeam = [
    { 
        name: "Ahmed Saeed", 
        role: "Managing Director", 
        specialty: "Strategic Governance",
        bio: "With over 20 years in international trade, Ahmed directs the high-level vision of Glow, fostering strategic government relations and cross-border partnerships.",
        expertise: ["Legal Compliance", "Market Expansion", "Diplomacy"],
        img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
        color: "blue",
        gradient: "from-blue-600 via-indigo-600 to-violet-700",
        accent: "bg-blue-500/20 text-blue-400"
    },
    { 
        name: "Mariyam Niuma", 
        role: "Head of Operations", 
        specialty: "Process Excellence",
        bio: "Mariyam oversees our 24/7 recruitment engine, ensuring that every document, quota application, and deployment meets our zero-error quality benchmark.",
        expertise: ["Xpat Online Mgmt", "Logistics", "HR Tech"],
        img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
        color: "purple",
        gradient: "from-purple-600 via-fuchsia-600 to-rose-700",
        accent: "bg-purple-500/20 text-purple-400"
    },
    { 
        name: "Ibrahim Rasheed", 
        role: "Recruitment Director", 
        specialty: "Talent Acquisition",
        bio: "A veteran headhunter, Ibrahim manages our global hub network, personally vetting senior candidates for Maldives' most prestigious resort projects.",
        expertise: ["Global Sourcing", "Vetting", "Client Success"],
        img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
        color: "emerald",
        gradient: "from-emerald-600 via-teal-600 to-cyan-700",
        accent: "bg-emerald-500/20 text-emerald-400"
    }
  ];

  const visionPillars = [
    {
        title: "Digital Ecosystem",
        subtitle: "High-Tech Integration",
        desc: "We utilize advanced HR-Tech to track quotas and applications in real-time, offering clients a paperless, friction-free experience via the Xpat Online portal.",
        icon: Cpu,
        gradient: "from-cyan-400 to-blue-600",
        shadow: "shadow-cyan-200"
    },
    {
        title: "Legal Fortification",
        subtitle: "Unmatched Compliance",
        desc: "Our Category A mandate allows us to navigate the complexities of the Maldives Employment Act with absolute legal safety for all parties involved.",
        icon: ShieldPlus,
        gradient: "from-indigo-500 to-violet-700",
        shadow: "shadow-indigo-200"
    },
    {
        title: "Cultural Synergy",
        subtitle: "Precision Vetting",
        desc: "We don't just check skills; we ensure cultural alignment. Every candidate is briefed on Maldivian work ethics and resort hospitality benchmarks before arrival.",
        icon: Sparkle,
        gradient: "from-pink-500 to-rose-600",
        shadow: "shadow-rose-200"
    }
  ];

  return (
    <div className="bg-white">
      {/* Enhanced Hero Section */}
      <div className="relative py-32 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-900 opacity-95"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[150px] animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-300 font-black text-[10px] uppercase tracking-[0.3em] mb-8 border border-blue-500/20 backdrop-blur-md">
                <Sparkles size={14} className="text-yellow-400" /> Defining the Future of Work
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                The Glow <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300">Legacy</span>
            </h1>
            <p className="text-xl text-blue-100/80 max-w-4xl mx-auto leading-relaxed font-medium">
                For over a decade, Glow Tours and Trade has stood as a beacon of excellence in the recruitment landscape. We harmonize the ambitions of global professionals with the dynamic needs of the Maldives' premier organizations.
            </p>
        </div>
      </div>

      {/* REFACTORED: A Visionary Approach to Human Capital Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-slate-50 to-transparent"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-blue-50 rounded-full blur-[100px] opacity-60"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-start gap-20">
                <div className="lg:w-1/2">
                    <div className="inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full text-indigo-600 font-black text-[11px] uppercase tracking-[0.2em] mb-8 shadow-sm border border-indigo-100">
                        <Compass size={16} /> Our Philosophy
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-10 tracking-tighter leading-none">
                        A Visionary Approach to <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                            Human Capital
                        </span>
                    </h2>
                    
                    <div className="space-y-8 text-xl text-slate-600 font-medium leading-relaxed max-w-xl">
                        <p className="relative">
                            <span className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full opacity-30"></span>
                            Glow Tours and Trade Pvt Ltd was founded with a singular purpose: to <span className="text-slate-900 font-black">standardize excellence</span> in the Maldivian recruitment industry. We recognized that rapid national growth required a more sophisticated, global approach.
                        </p>
                        <p>
                            As a <span className="text-indigo-600 font-bold">Category A</span> licensed entity, we have moved beyond simple placement. We manage the entire lifecycle—from the first digital profile vetting to the final on-site cultural orientation.
                        </p>
                    </div>
                    
                    <div className="mt-16 flex flex-wrap gap-6">
                        <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl flex-1 min-w-[240px] relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                            <h4 className="text-4xl font-black mb-1">5,000+</h4>
                            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">Global Placements</p>
                            <div className="h-1 w-12 bg-blue-500 rounded-full group-hover:w-full transition-all duration-700"></div>
                        </div>
                        <div className="bg-white border-4 border-slate-100 p-8 rounded-[3rem] shadow-xl flex-1 min-w-[240px] group hover:border-indigo-100 hover:shadow-2xl transition-all duration-500">
                            <h4 className="text-4xl font-black text-slate-900 mb-1">150+</h4>
                            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">Corporate Partners</p>
                            <div className="h-1 w-12 bg-indigo-500 rounded-full group-hover:w-full transition-all duration-700"></div>
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/2 grid grid-cols-1 gap-8">
                    {visionPillars.map((pillar, pidx) => (
                        <div key={pidx} className="group relative bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100 hover:shadow-2xl hover:border-white transition-all duration-500 flex items-start gap-8">
                            <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-[0.03] rounded-[3rem] transition-opacity duration-500`}></div>
                            
                            <div className={`flex-shrink-0 w-20 h-20 bg-gradient-to-br ${pillar.gradient} rounded-[2rem] flex items-center justify-center text-white shadow-2xl ${pillar.shadow} group-hover:rotate-6 transition-transform duration-500`}>
                                <pillar.icon size={36} />
                            </div>
                            
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{pillar.title}</h4>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {pillar.subtitle}
                                    </span>
                                </div>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                    {pillar.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                    
                    {/* Visual Asset */}
                    <div className="mt-4 rounded-[4rem] overflow-hidden shadow-3xl border-8 border-white ring-1 ring-slate-100 h-64 relative group">
                        <img 
                            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                            alt="Team Collaboration" 
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-indigo-900/20 to-transparent"></div>
                        <div className="absolute bottom-8 left-10 flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                                <Building2 size={20} />
                            </div>
                            <p className="text-white font-black text-xl tracking-tight">Established Global Presence</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Strategic Foundations */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
            <div className="absolute top-10 left-10 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] opacity-60"></div>
            <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[120px] opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-24 max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full text-slate-600 font-black text-[10px] uppercase tracking-[0.2em] mb-6 shadow-sm border border-slate-200">
                    <Gem size={14} className="text-indigo-500" /> Operational DNA
                </div>
                <h2 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.1]">
                    Our Strategic <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                        Foundations
                    </span>
                </h2>
                <p className="text-slate-500 text-xl md:text-2xl font-medium leading-relaxed italic">
                    "Excellence is not an act, but a habit. Our foundations ensure every connection we make is built to last."
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {coreValues.map((val, idx) => (
                    <div key={idx} className={`group relative bg-white rounded-[3.5rem] p-10 border-2 ${val.border} hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden flex flex-col`}>
                        <div className={`absolute -bottom-24 -right-24 w-48 h-48 bg-gradient-to-br ${val.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-700`}></div>
                        
                        <div className="flex justify-between items-start mb-10">
                            <div className={`w-20 h-20 bg-gradient-to-br ${val.gradient} rounded-[2rem] flex items-center justify-center text-white shadow-2xl ${val.shadow} group-hover:rotate-6 group-hover:scale-110 transition-all duration-500`}>
                                <val.icon size={40} />
                            </div>
                            <div className={`text-[10px] font-black uppercase tracking-widest ${val.textColor} bg-white px-4 py-2 rounded-full border ${val.border} shadow-sm`}>
                                {val.principle}
                            </div>
                        </div>
                        
                        <div className="mb-6">
                            <h3 className="text-3xl font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors leading-tight">
                                {val.title}
                            </h3>
                            <div className={`h-1.5 w-12 bg-gradient-to-r ${val.gradient} rounded-full mb-6 group-hover:w-full transition-all duration-700`}></div>
                        </div>

                        <p className="text-slate-600 leading-relaxed font-medium text-base mb-8">
                            {val.desc}
                        </p>

                        <div className="mt-auto flex justify-between items-center opacity-30 group-hover:opacity-100 transition-opacity">
                             <div className="flex -space-x-2">
                                {[1,2,3].map(i => <div key={i} className={`w-2 h-2 rounded-full bg-gradient-to-r ${val.gradient}`}></div>)}
                             </div>
                             <ArrowRight size={20} className={`${val.textColor} transform -rotate-45 group-hover:rotate-0 transition-transform duration-500`} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-24 p-12 bg-slate-900 rounded-[4rem] text-white flex flex-col lg:flex-row items-center justify-between gap-10 shadow-3xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-[0.03] rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                 
                 <div className="flex items-center gap-8 relative z-10">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center border border-white/20 shadow-2xl">
                        <Landmark size={36} className="text-blue-400" />
                    </div>
                    <div>
                        <h4 className="text-3xl font-black mb-2 tracking-tight">The Glow Quality Charter</h4>
                        <p className="text-slate-400 font-medium text-lg">100% compliant, 100% committed, 100% Maldivian pride.</p>
                    </div>
                 </div>

                 <div className="flex gap-4 relative z-10">
                    <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-3xl text-center">
                        <p className="text-4xl font-black text-blue-400 mb-1">98%</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Retention Rate</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-3xl text-center">
                        <p className="text-4xl font-black text-purple-400 mb-1">A+</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Compliance Rating</p>
                    </div>
                 </div>
            </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[4rem] opacity-90 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative p-12 md:p-16 h-full flex flex-col text-white">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-10 border border-white/30 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                            <Target size={40} className="text-white" />
                        </div>
                        <h3 className="text-4xl font-black mb-6 tracking-tighter">Our Mission</h3>
                        <p className="text-blue-50 text-xl leading-relaxed font-medium opacity-90">
                            To redefine the manpower industry in the Maldives by delivering ethically sourced, precisely vetted, and operationally ready talent. We strive to be the catalyst for our clients' organizational growth and our candidates' professional fulfillment.
                        </p>
                        <div className="mt-auto pt-12 flex items-center gap-4">
                            <div className="h-px w-12 bg-white/30"></div>
                            <span className="text-xs font-black uppercase tracking-[0.4em] text-white/50">Commitment 2025</span>
                        </div>
                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[4rem] opacity-95 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative p-12 md:p-16 h-full flex flex-col text-white">
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-10 border border-white/10 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                            <Rocket size={40} className="text-blue-400" />
                        </div>
                        <h3 className="text-4xl font-black mb-6 tracking-tighter">Our Vision</h3>
                        <p className="text-slate-300 text-xl leading-relaxed font-medium">
                            To stand as the undisputed leader in international human resource solutions within the Maldives. We envision a future where every critical sector of the nation is powered by professionals who have been empowered through our world-class sourcing ecosystem.
                        </p>
                        <div className="mt-auto pt-12 flex items-center gap-4">
                            <div className="h-px w-12 bg-white/10"></div>
                            <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">Impact Driven</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05]"></div>
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[150px]"></div>
         </div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             <div className="text-center mb-32 max-w-3xl mx-auto">
                 <div className="inline-flex items-center gap-2 bg-blue-500/10 px-5 py-2 rounded-full text-blue-400 font-black text-[11px] uppercase tracking-[0.3em] mb-8 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                    <Users size={16} className="text-blue-500"/> The Executive Council
                 </div>
                 <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
                    Architects of <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">Global Connection</span>
                 </h2>
                 <p className="text-slate-400 text-xl font-medium leading-relaxed">
                    Our leadership combines decades of logistical expertise with a deep commitment to ethical recruitment and national prosperity.
                 </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {executiveTeam.map((member, idx) => (
                    <div key={idx} className="group relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-[0.07] rounded-[4rem] blur-3xl transition-opacity duration-700`}></div>
                        
                        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-10 rounded-[4rem] h-full flex flex-col hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 relative overflow-hidden group/card">
                            
                            <div className="absolute top-8 right-8 text-white/5 group-hover/card:text-white/20 transition-colors duration-500">
                                <Quote size={64} />
                            </div>

                            <div className="relative w-48 h-48 mx-auto mb-10">
                                <div className={`absolute -inset-2 bg-gradient-to-br ${member.gradient} rounded-[3rem] blur-lg opacity-40 group-hover:opacity-80 transition-opacity duration-700 animate-pulse`}></div>
                                <div className="relative w-full h-full rounded-[2.8rem] overflow-hidden border-4 border-white/10 shadow-3xl">
                                    <img 
                                        src={member.img} 
                                        alt={member.name} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                                    />
                                </div>
                                <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-slate-950 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl transform group-hover:scale-110 transition-transform duration-500`}>
                                    {member.role}
                                </div>
                            </div>

                            <div className="text-center mt-4 mb-8">
                                <h3 className="text-3xl font-black mb-1 tracking-tight text-white group-hover:text-blue-300 transition-colors">
                                    {member.name}
                                </h3>
                                <p className={`text-xs font-bold uppercase tracking-[0.2em] mb-6 ${member.accent.split(' ')[1]}`}>
                                    {member.specialty}
                                </p>
                                
                                <div className="flex flex-wrap justify-center gap-2 mb-8">
                                    {member.expertise.map((exp, eidx) => (
                                        <span key={eidx} className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10 ${member.accent}`}>
                                            {exp}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-slate-400 text-sm leading-relaxed font-medium mb-8 italic">
                                    "{member.bio}"
                                </p>
                            </div>
                            
                            <div className="mt-auto pt-8 border-t border-white/5 flex justify-center items-center gap-6">
                                <button className="p-3 rounded-2xl bg-white/5 text-slate-400 hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                                    <Linkedin size={20} />
                                </button>
                                <button className="p-3 rounded-2xl bg-white/5 text-slate-400 hover:bg-sky-500 hover:text-white transition-all transform hover:-translate-y-1">
                                    <Twitter size={20} />
                                </button>
                                <button className="p-3 rounded-2xl bg-white/5 text-slate-400 hover:bg-rose-500 hover:text-white transition-all transform hover:-translate-y-1">
                                    <Mail size={20} />
                                </button>
                            </div>

                            <div className={`absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r ${member.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}></div>
                        </div>
                    </div>
                ))}
             </div>

             <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                    { icon: ShieldAlert, label: "Regulatory Oversight", val: "100%", color: "text-blue-400" },
                    { icon: Cpu, label: "Tech Integration", val: "A-Grade", color: "text-purple-400" },
                    { icon: Network, label: "Global Reach", val: "12+ Hubs", color: "text-emerald-400" },
                    { icon: TrendingUp, label: "Annual Success", val: "2.4k+", color: "text-amber-400" }
                ].map((stat, sidx) => (
                    <div key={sidx} className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center hover:bg-white/10 transition-colors">
                        <stat.icon size={24} className={`mx-auto mb-3 ${stat.color}`} />
                        <p className="text-2xl font-black mb-1">{stat.val}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                    </div>
                ))}
             </div>
         </div>
      </section>

      {/* Enhanced CTA */}
      <div className="bg-white py-32 relative overflow-hidden">
         <div className="max-w-6xl mx-auto px-4">
            <div className="bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-800 rounded-[4rem] p-16 md:p-24 text-center text-white shadow-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-[0.03] rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-black opacity-[0.03] rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                
                <div className="relative z-10">
                    <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center mx-auto mb-10 border border-white/20 shadow-2xl rotate-3">
                        <Handshake size={48} className="text-white" />
                    </div>
                    <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-tight">Ready to Align with <br/><span className="text-blue-200">Excellence?</span></h2>
                    <p className="text-blue-100 text-2xl mb-12 max-w-3xl mx-auto font-medium leading-relaxed opacity-90">
                        Join the portfolio of premium Maldivian partners who prioritize human capital as their primary competitive advantage.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link to="/contact" className="inline-flex items-center justify-center px-12 py-6 bg-white text-indigo-900 text-xl font-black rounded-full hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-all duration-300">
                            Partner With Us
                        </Link>
                        <Link to="/services" className="inline-flex items-center justify-center px-12 py-6 bg-transparent border-4 border-white/30 text-white text-xl font-black rounded-full hover:bg-white/10 transition-all duration-300">
                            Our Capabilities <ArrowRight size={24} className="ml-3" />
                        </Link>
                    </div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default About;