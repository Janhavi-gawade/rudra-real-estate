'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Waves, SunMedium, Dumbbell, Trees, ShieldCheck, Building2 } from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function LuxuryAmenities() {
  const { amenities } = projectConfig;
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Waves':
        return <Waves className="w-5 h-5 text-[#C59B27]" />;
      case 'SunMedium':
        return <SunMedium className="w-5 h-5 text-[#C59B27]" />;
      case 'Dumbbell':
        return <Dumbbell className="w-5 h-5 text-[#C59B27]" />;
      case 'Trees':
        return <Trees className="w-5 h-5 text-[#C59B27]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#C59B27]" />;
      default:
        return <Building2 className="w-5 h-5 text-[#C59B27]" />;
    }
  };

  return (
    <section
      id="project-amenities"
      ref={sectionRef}
      className="relative py-28 sm:py-36 bg-[#040B18] text-white overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C59B27]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-20 reveal-fade-up ${isVisible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#C59B27]/10 border border-[#C59B27]/30 text-[#EAD07C] text-[11px] font-semibold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>UNDER-CONSTRUCTION AMENITY PRECINCT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light font-serif text-white tracking-tight mb-5">
            {amenities.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-300/80 font-light leading-relaxed">
            {amenities.subtitle}
          </p>
        </div>

        {/* Minimalist Amenities Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.items.map((amenity, index) => (
            <div
              key={amenity.id}
              className={`group relative rounded-2xl overflow-hidden bg-[#061024] border border-white/10 hover:border-[#C59B27]/40 transition-all duration-500 shadow-xl reveal-fade-up ${
                isVisible ? 'is-visible' : ''
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Image Frame with Zoom Effect */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <Image
                  src={amenity.imageUrl}
                  alt={amenity.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061024] via-[#061024]/40 to-transparent" />

                {/* Floating Icon Pill */}
                <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                  {renderIcon(amenity.iconName)}
                </div>

                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] uppercase tracking-widest font-semibold text-[#EAD07C]">
                  {amenity.category}
                </div>
              </div>

              {/* Minimal Text Content */}
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-serif text-white group-hover:text-[#EAD07C] transition-colors">
                  {amenity.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                  {amenity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
