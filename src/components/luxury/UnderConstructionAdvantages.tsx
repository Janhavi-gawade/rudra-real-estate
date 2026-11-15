'use client';

import React from 'react';
import { TrendingUp, ShieldCheck, FileCheck, Sparkles, ArrowRight } from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface UnderConstructionAdvantagesProps {
  onOpenEnquiry?: () => void;
}

export default function UnderConstructionAdvantages({ onOpenEnquiry }: UnderConstructionAdvantagesProps) {
  const { underConstructionAdvantages } = projectConfig;
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  const getIcon = (name: string) => {
    switch (name) {
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-[#C59B27]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#C59B27]" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-[#C59B27]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#C59B27]" />;
    }
  };

  const handleEnquiry = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-enquiry-modal'));
    }
  };

  return (
    <section
      id="under-construction-advantages"
      ref={sectionRef}
      className="relative py-16 sm:py-24 bg-[#02060F] text-white overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C59B27]/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-12 sm:mb-16 reveal-fade-up ${isVisible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#C59B27]/10 border border-[#C59B27]/30 text-[#EAD07C] text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>{underConstructionAdvantages.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light font-serif text-white tracking-tight mb-3">
            {underConstructionAdvantages.title}
          </h2>

          <p className="text-xs sm:text-base text-slate-300/80 font-light leading-relaxed">
            {underConstructionAdvantages.subtitle}
          </p>
        </div>

        {/* 4 Crisp, Easy-to-Understand Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {underConstructionAdvantages.items.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl bg-[#061024] border border-white/10 hover:border-[#C59B27]/40 transition-all duration-300 flex flex-col justify-between group shadow-xl reveal-fade-up ${
                isVisible ? 'is-visible' : ''
              }`}
              style={{ transitionDelay: `${idx * 70}ms` }}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {getIcon(item.iconName)}
                </div>

                <h3 className="text-base font-serif text-white group-hover:text-[#EAD07C] transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#EAD07C]">
                <span>Rudra Advisory</span>
                <span className="text-[#C59B27]">0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Callout */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#061024] via-[#091838] to-[#061024] border border-[#C59B27]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base sm:text-lg font-serif text-white mb-1">
              Looking for High-Growth Pre-Launch Opportunities?
            </h4>
            <p className="text-xs text-slate-400 font-light">
              Speak directly with a senior property advisor for off-market inventory & unit allocations.
            </p>
          </div>

          <button
            type="button"
            onClick={handleEnquiry}
            className="px-6 py-3 rounded-full gold-shimmer-btn text-[#040B18] text-xs font-bold tracking-wider uppercase transition-all hover:scale-105 active:scale-95 flex items-center space-x-2 shrink-0"
          >
            <span>Consult Brokerage Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
