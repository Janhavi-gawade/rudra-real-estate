'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, ArrowRight, ShieldCheck, HardHat } from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ProjectOverviewProps {
  onOpenEnquiry?: () => void;
}

export default function ProjectOverview({ onOpenEnquiry }: ProjectOverviewProps) {
  const { identity, overview } = projectConfig;
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  const handleEnquiry = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-enquiry-modal'));
    }
  };

  return (
    <section
      id="project-overview"
      ref={sectionRef}
      className="relative py-14 sm:py-32 bg-[#040B18] text-white overflow-hidden"
    >
      {/* Subtle Ambient Background Vignette */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C59B27]/30 to-transparent" />
      <div className="absolute -top-40 right-1/4 w-96 h-96 rounded-full bg-[#C59B27]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Monograph Eyebrow & Title */}
        <div className={`text-center max-w-3xl mx-auto mb-10 sm:mb-20 reveal-fade-up ${isVisible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#C59B27]/10 border border-[#C59B27]/30 text-[#EAD07C] text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mb-3 sm:mb-4">
            <HardHat className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>UNDER-CONSTRUCTION PROJECT DOSSIER</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light font-serif text-white tracking-tight mb-3 sm:mb-5">
            {overview.title}
          </h2>

          <p className="text-xs sm:text-base text-slate-300/80 font-light leading-relaxed">
            {overview.description}
          </p>
        </div>

        {/* Minimalist Architectural Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-12 sm:mb-20">
          {overview.specifications.map((spec, index) => (
            <div
              key={index}
              className={`relative p-5 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#C59B27]/40 backdrop-blur-sm transition-all duration-300 group reveal-fade-up ${
                isVisible ? 'is-visible' : ''
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="text-[11px] font-semibold tracking-widest uppercase text-slate-400 mb-2">
                {spec.label}
              </div>
              <div className="text-xl sm:text-2xl font-serif text-white font-normal mb-2 group-hover:text-[#EAD07C] transition-colors">
                {spec.value}
              </div>
              {spec.description && (
                <div className="text-xs text-slate-400 font-light leading-normal">
                  {spec.description}
                </div>
              )}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-[#C59B27]/40 transition-colors" />
            </div>
          ))}
        </div>

        {/* Visual Project Canvas Feature Bar */}
        <div className={`relative rounded-3xl overflow-hidden border border-[#C59B27]/20 bg-gradient-to-r from-[#061024] to-[#0A1B3B] p-8 sm:p-12 shadow-2xl reveal-scale ${isVisible ? 'is-visible' : ''}`}>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs tracking-[0.25em] uppercase text-[#EAD07C] font-semibold block">
                {identity.developerName} • {identity.statusBadge}
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-white leading-tight">
                An Exclusive Limited-Edition Living Experience
              </h3>
              <p className="text-sm text-slate-300/80 font-light max-w-2xl leading-relaxed">
                Currently under active construction in Pune's high-appreciation riverfront corridor. Every residence features acoustic glass insulation, double-height ceilings, and uninterrupted views of sunrise over the water.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-4">
              <button
                type="button"
                onClick={handleEnquiry}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-xs tracking-widest uppercase text-[#040B18] gold-shimmer-btn shadow-lg shadow-[#C59B27]/20 transition-all flex items-center justify-center space-x-2 hover:scale-105"
              >
                <span>Request Project Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-[11px] text-slate-400 flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27] mr-1.5" />
                <span>RERA: {identity.reraNumber}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
