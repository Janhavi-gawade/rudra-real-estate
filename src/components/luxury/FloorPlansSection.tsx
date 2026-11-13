'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Check, Layers, ArrowRight } from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface FloorPlansSectionProps {
  onOpenEnquiry?: () => void;
}

export default function FloorPlansSection({ onOpenEnquiry }: FloorPlansSectionProps) {
  const { floorPlans } = projectConfig;
  const [selectedConfigId, setSelectedConfigId] = useState(floorPlans.configurations[0].id);
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  const activeConfig =
    floorPlans.configurations.find((c) => c.id === selectedConfigId) ||
    floorPlans.configurations[0];

  const handleEnquiry = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-enquiry-modal'));
    }
  };

  return (
    <section
      id="project-plans"
      ref={sectionRef}
      className="relative py-16 sm:py-28 bg-[#061024] text-white overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C59B27]/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-8 sm:mb-12 reveal-fade-up ${isVisible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#C59B27]/10 border border-[#C59B27]/30 text-[#EAD07C] text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mb-3 sm:mb-4">
            <Layers className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>CUSTOMIZABLE SCHEMATICS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light font-serif text-white tracking-tight mb-2 sm:mb-3">
            {floorPlans.title}
          </h2>

          <p className="text-xs sm:text-base text-slate-300/80 font-light leading-relaxed">
            {floorPlans.subtitle}
          </p>
        </div>

        {/* Configuration Selector Tabs */}
        <div className={`flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 reveal-fade-up ${isVisible ? 'is-visible' : ''}`}>
          {floorPlans.configurations.map((config) => (
            <button
              key={config.id}
              type="button"
              onClick={() => setSelectedConfigId(config.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 ${
                selectedConfigId === config.id
                  ? 'bg-[#C59B27] text-[#040B18] font-bold shadow-lg shadow-[#C59B27]/25 scale-105'
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {config.bhk}
            </button>
          ))}
        </div>

        {/* Active Configuration Showcase Card */}
        <div className={`relative rounded-3xl overflow-hidden border border-[#C59B27]/30 bg-[#040B18] shadow-2xl p-5 sm:p-10 reveal-scale ${isVisible ? 'is-visible' : ''}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Architectural Render Frame */}
            <div className="lg:col-span-7 relative h-64 sm:h-84 rounded-2xl overflow-hidden border border-white/10 bg-[#061024]">
              <Image
                src={activeConfig.diagramUrl}
                alt={activeConfig.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040B18] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#C59B27]/30 text-[10px] font-semibold text-[#EAD07C]">
                3D Layout Perspective
              </div>
            </div>

            {/* Specifications & Highlights */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-[#EAD07C] block mb-1">
                  {activeConfig.bhk}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-white">
                  {activeConfig.title}
                </h3>
              </div>

              {/* Area & Price Grid */}
              <div className="grid grid-cols-2 gap-4 py-3 border-y border-white/10">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                    Carpet Area
                  </span>
                  <span className="text-base sm:text-lg font-serif text-white">
                    {activeConfig.carpetArea}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                    Super Built-Up
                  </span>
                  <span className="text-base sm:text-lg font-serif text-white">
                    {activeConfig.superArea}
                  </span>
                </div>
                <div className="col-span-2 pt-1">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                    Starting At
                  </span>
                  <span className="text-xl sm:text-2xl font-serif text-[#EAD07C]">
                    {activeConfig.priceStarting}
                  </span>
                </div>
              </div>

              {/* Key Features List (3 clean bullets) */}
              <div className="space-y-2">
                {activeConfig.highlights.map((h, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-slate-300 font-light">
                    <Check className="w-3.5 h-3.5 text-[#C59B27] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Plan Action CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleEnquiry}
                  className="w-full sm:w-auto px-6 py-3 rounded-full font-semibold text-xs tracking-widest uppercase text-[#040B18] gold-shimmer-btn shadow-md shadow-[#C59B27]/20 transition-all flex items-center justify-center space-x-2 hover:scale-105"
                >
                  <span>Request Floor Plan PDF</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
