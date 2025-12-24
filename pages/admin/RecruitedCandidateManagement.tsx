import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { RecruitedCandidate } from '../../types';
import { Plus, Trash2, Search, X, ClipboardCheck, User, Calendar, FileText, Globe, Download, AlertTriangle } from 'lucide-react';

const RecruitedCandidateManagement: React.FC = () => {
  const { recruitedCandidates, addRecruitedCandidate, deleteRecruitedCandidate } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);

  // Form State
  const initialFormState = {
    name: '',
    passportNumber: '',
    nationality: '',
    designation: '',
    employer: '',
    arrivalDate: '',
    addedBy: '',
    passportPhotoUrl: '',
    workPermitUrl: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  const filtered = recruitedCandidates.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.passportNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.employer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: RecruitedCandidate = {
      id: Date.now().toString(),
      ...formData
    };
    addRecruitedCandidate(newRecord);
    setIsModalOpen(false);
    setFormData(initialFormState);
  };

  // Open data URLs or normal URLs reliably in a new tab.
  const openFile = (url?: string | null) => {
    if (!url) return;
    try {
      if (url.startsWith('data:')) {
        // Convert data URL to blob then open object URL to avoid issues with very long data urls
        const parts = url.split(',');
        const meta = parts[0];
        const isBase64 = meta.indexOf(';base64') !== -1;
        const mime = meta.split(':')[1].split(';')[0] || 'application/octet-stream';
        let byteString: string;
        if (isBase64) {
          byteString = atob(parts[1]);
        } else {
          byteString = decodeURIComponent(parts[1]);
        }
        const ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
        const blob = new Blob([ia], { type: mime });
        const objUrl = URL.createObjectURL(blob);
        const newWin = window.open(objUrl);
        if (!newWin) {
          // popup blocked — try setting location
          window.location.href = objUrl;
        }
        setTimeout(() => URL.revokeObjectURL(objUrl), 1000 * 60);
      } else {
        const newWin = window.open(url);
        if (!newWin) window.location.href = url;
      }
    } catch (err) {
      console.error('openFile error', err);
      // fallback
      window.open(url);
    }
  };

  const initiateDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirmationId(id);
  };

  const performDelete = () => {
    if (deleteConfirmationId) {
      deleteRecruitedCandidate(deleteConfirmationId);
      setDeleteConfirmationId(null);
    }
  };

  const handleDownloadCSV = () => {
    if (recruitedCandidates.length === 0) {
        alert("No records to export.");
        return;
    }

    // Define Headers
    const headers = [
        "Candidate Name",
        "Passport Number",
        "Nationality",
        "Designation",
        "Employer",
        "Date of Arrival",
        "Record Added By",
      "Passport Photo URL",
      "Work Permit URL",
        "Record ID"
    ];

    // Map Data to Rows
    const rows = recruitedCandidates.map(c => [
        `"${c.name}"`, // Wrap in quotes to handle commas in names
        `"${c.passportNumber}"`,
        `"${c.nationality}"`,
        `"${c.designation}"`,
        `"${c.employer}"`,
        `"${c.arrivalDate}"`,
        `"${c.addedBy}"`,
      `"${c.passportPhotoUrl || ''}"`,
      `"${c.workPermitUrl || ''}"`,
        `"${c.id}"`
    ]);

    // Combine Headers and Rows
    const csvContent = [
        headers.join(','),
        ...rows.map(r => r.join(','))
    ].join('\n');

    // Create Blob and Download Link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `glow_tours_recruited_candidates_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Recruited Candidates Records</h1>
            <p className="text-sm text-gray-500">Internal database of successfully recruited staff.</p>
        </div>
        <div className="flex gap-3">
            <button 
                onClick={handleDownloadCSV}
                className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 shadow-sm transition"
            >
                <Download size={18} /> Export CSV
            </button>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-sm transition"
            >
                <Plus size={18} /> Add Record
            </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Search by name, passport, or employer..." 
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employment Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Record Metadata</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                        <User size={20} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{record.name}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                            <FileText size={10} /> PP: {record.passportNumber}
                            {record.passportPhotoUrl && (
                              <a href="#" onClick={(e) => { e.preventDefault(); e.stopPropagation(); openFile(record.passportPhotoUrl); }} className="ml-2 text-blue-600 hover:underline flex items-center gap-1">
                                <Download size={12} /> Photo
                              </a>
                            )}
                            {record.workPermitUrl && (
                              <a href="#" onClick={(e) => { e.preventDefault(); e.stopPropagation(); openFile(record.workPermitUrl); }} className="ml-2 text-blue-600 hover:underline flex items-center gap-1">
                                <Download size={12} /> Permit
                              </a>
                            )}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Globe size={10} /> {record.nationality}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 font-medium">{record.designation}</div>
                    <div className="text-xs text-gray-500">{record.employer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400"/> {record.arrivalDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-xs text-gray-500">
                        Added by: <span className="font-medium text-gray-700">{record.addedBy}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={(e) => initiateDelete(record.id, e)} 
                      className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-lg hover:bg-red-100 transition"
                      title="Delete Record"
                    >
                        <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                   <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                       <ClipboardCheck size={48} className="mx-auto text-gray-300 mb-4" />
                       <p>No records found.</p>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
             <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
               <h2 className="text-lg font-bold text-gray-900">Add Recruited Candidate</h2>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24}/></button>
             </div>
             
             <form onSubmit={handleSubmit} className="p-6 space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Candidate Name</label>
                   <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number</label>
                   <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                      value={formData.passportNumber} onChange={e => setFormData({...formData, passportNumber: e.target.value})} />
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                   <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                      value={formData.nationality} onChange={e => setFormData({...formData, nationality: e.target.value})} />
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Designation / Profession</label>
                   <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                      value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} />
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Employer / Company</label>
                   <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                      value={formData.employer} onChange={e => setFormData({...formData, employer: e.target.value})} />
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Date of Arrival</label>
                   <input required type="date" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                      value={formData.arrivalDate} onChange={e => setFormData({...formData, arrivalDate: e.target.value})} />
                 </div>
                 
                 <div className="md:col-span-2">
                   <label className="block text-sm font-medium text-gray-700 mb-1">Record Added By (Admin Name)</label>
                   <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50" 
                      value={formData.addedBy} onChange={e => setFormData({...formData, addedBy: e.target.value})} placeholder="e.g. Admin User" />
                 </div>

                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Passport Photo</label>
                    <input type="file" accept="image/*" className="w-full" onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          const result = ev.target?.result as string | null;
                          if (result) setFormData({...formData, passportPhotoUrl: result});
                        };
                        reader.readAsDataURL(file);
                      }
                    }} />
                    {formData.passportPhotoUrl && (
                      <img src={formData.passportPhotoUrl} alt="passport" className="mt-2 h-20 w-20 object-cover rounded" />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Work Permit / Entry Pass</label>
                    <input type="file" accept="image/*,application/pdf" className="w-full" onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          const result = ev.target?.result as string | null;
                          if (result) setFormData({...formData, workPermitUrl: result});
                        };
                        reader.readAsDataURL(file);
                      }
                    }} />
                    {formData.workPermitUrl && (
                      <div className="mt-2">
                        <a href={formData.workPermitUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">View uploaded file</a>
                      </div>
                    )}
                  </div>
                </div>
               </div>

               <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-4">
                 <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
                 <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Add Record</button>
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
               <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Record?</h3>
               <p className="text-gray-500 mb-6">
                 Are you sure you want to delete this recruitment record? This action cannot be undone.
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

export default RecruitedCandidateManagement;