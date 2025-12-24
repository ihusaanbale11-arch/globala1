
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { 
    ArrowLeft, Printer, ShieldCheck, AlertTriangle, CheckCircle2, DollarSign, RefreshCw
} from 'lucide-react';

const FinanceInvoiceDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { invoices, addPayment, logAction } = useData();
  const [isSettling, setIsSettling] = useState(false);

  const invoice = invoices.find(inv => inv.id === id);

  if (!invoice) return (
    <div className="p-20 text-center font-mono">
        <AlertTriangle size={64} className="mx-auto text-slate-900 mb-6" />
        <h2 className="text-2xl font-bold">RECORD NOT FOUND</h2>
        <button onClick={() => navigate('/admin/finance/invoices')} className="mt-8 text-slate-600 font-bold flex items-center gap-2 mx-auto hover:underline"><ArrowLeft size={18}/> RETURN TO LEDGER</button>
    </div>
  );

  const handlePrint = () => {
    window.print();
  };

  const handleSettleInvoice = () => {
    if (window.confirm("Confirm official receipt of funds and settle this invoice?")) {
        setIsSettling(true);
        setTimeout(() => {
            const today = new Date().toISOString().split('T')[0];
            addPayment({
                id: `PAY-${Date.now()}`,
                invoiceId: invoice.id,
                amount: invoice.totalAmount,
                paymentDate: today,
                method: 'Bank Transfer',
                reference: `SETTLE-${invoice.invoiceNumber}`,
                reconciled: true
            });
            logAction('INVOICE_SETTLEMENT', 'Finance', `Invoice ${invoice.invoiceNumber} marked as Paid and added to collections.`);
            setIsSettling(false);
        }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 md:pb-20">
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            aside, header, nav, button, .no-print, [role="navigation"], .fixed:not(.print-only) { 
              display: none !important; 
              visibility: hidden !important;
              height: 0 !important;
              width: 0 !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            html, body, #root, #root > div, main, main > div, .max-w-7xl, .max-w-5xl {
              display: block !important;
              overflow: visible !important;
              height: auto !important;
              width: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              position: static !important;
              background: white !important;
              color: black !important;
              box-shadow: none !important;
              border: none !important;
            }
            @page { size: A4 portrait; margin: 12mm; }
            .invoice-shell { display: block !important; width: 100% !important; font-family: 'Courier New', Courier, monospace !important; }
            .doc-header { border-bottom: 3pt solid black; padding-bottom: 8mm; margin-bottom: 8mm; display: flex; justify-content: space-between; align-items: flex-start; }
            .label-official { display: block; letter-spacing: 0.5em; text-transform: uppercase; font-weight: 900; font-size: 8pt; margin-bottom: 3mm; }
            .data-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
            .data-table th { border-bottom: 2pt solid black; padding: 3mm 1mm; text-align: left; font-size: 8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; }
            .data-table td { padding: 4mm 1mm; font-size: 9pt; vertical-align: top; border-bottom: 0.5pt solid #eee; word-wrap: break-word; }
            .col-desc { width: 50%; }
            .col-qty { width: 10%; text-align: center; }
            .col-unit { width: 20%; text-align: right; }
            .col-total { width: 20%; text-align: right; }
            .summary-row td { border-bottom: none !important; padding: 2mm 1mm; }
            .summary-label { text-align: right; font-weight: 900; text-transform: uppercase; font-size: 8pt; }
            .summary-value { text-align: right; font-weight: 900; font-size: 9pt; }
            .net-payable-row td { border-top: 2.5pt solid black !important; padding-top: 4mm !important; }
            .net-payable-row .summary-value { font-size: 14pt !important; }
            tr { page-break-inside: avoid !important; }
            .doc-footer { margin-top: 15mm; border-top: 1pt solid black; padding-top: 4mm; display: flex; justify-content: space-between; font-size: 7pt; }
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          }
          @media screen {
            .invoice-shell { max-width: 210mm; margin: 3rem auto; background: white; box-shadow: 0 0 60px rgba(0,0,0,0.1); padding: 20mm; border-radius: 4px; }
            .label-official { letter-spacing: 0.5em; text-transform: uppercase; font-weight: 900; font-size: 10px; margin-bottom: 12px; }
            .data-table { width: 100%; border-collapse: collapse; }
            .data-table th { border-bottom: 2px solid black; padding: 12px 8px; text-align: left; font-size: 11px; font-weight: 900; }
            .data-table td { padding: 16px 8px; border-bottom: 1px solid #eee; }
            .col-qty { text-align: center; }
            .col-unit, .col-total { text-align: right; }
          }
        `}} />

        <div className="max-w-4xl mx-auto pt-10 px-4 flex flex-col md:flex-row justify-between items-center gap-4 no-print">
            <button 
                onClick={() => navigate('/admin/finance/invoices')}
                className="flex items-center gap-2 text-slate-500 hover:text-black font-bold text-xs uppercase tracking-widest transition"
            >
                <ArrowLeft size={16}/> Return to Ledger
            </button>
            <div className="flex gap-4">
                {invoice.status !== 'Paid' && (
                    <button 
                        onClick={handleSettleInvoice}
                        disabled={isSettling}
                        className="px-8 py-5 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-700 transition shadow-xl flex items-center gap-3 active:scale-95 disabled:opacity-50"
                    >
                        {isSettling ? <RefreshCw size={18} className="animate-spin"/> : <CheckCircle2 size={18}/>}
                        Record Settlement
                    </button>
                )}
                <button 
                  onClick={handlePrint}
                  className="px-8 py-5 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition shadow-xl flex items-center gap-3 active:scale-95"
                >
                    <Printer size={18}/> Export PDF
                </button>
            </div>
        </div>

        <div className="invoice-shell font-mono">
            <div className="doc-header">
                <div className="w-1/2">
                    <span className="label-official">O F F I C I A L   F R O M</span>
                    <div className="font-black text-2xl uppercase leading-none mb-2">Glow Tours and Trade Pvt Ltd</div>
                    <div className="text-sm font-bold space-y-1">
                        <p>H. Glow Building, 2nd Floor, Malé</p>
                        <p>Republic of Maldives</p>
                        <p>+960 333 4444 • www.glowtours.mv</p>
                    </div>
                    <div className="mt-12">
                        <span className="label-official">B I L L   R E C I P I E N T</span>
                        <div className="text-xl font-black uppercase tracking-tight">{invoice.clientName}</div>
                        <div className="text-xs mt-1 font-bold">Client ID: {invoice.clientId}</div>
                    </div>
                </div>
                <div className="w-1/2 text-right">
                    <h1 className="text-5xl font-black tracking-tighter mb-4 italic">INVOICE</h1>
                    <div className="text-sm font-black space-y-1 mb-10">
                        <p>REF NO: {invoice.invoiceNumber}</p>
                        <p>DATE: {invoice.issueDate}</p>
                        <p>DUE: {invoice.dueDate}</p>
                    </div>
                    <div className={`inline-block px-4 py-2 border-4 mb-8 font-black uppercase text-xl ${invoice.status === 'Paid' ? 'border-emerald-500 text-emerald-600 rotate-[-5deg]' : 'border-slate-200 text-slate-300'}`}>
                        {invoice.status}
                    </div>
                    <div className="mt-4">
                        <span className="label-official inline-block mb-1">B A N K   D E T A I L S</span>
                        <div className="text-xs font-black space-y-1">
                            <p>BANK OF MALDIVES (BML)</p>
                            <p>USD: 7730000000001</p>
                            <p>MVR: 7730000000002</p>
                        </div>
                    </div>
                </div>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        <th className="col-desc">S E R V I C E   D E S C R I P T I O N</th>
                        <th className="col-qty">Q T Y</th>
                        <th className="col-unit">U N I T</th>
                        <th className="col-total">A M O U N T</th>
                    </tr>
                </thead>
                <tbody>
                    {(invoice.lineItems || []).map((item) => (
                        <tr key={item.id}>
                            <td className="col-desc">
                                <div className="font-black uppercase mb-1">{item.description}</div>
                                <div className="text-[8pt] text-slate-500 italic">Professional manpower deployment mandate executed in the Maldives.</div>
                            </td>
                            <td className="col-qty font-bold">{item.quantity}</td>
                            <td className="col-unit font-bold">{invoice.currency} {(item.unitPrice ?? 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                            <td className="col-total font-black text-lg">
                                {invoice.currency} {(item.amount ?? 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
                            </td>
                        </tr>
                    ))}
                    <tr className="summary-row">
                        <td colSpan={2} rowSpan={4} className="pt-10 align-top">
                            <div className="border-t border-dashed border-black pt-6 pr-10">
                                <span className="label-official">T E R M S   &   C O N D I T I O N S</span>
                                <ul className="list-decimal pl-5 space-y-1 text-[8pt] font-bold text-slate-700">
                                    <li>Payment mandatory within period of issuance.</li>
                                    <li>Kindly use reference {invoice.invoiceNumber} for transfers.</li>
                                    <li>This document is digitally issued and legally binding.</li>
                                </ul>
                            </div>
                        </td>
                        <td className="summary-label pt-10">Subtotal</td>
                        <td className="summary-value pt-10">{invoice.currency} {(invoice.subtotal ?? 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                    </tr>
                    <tr className="summary-row">
                        <td className="summary-label text-blue-600">T-GST (16%)</td>
                        <td className="summary-value text-blue-600">+ {invoice.currency} {(invoice.taxAmount ?? 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                    </tr>
                    <tr className="summary-row net-payable-row">
                        <td className="summary-label">NET PAYABLE</td>
                        <td className="summary-value">{invoice.currency} {(invoice.totalAmount ?? 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                    </tr>
                </tbody>
            </table>

            <div className="doc-footer">
                <div>
                    <p className="font-black uppercase tracking-widest">Digitally Authenticated at Malé HQ</p>
                    <p className="text-[7pt] text-slate-400 mt-1 uppercase">TIMESTAMP: {new Date().toISOString()}</p>
                </div>
                <div className="text-right">
                    <div className="flex items-center justify-end gap-2 text-black">
                        <ShieldCheck size={14} />
                        <span className="font-black uppercase tracking-[0.2em]">Official Ledger Copy</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default FinanceInvoiceDetail;