
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { 
    ArrowRight, CheckCircle, Globe, Users, FileCheck, Briefcase, Star, 
    MapPin, DollarSign, Clock, Building2, Zap, Award, ShieldCheck, 
    HardHat, Scale, Sparkles, Flame, Search, Rocket, ChevronLeft, 
    ChevronRight, FastForward, Plane, MessageSquare, Plus, X, Upload, Camera, Video,
    Utensils
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Testimonial } from '../../types';
import { url } from 'node:inspector';

const Home: React.FC = () => {
  const { currentUser, jobVacancies, stats, testimonials, addTestimonial } = useData();
  const navigate = useNavigate();
  
  // Testimonial Logic
  const featuredTestimonials = useMemo(() => 
    testimonials.filter(t => t.status === 'Approved' && t.isFeatured), 
  [testimonials]);

  const [testiIndex, setTestiIndex] = useState(0);
  const [isTestiModalOpen, setIsTestiModalOpen] = useState(false);
  const [testiSubmitSuccess, setTestiSubmitSuccess] = useState(false);
  const [testiForm, setTestiForm] = useState({
      authorName: '', position: '', company: '', industry: 'Hospitality',
      content: '', rating: 5, imageUrl: '', videoUrl: ''
  });

  // Slideshow logic
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { url: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1932&auto=format&fit=crop", title: "Luxury Hospitality", tag: "5-Star Resorts" },
    { url: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070&auto=format&fit=crop", title: "Construction Excellence", tag: "Infrastructure" },
    { url: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1974&auto=format&fit=crop", title: "Tropical Logistics", tag: "Island Reach" },
    { url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop", title: "Corporate Innovation", tag: "Global Expertise" },
    { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2050&auto=crop", title: "Healthcare Precision", tag: "Medical Staffing" },
    { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2050&auto=crop", title: "ihsan Precision", tag: "Ihsan Staffing" },
    { url: "/Assets/images/construction.jpg?q=80&w=2050&auto=crop", title: "Construction Excellence", tag: "Infrastructure" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Auto-rotate testimonials
  useEffect(() => {
    if (featuredTestimonials.length > 1) {
        const timer = setInterval(() => {
            setTestiIndex(prev => (prev + 1) % featuredTestimonials.length);
        }, 8000);
        return () => clearInterval(timer);
    }
  }, [featuredTestimonials.length]);

  const handleTestiSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      addTestimonial({
          id: Date.now().toString(),
          ...testiForm,
          isFeatured: false,
          status: 'Pending',
          date: new Date().toISOString().split('T')[0]
      });
      setTestiSubmitSuccess(true);
      setTimeout(() => {
          setIsTestiModalOpen(false);
          setTestiSubmitSuccess(false);
          setTestiForm({ authorName: '', position: '', company: '', industry: 'Hospitality', content: '', rating: 5, imageUrl: '', videoUrl: '' });
      }, 2000);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, field: 'imageUrl' | 'videoUrl') => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              if (typeof reader.result === 'string') {
                  setTestiForm(prev => ({ ...prev, [field]: reader.result as string }));
              }
          };
          reader.readAsDataURL(file);
      }
  };

  const coreServices = [
    { title: "Global Talent Sourcing", desc: "We leverage a borderless network across South Asia, ASEAN, and Europe to identify professionals who bring global expertise to the Maldivian market.", icon: Globe, gradient: "from-blue-600 to-indigo-600", lightBg: "bg-blue-50", textColor: "text-blue-600", shadow: "shadow-blue-200" },
    { title: "Work Permit Authority", desc: "As a Category A licensed agency, we navigate the complexities of Xpat Online, quota management, and immigration laws with absolute precision.", icon: ShieldCheck, gradient: "from-emerald-500 to-teal-600", lightBg: "bg-emerald-50", textColor: "text-emerald-600", shadow: "shadow-emerald-200" },
    { title: "Bulk Manpower Supply", desc: "Specializing in large-scale deployments for construction, hospitality pre-openings, and industrial projects within tight timelines.", icon: HardHat, gradient: "from-amber-500 to-orange-600", lightBg: "bg-amber-50", textColor: "text-amber-600", shadow: "shadow-amber-200" },
    { title: "Strategic HR Consulting", desc: "Our consultancy services provide deep insights into the Maldivian Employment Act, salary benchmarking, and organizational design.", icon: Scale, gradient: "from-purple-600 to-violet-700", lightBg: "bg-purple-50", textColor: "text-purple-600", shadow: "shadow-purple-200" }
  ];

  const getJobCategoryStyle = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('chef') || t.includes('cook') || t.includes('waiter') || t.includes('f&b')) {
        return { category: 'Hospitality', gradient: 'from-rose-500 to-pink-600', light: 'bg-rose-50', text: 'text-rose-600', icon: Utensils, border: 'border-rose-100' };
    }
    if (t.includes('labor') || t.includes('mason') || t.includes('driver') || t.includes('construction')) {
        return { category: 'Construction', gradient: 'from-amber-500 to-orange-600', light: 'bg-amber-50', text: 'text-amber-600', icon: HardHat, border: 'border-amber-100' };
    }
    return { category: 'Professional', gradient: 'from-blue-500 to-indigo-600', light: 'bg-blue-50', text: 'text-blue-600', icon: Briefcase, border: 'border-blue-100' };
  };

  const featuredVacancies = jobVacancies.slice(0, 3);

  return (
    <div className="flex flex-col gap-0 pb-0 bg-white">
      {/* Hero Section */}


      {/* Services Section */}
       <section className="relative h-[90vh] overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-slate-950/40 z-10"></div>
            <img src={slide.url} className="w-full h-full object-cover" alt={slide.title} />
            <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
              <div className="max-w-5xl">
                <span className="inline-block bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-white text-xs font-black uppercase tracking-[0.4em] mb-8 border border-white/20 animate-in slide-in-from-bottom duration-700">
                  {slide.tag}
                </span>
                <h1 className="text-6xl md:text-[10rem] font-black text-white mb-8 tracking-tighter leading-none animate-in fade-in zoom-in duration-1000">
                  {slide.title.split(' ')[0]} <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{slide.title.split(' ')[1]}</span>
                </h1>
                <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in slide-in-from-bottom-10 duration-1000">
                  <Link to="/register" className="px-12 py-6 bg-white text-slate-950 text-xl font-black rounded-full hover:shadow-[0_20px_50px_rgba(255,255,255,0.25)] transition-all">
                    Partner With Us
                  </Link>
                  <Link to="/jobs" className="px-12 py-6 bg-transparent border-4 border-white/30 text-white text-xl font-black rounded-full hover:bg-white/10 transition-all">
                    Explore Careers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} className={`h-1.5 rounded-full transition-all duration-500 ${i === currentSlide ? 'w-12 bg-white' : 'w-3 bg-white/30'}`}></button>
          ))}
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-32 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
                  <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none">
                      Featured <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Opportunities</span>
                  </h2>
                  <Link to="/services#vacancies" className="inline-flex items-center gap-3 text-slate-900 border-2 border-slate-200 hover:bg-slate-900 hover:text-white px-10 py-5 rounded-full font-black text-lg transition shadow-xl">
                      View Job Board <ArrowRight size={22}/>
                  </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {featuredVacancies.map((job) => {
                      const style = getJobCategoryStyle(job.title);
                      const Icon = style.icon;
                      return (
                      <div key={job.id} className="bg-white rounded-[3.5rem] p-10 border border-gray-100 shadow-2xl hover:-translate-y-2 transition-all group flex flex-col">
                            <div className="flex justify-between items-start mb-10">
                                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${style.gradient} flex items-center justify-center text-white shadow-2xl group-hover:rotate-6 transition-all duration-500`}>
                                    <Icon size={40} />
                                </div>
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-100 ${style.text} bg-white shadow-sm`}>{style.category}</span>
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                            <div className="space-y-4 mb-10 flex-grow">
                                <div className="flex items-center gap-3 text-sm font-bold text-slate-500"><MapPin size={16}/> {job.location}</div>
                                <div className="flex items-center gap-3 text-sm font-bold text-emerald-600"><DollarSign size={16}/> {job.salary}</div>
                            </div>
                            <Link to="/services#vacancies" className={`w-full py-5 rounded-[1.8rem] font-black text-lg text-center transition-all bg-gradient-to-br ${style.gradient} text-white hover:brightness-110`}>Apply Now</Link>
                      </div>
                  )})}
              </div>
          </div>
      </section>

      {/* FEATURED TESTIMONIALS ROTATION - Moved here */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[100px] -mr-64 -mt-64"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                  <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-2 bg-rose-500/10 px-4 py-1.5 rounded-full text-rose-400 font-black text-[10px] uppercase tracking-[0.3em] mb-6 border border-rose-500/20">
                          <Star size={14} className="fill-rose-400" /> Industry Acclaim
                      </div>
                      <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight">
                          Voices of <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-rose-600">Satisfaction</span>
                      </h2>
                  </div>
                  <button 
                    onClick={() => setIsTestiModalOpen(true)}
                    className="inline-flex items-center gap-3 text-white bg-white/10 hover:bg-rose-600 px-10 py-5 rounded-full font-black text-lg transition backdrop-blur-md border border-white/10 shadow-2xl"
                  >
                      Share Your Story <Plus size={22}/>
                  </button>
              </div>

              {featuredTestimonials.length > 0 ? (
                  <div className="relative group">
                    {/* Carousel Container */}
                    <div className="overflow-hidden rounded-[4rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-12 md:p-24 relative min-h-[500px] flex items-center">
                        <div className="absolute top-12 left-12 text-rose-500/10"><MessageSquare size={120} /></div>
                        
                        <div key={featuredTestimonials[testiIndex].id} className="animate-in fade-in slide-in-from-right-8 duration-700 w-full relative z-10">
                             <div className="flex flex-col items-center md:items-start text-center md:text-left gap-10">
                                <div className="flex gap-1 text-amber-400">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={24} fill={i < featuredTestimonials[testiIndex].rating ? "currentColor" : "none"} />)}
                                </div>
                                <p className="text-3xl md:text-5xl font-black text-white italic leading-tight tracking-tight">
                                    "{featuredTestimonials[testiIndex].content}"
                                </p>
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 bg-slate-800 rounded-[2rem] overflow-hidden border-2 border-white/10">
                                        {featuredTestimonials[testiIndex].imageUrl ? (
                                            <img src={featuredTestimonials[testiIndex].imageUrl} className="w-full h-full object-cover" alt="" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-500 font-black text-2xl uppercase">{featuredTestimonials[testiIndex].authorName.charAt(0)}</div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-black text-white">{featuredTestimonials[testiIndex].authorName}</h4>
                                        <p className="text-rose-400 text-sm font-black uppercase tracking-widest">{featuredTestimonials[testiIndex].position} • {featuredTestimonials[testiIndex].company}</p>
                                        <span className="inline-block mt-2 bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-[9px] font-black uppercase text-slate-400 tracking-widest">{featuredTestimonials[testiIndex].industry}</span>
                                    </div>
                                </div>
                             </div>
                        </div>

                        {/* Navigation Dots */}
                        <div className="absolute bottom-12 right-12 flex gap-3">
                             {featuredTestimonials.map((_, idx) => (
                                 <button 
                                    key={idx} 
                                    onClick={() => setTestiIndex(idx)}
                                    className={`h-2 rounded-full transition-all duration-500 ${testiIndex === idx ? 'w-10 bg-rose-500' : 'w-2 bg-white/20'}`}
                                 ></button>
                             ))}
                        </div>
                    </div>
                  </div>
              ) : (
                  <div className="p-24 text-center text-slate-500 font-black uppercase tracking-widest">Awaiting Client Narrative...</div>
              )}
          </div>
      </section>

      {/* Submission Modal */}
      {isTestiModalOpen && (
          <div className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-6 overflow-y-auto">
              <div className="bg-white rounded-[4rem] w-full max-w-2xl shadow-3xl overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
                  {testiSubmitSuccess ? (
                      <div className="p-24 text-center">
                          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce"><CheckCircle size={48}/></div>
                          <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Sentiment Received</h2>
                          <p className="text-slate-500 font-medium">Your narrative has been transmitted to our moderation engine. Thank you for your feedback.</p>
                      </div>
                  ) : (
                    <>
                        <div className="px-12 py-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">Share Your Success</h3>
                                <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mt-2">Public Sentiment Protocol</p>
                            </div>
                            <button onClick={() => setIsTestiModalOpen(false)} className="text-slate-300 hover:text-rose-600 p-4 bg-white rounded-full shadow-xl transition-all"><X size={32}/></button>
                        </div>
                        <form onSubmit={handleTestiSubmit} className="p-12 space-y-8">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 ml-1">Identity</label>
                                    <input required className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold focus:border-rose-500 outline-none" placeholder="Your Name" value={testiForm.authorName} onChange={e => setTestiForm({...testiForm, authorName: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 ml-1">Entity / Resort</label>
                                    <input required className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold focus:border-rose-500 outline-none" placeholder="Organization" value={testiForm.company} onChange={e => setTestiForm({...testiForm, company: e.target.value})} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 ml-1">Star Tier</label>
                                    <div className="flex gap-2 p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 justify-center">
                                        {[1,2,3,4,5].map(v => (
                                            <button key={v} type="button" onClick={() => setTestiForm({...testiForm, rating: v})} className={testiForm.rating >= v ? 'text-amber-400' : 'text-slate-300'}>
                                                <Star size={24} fill={testiForm.rating >= v ? "currentColor" : "none"} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 ml-1">Sector Node</label>
                                    <select className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold focus:border-rose-500 outline-none" value={testiForm.industry} onChange={e => setTestiForm({...testiForm, industry: e.target.value})}>
                                        <option>Hospitality</option>
                                        <option>Construction</option>
                                        <option>Healthcare</option>
                                        <option>Corporate</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 ml-1">Narrative Content</label>
                                <textarea required rows={4} className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-3xl font-medium focus:border-rose-500 outline-none" placeholder="Describe your experience..." value={testiForm.content} onChange={e => setTestiForm({...testiForm, content: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <label className="cursor-pointer group">
                                    <div className="w-full p-5 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-3 group-hover:bg-rose-50 transition-all">
                                        <Camera size={20} className="text-slate-400 group-hover:text-rose-500" />
                                        <span className="text-sm font-black uppercase tracking-widest text-slate-400 group-hover:text-rose-500">Photo Proof</span>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={e => handleFile(e, 'imageUrl')} />
                                </label>
                                <label className="cursor-pointer group">
                                    <div className="w-full p-5 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-3 group-hover:bg-rose-50 transition-all">
                                        <Video size={20} className="text-slate-400 group-hover:text-rose-500" />
                                        <span className="text-sm font-black uppercase tracking-widest text-slate-400 group-hover:text-rose-500">Video Meta</span>
                                    </div>
                                    <input type="file" className="hidden" accept="video/*" onChange={e => handleFile(e, 'videoUrl')} />
                                </label>
                            </div>
                            <button type="submit" className="w-full py-6 bg-rose-600 text-white rounded-2xl font-black text-xl uppercase tracking-widest shadow-2xl hover:bg-rose-700 transition-all transform active:scale-[0.98]">
                                Disseminate Sentiment
                            </button>
                        </form>
                    </>
                  )}
              </div>
          </div>
      )}

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

export default Home;