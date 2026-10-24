import React from 'react';

export const metadata = {
  title: 'Terms & Conditions | Rudra Property Pune',
};

export default function TermsPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm text-slate-700 text-sm leading-relaxed space-y-6">
        <h1 className="text-3xl font-bold font-serif text-[#08183A]">Terms & Conditions</h1>
        <p className="text-xs text-slate-400">Effective Date: October 2026</p>

        <p>
          Welcome to the official website of <strong>Rudra Property Consultancy</strong>. By accessing our platform, you agree to comply with and be bound by the following terms.
        </p>

        <h3 className="text-lg font-bold text-[#08183A] font-serif">1. RERA & Verification Compliance</h3>
        <p>
          Property specifications, carpet areas, and prices displayed are verified from official builder brochures and public Maharashtra RERA filings. However, final dimensions and pricing are subject to builder contracts and registered agreements for sale.
        </p>

        <h3 className="text-lg font-bold text-[#08183A] font-serif">2. Brokerage & Services</h3>
        <p>
          Zero brokerage applies only to designated primary new-launch partner projects. Standard RERA-compliant advisory terms apply to secondary resale and specialized commercial transactions as agreed upon in writing.
        </p>

        <h3 className="text-lg font-bold text-[#08183A] font-serif">3. Contact</h3>
        <p>
          Office: Office No. 47, Prestige Chamber, Keshav Nagar–Mundhwa, Pune 411036 | Phone: +91 7798504435.
        </p>
      </div>
    </div>
  );
}
