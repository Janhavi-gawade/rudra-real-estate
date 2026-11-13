import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';

export const metadata = {
  title: `Terms & Conditions | ${projectConfig.identity.projectName}`,
};

export default function TermsPage() {
  const { identity, contact } = projectConfig;

  return (
    <div className="bg-[#040B18] text-[#FAF8F5] min-h-screen py-24 sm:py-32 selection:bg-[#C59B27] selection:text-[#040B18]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#EAD07C] hover:underline mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Residence</span>
        </Link>

        <div className="p-8 sm:p-12 rounded-3xl bg-[#061024] border border-white/10 shadow-2xl text-slate-300 text-xs sm:text-sm leading-relaxed space-y-6">
          <div className="flex items-center space-x-2 text-[#EAD07C]">
            <ShieldCheck className="w-5 h-5 text-[#C59B27]" />
            <span className="text-xs uppercase tracking-widest font-semibold">Legal Disclaimer</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-light font-serif text-white tracking-tight">
            Terms of Presentation
          </h1>

          <p className="text-xs text-slate-400">Effective: October 2026</p>

          <p>
            Welcome to the digital monograph for <strong>{identity.projectName}</strong>. By accessing this website, you acknowledge and agree to the following terms and architectural disclosures.
          </p>

          <h3 className="text-base font-serif text-white pt-2">1. Artistic Impressions & Renders</h3>
          <p>
            All architectural visualizers, 3D animations, flythroughs, and perspective renderings are artistic impressions for conceptual guidance only and do not form part of any legal agreement.
          </p>

          <h3 className="text-base font-serif text-white pt-2">2. MahaRERA Compliance</h3>
          <p>
            The project is registered under Maharashtra Real Estate Regulatory Authority (MahaRERA) under Registration Number: <strong>{identity.reraNumber}</strong>. Details of the project are available on the official MahaRERA website.
          </p>

          <h3 className="text-base font-serif text-white pt-2">3. Specifications & Agreements</h3>
          <p>
            All unit dimensions, carpet areas, and specifications are strictly governed by the registered Agreement for Sale executed between the developer and the purchaser.
          </p>

          <h3 className="text-base font-serif text-white pt-2">4. Experience Centre</h3>
          <p>
            {contact.siteOfficeAddress} • Inquiries: <strong>{contact.email}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
