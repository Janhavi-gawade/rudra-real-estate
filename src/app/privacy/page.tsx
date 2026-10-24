import React from 'react';

export const metadata = {
  title: 'Privacy Policy | Rudra Property Pune',
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm text-slate-700 text-sm leading-relaxed space-y-6">
        <h1 className="text-3xl font-bold font-serif text-[#08183A]">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Effective Date: October 2026</p>

        <p>
          At <strong>Rudra Property – Real Estate Consultancy</strong> (Office No. 47, Prestige Chamber, Keshav Nagar–Mundhwa, Pune 411036), we respect and protect your privacy. This policy outlines how we handle customer inquiry data.
        </p>

        <h3 className="text-lg font-bold text-[#08183A] font-serif">1. Information We Collect</h3>
        <p>
          When you request information, schedule a property visit, or submit an enquiry on our platform, we collect your name, phone number, email address, and property preferences.
        </p>

        <h3 className="text-lg font-bold text-[#08183A] font-serif">2. How We Use Your Information</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>To contact you regarding the specific property or inquiry you submitted.</li>
          <li>To schedule and coordinate site visits to verified projects.</li>
          <li>To provide verified price lists, floor plans, and brochures.</li>
          <li>We never sell or distribute your contact details to third-party marketing spammers.</li>
        </ul>

        <h3 className="text-lg font-bold text-[#08183A] font-serif">3. Security</h3>
        <p>
          We employ industry-standard encryption and database safeguards to keep your contact requests confidential and secure.
        </p>

        <h3 className="text-lg font-bold text-[#08183A] font-serif">4. Contact Us</h3>
        <p>
          For questions regarding your privacy, contact us directly at <strong>rudrapropertypune@gmail.com</strong> or call <strong>+91 7798504435</strong>.
        </p>
      </div>
    </div>
  );
}
