'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, Download, CheckCircle2, FileText, Lock, Building, Calendar } from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';

interface ReraAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AuditDoc {
  id: string;
  title: string;
  category: string;
  filingDate: string;
  certifier: string;
  certificateNo: string;
  status: 'VERIFIED' | 'COMPLIANT';
  summary: string;
}

const auditDocs: AuditDoc[] = [
  {
    id: 'doc-rera-progress',
    title: 'MahaRERA Quarterly Milestone Filing',
    category: 'Regulatory Progress Report',
    filingDate: 'Q3 2026 Inspection Verified',
    certifier: 'Maharashtra Real Estate Regulatory Authority',
    certificateNo: 'MHA-PUN-2026-Q3-8912',
    status: 'VERIFIED',
    summary:
      'Certified on-site progress filing verifying 100% completion of deep raft foundation, 100% podium casting, and active progress of the 14th superstructure floor slab.',
  },
  {
    id: 'doc-structural',
    title: 'Structural Stability & Concrete Quality Audit',
    category: 'Engineering Verification',
    filingDate: 'October 2026',
    certifier: 'JW Consultants & Structural Safety Board',
    certificateNo: 'STR-ENG-PUN-0941',
    status: 'COMPLIANT',
    summary:
      'Core compressive strength tests on M60 grade monolithic RCC exceed IS:456-2000 seismic parameters. Basalt bedrock anchor load testing verified at 120% standard load.',
  },
  {
    id: 'doc-escrow',
    title: '70% Project Escrow Account Verification',
    category: 'Financial Governance',
    filingDate: 'Current Active Quarter',
    certifier: 'Scheduled Commercial Bank & MahaRERA Custodian',
    certificateNo: 'ESC-RINGFENCE-7712',
    status: 'VERIFIED',
    summary:
      'Strict adherence to Section 4(2)(l)(D) of RERA Act. 70% of investor receipts ring-fenced exclusively for construction and certified milestone withdrawals.',
  },
];

export default function ReraAuditModal({ isOpen, onClose }: ReraAuditModalProps) {
  const [activeDocId, setActiveDocId] = useState(auditDocs[0].id);
  const [downloading, setDownloading] = useState(false);
  const { identity } = projectConfig;

  if (!isOpen) return null;

  const activeDoc = auditDocs.find((d) => d.id === activeDocId) || auditDocs[0];

  const handleDownload = () => {
    setDownloading(true);
    // Simulate instantaneous download generation
    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob(
        [
          `MAHARERA REGULATORY AUDIT DOSSIER\nProject: ${identity.projectName}\nRERA: ${identity.reraNumber}\nDocument: ${activeDoc.title}\nCertificate: ${activeDoc.certificateNo}\nVerified Date: ${activeDoc.filingDate}\nCertifier: ${activeDoc.certifier}\n\nSummary:\n${activeDoc.summary}\n\nThis summary document was retrieved from the official Project Verification Portal.`,
        ],
        { type: 'text/plain' }
      );
      element.href = URL.createObjectURL(file);
      element.download = `${identity.projectName.replace(/\s+/g, '_')}_Audit_${activeDoc.id}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setDownloading(false);
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl bg-[#061024] rounded-3xl border border-[#C59B27]/40 shadow-2xl my-auto flex flex-col max-h-[90dvh] overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C59B27] to-transparent" />

        {/* Header */}
        <div className="p-5 sm:p-6 pb-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#C59B27]/15 border border-[#C59B27]/40 flex items-center justify-center text-[#EAD07C]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#EAD07C] font-semibold block">
                RERA AUDIT LEDGER • {identity.reraNumber.split(' ')[0]}
              </span>
              <h2 className="text-base sm:text-xl font-serif text-white">
                Verified Engineering & Regulatory Dossier
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Document Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {auditDocs.map((doc) => (
              <button
                key={doc.id}
                type="button"
                onClick={() => setActiveDocId(doc.id)}
                className={`p-3 rounded-xl text-left border transition-all text-xs ${
                  activeDocId === doc.id
                    ? 'bg-white/10 border-[#C59B27]/60 text-white shadow-md'
                    : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-1.5 text-[9px] uppercase tracking-wider text-[#EAD07C] mb-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Verified</span>
                </div>
                <div className="font-serif text-white truncate text-xs">
                  {doc.title}
                </div>
              </button>
            ))}
          </div>

          {/* Active Document Monograph Certificate */}
          <div className="p-6 rounded-2xl bg-[#040B18] border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#EAD07C] font-semibold block mb-0.5">
                  {activeDoc.category}
                </span>
                <h3 className="text-lg font-serif text-white">
                  {activeDoc.title}
                </h3>
              </div>

              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold self-start sm:self-auto">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>OFFICIAL VERIFICATION ACTIVE</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                  Issuing Authority
                </span>
                <span className="text-white font-medium">{activeDoc.certifier}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                  Verification Ref
                </span>
                <span className="font-mono text-slate-300 text-[11px]">{activeDoc.certificateNo}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
                Executive Milestone Summary
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {activeDoc.summary}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-white/10 bg-[#040B18] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-[11px] text-slate-400 flex items-center">
            <Lock className="w-3.5 h-3.5 text-[#C59B27] mr-1.5" />
            <span>MahaRERA Escrow Protected Tranches</span>
          </span>

          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full font-semibold text-xs tracking-widest uppercase text-[#040B18] gold-shimmer-btn shadow-md shadow-[#C59B27]/20 flex items-center justify-center space-x-2 transition-all hover:scale-105 active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloading ? 'Preparing...' : 'Download Verified Certificate'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
