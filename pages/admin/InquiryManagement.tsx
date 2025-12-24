
import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { Inquiry } from '../../types';
import { Mail, Sparkles, Send, X, Trash2, Check, ArrowLeft, MessageSquare } from 'lucide-react';
import { generateInquiryResponse } from '../../services/geminiService';

const InquiryManagement: React.FC = () => {
  const { inquiries, updateInquiryStatus, replyToInquiry } = useData();
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [draftResponse, setDraftResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const activeInquiries = inquiries.filter(i => i.status !== 'Archived').sort((a,b) => b.date.localeCompare(a.date));

  useEffect(() => {
    if (selectedInquiry) {
        setDraftResponse(selectedInquiry.response || '');
        setSendSuccess(false);
    } else {
        setDraftResponse('');
    }
  }, [selectedInquiry]);

  const handleOpenInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
  };

  const handleGenerateResponse = async () => {
    if (!selectedInquiry) return;
    setIsGenerating(true);
    const response = await generateInquiryResponse(selectedInquiry.message, selectedInquiry.name);
    setDraftResponse(response);
    setIsGenerating(false);
  };

  const handleSendResponse = () => {
    if (!selectedInquiry) return;
    if (!draftResponse.trim()) {
        alert("Please enter a response before sending.");
        return;
    }
    
    replyToInquiry(selectedInquiry.id, draftResponse);
    
    setSelectedInquiry(prev => prev ? ({
        ...prev,
        status: 'Replied',
        response: draftResponse
    }) : null);
    
    setSendSuccess(true);
    setTimeout(() => {
        setSendSuccess(false);
    }, 1500);
  };

  const handleArchive = () => {
    if (!selectedInquiry) return;
    updateInquiryStatus(selectedInquiry.id, 'Archived');
    setSelectedInquiry(null);
  }

  return (
    <div className="h-full flex flex-col md:flex-row gap-6 md:gap-10">
      {/* List - Responsive toggle */}
      <div className={`w-full md:w-1/3 bg-white rounded-2xl md:rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[400px] md:h-[calc(100vh-10rem)] ${selectedInquiry ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-6 md:p-8 border-b border-slate-50 bg-slate-50/50">
          <h2 className="text-xl font-black text-slate-900 tracking-tighter">Inquiries Hub</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Pending Communications</p>
        </div>
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {activeInquiries.map((inquiry) => (
            <div 
              key={inquiry.id}
              onClick={() => handleOpenInquiry(inquiry)}
              className={`p-4 md:p-6 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-all ${
                selectedInquiry?.id === inquiry.id ? 'bg-blue-50/50 border-l-4 border-blue-600' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-black text-slate-900 truncate w-2/3 tracking-tight">{inquiry.name}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase whitespace-nowrap">{inquiry.date}</span>
              </div>
              <p className="text-xs text-slate-500 truncate mb-3 font-medium">{inquiry.subject}</p>
              <div className="flex justify-between items-center">
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md border ${
                    inquiry.status === 'New' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                }`}>
                    {inquiry.status}
                </span>
                {inquiry.response && <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1"><Check size={10}/> Sent</span>}
              </div>
            </div>
          ))}
           {activeInquiries.length === 0 && (
             <div className="p-20 text-center text-slate-300 font-black uppercase tracking-[0.2em] text-xs">Clear Inbox</div>
           )}
        </div>
      </div>

      {/* Detail View */}
      <div className={`w-full md:w-2/3 bg-white rounded-2xl md:rounded-[2.5rem] shadow-xl border border-slate-200 flex flex-col md:h-[calc(100vh-10rem)] ${selectedInquiry ? 'flex' : 'hidden md:flex items-center justify-center text-slate-300'}`}>
        {selectedInquiry ? (
          <>
            <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
              <div className="flex items-start gap-3 md:gap-4 min-w-0">
                <button onClick={() => setSelectedInquiry(null)} className="p-2 md:hidden text-slate-400 hover:text-slate-900 bg-white rounded-xl shadow-sm flex-shrink-0">
                    <ArrowLeft size={20} />
                </button>
                <div className="min-w-0">
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter leading-tight truncate">{selectedInquiry.subject}</h2>
                    <div className="flex items-center text-[10px] md:text-xs font-bold text-slate-500 gap-2 mt-1 md:mt-2 uppercase tracking-widest truncate">
                    <Mail size={12} className="text-blue-500 flex-shrink-0" /> {selectedInquiry.email}
                    </div>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                  {/* Fixed md:size error by removing it and using standard size */}
                  <button onClick={handleArchive} title="Archive" className="p-2 md:p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all shadow-sm bg-white">
                      <Trash2 size={20} />
                  </button>
              </div>
            </div>
            
            <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar">
              <div className="bg-slate-50 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] mb-8 md:mb-10 border border-slate-100 relative group">
                <div className="absolute top-4 right-6 opacity-5 group-hover:opacity-10 transition-opacity hidden sm:block">
                    {/* Fixed md:size error by using Tailwind responsive classes */}
                    <Mail className="w-20 h-20 md:w-[120px] md:h-[120px]" />
                </div>
                <p className="text-slate-700 text-base md:text-lg font-medium leading-relaxed whitespace-pre-wrap relative z-10">{selectedInquiry.message}</p>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] ml-1">
                    {selectedInquiry.status === 'Replied' ? 'Official Response' : 'Dispatch Matrix'}
                  </h3>
                  {selectedInquiry.status !== 'Replied' && (
                    <button 
                        onClick={handleGenerateResponse}
                        disabled={isGenerating}
                        className="w-fit flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all disabled:opacity-50 border border-blue-100 bg-white shadow-sm"
                    >
                        <Sparkles size={14} className="animate-pulse" /> {isGenerating ? 'Synthesizing...' : 'AI Assistant Draft'}
                    </button>
                  )}
                </div>
                
                <textarea
                  className="w-full h-48 md:h-64 border-2 border-slate-100 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 focus:ring-8 focus:ring-blue-50 focus:border-blue-600 outline-none transition-all font-medium text-slate-700 leading-relaxed custom-scrollbar bg-slate-50/30"
                  value={draftResponse}
                  onChange={(e) => setDraftResponse(e.target.value)}
                  placeholder="Type your strategic response here..."
                />
                
                <div className="flex justify-end pt-4">
                  {sendSuccess ? (
                      <div className="w-full sm:w-auto flex items-center justify-center gap-3 text-emerald-600 bg-emerald-50 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest border border-emerald-100 animate-in zoom-in duration-300">
                          <Check size={20} /> Confirmed
                      </div>
                  ) : (
                    <button 
                        onClick={handleSendResponse}
                        className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest hover:bg-blue-600 shadow-2xl transition-all transform active:scale-95 flex items-center justify-center gap-3"
                    >
                        <Send size={18} /> {selectedInquiry.status === 'Replied' ? 'Update' : 'Dispatch'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center p-12">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-50 rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center mb-6 shadow-inner text-slate-200">
                {/* Fixed md:size error by using Tailwind responsive classes */}
                <MessageSquare className="w-10 h-10 md:w-12 md:h-12" />
            </div>
            <p className="font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">Select communication thread</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InquiryManagement;