'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Layers,
  Sparkles,
  HardHat,
  ArrowRight,
  Compass,
  Eye,
  Maximize2,
  Building,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Plane,
} from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface FloorLevel {
  level: number;
  levelLabel: string;
  altitudeFt: number;
  tierName: string;
  tierCategory: 'PENTHOUSE' | 'HORIZON' | 'RIVERSIDE' | 'PODIUM';
  typology: string;
  carpetArea: string;
  superArea: string;
  ceilingHeight: string;
  orientation: string;
  stage: string;
  progressPercent: number;
  priceStarting: string;
  highlights: string[];
  droneViewUrl: string;
  exteriorCropUrl: string;
}

const floorLevels: FloorLevel[] = [
  {
    level: 28,
    levelLabel: 'Level 28 (Crown Sky Penthouse)',
    altitudeFt: 290,
    tierName: 'The Crown Sky Penthouses',
    tierCategory: 'PENTHOUSE',
    typology: '5 BHK Crown Duplex Penthouse',
    carpetArea: '2,850 Sq. Ft.',
    superArea: '3,650 Sq. Ft.',
    ceilingHeight: '22-Ft Double Height Glass Atrium',
    orientation: '360° Panoramic Riverfront & Western Ghats Sunset',
    stage: 'Pre-Casting Structural Allocation',
    progressPercent: 100,
    priceStarting: '₹3.45 Cr*',
    highlights: [
      'Cantilevered private plunge pool & rooftop stargazing deck',
      'Direct dual biometric elevator opening into private vestibule',
      '4 dedicated covered podium parking bays with EV hyperchargers',
    ],
    droneViewUrl:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85',
    exteriorCropUrl:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    level: 22,
    levelLabel: 'Level 22 (High-Altitude Cloudline)',
    altitudeFt: 225,
    tierName: 'Horizon Sky Mansions',
    tierCategory: 'HORIZON',
    typology: '4 BHK Grand River Mansion',
    carpetArea: '2,140 Sq. Ft.',
    superArea: '2,750 Sq. Ft.',
    ceilingHeight: '11.8-Ft Clear Slab Clearance',
    orientation: '180° Unblocked River Curve & Koregaon Park Skyline',
    stage: 'Superstructure Column Reinforcement',
    progressPercent: 70,
    priceStarting: '₹2.10 Cr*',
    highlights: [
      '10-Ft deep cantilevered river view sundeck with glass balustrade',
      'Master salon with Italian Statuario marble & acoustic acoustic glazing',
      '3 dedicated basement car bays with valet assistance',
    ],
    droneViewUrl:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=85',
    exteriorCropUrl:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    level: 14,
    levelLabel: 'Level 14 (Active 14th Slab Pouring)',
    altitudeFt: 145,
    tierName: 'Active Superstructure Tier',
    tierCategory: 'HORIZON',
    typology: '3.5 & 4 BHK River Suites',
    carpetArea: '1,840 Sq. Ft.',
    superArea: '2,350 Sq. Ft.',
    ceilingHeight: '11.5-Ft Clear Ceiling',
    orientation: 'North-West Facing Sunset & Riverfront Corridor',
    stage: 'Active 14th Slab Monolithic RCC Pouring (Live)',
    progressPercent: 48,
    priceStarting: '₹1.85 Cr*',
    highlights: [
      'Currently under active crane & concrete pump operation',
      'Construction-linked tranches (CLP) aligned to certified slab completion',
      'Opportunity for bespoke internal non-structural partition adjustments',
    ],
    droneViewUrl:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
    exteriorCropUrl:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    level: 8,
    levelLabel: 'Level 08 (Mid-Rise River Sanctuary)',
    altitudeFt: 85,
    tierName: 'Riverside Residences',
    tierCategory: 'RIVERSIDE',
    typology: '3 BHK Imperial Residence',
    carpetArea: '1,380 Sq. Ft.',
    superArea: '1,720 Sq. Ft.',
    ceilingHeight: '11.0-Ft Floor to Ceiling',
    orientation: 'Riverside Promenade & Lush Riverbanks Canopy',
    stage: 'RCC Monolithic Shear Wall Complete • Blockwork Underway',
    progressPercent: 35,
    priceStarting: '₹1.25 Cr*',
    highlights: [
      'Direct treetop and water reflection vistas',
      'High-performance acoustic double-glazed curtain wall',
      '2 dedicated covered parking slots',
    ],
    droneViewUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
    exteriorCropUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    level: 4,
    levelLabel: 'Level 04 (Grand Podium & Horizon Deck)',
    altitudeFt: 45,
    tierName: 'Podium Lifestyle & Amenity Precinct',
    tierCategory: 'PODIUM',
    typology: 'Clubhouse, Lap Pool & Garden Suites',
    carpetArea: '40,000 Sq. Ft. Deck',
    superArea: 'Multi-Level Precinct',
    ceilingHeight: '24-Ft Grand Arrival Foyer',
    orientation: 'Acre-Wide Landscaped Zen Groves & Horizon Pool Deck',
    stage: '100% Structurally Cast • MEP & Waterproofing Underway',
    progressPercent: 100,
    priceStarting: 'Lifestyle Amenities',
    highlights: [
      '50-meter temperature-regulated infinity lap pool',
      'Double-height grand entrance lobby with Italian travertine marble',
      'Triple-level podium parking with smart valet routing & EV chargers',
    ],
    droneViewUrl:
      'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1800&q=85',
    exteriorCropUrl:
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
  },
];

