
import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { Send, Briefcase, Users, FileText, Globe, ShieldAlert, Clock, Phone } from 'lucide-react';

const RequestManpower: React.FC = () => {
  const { currentUser, addInquiry } = useData();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    position: '',
    quantity: '',
    nationality: '',
    experience: '',
    requirements: ''
  });

  const [submitted, setSubmitted] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !currentUser.isVerified) return;

    addInquiry({
      id: Date.now().toString(),
      name: currentUser.companyName, 
      email: currentUser.email,
      subject: `Manpower Request: ${formData.position} (${formData.quantity} pax)`,
      message: `*** MANPOWER REQUISITION FORM ***

Position Required: ${formData.position}
Number of Vacancies: ${formData.quantity}
Preferred Nationality: ${formData.nationality || 'Open'}
Experience Required: ${formData.experience || 'Not specified'}

Specific Requirements & Job Description:
${formData.requirements}

-------------------------------------------
Requested by Client ID: ${currentUser.id}
Company: ${currentUser.companyName}
Contact Person: ${currentUser.contactPerson}
`,
      status: 'New',
      date: new Date().toISOString().split('T')[0]
    });

    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Send className="text-green-600 h-10 w-10" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Submitted Successfully!</h2>
        <p className="text-lg text-gray-600 mb-8">
          Thank you, <strong>{currentUser?.companyName}</strong>. Our recruitment team has received your manpower requirement.
        </p>
        <button onClick={() => navigate('/client/dashboard')} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Go to Dashboard
        </button>
      </div>
    );
  }

  // --- VERIFICATION GATE ---
  if (currentUser && !currentUser.isVerified) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24">
        <div className="bg-white rounded-[3rem] shadow-3xl border-4 border-amber-100 overflow-hidden text-center p-16">
            <div className="w-24 h-24 bg-amber-50 rounded-[2rem] flex items-center justify-center mx-auto mb-10 text-amber-500 shadow-xl border border-amber-100">
                <ShieldAlert size={48} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-6">Verification Required</h1>
            <p className="text-xl text-slate-500 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                As a <span className="text-indigo-600 font-bold text-lg">Category A Licensed Agency</span>, Glow Tours enforces strict corporate vetting. Your account for <span className="text-slate-900 font-bold">"{currentUser.companyName}"</span> is currently pending executive authorization.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-slate-50 p-6 rounded-2xl flex items-start gap-4 text-left border border-slate-100">
                    <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm"><Clock size={20}/></div>
                    <div>
                        <p className="font-black text-slate-900 text-sm uppercase tracking-widest mb-1">Standard Wait Time</p>
                        <p className="text-sm text-slate-500 font-medium">Profile verification typically completes within 24 operational hours.</p>
                    </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl flex items-start gap-4 text-left border border-slate-100">
                    <div className="p-2 bg-white rounded-lg text-emerald-600 shadow-sm"><Phone size={20}/></div>
                    <div>
                        <p className="font-black text-slate-900 text-sm uppercase tracking-widest mb-1">Expedite Process</p>
                        <p className="text-sm text-slate-500 font-medium">Contact your designated account manager at +960 333 4444.</p>
                    </div>
                </div>
            </div>
            
            <button onClick={() => navigate('/client/dashboard')} className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-indigo-600 transition-all">
                Return to Dashboard
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tighter">Request Manpower</h1>
            <p className="text-gray-600">
              Submit your staffing requirements directly to our recruitment team.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
             <h3 className="font-bold text-blue-900 mb-3">Priority Authorization</h3>
             <p className="text-sm text-blue-800">Your verified status grants you immediate access to our high-volume pipelines.</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-8 py-4 border-b border-gray-200">
              <div className="flex items-center gap-2 text-gray-500 text-sm font-bold uppercase tracking-widest">
                <Briefcase size={16} /> Requisition Form
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Position / Title</label>
                  <input type="text" name="position" required value={formData.position} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Civil Engineer" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Vacancies</label>
                  <input type="number" name="quantity" min="1" required value={formData.quantity} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. 5" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Requirements</label>
                <textarea name="requirements" required rows={6} value={formData.requirements} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Role description..." />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-600 text-white font-bold py-4 px-10 rounded-xl hover:bg-blue-700 transition shadow-xl">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestManpower;