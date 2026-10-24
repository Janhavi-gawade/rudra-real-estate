'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, buildCallUrl } from '@/lib/utils';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Does Rudra Property charge any brokerage when purchasing a new flat or under-construction project?',
      a: 'Zero! When you buy a primary home from our developer tie-ups, our advisory and site assistance are 100% free with zero brokerage. We negotiate direct builder pre-launch discounts on your behalf.',
    },
    {
      q: 'What are the current stamp duty and registration expenses for buying property in Pune (2026)?',
      a: 'In Pune municipal limits, the typical government charges are approximately 7% in total: 6% Stamp Duty, 1% Local Body / Metro Cess, plus a fixed government registration charge of ₹30,000. Our legal desk provides exact stamp duty calculations prior to booking.',
    },
    {
      q: 'Can Rudra Property arrange cab pickups and schedule site visits on weekends?',
      a: 'Yes, absolutely. We provide complimentary, hassle-free cab pickups and drop-offs for families across Keshav Nagar, Mundhwa, Kharadi, Hadapsar, and Koregaon Park. Our senior advisors accompany you to every site visit with complete verified floor plans.',
    },
    {
      q: 'Why are Keshav Nagar and Mundhwa experiencing high residential demand right now?',
      a: 'Keshav Nagar and Mundhwa sit directly between Magarpatta Cybercity and Kharadi IT SEZ. Property prices are 25–35% more accessible than Koregaon Park and Kalyani Nagar, while offering brand new high-rise riverside societies with world-class amenities and high rental yields.',
    },
    {
      q: 'How does Rudra Property verify property titles and RERA approvals?',
      a: 'Every property on our website undergoes 3-tier verification: (1) Official MahaRERA registration number check, (2) 30-year search report for clear and marketable title, and (3) Sanctioned commencement certificate (CC) verification from PMC / PMRDA.',
    },
    {
      q: 'Where is your physical office located, and what are your working hours?',
      a: 'Our physical office is located at Office No. 47, Prestige Chamber, Keshav Nagar–Mundhwa, Pune 411036. We are open 7 days a week from 9:30 AM to 8:00 PM. Walk-ins and prior consultations are always welcome.',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#B2881E] mb-2">
            <HelpCircle className="w-4 h-4 text-[#C59B27]" />
            <span>TRANSPARENCY & CLARITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#08183A]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Everything you need to know about buying, renting, and investing in Pune real estate.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#C59B27]/60 bg-[#FAF8F5] shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#08183A] font-serif"
                >
                  <span className="leading-snug">{faq.q}</span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#C59B27] text-[#050E21] rotate-180'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#08183A] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-[#0D224D]">
          <div>
            <h4 className="text-lg font-bold font-serif text-white">
              Have specific questions about a property or budget?
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Speak directly with our senior property consultant for personalized guidance.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={buildCallUrl('7798504435')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors flex items-center space-x-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Call Broker</span>
            </a>
            <a
              href={buildWhatsAppUrl(
                '7798504435',
                'Hello Rudra Property, I have a few questions regarding property purchase in Pune.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white transition-colors flex items-center space-x-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
