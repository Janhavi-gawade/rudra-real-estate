'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, ArrowUpRight, Building2, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

export default function InvestmentTrends() {
  const [activeMarket, setActiveMarket] = useState('Keshav Nagar');

  const microMarkets = [
    {
      name: 'Keshav Nagar',
      yoyGrowth: '+14.2%',
      rentalYield: '4.8% p.a.',
      avgPrice: '₹6,800 – ₹8,600 / sq.ft.',
      highlights: [
        'Rapidly developing riverside promenade corridor with Godrej, Florida, and Mantra projects',
        'Direct 10-minute commute to Magarpatta Cybercity and Kharadi IT Parks',
        'High rental occupancy driven by senior software engineers and corporate leases',
        'Planned infrastructure bridge connecting Keshav Nagar directly to Kharadi',
      ],
      query: 'Keshav+Nagar',
    },
    {
      name: 'Kharadi',
      yoyGrowth: '+16.5%',
      rentalYield: '5.2% p.a.',
      avgPrice: '₹8,900 – ₹13,000 / sq.ft.',
      highlights: [
        'Pune’s Silicon Hub: EON Free Zone 1 & 2, World Trade Center (WTC), and Barclays',
        'Proposed Metro Line 3 extension and upcoming ring road connectivity',
        'Luxury towers with clubhouses by Panchshil, Gera, and Majestique',
        'Highest corporate rental demand with instant tenant absorption',
      ],
      query: 'Kharadi',
    },
    {
      name: 'Mundhwa',
      yoyGrowth: '+12.8%',
      rentalYield: '4.6% p.a.',
      avgPrice: '₹7,200 – ₹9,500 / sq.ft.',
      highlights: [
        'Strategic golden midpoint between Koregaon Park lifestyle and Magarpatta IT Hub',
        'Surge in Grade-A commercial showrooms, boutique offices, and mixed-use towers',
        'High appreciation potential for upcoming 2 and 3 BHK smart gated communities',
        'Immediate proximity to Pune Passport Office, Passport Seva Kendra, and nightlife hubs',
      ],
      query: 'Mundhwa',
    },
    {
      name: 'Hadapsar & Amanora',
      yoyGrowth: '+11.4%',
      rentalYield: '4.4% p.a.',
      avgPrice: '₹7,500 – ₹10,400 / sq.ft.',
      highlights: [
        'Established township infrastructure: Amanora Mall, Seasons Mall, and Magarpatta City',
        'Major IT employers: TCS, Accenture, Amdocs, and IBM in immediate radius',
        'Strong capital appreciation on spacious 3 BHK and 4 BHK family apartments',
        'Comprehensive healthcare and international schools (Columbia Asia / Manipal Hospital)',
      ],
      query: 'Hadapsar',
    },
  ];

  const selectedData = microMarkets.find((m) => m.name === activeMarket) || microMarkets[0];

  return (
    <section className="py-20 bg-[#FAF8F5] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#B2881E] mb-2">
            <TrendingUp className="w-4 h-4 text-[#C59B27]" />
            <span>PUNE PROPERTY INTELLIGENCE 2026</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#08183A]">
            East Pune Micro-Market & Price Trends
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Make data-backed decisions. Track capital appreciation rates, prevailing price brackets, and rental yields across our core operational territory.
          </p>
        </div>

        {/* Market Selector Tabs */}
        <div className="flex items-center justify-start sm:justify-center space-x-2 pb-4 overflow-x-auto mb-8">
          {microMarkets.map((market) => (
            <button
              key={market.name}
              onClick={() => setActiveMarket(market.name)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center space-x-2 ${
                activeMarket === market.name
                  ? 'bg-[#08183A] text-white shadow-lg'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{market.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded ${
                  activeMarket === market.name
                    ? 'bg-[#C59B27] text-[#050E21]'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {market.yoyGrowth}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Market Deep-Dive Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Stats Bar (5 cols) */}
          <div className="lg:col-span-5 bg-[#050E21] text-white p-6 sm:p-8 rounded-2xl border border-[#0D224D] space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold block mb-1">
                Selected Micro-Market
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white flex items-center">
                <MapPin className="w-5 h-5 text-[#C59B27] mr-1.5" />
                {selectedData.name}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#0D224D]">
              <div>
                <span className="text-[11px] text-slate-400 block mb-0.5">Annual Capital Growth</span>
                <span className="text-2xl font-bold text-emerald-400">{selectedData.yoyGrowth}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block mb-0.5">Gross Rental Yield</span>
                <span className="text-2xl font-bold text-[#EAD07C]">{selectedData.rentalYield}</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 block mb-0.5">Average Capital Rate</span>
              <span className="text-xl font-bold font-serif text-[#C59B27]">{selectedData.avgPrice}</span>
            </div>

            <Link
              href={`/properties?locality=${selectedData.query}`}
              className="w-full py-3 rounded-xl gold-shimmer-btn text-[#050E21] font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md"
            >
              <span>View Properties in {selectedData.name}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Growth Drivers & Infrastructure (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B2881E]">
                GROWTH CATALYSTS & INFRASTRUCTURE
              </span>
              <h4 className="text-xl font-bold font-serif text-[#08183A] mt-1">
                Why {selectedData.name} is a Top Real Estate Pick
              </h4>
            </div>

            <div className="space-y-3.5">
              {selectedData.highlights.map((point, i) => (
                <div
                  key={i}
                  className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#FAF8F5] border border-slate-200/70 text-xs sm:text-sm text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3 border-t border-slate-100">
              <span className="flex items-center text-slate-600">
                <Sparkles className="w-3.5 h-3.5 text-[#C59B27] mr-1.5" />
                Data sourced from official RERA filings & registered Pune conveyance deeds
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
