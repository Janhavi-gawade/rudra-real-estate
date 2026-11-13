'use client';

import React from 'react';
import Image from 'next/image';
import { HardHat, ArrowRight, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface UnderConstructionPortfolioProps {
  onOpenEnquiry?: () => void;
}

export default function UnderConstructionPortfolio({ onOpenEnquiry }: UnderConstructionPortfolioProps) {
  const { underConstructionPortfolio } = projectConfig;
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
      id="under-construction-portfolio"
      ref={sectionRef}
      className="relative py-16 sm:py-28 bg-[#040B18] text-white overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C59B27]/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-10 sm:mb-16 reveal-fade-up ${isVisible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mb-3 sm:mb-4">
            <HardHat className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{underConstructionPortfolio.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light font-serif text-white tracking-tight mb-2 sm:mb-3">
            {underConstructionPortfolio.title}
          </h2>

          <p className="text-xs sm:text-base text-slate-300/80 font-light leading-relaxed">
            {underConstructionPortfolio.subtitle}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {underConstructionPortfolio.projects.map((proj, idx) => (
            <div
              key={proj.id}
              className={`rounded-3xl overflow-hidden bg-[#061024] border transition-all duration-300 flex flex-col group ${
                proj.isFlagship
                  ? 'border-[#C59B27]/60 shadow-2xl ring-1 ring-[#C59B27]/30'
                  : 'border-white/10 hover:border-[#C59B27]/40'
              } reveal-fade-up ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              {/* Image Frame */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                <Image
                  src={proj.imageUrl}
                  alt={proj.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061024] via-[#061024]/40 to-transparent" />

                {/* Under Construction Status Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[10px] font-semibold uppercase tracking-wider flex items-center space-x-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  <span>UNDER CONSTRUCTION</span>
                </div>

                {proj.isFlagship && (
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#C59B27] text-[#040B18] text-[9px] font-bold uppercase tracking-wider">
                    FLAGSHIP
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="flex items-center text-slate-300 font-light text-[11px]">
                    <MapPin className="w-3 h-3 text-[#C59B27] mr-1" />
                    <span>{proj.location}</span>
                  </span>
                  <span className="font-serif text-[#EAD07C] text-sm">{proj.priceStarting}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-serif text-white group-hover:text-[#EAD07C] transition-colors mb-1">
                    {proj.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-light mb-3">
                    {proj.typology}
                  </p>

                  {/* Active Construction Progress Bar */}
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400 font-light">Active Stage:</span>
                      <span className="text-white font-medium text-right truncate max-w-[170px]">{proj.stage}</span>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#B2881E] to-[#EAD07C]"
                        style={{ width: `${proj.progress}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Completion: {proj.progress}%</span>
                      <span>Target: {proj.possession}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                  <span className="text-[10px] font-mono text-slate-400 flex items-center">
                    <ShieldCheck className="w-3 h-3 text-[#C59B27] mr-1" />
                    <span>RERA: {proj.reraNumber.split(' ')[0]}</span>
                  </span>

                  <button
                    type="button"
                    onClick={handleEnquiry}
                    className="px-4 py-1.5 rounded-full gold-shimmer-btn text-[#040B18] text-[10px] font-bold tracking-wider uppercase transition-all flex items-center space-x-1 hover:scale-105"
                  >
                    <span>Hardhat Tour</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
