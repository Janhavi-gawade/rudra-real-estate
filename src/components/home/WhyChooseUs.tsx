import React from 'react';
import { ShieldCheck, Award, Users, Compass, CheckCircle2, Clock } from 'lucide-react';

export default function WhyChooseUs() {
  const highlights = [
    {
      icon: ShieldCheck,
      title: '100% RERA & Title Verified',
      description:
        'Every project and resale listing undergoes thorough title verification, encumbrance checks, and RERA approval scrutiny before presentation.',
    },
    {
      icon: Compass,
      title: 'East Pune Corridor Specialists',
      description:
        'Unmatched ground intelligence in Keshav Nagar, Mundhwa, Kharadi, Koregaon Park, and Hadapsar. We know upcoming metro routes and true market values.',
    },
    {
      icon: Award,
      title: 'Zero Brokerage on New Projects',
      description:
        'Enjoy direct builder inventory access, pre-launch pricing, and zero brokerage on our authorized developer partner developments.',
    },
    {
      icon: Users,
      title: 'End-to-End Handholding',
      description:
        'From personalized site visit cab pickups to home loan approvals, price negotiations, and final registry execution at the sub-registrar office.',
    },
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B2881E]">
            THE RUDRA PROPERTY ADVANTAGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#08183A] mt-2 mb-4">
            Why Discerning Homebuyers & Investors Trust Us
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Real estate is your largest financial commitment. We combine transparent consulting, deep local neighborhood expertise, and relentless client advocacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 hover:border-[#C59B27]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#08183A] text-[#EAD07C] flex items-center justify-center mb-5 shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-serif text-[#08183A] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center text-[11px] font-semibold text-[#B2881E]">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  <span>Guaranteed Professionalism</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
