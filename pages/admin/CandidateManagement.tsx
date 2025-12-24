import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Candidate } from '../../types';
import { Edit2, Trash2, Plus, Search, X, AlertTriangle, Upload, FileText, Award, Eye, Download, Network } from 'lucide-react';

const CandidateManagement: React.FC = () => {
  const { candidates, addCandidate, updateCandidate, deleteCandidate, agents } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);
  
  // Preview Data
  const [previewData, setPreviewData] = useState<{url: string, title: string} | null>(null);

  // Form State
  const initialFormState = {
    name: '',
    email: '',
    profession: '',
    nationality: '',
    experience: 0,
    status: 'Available' as Candidate['status'],
    skills: '',
    imageUrl: '',
    resumeUrl: '',
    certificateUrl: ''
  };
  
  const [formData, setFormData] = useState(initialFormState);

  const handleOpenModal = (candidate?: Candidate) => {
    if (candidate) {
      setEditingId(candidate.id);
      // Explicitly map fields to avoid spreading 'skills' array into string field
      setFormData({
        name: candidate.name,
        email: candidate.email || '',
        profession: candidate.profession,
        nationality: candidate.nationality,
        experience: candidate.experience,
        status: candidate.status,
        skills: candidate.skills ? candidate.skills.join(', ') : '',
        imageUrl: candidate.imageUrl,
        resumeUrl: candidate.resumeUrl || '',
        certificateUrl: candidate.certificateUrl || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        ...initialFormState,
        imageUrl: 'https://picsum.photos/200/200?random=' + Math.floor(Math.random() * 1000)
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(initialFormState);
    setEditingId(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File is too large. Max 2MB allowed.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const candidateData: Candidate = {
      id: editingId || Date.now().toString(),
      name: formData.name,
      email: formData.email,
      profession: formData.profession,
      nationality: formData.nationality,
      experience: Number(formData.experience),
      status: formData.status,
      // Convert comma-separated string back to array
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      imageUrl: formData.imageUrl || 'https://via.placeholder.com/150',
      resumeUrl: formData.resumeUrl,
      certificateUrl: formData.certificateUrl
    };

    if (editingId) {
      updateCandidate(candidateData);
    } else {
      addCandidate(candidateData);
    }
    handleCloseModal();
  };

  const initiateDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirmationId(id);
  };

  const performDelete = () => {
    if (deleteConfirmationId) {
      deleteCandidate(deleteConfirmationId);
      setDeleteConfirmationId(null);
    }
  };

  const filtered = candidates.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.profession.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAgentName = (agentId: string) => {
      const agent = agents.find(a => a.id === agentId);
      return agent ? agent.agencyName : 'Unknown Agent';
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Candidate Management</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-sm transition"
        >
          <Plus size={18} /> Add Candidate
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Search candidates..." 
              className="pl-10 w-full border border-gray-300 rounded-lg py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profession</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nationality</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-full object-cover" src={candidate.imageUrl} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                        <div className="text-xs text-gray-500">{candidate.email}</div>
                        {/* Updated Source Indicator to show specific Agent Name */}
                        {candidate.agentId && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-700 mt-1 uppercase tracking-tighter" title={`Submitted by: ${getAgentName(candidate.agentId)}`}>
                                <Network size={10}/> Agent: {getAgentName(candidate.agentId)}
                            </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{candidate.profession}</div>
                    <div className="text-xs text-gray-500 truncate max-w-[150px]">{candidate.skills.join(', ')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                        {candidate.resumeUrl ? (
                            <button 
                                onClick={(e) => { e.stopPropagation(); setPreviewData({url: candidate.resumeUrl!, title: `${candidate.name} - Resume`})}}
                                className="text-blue-600 bg-blue-50 p-1.5 rounded hover:bg-blue-100 transition"
                                title="View Resume"
                            >
                                <FileText size={16} />
                            </button>
                        ) : (
                             <span className="text-gray-300 p-1.5"><FileText size={16} /></span>
                        )}
                         {candidate.certificateUrl ? (
                            <button 
                                onClick={(e) => { e.stopPropagation(); setPreviewData({url: candidate.certificateUrl!, title: `${candidate.name} - Certificates`})}}
                                className="text-yellow-600 bg-yellow-50 p-1.5 rounded hover:bg-yellow-100 transition"
                                title="View Certificates"
                            >
                                <Award size={16} />
                            </button>
                        ) : (
                             <span className="text-gray-300 p-1.5"><Award size={16} /></span>
                        )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      candidate.status === 'Available' ? 'bg-green-100 text-green-800' : 
                      candidate.status === 'Hired' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {candidate.nationality}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-3">
                        <button 
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleOpenModal(candidate); }} 
                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50 transition"
                            title="Edit Candidate"
                        >
                            <Edit2 size={18} />
                        </button>
                        <button 
                            type="button"
                            onClick={(e) => initiateDelete(candidate.id, e)} 
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition"
                            title="Delete Candidate"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                   <td colSpan={6} className="px-6 py-12 text-center text-gray-500">No candidates found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
             <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
               <h2 className="text-lg font-bold text-gray-900">{editingId ? 'Edit Candidate' : 'Add New Candidate'}</h2>
               <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600"><X size={24}/></button>
             </div>
             
             <form onSubmit={handleSubmit} className="p-6 space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                   <input required type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                   <input required type="email" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                   <input required type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                      value={formData.profession} onChange={e => setFormData({...formData, profession: e.target.value})} />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                   <input required type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                      value={formData.nationality} onChange={e => setFormData({...formData, nationality: e.target.value})} />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
                   <input required type="number" min="0" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                      value={formData.experience} onChange={e => setFormData({...formData, experience: parseInt(e.target.value) || 0})} />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                   <select className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                      value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as Candidate['status']})}>
                      <option value="Available">Available</option>
                      <option value="Processing">Processing</option>
                      <option value="Hired">Hired</option>
                   </select>
                 </div>
                 <div className="md:col-span-2">
                   <label className="block text-sm font-medium text-gray-700 mb-1">Candidate Photo</label>
                   <div className="flex items-center gap-4">
                      {formData.imageUrl && (
                        <div className="relative flex-shrink-0">
                            <img 
                                src={formData.imageUrl} 
                                alt="Preview" 
                                className="h-16 w-16 rounded-full object-cover border border-gray-200" 
                            />
                            <button 
                                type="button"
                                onClick={() => setFormData({...formData, imageUrl: ''})}
                                className="absolute -top-1 -right-1 bg-white text-red-500 rounded-full p-0.5 shadow-sm border border-gray-200 hover:bg-gray-50"
                                title="Remove photo"
                            >
                                <X size={12} />
                            </button>
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="relative border border-gray-300 border-dashed rounded-lg p-3 hover:bg-gray-50 transition text-center cursor-pointer bg-white">
                            <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                            <Upload size={16} />
                            <span>{formData.imageUrl ? 'Change Photo' : 'Upload Photo'}</span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Max size 2MB. Formats: JPG, PNG, GIF</p>
                      </div>
                   </div>
                 </div>
               </div>
               
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g. AutoCAD, Leadership, English"
                      value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} />
               </div>

               <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-2">
                 <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
                 <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    {editingId ? 'Update Candidate' : 'Save Candidate'}
                 </button>
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
               <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Candidate?</h3>
               <p className="text-gray-500 mb-6">
                 Are you sure you want to delete this candidate profile? This action cannot be undone.
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
      
      {/* File Preview Modal */}
      {previewData && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-black bg-opacity-80 flex items-center justify-center p-4" onClick={() => setPreviewData(null)}>
           <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
             <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
               <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                 <Eye size={18} /> {previewData.title}
               </h2>
               <button onClick={() => setPreviewData(null)} className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-200 transition">
                 <X size={24}/>
               </button>
             </div>
             <div className="flex-1 bg-gray-100 p-4">
                <iframe src={previewData.url} className="w-full h-full border-none bg-white shadow-lg" title={previewData.title}></iframe>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default CandidateManagement;