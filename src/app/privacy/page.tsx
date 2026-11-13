import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';

export const metadata = {
  title: `Privacy Policy | ${projectConfig.identity.projectName}`,
};

export default function PrivacyPage() {
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
            <span className="text-xs uppercase tracking-widest font-semibold">Privacy Policy</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-light font-serif text-white tracking-tight">
            Client Confidentiality & Privacy
          </h1>

          <p className="text-xs text-slate-400">Effective: October 2026</p>

          <p>
            At <strong>{identity.projectName}</strong>, we hold client privacy and confidentiality in the highest regard. This policy outlines our commitment to protecting your personal information when enquiring about our private residences.
          </p>

          <h3 className="text-base font-serif text-white pt-2">1. Information Collection</h3>
          <p>
            When registering your interest or requesting a private site inspection, we collect necessary contact details including your name, telephone number, email address, and preferred residence configuration.
          </p>

          <h3 className="text-base font-serif text-white pt-2">2. Confidential Use</h3>
          <p>
            Your information is strictly utilized by our private residence advisory team to provide architectural dossiers, milestone progress updates, and to coordinate scheduled site tours. We never sell, rent, or distribute client information to third parties.
          </p>

          <h3 className="text-base font-serif text-white pt-2">3. MahaRERA Compliance</h3>
          <p>
            All communications adhere strictly to MahaRERA transparency guidelines. Project Registration Number: <strong>{identity.reraNumber}</strong>.
          </p>

          <h3 className="text-base font-serif text-white pt-2">4. Contact Desk</h3>
          <p>
            For privacy inquiries, please contact our desk at <strong>{contact.email}</strong> or call <strong>{contact.displayPhone}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
