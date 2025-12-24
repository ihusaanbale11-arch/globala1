import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { JobApplication } from '../../types';
import { Check, X, Search, Briefcase, Mail, Phone, Calendar, Download } from 'lucide-react';

const ApplicationManagement: React.FC = () => {
  const { jobApplications, updateApplicationStatus } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApps = jobApplications.filter(app => 
    app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.vacancyTitle.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a,b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Job Applications</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Search by candidate or job title..." 
              className="pl-10 w-full border border-gray-300 rounded-lg py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
            {filteredApps.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                    <Briefcase className="h-12 w-12 mx-auto text-gray-300 mb-4"/>
                    <p>No job applications received yet.</p>
                </div>
            ) : (
                filteredApps.map((app) => (
                    <div key={app.id} className="p-6 hover:bg-gray-50 transition">
                        <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-bold text-gray-900">{app.applicantName}</h3>
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${
                                        app.status === 'New' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                        app.status === 'Reviewed' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                        app.status === 'Hired' ? 'bg-green-50 text-green-700 border-green-200' :
                                        app.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                                        'bg-gray-100 text-gray-700'
                                    }`}>
                                        {app.status}
                                    </span>
                                </div>
                                
                                <p className="text-sm font-medium text-gray-900 mb-1 flex items-center gap-2">
                                    <Briefcase size={14} className="text-gray-400"/> Applying for: <span className="text-blue-600">{app.vacancyTitle}</span>
                                </p>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                                    <div className="flex items-center gap-1"><Mail size={14}/> {app.email}</div>
                                    <div className="flex items-center gap-1"><Phone size={14}/> {app.phone}</div>
                                    <div className="flex items-center gap-1">Experience: {app.experience} Years</div>
                                    <div className="flex items-center gap-1"><Calendar size={14}/> {app.date}</div>
                                </div>

                                {app.resumeUrl && (
                                    <div className="mt-3">
                                        <a 
                                          href={app.resumeUrl} 
                                          download={`resume-${app.applicantName.replace(/\s+/g, '_')}`} 
                                          className="flex items-center gap-1 text-sm text-blue-600 hover:underline bg-blue-50 w-fit px-3 py-1.5 rounded-lg border border-blue-100"
                                        >
                                            <Download size={14}/> Download Resume
                                        </a>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                {app.status === 'New' && (
                                    <button 
                                        onClick={() => updateApplicationStatus(app.id, 'Reviewed')}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 text-sm font-medium"
                                    >
                                        Mark Reviewed
                                    </button>
                                )}
                                {app.status === 'Reviewed' && (
                                    <button 
                                        onClick={() => updateApplicationStatus(app.id, 'Hired')}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200 text-sm font-medium"
                                    >
                                        <Check size={16}/> Hire
                                    </button>
                                )}
                                {app.status !== 'Rejected' && app.status !== 'Hired' && (
                                    <button 
                                        onClick={() => updateApplicationStatus(app.id, 'Rejected')}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-md hover:bg-red-100 hover:text-red-700 text-sm font-medium"
                                        title="Reject Application"
                                    >
                                        <X size={16}/> Reject
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationManagement;