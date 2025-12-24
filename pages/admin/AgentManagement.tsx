import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { CheckCircle, XCircle, Trash2, Search, Mail, Phone, Plus, X, AlertTriangle, Network, Globe, Users, Briefcase } from 'lucide-react';
import { Agent } from '../../types';

const AgentManagement: React.FC = () => {
  const { agents, addAgent, updateAgentStatus, deleteAgent, candidates } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);
  const [viewCandidatesForAgent, setViewCandidatesForAgent] = useState<Agent | null>(null);
  
  // Form State
  const initialFormState = {
    agencyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    status: 'Active' as const
  };
  const [formData, setFormData] = useState(initialFormState);

  const filteredAgents = agents.filter(a => 
    a.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get candidates for the selected agent
  const agentCandidates = viewCandidatesForAgent 
    ? candidates.filter(c => c.agentId === viewCandidatesForAgent.id)
    : [];

  const initiateDelete = (id: string) => {
    setDeleteConfirmationId(id);
  };

  const performDelete = () => {
    if (deleteConfirmationId) {
      deleteAgent(deleteConfirmationId);
      setDeleteConfirmationId(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAgent = {
      id: Date.now().toString(),
      ...formData
    };
    addAgent(newAgent);
    setIsModalOpen(false);
    setFormData(initialFormState);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Agent Management</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-sm transition"
        >
          <Plus size={18} /> Add Agent
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Search agencies, emails, countries..." 
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAgents.map((agent) => {
                const candidateCount = candidates.filter(c => c.agentId === agent.id).length;
                return (
                <tr key={agent.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <Network size={20} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{agent.agencyName}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Globe size={12} /> {agent.country}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div className="font-medium">{agent.contactPerson}</div>
                    <div className="text-gray-500 flex items-center gap-1 mt-0.5"><Mail size={12}/> {agent.email}</div>
                    <div className="text-gray-500 flex items-center gap-1 mt-0.5"><Phone size={12}/> {agent.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <Users size={12} className="mr-1" /> {candidateCount} Candidates
                     </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      agent.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      agent.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {agent.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setViewCandidatesForAgent(agent)}
                        title="View Candidates"
                        className="text-purple-600 hover:text-purple-900 bg-purple-50 p-1.5 rounded hover:bg-purple-100 mr-2"
                      >
                        <Users size={18} />
                      </button>
                      
                      {agent.status !== 'Active' && (
                        <button 
                          onClick={() => updateAgentStatus(agent.id, 'Active')}
                          title="Approve / Activate"
                          className="text-green-600 hover:text-green-900 bg-green-50 p-1.5 rounded hover:bg-green-100"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}
                      {agent.status !== 'Suspended' && (
                        <button 
                          onClick={() => updateAgentStatus(agent.id, 'Suspended')}
                          title="Suspend"
                          className="text-orange-600 hover:text-orange-900 bg-orange-50 p-1.5 rounded hover:bg-orange-100"
                        >
                          <XCircle size={18} />
                        </button>
                      )}
                      <button 
                        onClick={() => initiateDelete(agent.id)}
                        title="Delete"
                        className="text-red-600 hover:text-red-900 bg-red-50 p-1.5 rounded hover:bg-red-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )})}
              {filteredAgents.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No agents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Candidates Modal */}
      {viewCandidatesForAgent && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
             <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
               <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                      <Network size={20} />
                  </div>
                  <div>
                      <h2 className="text-lg font-bold text-gray-900">Agent Candidates</h2>
                      <p className="text-sm text-gray-500">Submitted by: <span className="font-semibold">{viewCandidatesForAgent.agencyName}</span></p>
                  </div>
               </div>
               <button onClick={() => setViewCandidatesForAgent(null)} className="text-gray-400 hover:text-gray-600"><X size={24}/></button>
             </div>
             
             <div className="flex-1 overflow-auto p-0">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profession</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nationality</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {agentCandidates.map(c => (
                            <tr key={c.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img className="h-8 w-8 rounded-full object-cover mr-3" src={c.imageUrl} alt="" />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{c.name}</div>
                                            <div className="text-xs text-gray-500">{c.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{c.profession}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{c.nationality}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        c.status === 'Available' ? 'bg-green-100 text-green-800' : 
                                        c.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {c.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {agentCandidates.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                    <div className="flex flex-col items-center justify-center">
                                        <Briefcase size={32} className="text-gray-300 mb-2"/>
                                        <p>No candidates submitted by this agent yet.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
             </div>
             
             <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
                <button onClick={() => setViewCandidatesForAgent(null)} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                    Close
                </button>
             </div>
           </div>
        </div>
      )}

      {/* Add Agent Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
             <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
               <h2 className="text-lg font-bold text-gray-900">Add New Agent</h2>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24}/></button>
             </div>
             
             <form onSubmit={handleSubmit} className="p-6 space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Agency Name</label>
                 <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                    value={formData.agencyName} onChange={e => setFormData({...formData, agencyName: e.target.value})} placeholder="e.g. Global HR Solutions" />
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                 <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                    value={formData.contactPerson} onChange={e => setFormData({...formData, contactPerson: e.target.value})} placeholder="e.g. John Doe" />
               </div>

               <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input required type="email" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                            value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="admin@agency.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                            value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+123..." />
                    </div>
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                 <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                    value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} placeholder="e.g. India" />
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Initial Status</label>
                 <select className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                 </select>
               </div>

               <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-2">
                 <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
                 <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Add Agent</button>
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
               <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Agent Account?</h3>
               <p className="text-gray-500 mb-6">
                 Are you sure you want to delete this agent account? This will remove all associated data and they will no longer be able to login.
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
                   <Trash2 size={18} /> Delete Account
                 </button>
               </div>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AgentManagement;