interface TowerElevationVisualizerProps {
  onOpenEnquiry?: () => void;
}

export default function TowerElevationVisualizer({ onOpenEnquiry }: TowerElevationVisualizerProps) {
  const [selectedLevelNum, setSelectedLevelNum] = useState<number>(14);
  const [viewMode, setViewMode] = useState<'3D_HUD' | 'DRONE_BALCONY'>('3D_HUD');
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  const activeLevel =
    floorLevels.find((fl) => fl.level === selectedLevelNum) || floorLevels[2];

  const handleEnquiry = (contextMsg?: string) => {
    if (onOpenEnquiry) {
      onOpenEnquiry();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-enquiry-modal', {
          detail: {
            projectName: `Level ${activeLevel.level} - ${activeLevel.typology} (${activeLevel.tierName})`,
          },
        })
      );
    }
  };

  return (
    <section
      id="tower-elevation"
      ref={sectionRef}
      className="relative py-16 sm:py-28 bg-[#02060F] text-white overflow-hidden"
    >
      {/* Decorative Glow Grid */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C59B27]/40 to-transparent" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[#00F2FE]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-[#C59B27]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-10 sm:mb-14 reveal-fade-up ${isVisible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#00F2FE]/10 border border-[#00F2FE]/30 text-[#4FACFE] text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mb-3 sm:mb-4 shadow-lg shadow-[#00F2FE]/10">
            <Layers className="w-3.5 h-3.5 text-[#00F2FE] animate-pulse" />
            <span>INTERACTIVE 3D SKYSCRAPER HUD &amp; ELEVATION</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light font-serif text-white tracking-tight mb-2 sm:mb-3">
            Select Your Altitude &amp; View Corridor
          </h2>

          <p className="text-xs sm:text-base text-slate-300/80 font-light leading-relaxed mb-6 sm:mb-8">
            Experience real-time structural telemetry, live slab progression, and simulated drone balcony vistas from each architectural tier prior to final handover.
          </p>

          {/* Dual Experience Mode Switcher (HUD vs Drone Balcony View) */}
          <div className="inline-flex items-center p-1 rounded-full bg-[#061024] border border-white/10 shadow-2xl">
            <button
              type="button"
              onClick={() => setViewMode('3D_HUD')}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center space-x-2 ${
                viewMode === '3D_HUD'
                  ? 'bg-gradient-to-r from-[#B2881E] to-[#EAD07C] text-[#040B18] shadow-lg shadow-[#C59B27]/30 scale-105'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>3D Tower Telemetry HUD</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('DRONE_BALCONY')}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center space-x-2 ${
                viewMode === 'DRONE_BALCONY'
                  ? 'bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#040B18] shadow-lg shadow-[#00F2FE]/30 scale-105'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>Drone Balcony Altitude Simulator</span>
            </button>
          </div>
        </div>

        {/* Main Interactive Stage */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch reveal-scale ${isVisible ? 'is-visible' : ''}`}>
          {/* LEFT COLUMN: Vertical Skyscraper Tier Selector (Levels 04 to 28) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-2.5 bg-[#061024]/80 backdrop-blur-xl p-4 sm:p-5 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[11px] text-slate-400 font-mono">
              <span className="flex items-center space-x-1.5 text-[#EAD07C]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ARCHITECTURAL SLAB MATRIX</span>
              </span>
              <span>28 TOTAL LEVELS</span>
            </div>

            {/* Vertical Tier Selector Buttons with Laser Beam Highlight Effect */}
            <div className="space-y-2 flex-1 flex flex-col justify-around py-1">
              {floorLevels.map((fl) => {
                const isSelected = fl.level === selectedLevelNum;
                return (
                  <button
                    key={fl.level}
                    type="button"
                    onClick={() => setSelectedLevelNum(fl.level)}
                    className={`relative w-full p-3 sm:p-3.5 rounded-2xl text-left transition-all duration-300 border flex items-center justify-between group overflow-hidden ${
                      isSelected
                        ? 'bg-gradient-to-r from-white/10 to-white/5 border-[#C59B27] shadow-xl shadow-[#C59B27]/15 ring-1 ring-[#C59B27]/50'
                        : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                  >
                    {/* Glowing Scanline Indicator when selected */}
                    {isSelected && (
                      <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-[#00F2FE] via-[#C59B27] to-[#EAD07C]" />
                    )}

                    <div className="pl-2">
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs font-mono font-bold ${isSelected ? 'text-[#00F2FE]' : 'text-slate-400'}`}>
                          L{fl.level < 10 ? `0${fl.level}` : fl.level}
                        </span>
                        <span className={`text-[11px] font-semibold tracking-wider uppercase truncate max-w-[170px] sm:max-w-[210px] ${
                          isSelected ? 'text-white' : 'text-slate-300'
                        }`}>
                          {fl.tierName}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-light mt-0.5 pl-6">
                        <span>{fl.typology}</span>
                        <span>•</span>
                        <span className="text-[#EAD07C] font-mono">{fl.altitudeFt} FT AGL</span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center space-x-1.5">
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono uppercase ${
                        fl.progressPercent === 100
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                      }`}>
                        {fl.progressPercent === 100 ? 'READY' : `${fl.progressPercent}%`}
                      </span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#00F2FE] translate-x-0.5' : 'text-slate-600'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Regulatory Proof Pill */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span className="flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27] mr-1" />
                <span>MahaRERA: P52100028912</span>
              </span>
              <span className="text-[#EAD07C]">Zero Brokerage</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Cyber-Luxury Visual Canvas & Floating Telemetry HUD */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-white/15 bg-black shadow-2xl flex flex-col min-h-[460px] sm:min-h-[580px]">
            {/* Visual Frame: Either 3D Tower Render OR Drone Balcony Elevation Panorama */}
            <div className="relative flex-1 w-full overflow-hidden">
              <Image
                key={`${viewMode}-${activeLevel.level}`}
                src={viewMode === '3D_HUD' ? activeLevel.exteriorCropUrl : activeLevel.droneViewUrl}
                alt={activeLevel.levelLabel}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover object-center animate-ken-burns scale-105 transition-all duration-700"
              />

              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#040B18] via-[#040B18]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#040B18]/60 via-transparent to-[#040B18]/40" />

              {/* Laser Scan Horizontal Line (Cyber Aesthetic) */}
              <div className="absolute top-1/2 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00F2FE] to-transparent shadow-[0_0_12px_#00F2FE] pointer-events-none" />

              {/* On-Screen Top Telemetry Status Badges */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20 pointer-events-none">
                <div className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#00F2FE]/40 text-[#4FACFE] text-[10px] sm:text-xs font-mono font-semibold flex items-center space-x-2 pointer-events-auto">
                  <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-ping" />
                  <span>LEVEL {activeLevel.level} TELEMETRY</span>
                  <span>•</span>
                  <span>ALTITUDE {activeLevel.altitudeFt} FT</span>
                </div>

                <div className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs text-white font-mono flex items-center space-x-1.5 pointer-events-auto">
                  <Compass className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>ORIENTATION: 285° WNW</span>
                </div>
              </div>

              {/* View Mode Tag at Bottom-Left of Visual Canvas */}
              <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300">
                  {viewMode === '3D_HUD' ? '3D ARCHITECTURAL SLAB SCAN' : 'SIMULATED DRONE BALCONY VISTA'}
                </span>
              </div>
            </div>

            {/* Bottom Glass Telemetry Panel (Specs, Progress & Direct Actions) */}
            <div className="p-5 sm:p-7 bg-[#040B18]/95 backdrop-blur-2xl border-t border-white/10 space-y-4 relative z-20">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2 text-[10px] font-mono uppercase text-[#00F2FE] mb-1">
                    <HardHat className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>{activeLevel.stage}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif text-white font-normal">
                    {activeLevel.typology} — {activeLevel.tierName}
                  </h3>
                </div>

                <div className="text-left md:text-right">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Starting Pre-Launch Tranche
                  </span>
                  <span className="text-xl sm:text-2xl font-serif text-[#EAD07C] font-semibold">
                    {activeLevel.priceStarting}
                  </span>
                </div>
              </div>

              {/* 4 Core Architectural Telemetry Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 py-2 border-y border-white/10">
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block mb-0.5 font-mono">
                    Carpet Area
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white font-mono">
                    {activeLevel.carpetArea}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block mb-0.5 font-mono">
                    Clear Ceiling
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#00F2FE] font-mono">
                    {activeLevel.ceilingHeight}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block mb-0.5 font-mono">
                    Structural Status
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#EAD07C] flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span>{activeLevel.progressPercent}% Built</span>
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block mb-0.5 font-mono">
                    Client Brokerage
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-emerald-400 font-mono">
                    0% Commission
                  </span>
                </div>
              </div>

              {/* View Highlights & Decisive Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
                <p className="text-xs text-slate-300 font-light truncate max-w-md">
                  <span className="text-[#C59B27] font-semibold mr-1.5">Horizon:</span>
                  {activeLevel.orientation}
                </p>

                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() =>
                      setViewMode(viewMode === '3D_HUD' ? 'DRONE_BALCONY' : '3D_HUD')
                    }
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-slate-200 transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#00F2FE]" />
                    <span>{viewMode === '3D_HUD' ? 'View Drone Vista' : 'View Tower HUD'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleEnquiry()}
                    className="flex-1 sm:flex-initial px-6 py-2.5 rounded-full gold-shimmer-btn text-[#040B18] text-xs font-bold tracking-wider uppercase transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-1.5 shadow-lg shadow-[#C59B27]/25"
                  >
                    <span>Reserve Hardhat Visit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
