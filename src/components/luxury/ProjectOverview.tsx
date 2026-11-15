'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ProjectOverviewProps {
  onOpenEnquiry?: () => void;
}

export default function ProjectOverview({ onOpenEnquiry }: ProjectOverviewProps) {
  const { overview } = projectConfig;
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      id="project-overview"
      ref={sectionRef}
      className="relative py-16 sm:py-24 bg-[#040B18] text-white overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C59B27]/30 to-transparent" />
      <div className="absolute -top-40 right-1/4 w-96 h-96 rounded-full bg-[#C59B27]/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Minimalist Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-12 sm:mb-16 reveal-fade-up ${isVisible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#C59B27]/10 border border-[#C59B27]/30 text-[#EAD07C] text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mb-3 sm:mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>REAL ESTATE BROKERAGE & ADVISORY</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light font-serif text-white tracking-tight mb-3">
            {overview.title}
          </h2>

          <p className="text-xs sm:text-base text-slate-300/80 font-light leading-relaxed">
            {overview.description}
          </p>
        </div>

        {/* Crisp Brokerage Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {overview.specifications.map((spec, index) => (
            <div
              key={index}
              className={`relative p-5 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#C59B27]/40 backdrop-blur-sm transition-all duration-300 group reveal-fade-up ${
                isVisible ? 'is-visible' : ''
              }`}
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <div className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-slate-400 mb-2">
                {spec.label}
              </div>
              <div className="text-base sm:text-2xl font-serif text-white font-normal group-hover:text-[#EAD07C] transition-colors leading-snug">
                {spec.value}
              </div>
              <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-[#C59B27]/40 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
