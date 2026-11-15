'use client';

import React from 'react';
import { Compass, CheckCircle2, KeyRound, ArrowRight } from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface BrokerAdvisoryProcessProps {
  onOpenEnquiry?: () => void;
}

export default function BrokerAdvisoryProcess({ onOpenEnquiry }: BrokerAdvisoryProcessProps) {
  const { advisoryProcess } = projectConfig;
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  const handleEnquiry = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-enquiry-modal'));
    }
  };

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Compass className="w-5 h-5 text-[#C59B27]" />;
      case 1:
        return <CheckCircle2 className="w-5 h-5 text-[#C59B27]" />;
      case 2:
        return <KeyRound className="w-5 h-5 text-[#C59B27]" />;
      default:
        return <Compass className="w-5 h-5 text-[#C59B27]" />;
    }
  };

  return (
    <section
      id="broker-process"
      ref={sectionRef}
      className="relative py-16 sm:py-24 bg-[#040B18] text-white overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C59B27]/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-12 sm:mb-16 reveal-fade-up ${isVisible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#C59B27]/10 border border-[#C59B27]/30 text-[#EAD07C] text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mb-3 sm:mb-4">
            <span>{advisoryProcess.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light font-serif text-white tracking-tight mb-3">
            {advisoryProcess.title}
          </h2>

          <p className="text-xs sm:text-base text-slate-300/80 font-light leading-relaxed">
            {advisoryProcess.subtitle}
          </p>
        </div>

        {/* 3 Clear Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {advisoryProcess.steps.map((step, idx) => (
            <div
              key={idx}
              className={`relative p-6 sm:p-8 rounded-3xl bg-[#061024] border border-white/10 hover:border-[#C59B27]/40 transition-all duration-300 group shadow-xl reveal-fade-up ${
                isVisible ? 'is-visible' : ''
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getStepIcon(idx)}
                </div>
                <span className="text-2xl font-serif font-light text-[#C59B27]/50 group-hover:text-[#EAD07C] transition-colors">
                  {step.number}
                </span>
              </div>

              <h3 className="text-lg font-serif text-white mb-2 group-hover:text-[#EAD07C] transition-colors">
                {step.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Consultation CTA */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleEnquiry}
            className="px-8 py-3.5 rounded-full font-semibold text-xs tracking-widest uppercase text-[#040B18] gold-shimmer-btn shadow-xl shadow-[#C59B27]/25 hover:scale-105 active:scale-95 transition-all inline-flex items-center space-x-2"
          >
            <span>Start Your Under-Construction Search</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
