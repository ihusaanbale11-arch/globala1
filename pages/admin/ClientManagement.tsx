import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { CheckCircle, XCircle, Trash2, Search, Mail, User, Plus, X, AlertTriangle } from 'lucide-react';

const ClientManagement: React.FC = () => {
  const { clients, addClient, updateClientStatus, deleteClient } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);
  
  // Form State
  const initialFormState = {
    companyName: '',
    contactPerson: '',
    email: '',
    status: 'Active' as const
  };
  const [formData, setFormData] = useState(initialFormState);

  const filteredClients = clients.filter(c => 
    c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const initiateDelete = (id: string) => {
    setDeleteConfirmationId(id);
  };

  const performDelete = () => {
    if (deleteConfirmationId) {
      deleteClient(deleteConfirmationId);
      setDeleteConfirmationId(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient = {
      id: Date.now().toString(),
      ...formData
    };
    addClient(newClient);
    setIsModalOpen(false);
    setFormData(initialFormState);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-sm transition"
        >
          <Plus size={18} /> Add Client
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Search companies or emails..." 
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Person</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <User size={20} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{client.companyName}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail size={12} /> {client.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {client.contactPerson}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      client.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      client.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      {client.status !== 'Active' && (
                        <button 
                          onClick={() => updateClientStatus(client.id, 'Active')}
                          title="Approve / Activate"
                          className="text-green-600 hover:text-green-900 bg-green-50 p-1.5 rounded hover:bg-green-100"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}
                      {client.status !== 'Suspended' && (
                        <button 
                          onClick={() => updateClientStatus(client.id, 'Suspended')}
                          title="Suspend"
                          className="text-orange-600 hover:text-orange-900 bg-orange-50 p-1.5 rounded hover:bg-orange-100"
                        >
                          <XCircle size={18} />
                        </button>
                      )}
                      <button 
                        onClick={() => initiateDelete(client.id)}
                        title="Delete"
                        className="text-red-600 hover:text-red-900 bg-red-50 p-1.5 rounded hover:bg-red-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    No clients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Client Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
             <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
               <h2 className="text-lg font-bold text-gray-900">Add New Client</h2>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24}/></button>
             </div>
             
             <form onSubmit={handleSubmit} className="p-6 space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                 <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                    value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} placeholder="e.g. Acme Corp" />
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                 <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                    value={formData.contactPerson} onChange={e => setFormData({...formData, contactPerson: e.target.value})} placeholder="e.g. John Doe" />
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                 <input required type="email" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="admin@company.com" />
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
                 <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Add Client</button>
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
               <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Client Account?</h3>
               <p className="text-gray-500 mb-6">
                 Are you sure you want to delete this client account? This will remove all associated data and they will no longer be able to login.
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

export default ClientManagement;