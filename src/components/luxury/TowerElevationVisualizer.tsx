'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Layers, CheckCircle2, Sparkles, HardHat, ArrowRight, ShieldCheck } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface TowerTier {
  id: string;
  name: string;
  floors: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PRE_LAUNCH';
  statusLabel: string;
  typology: string;
  ceilingHeight: string;
  highlights: string[];
  imageUrl: string;
}

const towerTiers: TowerTier[] = [
  {
    id: 'tier-penthouse',
    name: 'The Crown Penthouses',
    floors: 'Floors 25 – 28',
    status: 'PRE_LAUNCH',
    statusLabel: 'Pre-Launch Allocation',
    typology: 'Sky Penthouse Duplexes',
    ceilingHeight: '22-Ft Double Height',
    highlights: [
      'Private rooftop plunge pool & sunset deck',
      'Double-height glass atrium with river vistas',
      'Exclusive private elevator foyer access',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'tier-highrise',
    name: 'Sky Mansions Collection',
    floors: 'Floors 15 – 24',
    status: 'PRE_LAUNCH',
    statusLabel: 'Pre-Casting Customization',
    typology: '3 & 4 BHK Sky Mansions',
    ceilingHeight: '11.5-Ft Clear Slab Height',
    highlights: [
      'Cantilevered 10-ft deep riverfront sundecks',
      'Opportunity for bespoke internal layout changes',
      'Acoustic double-glazed structural facade',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'tier-midrise',
    name: 'Active Superstructure',
    floors: 'Floors 5 – 14',
    status: 'IN_PROGRESS',
    statusLabel: 'Active 14th Slab Pouring',
    typology: '3 BHK Imperial Residences',
    ceilingHeight: '11-Ft Floor to Ceiling',
    highlights: [
      'Currently under active monolithic RCC construction',
      'Seismic-resistant high-grade M60 concrete',
      'Direct views across riverside promenade',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'tier-podium',
    name: 'Podium & Amenity Precinct',
    floors: 'Floors 1 – 4',
    status: 'COMPLETED',
    statusLabel: '100% Structurally Cast',
    typology: 'Clubhouse, Foyer & Parking',
    ceilingHeight: '24-Ft Grand Lobby',
    highlights: [
      'Deep basalt raft foundation & columns completed',
      'Multi-level parking with dedicated EV ducting',
      '40,000 sq. ft. resort deck and infinity lap pool',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
];

interface TowerElevationVisualizerProps {
  onOpenEnquiry?: () => void;
}

export default function TowerElevationVisualizer({ onOpenEnquiry }: TowerElevationVisualizerProps) {
  const [selectedTierId, setSelectedTierId] = useState<string>('tier-midrise');
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  const activeTier = towerTiers.find((t) => t.id === selectedTierId) || towerTiers[1];

  const handleEnquiry = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-enquiry-modal'));
    }
  };

  return (
    <section
      id="tower-elevation"
      ref={sectionRef}
      className="relative py-16 sm:py-28 bg-[#040B18] text-white overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C59B27]/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-10 sm:mb-16 reveal-fade-up ${isVisible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#C59B27]/10 border border-[#C59B27]/30 text-[#EAD07C] text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mb-3 sm:mb-4">
            <HardHat className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>VERTICAL SLAB VISUALIZER</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light font-serif text-white tracking-tight mb-2 sm:mb-3">
            Tower Elevation & Floor Tiers
          </h2>

          <p className="text-xs sm:text-base text-slate-300/80 font-light leading-relaxed">
            Select a vertical tier to inspect real-time construction progress and residence allocations.
          </p>
        </div>

        {/* Visualizer Interactive Stage */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center reveal-scale ${isVisible ? 'is-visible' : ''}`}>
          {/* Left Column: Tower Vertical Diagram */}
          <div className="lg:col-span-5 flex flex-col space-y-2.5">
            <span className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-semibold mb-1 block">
              28-STOREY ARCHITECTURAL STACK
            </span>

            {towerTiers.map((tier) => {
              const isSelected = selectedTierId === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`relative p-4 rounded-2xl text-left transition-all duration-300 border flex items-center justify-between group overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#C59B27]/20 via-[#0A1B3B] to-[#040B18] border-[#C59B27] shadow-xl ring-1 ring-[#C59B27]/40'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center space-x-3.5 z-10">
                    {/* Visual Floor Indicator Block */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-[#C59B27] text-[#040B18] shadow-md shadow-[#C59B27]/30 scale-105'
                          : 'bg-white/10 text-slate-300 group-hover:bg-white/15'
                      }`}
                    >
                      {tier.id === 'tier-penthouse'
                        ? 'PH'
                        : tier.id === 'tier-highrise'
                        ? 'L3'
                        : tier.id === 'tier-midrise'
                        ? 'L2'
                        : 'L1'}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className={`text-sm font-serif ${isSelected ? 'text-[#EAD07C]' : 'text-white'}`}>
                          {tier.name}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400">({tier.floors})</span>
                      </div>
                      <span className="text-[11px] text-slate-400 block font-light">
                        {tier.typology}
                      </span>
                    </div>
                  </div>

                  {/* Status Indicator Pill */}
                  <div className="z-10 shrink-0">
                    {tier.status === 'COMPLETED' ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Completed</span>
                      </span>
                    ) : tier.status === 'IN_PROGRESS' ? (
                      <span className="px-2 py-0.5 rounded-full bg-[#C59B27]/20 text-[#EAD07C] text-[10px] font-semibold flex items-center space-x-1 border border-[#C59B27]/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] animate-ping" />
                        <span>Active 14th Slab</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-white/5 text-slate-400 text-[10px] font-medium border border-white/10">
                        Pre-Launch
                      </span>
                    )}
                  </div>

                  {/* Subtle active tier ambient line */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#EAD07C] via-[#C59B27] to-[#B2881E]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Tier Detail Showcase */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden border border-[#C59B27]/40 bg-[#061024] p-6 sm:p-8 shadow-2xl space-y-6">
              {/* High-Resolution Render */}
              <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={activeTier.imageUrl}
                  alt={activeTier.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center transition-all duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061024] via-transparent to-transparent opacity-70" />

                {/* Status Over Image */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#C59B27]/40 text-[#EAD07C] text-[10px] font-semibold uppercase tracking-wider">
                  {activeTier.statusLabel}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                  <span className="font-serif text-white text-base sm:text-lg">{activeTier.floors}</span>
                  <span className="font-mono text-[11px] text-[#EAD07C]">{activeTier.ceilingHeight}</span>
                </div>
              </div>

              {/* Tier Specs */}
              <div>
                <h3 className="text-xl sm:text-2xl font-serif text-white mb-1">
                  {activeTier.name}
                </h3>
                <p className="text-xs text-[#EAD07C] tracking-wider uppercase font-semibold mb-3">
                  {activeTier.typology}
                </p>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  {activeTier.highlights.map((h, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-300 font-light">
                      <Sparkles className="w-3.5 h-3.5 text-[#C59B27] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
                <span className="text-[11px] text-slate-400 flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27] mr-1.5" />
                  <span>Construction-Linked Payment Schedule</span>
                </span>

                <button
                  type="button"
                  onClick={handleEnquiry}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full font-semibold text-xs tracking-widest uppercase text-[#040B18] gold-shimmer-btn shadow-md shadow-[#C59B27]/25 flex items-center justify-center space-x-2 hover:scale-105 transition-all"
                >
                  <span>Inquire About {activeTier.floors}</span>
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
