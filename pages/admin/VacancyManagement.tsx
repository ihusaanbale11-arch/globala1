import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { JobVacancy } from '../../types';
import { Plus, Trash2, MapPin, DollarSign, X, Briefcase, AlertTriangle } from 'lucide-react';

const VacancyManagement: React.FC = () => {
  const { jobVacancies, addJobVacancy, deleteJobVacancy } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);

  // Form State
  const initialFormState = {
    title: '',
    location: '',
    type: 'Full Time',
    salary: '',
    description: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVacancy: JobVacancy = {
      id: Date.now().toString(),
      ...formData
    };
    addJobVacancy(newVacancy);
    setIsModalOpen(false);
    setFormData(initialFormState);
  };

  const confirmDelete = (id: string) => {
    setDeleteConfirmationId(id);
  };

  const performDelete = () => {
    if (deleteConfirmationId) {
      deleteJobVacancy(deleteConfirmationId);
      setDeleteConfirmationId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Vacancy Management</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-sm"
        >
          <Plus size={18} /> Add Vacancy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobVacancies.map((vacancy) => (
          <div key={vacancy.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative group hover:shadow-md transition">
            {/* Delete Button - Always Visible now */}
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={() => confirmDelete(vacancy.id)}
                className="text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 p-2 rounded-full transition-colors border border-gray-100"
                title="Delete Vacancy"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="mb-4 pr-10"> {/* Added padding-right to prevent overlap with button */}
               <h3 className="font-bold text-lg text-gray-900 leading-tight">{vacancy.title}</h3>
               <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded font-medium mt-2 inline-block">
                 {vacancy.type}
               </span>
            </div>

            <div className="space-y-2 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-2"><MapPin size={16}/> {vacancy.location}</div>
                <div className="flex items-center gap-2"><DollarSign size={16}/> {vacancy.salary}</div>
            </div>
            
            <p className="text-sm text-gray-600 line-clamp-3 mb-4">{vacancy.description}</p>
            
            <div className="pt-4 border-t border-gray-100 text-xs text-gray-400 flex items-center gap-1">
                <Briefcase size={12}/> Vacancy ID: {vacancy.id}
            </div>
          </div>
        ))}
        {jobVacancies.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
                <p>No active vacancies. Click "Add Vacancy" to post a new job.</p>
            </div>
        )}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
             <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
               <h2 className="text-lg font-bold text-gray-900">Post New Vacancy</h2>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24}/></button>
             </div>
             
             <form onSubmit={handleSubmit} className="p-6 space-y-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                   <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                      value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Electrical Engineer" />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                            value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="e.g. Malé City" />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                        <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                            value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} placeholder="e.g. Full Time" />
                     </div>
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                   <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                      value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} placeholder="e.g. $800 - $1200 + Food" />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                   <textarea required rows={4} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                      value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Job duties and requirements..." />
                 </div>

                 <div className="pt-4 flex justify-end gap-3">
                   <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
                   <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Post Job</button>
                 </div>
             </form>
           </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmationId && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
             <div className="p-6 text-center">
               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                 <AlertTriangle className="h-8 w-8 text-red-600" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Vacancy?</h3>
               <p className="text-gray-500 mb-6">
                 Are you sure you want to remove this job opening? Candidates will no longer be able to apply. Existing applications will be preserved.
               </p>
               <div className="flex justify-center gap-4">
                 <button 
                   onClick={() => setDeleteConfirmationId(null)} 
                   className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
                 >
                   Cancel
                 </button>
                 <button 
                   onClick={performDelete} 
                   className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium flex items-center gap-2"
                 >
                   <Trash2 size={18} /> Delete
                 </button>
               </div>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default VacancyManagement;