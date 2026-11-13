'use client';

import React from 'react';
import { Sparkles, Clock, ArrowRight, Compass, HardHat } from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface LocationSectionProps {
  onOpenEnquiry?: () => void;
}

export default function LocationSection({ onOpenEnquiry }: LocationSectionProps) {
  const { location, contact } = projectConfig;
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
      id="project-location"
      ref={sectionRef}
      className="relative py-16 sm:py-28 bg-[#040B18] text-white overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C59B27]/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-8 sm:mb-14 reveal-fade-up ${isVisible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#C59B27]/10 border border-[#C59B27]/30 text-[#EAD07C] text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>CONNECTIVITY</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light font-serif text-white tracking-tight mb-2 sm:mb-3">
            {location.title}
          </h2>

          <p className="text-xs sm:text-base text-slate-300/80 font-light leading-relaxed">
            {location.subtitle}
          </p>
        </div>

        {/* Location Highlights Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mb-12">
          {location.landmarks.map((landmark, idx) => (
            <div
              key={idx}
              className={`p-4 sm:p-6 rounded-2xl bg-[#061024] border border-white/10 hover:border-[#C59B27]/40 transition-all duration-300 group shadow-lg reveal-fade-up ${
                isVisible ? 'is-visible' : ''
              }`}
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold text-[#EAD07C]">
                  {landmark.category}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#C59B27]/10 text-[#EAD07C] border border-[#C59B27]/30 flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-[#C59B27]" />
                  <span>{landmark.driveTime}</span>
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-serif text-white group-hover:text-[#EAD07C] transition-colors">
                {landmark.destination}
              </h3>
            </div>
          ))}
        </div>

        {/* Minimal Experience Centre / Site Tour Card */}
        <div className={`relative rounded-3xl overflow-hidden border border-[#C59B27]/30 bg-gradient-to-r from-[#061024] via-[#0A1B3B] to-[#061024] p-6 sm:p-10 shadow-2xl reveal-scale ${isVisible ? 'is-visible' : ''}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase text-[#EAD07C] font-semibold">
                <HardHat className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>ON-SITE EXPERIENCE CENTRE</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-serif text-white font-light">
                {location.address}
              </h3>
              <p className="text-xs text-slate-400 font-light">
                {contact.siteOfficeHours} • Client valet parking at site
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3">
              <button
                type="button"
                onClick={handleEnquiry}
                className="w-full sm:w-auto px-7 py-3 rounded-full font-semibold text-xs tracking-widest uppercase text-[#040B18] gold-shimmer-btn shadow-lg shadow-[#C59B27]/20 transition-all flex items-center justify-center space-x-2 hover:scale-105"
              >
                <span>Book Site Tour</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  location.mapQuery
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-400 hover:text-[#EAD07C] transition-colors flex items-center space-x-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Google Maps Directions</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
