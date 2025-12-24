
import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Building2, MapPin, DollarSign, X, Upload, CheckCircle, 
  ShieldAlert, UserX, Info, LogOut, Sparkles, Search, ArrowRight,
  HardHat, Utensils, HeartPulse, GraduationCap, Globe
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { JobVacancy } from '../../types';

const Jobs: React.FC = () => {
  const { 
    submitJobApplication, currentCandidate, currentUser, 
    currentAgent, jobVacancies, logoutClient, logoutAgent 
  } = useData();
  
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedVacancy, setSelectedVacancy] = useState<JobVacancy | null>(null);
  const [showVerificationRequired, setShowVerificationRequired] = useState(false);
  const [showRoleRestricted, setShowRoleRestricted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [appForm, setAppForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    resumeLink: ''
  });
  
  const [fileName, setFileName] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (currentCandidate && selectedVacancy) {
        setAppForm(prev => ({
            ...prev,
            name: currentCandidate.name,
            email: currentCandidate.email,
            experience: currentCandidate.experience > 0 ? `${currentCandidate.experience} Years` : ''
        }));
    }
  }, [currentCandidate, selectedVacancy]);

  const handleApplyClick = (vacancy: JobVacancy) => {
    if (!currentCandidate && !currentUser && !currentAgent) {
        navigate('/candidate/login', { state: { from: location } });
        return;
    }
    if (currentUser || currentAgent) {
        setShowRoleRestricted(true);
        return;
    }
    if (currentCandidate && !currentCandidate.isVerified) {
        setShowVerificationRequired(true);
        return;
    }
    setSelectedVacancy(vacancy);
    setSubmitSuccess(false);
    setFileName('');
    setAppForm({ name: '', email: '', phone: '', experience: '', resumeLink: '' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVacancy) return;
    submitJobApplication({
      id: Date.now().toString(),
      vacancyId: selectedVacancy.id,
      vacancyTitle: selectedVacancy.title,
      applicantName: appForm.name,
      email: appForm.email,
      phone: appForm.phone,
      experience: appForm.experience,
      resumeUrl: appForm.resumeLink,
      status: 'New',
      date: new Date().toISOString().split('T')[0]
    });
    setSubmitSuccess(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
        alert("File size is too large. Max 2MB.");
        return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
        if (typeof reader.result === 'string') {
            setAppForm(prev => ({ ...prev, resumeLink: reader.result as string }));
        }
    };
    reader.readAsDataURL(file);
  };

  const getJobCategoryStyle = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('chef') || t.includes('cook') || t.includes('waiter') || t.includes('f&b')) {
        return { gradient: 'from-rose-500 to-pink-600', text: 'text-rose-600', icon: Utensils, border: 'border-rose-100', light: 'bg-rose-50' };
    }
    if (t.includes('labor') || t.includes('mason') || t.includes('driver') || t.includes('construction')) {
        return { gradient: 'from-amber-500 to-orange-600', text: 'text-amber-600', icon: HardHat, border: 'border-amber-100', light: 'bg-amber-50' };
    }
    if (t.includes('nurse') || t.includes('doctor') || t.includes('health')) {
        return { gradient: 'from-emerald-500 to-teal-600', text: 'text-emerald-600', icon: HeartPulse, border: 'border-emerald-100', light: 'bg-emerald-50' };
    }
    return { gradient: 'from-blue-500 to-indigo-600', text: 'text-blue-600', icon: Briefcase, border: 'border-blue-100', light: 'bg-blue-50' };
  };

  const filteredJobs = jobVacancies.filter(j => 
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    j.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white">
      {/* Cinematic Hero */}
      <div className="relative py-32 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-900 opacity-95"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-300 font-black text-[10px] uppercase tracking-[0.3em] mb-8 border border-blue-500/20 backdrop-blur-md">
                <Sparkles size={14} className="text-yellow-400" /> Maldivian Career Registry
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                Active <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300">Opportunities</span>
            </h1>
            <p className="text-xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed font-medium">
                Access premium placements in the Maldives' most prestigious resorts and enterprise hubs. Your global career architecture starts with a single verified application.
            </p>
        </div>
      </div>

      {/* Filter Matrix */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
          <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search by role or location..." 
                    className="w-full pl-16 pr-8 py-5 bg-slate-50 border-2 border-slate-50 rounded-[1.8rem] focus:bg-white focus:border-blue-600 outline-none font-bold transition-all shadow-inner"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
          </div>
      </div>

      {/* Jobs Registry Grid */}
      <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {filteredJobs.map((vacancy) => {
                  const style = getJobCategoryStyle(vacancy.title);
                  const Icon = style.icon;
                  return (
                  <div key={vacancy.id} className="group relative bg-white rounded-[3.5rem] p-10 border-2 border-slate-100 hover:shadow-3xl hover:border-blue-100 transition-all duration-500 flex flex-col">
                      <div className="flex justify-between items-start mb-8">
                          <div className={`w-20 h-20 bg-gradient-to-br ${style.gradient} rounded-3xl flex items-center justify-center text-white shadow-2xl group-hover:rotate-6 transition-all duration-500`}>
                              <Icon size={36} />
                          </div>
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 ${style.border} ${style.text}`}>
                              {vacancy.type}
                          </span>
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{vacancy.title}</h3>
                      <p className="text-slate-500 font-medium mb-8 line-clamp-3 leading-relaxed">{vacancy.description}</p>
                      <div className="grid grid-cols-2 gap-4 mb-10">
                          <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 border border-slate-100">
                              <MapPin size={20} className="text-rose-500" />
                              <span className="text-sm font-black text-slate-700 truncate">{vacancy.location}</span>
                          </div>
                          <div className="bg-emerald-50 p-4 rounded-2xl flex items-center gap-3 border border-emerald-100">
                              <DollarSign size={20} className="text-emerald-600" />
                              <span className="text-sm font-black text-slate-700 truncate">{vacancy.salary}</span>
                          </div>
                      </div>
                      <button 
                          onClick={() => handleApplyClick(vacancy)}
                          className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 hover:bg-blue-600"
                      >
                          Apply for this Role <ArrowRight size={20}/>
                      </button>
                  </div>
              )})}
              {filteredJobs.length === 0 && (
                  <div className="col-span-full py-32 text-center text-slate-300 font-black uppercase tracking-[0.3em]">No matching roles found</div>
              )}
          </div>
      </div>

      {/* Modals from migration */}
      {selectedVacancy && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-900/90 backdrop-blur-2xl flex items-center justify-center p-4">
            <div className="bg-white rounded-[4rem] shadow-3xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
                {submitSuccess ? (
                    <div className="p-24 text-center">
                        <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-10 animate-bounce">
                            <CheckCircle className="h-16 w-16 text-emerald-600" />
                        </div>
                        <h3 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">Application Transmitted</h3>
                        <p className="text-gray-500 mb-12 text-xl leading-relaxed">Our recruiters have received your dossier. Verification is ongoing.</p>
                        <button onClick={() => setSelectedVacancy(null)} className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black text-2xl">Return to Board</button>
                    </div>
                ) : (
                    <>
                        <div className="px-12 py-10 border-b border-gray-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="font-black text-3xl text-gray-900 tracking-tighter leading-none">Job Application</h3>
                                <p className="text-xs text-blue-600 font-black uppercase tracking-[0.2em] mt-2">{selectedVacancy.title}</p>
                            </div>
                            <button onClick={() => setSelectedVacancy(null)} className="text-gray-400 hover:text-rose-600 p-2"><X size={32}/></button>
                        </div>
                        <form onSubmit={handleFormSubmit} className="p-12 space-y-6">
                            <input required className="w-full border-4 border-slate-100 bg-slate-50 rounded-3xl p-5 font-bold text-lg" value={appForm.name} onChange={e => setAppForm({...appForm, name: e.target.value})} placeholder="Full Identity"/>
                            <input required type="email" className="w-full border-4 border-slate-100 bg-slate-50 rounded-3xl p-5 font-bold text-lg" value={appForm.email} onChange={e => setAppForm({...appForm, email: e.target.value})} placeholder="Email"/>
                            <input required className="w-full border-4 border-slate-100 bg-slate-50 rounded-3xl p-5 font-bold text-lg" value={appForm.phone} onChange={e => setAppForm({...appForm, phone: e.target.value})} placeholder="Phone"/>
                            <div className="border-4 border-dashed border-slate-200 rounded-[2.5rem] p-10 text-center bg-slate-50/50 relative">
                                <input type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                <Upload size={32} className="mx-auto text-blue-600 mb-2"/>
                                <p className="font-black text-slate-800 text-sm">{fileName || 'Attach Profile (PDF)'}</p>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white font-black py-6 rounded-[2rem] text-2xl shadow-2xl hover:bg-blue-700 transition">Confirm Transmission</button>
                        </form>
                    </>
                )}
            </div>
        </div>
      )}

      {showVerificationRequired && (
          <div className="fixed inset-0 z-[200] overflow-y-auto bg-slate-950/95 backdrop-blur-3xl flex items-center justify-center p-6">
              <div className="bg-white rounded-[4rem] shadow-3xl w-full max-w-xl p-16 text-center animate-in zoom-in duration-500">
                  <ShieldAlert size={48} className="text-rose-600 mx-auto mb-10" />
                  <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-6">Verification Pending</h2>
                  <p className="text-xl text-slate-500 font-medium mb-12 leading-relaxed">Your candidate profile is undergoing technical background vetting. Application privileges are restricted until authorized.</p>
                  <button onClick={() => setShowVerificationRequired(false)} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-700 transition">Understood</button>
              </div>
          </div>
      )}

      {showRoleRestricted && (
          <div className="fixed inset-0 z-[200] overflow-y-auto bg-slate-950/95 backdrop-blur-3xl flex items-center justify-center p-6">
              <div className="bg-white rounded-[4rem] shadow-3xl w-full max-w-xl p-16 text-center animate-in zoom-in duration-500">
                  <UserX size={48} className="text-blue-600 mx-auto mb-10" />
                  <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-6">Candidate Account Required</h2>
                  <p className="text-xl text-slate-500 font-medium mb-12 leading-relaxed">You are currently logged in as a Corporate Entity. Only personal Candidate Profiles can apply for individual vacancies.</p>
                  <button onClick={() => navigate('/candidate/register')} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition">Switch to Candidate Profile</button>
              </div>
          </div>
      )}
    </div>
  );
};

export default Jobs;