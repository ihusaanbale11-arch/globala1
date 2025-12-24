import React, { useState } from 'react';
import { 
  ShieldCheck, ArrowRight, Sparkles, Globe, HeartHandshake, 
  MapPin, Clock, PlaneLanding, Briefcase, Star, Lightbulb, 
  CheckCircle, LifeBuoy, Fingerprint, Anchor, UserCheck, 
  Smile, Sun, Compass, Zap, ShieldPlus, Verified, Trophy,
  Users2, Landmark, Waves, Gem, Rocket, Laptop, GraduationCap,
  HeartPulse, ShieldCheck as ShieldIcon, Coffee, Building2,
  ChevronDown, ChevronUp, Plus, HardHat, Utensils
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Independent Step Card Component
const StepCard = ({ step, index }: { step: any, index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative group flex flex-col h-full">
      <div className={`border p-14 rounded-[4.5rem] backdrop-blur-3xl transition-all duration-700 h-full flex flex-col relative z-10 overflow-hidden ${isExpanded ? 'bg-white/[0.08] border-white/30' : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20'}`}>
        <div className="flex justify-between items-start mb-12">
          <div className={`w-24 h-24 ${step.bg} ${step.color} rounded-[2.8rem] flex items-center justify-center shadow-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 border-2 ${step.border}`}>
            <step.icon size={44} strokeWidth={1.5} />
          </div>
          <span className="text-4xl font-black text-white/10 group-hover:text-white/20">{index + 1}</span>
        </div>
        <h3 className="text-3xl font-black text-white mb-8 tracking-tight leading-tight">{step.title}</h3>
        <p className="text-slate-400 font-medium text-lg leading-relaxed mb-6 flex-grow">
          {isExpanded ? step.fullDesc : step.shortDesc}
        </p>
        
        <button 
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-blue-400 font-black text-xs uppercase tracking-widest hover:text-blue-300 transition-colors mb-8 w-fit"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
          {isExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
        </button>

        <div className="flex items-center gap-3 pt-8 border-t border-white/5">
          <div className={`w-2 h-2 rounded-full ${step.bg} animate-pulse`}></div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Verified Tier</span>
        </div>
      </div>
    </div>
  );
};

// Independent Feature Card Component
const FeatureCard = ({ item }: { item: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`group p-14 rounded-[5rem] border-2 transition-all duration-700 hover:-translate-y-5 relative overflow-hidden flex flex-col h-full ${isExpanded ? 'bg-white shadow-[0_60px_120px_-40px_rgba(0,0,0,0.1)] border-indigo-100' : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)]'}`}>
      <div className={`absolute -bottom-24 -right-24 w-80 h-80 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.03] rounded-full blur-3xl transition-opacity duration-1000`}></div>
      
      <div className={`w-28 h-28 bg-white rounded-[2.5rem] flex items-center justify-center ${item.iconColor} shadow-[0_20px_40px_rgba(0,0,0,0.04)] mb-12 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 border border-slate-50`}>
        <item.icon size={56} strokeWidth={1.2} />
      </div>
      
      <h3 className="text-4xl font-black text-slate-900 mb-8 tracking-tight leading-tight">{item.title}</h3>
      <p className="text-slate-500 leading-relaxed font-medium text-xl flex-grow">
        {isExpanded ? item.fullDesc : item.shortDesc}
      </p>
      
      <button 
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-8 flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest hover:text-indigo-800 transition-colors w-fit"
      >
        {isExpanded ? 'Read Less' : 'Read More'}
        {isExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
      </button>
    </div>
  );
};

const Candidates: React.FC = () => {
  const steps = [
    {
      title: "Digital Enrollment",
      shortDesc: "Submit your credentials to our elite talent cloud via our secure high-tech recruitment portal.",
      fullDesc: "Your journey starts with our secure recruitment portal. Submit your passport details, professional certifications, and career history. Our system uses advanced matching algorithms to pair your profile with the Maldives' most prestigious upcoming projects instantly.",
      icon: UserCheck,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      accent: "from-blue-400 to-indigo-600"
    },
    {
      title: "Elite Technical Vetting",
      shortDesc: "Multi-stage technical and behavioral evaluations conducted by senior recruitment specialists.",
      fullDesc: "We go beyond the resume. Our senior recruitment specialists conduct multi-stage technical evaluations and behavioral interviews via high-definition video conferencing. We assess your technical mastery, English proficiency, and readiness for ultra-luxury environments.",
      icon: Fingerprint,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      accent: "from-purple-400 to-fuchsia-600"
    },
    {
      title: "Legal & Logistics Desk",
      shortDesc: "100% management of your permits, visas, and clearances for a friction-free transition.",
      fullDesc: "As a Category A Agency, we handle 100% of your Work Permit applications, Xpat Online processing, medical clearance coordination, and entry visa facilitation. We ensure your transition is friction-free and fully compliant with the Maldivian Employment Act.",
      icon: ShieldPlus,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      accent: "from-emerald-400 to-teal-600"
    },
    {
      title: "Island Deployment",
      shortDesc: "Dedicated airport reception and coordination of transfers to your prestigious new employer.",
      fullDesc: "Welcome to the Sunny Side of Life. Our dedicated airport reception team meets you at Velana International Airport. We coordinate your domestic transfers—whether by speedboat or seaplane—and ensure a warm handover to your employer’s HR team.",
      icon: PlaneLanding,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
      accent: "from-rose-400 to-pink-600"
    }
  ];

  const features = [
    {
      title: "State-Bonded Security",
      shortDesc: "Total legal protection backed by a Category A license and a substantial government bond.",
      fullDesc: "Working through Glow Tours means total legal protection. Our Category A status is backed by a substantial government bank bond, guaranteeing that your recruitment journey is safe, transparent, and fully insured against any operational risks.",
      icon: ShieldCheck,
      color: "blue",
      gradient: "from-blue-500 to-indigo-700",
      iconColor: "text-blue-500"
    },
    {
      title: "Ethical Sourcing Standard",
      shortDesc: "Strict zero-fee policy for candidates and adherence to international fair recruitment principles.",
      fullDesc: "We strictly adhere to the IRIS principles. Glow operates with a strict zero-fee policy for candidates—no hidden charges, no administrative kickbacks, and no exploitation. We believe in merit-based recruitment where talent is the only currency that matters.",
      icon: Verified,
      color: "emerald",
      gradient: "from-emerald-500 to-teal-700",
      iconColor: "text-emerald-500"
    },
    {
      title: "Career Architecture",
      shortDesc: "Strategic placement in top-tier luxury resorts designed to escalate your professional value.",
      fullDesc: "We don't just find you a job; we curate your professional legacy. By placing you in the Maldives' top-tier resorts (Four Seasons, Ritz-Carlton, Soneva) or massive infrastructure firms, we ensure your professional value skyrockets globally.",
      icon: Trophy,
      color: "amber",
      gradient: "from-amber-400 to-orange-600",
      iconColor: "text-amber-500"
    }
  ];

  return (
    <div className="bg-white">
      {/* Cinematic Hero */}
      <section className="relative py-44 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-blue-900 opacity-95"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[160px] translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-6 py-2.5 rounded-full text-blue-300 font-black text-[10px] uppercase tracking-[0.4em] mb-12 border border-blue-500/30 backdrop-blur-xl shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                <Sparkles size={16} className="text-yellow-400 animate-pulse" /> Your Global Career Architecture
            </div>
            <h1 className="text-6xl md:text-9xl font-black text-white mb-10 tracking-tighter leading-[0.85]">
                Empowering <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300 drop-shadow-[0_0_40px_rgba(59,130,246,0.5)]">The World's Best</span>
            </h1>
            <p className="text-2xl text-blue-100/70 max-w-4xl mx-auto leading-relaxed font-medium mb-16">
                Glow Tours & Trade is the definitive portal for high-performance professionals seeking to elevate their careers in the Republic of Maldives.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                <Link to="/candidate/register" className="group relative inline-flex items-center px-16 py-8 bg-white text-indigo-950 text-2xl font-black rounded-full hover:shadow-[0_30px_70px_rgba(255,255,255,0.2)] hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                    <span className="relative z-10">Register Profile</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </Link>
                <Link to="/services#vacancies" className="inline-flex items-center px-16 py-8 bg-blue-600/10 border-4 border-blue-500/30 text-white text-2xl font-black rounded-full hover:bg-blue-600 hover:border-blue-600 transition-all duration-500 backdrop-blur-md group">
                    View Jobs <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
                </Link>
            </div>
        </div>
      </section>

      {/* Why Choose Glow Tours */}
      <section className="py-44 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-32 max-w-4xl mx-auto">
                  <div className="inline-flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-[0.5em] mb-6">
                      <Star size={18} className="fill-indigo-600" /> Premium Sourcing Mandate
                  </div>
                  <h2 className="text-5xl md:text-8xl font-black text-slate-900 mb-10 tracking-tighter leading-none">Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Glow Tours?</span></h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {features.map((item, idx) => (
                    <FeatureCard key={idx} item={item} />
                  ))}
              </div>
          </div>
      </section>

      {/* The Glow Recruitment Matrix */}
      <section className="py-44 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-36 gap-12">
                <div className="max-w-3xl">
                    <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-10">
                        The Glow <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-300">Recruitment Matrix</span>
                    </h2>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {steps.map((step, idx) => (
                  <StepCard key={idx} step={step} index={idx} />
                ))}
            </div>
        </div>
      </section>

      {/* Life in the Maldives - Enhanced with Work Imagery */}
      <section className="py-44 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-start gap-24">
                <div className="lg:w-2/5">
                    <div className="inline-flex items-center gap-3 bg-rose-50 px-6 py-2.5 rounded-full text-rose-600 font-black text-[11px] uppercase tracking-[0.4em] mb-12 border border-rose-100 shadow-sm">
                        <Waves size={18} /> Living in the Sunny Side
                    </div>
                    <h2 className="text-6xl md:text-9xl font-black text-slate-900 mb-12 tracking-tighter leading-[0.85]">
                        Life in <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-500 to-rose-400 drop-shadow-xl">Pure Paradise</span>
                    </h2>
                    
                    <p className="text-slate-500 text-xl font-medium leading-relaxed mb-16 max-w-md">
                        Working in the Maldives isn't just a job; it's a prestige placement in the world's most beautiful workplace.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16">
                        {[
                            { title: "Global Diversity", desc: "50+ Nations.", icon: Users2, color: "text-blue-500", bg: "bg-blue-50" },
                            { title: "Island Housing", desc: "All-inclusive.", icon: Landmark, color: "text-amber-500", bg: "bg-amber-50" },
                            { title: "Cultural Respect", desc: "Community Core.", icon: Compass, color: "text-emerald-500", bg: "bg-emerald-50" },
                            { title: "Elite Skills", desc: "Luxury Market.", icon: Gem, color: "text-purple-500", bg: "bg-purple-50" }
                        ].map((info, i) => (
                            <div key={i} className={`${info.bg} p-8 rounded-[3.5rem] border border-white shadow-xl hover:-translate-y-2 transition-all duration-500`}>
                                <div className={`w-12 h-12 bg-white rounded-2xl flex items-center justify-center ${info.color} shadow-sm mb-4`}>
                                    <info.icon size={24} />
                                </div>
                                <h4 className="font-black text-slate-900 text-lg mb-1 tracking-tight">{info.title}</h4>
                                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">{info.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:w-3/5">
                    {/* Cinematic Staggered Gallery */}
                    <div className="grid grid-cols-2 gap-8 items-stretch">
                        <div className="space-y-8">
                            <div className="relative group rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white transition-all duration-700 hover:-translate-y-2 aspect-[4/5]">
                                <img src="/Assets/images/Maldives-new-terminal-850x567.jpeg" alt="Maldives Resort" className="w-full h-full object-cover group-hover:scale-110 transition duration-[2s]" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                    <span className="text-white font-black text-xs uppercase tracking-widest flex items-center gap-2"><Sun size={14}/> Island Environment</span>
                                </div>
                            </div>
                            <div className="relative group rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white transition-all duration-700 hover:-translate-y-2 aspect-square">
                                <img src="/Assets/images/Maldives-new-terminal-850x567.jpeg" alt="Hospitality Work" className="w-full h-full object-cover group-hover:scale-110 transition duration-[2s]" />
                                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                    <span className="text-white font-black text-xs uppercase tracking-widest flex items-center gap-2"><Utensils size={14}/> Hospitality Excellence</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-8 pt-16">
                            <div className="relative group rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white transition-all duration-700 hover:-translate-y-2 aspect-square">
                                <img src="/Assets/images/Maldives-new-terminal-850x567.jpeg" alt="Infrastructure Work" className="w-full h-full object-cover group-hover:scale-110 transition duration-[2s]" />
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                    <span className="text-white font-black text-xs uppercase tracking-widest flex items-center gap-2"><HardHat size={14}/> Urban Development</span>
                                </div>
                            </div>
                            <div className="relative group rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white transition-all duration-700 hover:-translate-y-2 aspect-[4/5]">
                                <img src="/Assets/images/Maldives-new-terminal-850x567.jpeg" alt="Maldives Logistics" className="w-full h-full object-cover group-hover:scale-110 transition duration-[2s]" />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                    <span className="text-white font-black text-xs uppercase tracking-widest flex items-center gap-2"><Anchor size={14}/> Marine Logistics</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Career CTA */}
      <section className="py-44 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-900/30 rounded-full blur-[200px] opacity-40"></div>
            <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-purple-900/30 rounded-full blur-[200px] opacity-40 animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
            <div className="w-32 h-32 bg-white/10 rounded-[3rem] flex items-center justify-center mx-auto mb-16 backdrop-blur-3xl border border-white/10 rotate-12">
                <Rocket size={64} className="text-blue-400" />
            </div>
            <h2 className="text-6xl md:text-[8rem] font-black mb-12 tracking-tighter leading-[0.85]">
                Launch Your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200">Global Future</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
                <Link to="/candidate/register" className="w-full md:w-auto px-20 py-10 bg-white text-indigo-950 rounded-full font-black text-3xl hover:shadow-[0_40px_100px_-20px_rgba(255,255,255,0.25)] hover:scale-110 transition-all duration-700 shadow-2xl active:scale-95">
                    Enroll Now
                </Link>
                <Link to="/contact" className="w-full md:w-auto px-20 py-10 bg-transparent border-4 border-white/20 text-white rounded-full font-black text-3xl hover:bg-white/10 hover:border-white transition-all duration-500 active:scale-95">
                    Request Callback
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Candidates;