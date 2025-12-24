




import React, { useState, useEffect } from 'react';
import { 
  FileCheck, Users, Globe, Briefcase, CheckCircle, 
  ShieldCheck, HardHat, Building2, MapPin, DollarSign, X, Upload, GraduationCap, 
  Search, Shield, Star, Lightbulb, Heart, Coffee, Car, Plane, Landmark, Laptop, Sparkles, 
  ChevronRight, BarChart3, Fingerprint, ShieldAlert, Award, ArrowRight, ClipboardList, UserCheck, FastForward,
  Clock, Gavel, Scale, Lock, BookOpen, Timer, ZapOff, Flame, Compass, HeartPulse, ShieldPlus, Verified, Medal,
  UserX, Info, LogOut, Rocket
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const Services: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const mainServices = [
    {
        title: "International Recruitment",
        icon: Globe,
        color: "blue",
        gradient: "from-blue-600 via-indigo-600 to-blue-700",
        desc: "Our global sourcing strategy transcends borders. We utilize a mix of digital headhunting and established local agency partnerships.",
        detailedDesc: "Technical assessments and cultural fit evaluations to ensure long-term placement success.",
        features: ["Multi-country Sourcing", "Rigorous Interviewing", "Reference Checks", "Skill Assessment Testing"]
    },
    {
        title: "Work Permit Support",
        icon: FileCheck,
        color: "emerald",
        gradient: "from-emerald-500 via-teal-600 to-emerald-700",
        desc: "As a Category A licensed agency, we provide a frictionless path through the regulatory requirements.",
        detailedDesc: "From managing Xpat Online to quota renewals and medical report submissions.",
        features: ["Xpat Online Management", "Quota Applications", "Medical Coordination", "Renewal Services"]
    },
    {
        title: "Bulk Manpower",
        icon: Users,
        color: "purple",
        gradient: "from-purple-600 via-violet-700 to-purple-800",
        desc: "Ideal for construction projects or resort pre-openings. We deliver large volumes within tight deadlines.",
        detailedDesc: "We maintain 'ready-pools' of candidates in high-demand categories for rapid deployment.",
        features: ["Project-based Staffing", "Seasonal Recruitment", "Logistics Management", "Vetted Groups"]
    },
    {
        title: "Labor Consultancy",
        icon: Briefcase,
        color: "orange",
        gradient: "from-orange-500 via-amber-600 to-orange-700",
        desc: "Stay ahead of labor law changes. We provide expert guidance on the Maldives Employment Act.",
        detailedDesc: "Optimize your human capital ROI through better retention and compliance strategies.",
        features: ["Contract Drafting", "Salary Benchmarking", "Policy Development", "Legal Support"]
    }
  ];

  return (
    <div className="flex flex-col gap-0 pb-0 bg-white">
      {/* Hero Section */}
      <div className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 via-blue-900 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-15"></div>
        
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[150px] animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 px-6 py-2.5 rounded-full text-blue-200 text-sm font-bold mb-8 border border-white/20 backdrop-blur-md shadow-2xl">
                <Sparkles size={16} className="text-yellow-300" />
                Authorized Category A Agency
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tight text-white leading-tight">
                Our Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">Service Suite</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-medium opacity-90">
                Glow Tours & Trade offers a comprehensive ecosystem of recruitment and operational solutions.
            </p>
        </div>
      </div>

      {/* Core Competencies */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {mainServices.map((service, idx) => (
                <div key={idx} className="group p-1 bg-gradient-to-br from-gray-100 to-white rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden relative">
                    <div className="bg-white p-10 rounded-[2.8rem] h-full flex flex-col">
                        <div className="flex justify-between items-start mb-8">
                            <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-3xl flex items-center justify-center text-white shadow-2xl`}>
                                <service.icon size={36} />
                            </div>
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">{service.title}</h3>
                        <p className="text-gray-600 leading-relaxed mb-4 text-lg font-medium">{service.desc}</p>
                        <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {service.features.map((feature, fidx) => (
                                <div key={fidx} className="flex items-center gap-3 text-sm font-bold text-slate-700 bg-slate-50/80 py-3 px-4 rounded-2xl border border-slate-100/50">
                                    <CheckCircle size={16} className="text-indigo-500" />
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* NEW CAREERS CTA BLOCK */}
      <div className="py-32 bg-slate-50 relative overflow-hidden" id="careers">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="bg-slate-950 rounded-[4rem] p-12 md:p-24 text-center text-white shadow-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000"></div>
                  <div className="relative z-10">
                      <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-[2.2rem] flex items-center justify-center mx-auto mb-12 border border-white/20 shadow-2xl group-hover:rotate-6 transition-all duration-500">
                          <Rocket size={48} className="text-blue-400" />
                      </div>
                      <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
                          Global Strategic <br/> <span className="text-blue-400">Talent Acquisition</span>
                      </h2>
                      <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium mb-12">
                          Are you looking for your next professional placement? Our live vacancy matrix is updated in real-time with verified roles from the Maldives' most prestigious resort portfolios.
                      </p>
                      <Link to="/jobs" className="inline-flex items-center px-12 py-6 bg-white text-slate-950 text-2xl font-black rounded-full hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-all duration-300">
                          Access Job Board <ArrowRight size={24} className="ml-3" />
                      </Link>
                  </div>
              </div>
          </div>
      </div>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Ready to Transform Your Workforce?</h2>
          <p className="text-xl text-blue-100 mb-10 font-medium">Join the league of premium partners who prioritize human capital excellence.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="inline-flex items-center px-12 py-6 bg-white text-blue-600 text-xl font-black rounded-full hover:scale-105 transition shadow-2xl">Start Now <ArrowRight className="ml-2 h-6 w-6" /></Link>
            <Link to="/contact" className="inline-flex items-center px-12 py-6 bg-transparent border-4 border-white/20 text-white text-xl font-black rounded-full hover:bg-white/10 transition">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;