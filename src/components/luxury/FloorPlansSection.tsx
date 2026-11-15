'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Layers,
  Sparkles,
  ArrowRight,
  Download,
  Check,
  Maximize2,
  Compass,
  FileText,
  Sliders,
} from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface BlueprintRoom {
  id: string;
  name: string;
  dimensions: string;
  sqFt: number;
  finishes: string;
  customization: string;
  topPct: number;
  leftPct: number;
}

interface BlueprintConfig {
  id: string;
  bhk: string;
  title: string;
  carpetArea: string;
  superArea: string;
  priceStarting: string;
  blueprintImageUrl: string;
  rooms: BlueprintRoom[];
  highlights: string[];
}

const blueprintConfigs: BlueprintConfig[] = [
  {
    id: 'config-3bhk',
    bhk: '3 BHK Imperial Residence',
    title: 'The Riverfront Imperial Suite',
    carpetArea: '1,380 Sq. Ft.',
    superArea: '1,720 Sq. Ft.',
    priceStarting: '₹1.25 Cr*',
    blueprintImageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
    rooms: [
      {
        id: 'room-living',
        name: 'Master Living Salon & River Sundeck',
        dimensions: '22’ 6” × 15’ 4”',
        sqFt: 345,
        finishes: 'Italian Botticino marble & floor-to-ceiling double glazing',
        customization: 'Partition wall between dining and living can be opened or closed',
        topPct: 45,
        leftPct: 35,
      },
      {
        id: 'room-master',
        name: 'Presidential Master Suite',
        dimensions: '16’ 8” × 14’ 2”',
        sqFt: 236,
        finishes: 'Engineered oak flooring with private walk-in dressing space',
        customization: 'Concealed VRV ducting routes adaptable prior to slab casting',
        topPct: 25,
        leftPct: 70,
      },
      {
        id: 'room-kitchen',
        name: 'Chef’s Gourmet Kitchen',
        dimensions: '12’ 4” × 10’ 6”',
        sqFt: 130,
        finishes: 'Quartz countertop with separate dry utility & service entry',
        customization: 'Island counter or enclosed kitchen layout options available',
        topPct: 70,
        leftPct: 25,
      },
      {
        id: 'room-sundeck',
        name: 'Cantilevered River Sundeck',
        dimensions: '14’ 0” × 7’ 6”',
        sqFt: 105,
        finishes: 'Anti-skid composite teak decking & frameless glass balustrade',
        customization: 'Provision for vertical planter wall and outdoor jacuzzi wiring',
        topPct: 40,
        leftPct: 88,
      },
    ],
    highlights: [
      'Monolithic RCC shear wall construction — zero internal column intrusion',
      'Dual cross-ventilation corridor oriented toward riverfront breezes',
      'Two dedicated covered podium car parking bays included',
    ],
  },
  {
    id: 'config-4bhk',
    bhk: '4 BHK Grand Sky Mansion',
    title: 'The Royal Horizon Sky Mansion',
    carpetArea: '1,840 Sq. Ft.',
    superArea: '2,350 Sq. Ft.',
    priceStarting: '₹1.85 Cr*',
    blueprintImageUrl:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85',
    rooms: [
      {
        id: 'room-living-4',
        name: 'Grand Family Salon & Dining Gallery',
        dimensions: '26’ 4” × 18’ 0”',
        sqFt: 474,
        finishes: 'Statuario marble bookmatched slabs & 11.8-ft clear ceiling height',
        customization: 'Optional formal bar niche and integrated wine cellar recess',
        topPct: 48,
        leftPct: 40,
      },
      {
        id: 'room-master-4',
        name: 'Grand Master Suite & Spa Bath',
        dimensions: '19’ 2” × 16’ 0”',
        sqFt: 306,
        finishes: 'Herringbone European timber with Kohler Veil smart sanitaryware',
        customization: 'En-suite bath partition can accommodate freestanding soak tub',
        topPct: 20,
        leftPct: 65,
      },
      {
        id: 'room-foyer-4',
        name: 'Private Biometric Elevator Foyer',
        dimensions: '10’ 0” × 8’ 6”',
        sqFt: 85,
        finishes: 'Bookmatched marble entrance vestibule with concealed shoe gallery',
        customization: 'Exclusive private elevator lobby with smart security console',
        topPct: 75,
        leftPct: 50,
      },
      {
        id: 'room-deck-4',
        name: 'Panoramic River Horizon Sundeck',
        dimensions: '20’ 0” × 8’ 0”',
        sqFt: 160,
        finishes: 'Seamless cantilevered structural glass terrace overlooking river curve',
        customization: 'Pre-piped drip irrigation lines for biophilic perimeter greens',
        topPct: 45,
        leftPct: 90,
      },
    ],
    highlights: [
      'Exclusive private elevator foyer opening directly into your private residence',
      'Continuous 20-ft wraparound river sundeck with 180° sunset vistas',
      '3 dedicated covered parking bays with dedicated EV high-speed charging line',
    ],
  },
  {
    id: 'config-penthouse',
    bhk: '5 BHK Crown Sky Penthouse',
    title: 'The Crown Observatory Duplex',
    carpetArea: '2,850 Sq. Ft.',
    superArea: '3,650 Sq. Ft.',
    priceStarting: '₹3.45 Cr*',
    blueprintImageUrl:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85',
    rooms: [
      {
        id: 'room-atrium',
        name: 'Double-Height 22-Ft Glass Atrium',
        dimensions: '30’ 0” × 22’ 6”',
        sqFt: 675,
        finishes: 'Double-height frameless glass curtain wall & customized chandelier drop',
        customization: 'Internal architectural floating cantilever staircase custom finish',
        topPct: 45,
        leftPct: 35,
      },
      {
        id: 'room-plunge',
        name: 'Private Sky Plunge Pool & Deck',
        dimensions: '24’ 0” × 12’ 0”',
        sqFt: 288,
        finishes: 'Structural acrylic transparent pool wall with infinity overflow',
        customization: 'Pre-cast plumbing and filtration equipment recess in slab',
        topPct: 20,
        leftPct: 80,
      },
      {
        id: 'room-penthouse-master',
        name: 'Presidential Upper Penthouse Suite',
        dimensions: '22’ 0” × 18’ 6”',
        sqFt: 407,
        finishes: 'Private rooftop terrace access & boutique walk-in dressing pavilion',
        customization: 'Full interior architecture layout tailored to buyer brief',
        topPct: 75,
        leftPct: 65,
      },
    ],
    highlights: [
      'Crown duplex penthouse dominating Level 28 with 360° unobstructed skyline views',
      'Private cantilevered glass-bottom plunge pool suspended over the riverbank',
      '4 dedicated basement parking bays with high-capacity EV charging station',
    ],
  },
];

interface FloorPlansSectionProps {
  onOpenEnquiry?: () => void;
}

export default function FloorPlansSection({ onOpenEnquiry }: FloorPlansSectionProps) {
  const [selectedConfigId, setSelectedConfigId] = useState<string>('config-3bhk');
  const [activeRoomId, setActiveRoomId] = useState<string>('room-living');
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  const activeConfig =
    blueprintConfigs.find((c) => c.id === selectedConfigId) || blueprintConfigs[0];

  const activeRoom =
    activeConfig.rooms.find((r) => r.id === activeRoomId) || activeConfig.rooms[0];

  const handleEnquiry = (msg?: string) => {
    if (onOpenEnquiry) {
      onOpenEnquiry();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-enquiry-modal', {
          detail: {
            projectName: `${activeConfig.bhk} - ${activeConfig.title} (Blueprint Inquiry)`,
          },
        })
      );
    }
  };

  const handleConfigChange = (id: string) => {
    setSelectedConfigId(id);
    const newConfig = blueprintConfigs.find((c) => c.id === id);
    if (newConfig && newConfig.rooms.length > 0) {
      setActiveRoomId(newConfig.rooms[0].id);
    }
  };

  return (
    <section
      id="project-plans"
      ref={sectionRef}
      className="relative py-16 sm:py-28 bg-[#040B18] text-white overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C59B27]/30 to-transparent" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-[#C59B27]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Editorial Section Header (Auren Residences Style) */}
        <div className={`text-center max-w-3xl mx-auto mb-10 sm:mb-14 reveal-fade-up ${isVisible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#C59B27]/10 border border-[#C59B27]/30 text-[#EAD07C] text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mb-3 sm:mb-4 shadow-lg shadow-[#C59B27]/10">
            <Layers className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>ARCHITECTURAL BLUEPRINT STUDIO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light font-serif text-white tracking-tight mb-3">
            One Line. An Entire Home.
          </h2>

          <p className="text-xs sm:text-base text-slate-300/80 font-light leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto">
            Explore architectural CAD schematics with interactive spatial dimensions, customizable partition layouts, and pre-casting structural conduits.
          </p>

          {/* Typology Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {blueprintConfigs.map((cfg) => (
              <button
                key={cfg.id}
                type="button"
                onClick={() => handleConfigChange(cfg.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 ${
                  selectedConfigId === cfg.id
                    ? 'bg-[#C59B27] text-[#040B18] font-bold shadow-xl shadow-[#C59B27]/25 scale-105'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {cfg.bhk}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Blueprint Stage (Visual CAD Frame + Spatial Specs HUD) */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch reveal-scale ${isVisible ? 'is-visible' : ''}`}>
          {/* Visual Blueprint Frame with Interactive Hotspots */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-white/15 bg-[#02060F] shadow-2xl flex flex-col min-h-[420px] sm:min-h-[540px]">
            {/* Blueprint Image Background */}
            <div className="relative flex-1 w-full overflow-hidden">
              <Image
                src={activeConfig.blueprintImageUrl}
                alt={activeConfig.title}
                fill
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover object-center transition-all duration-700 opacity-90 scale-105"
              />

              {/* Blue CAD Blueprint Grid Lines & Overlay */}
              <div className="absolute inset-0 bg-[#040B18]/70 backdrop-blur-[2px]" />
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(197, 155, 39, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(197, 155, 39, 0.4) 1px, transparent 1px)',
                  backgroundSize: '36px 36px',
                }}
              />

              {/* Top Blueprint Badges */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20 pointer-events-none">
                <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#C59B27]/40 text-[#EAD07C] text-[10px] sm:text-xs font-mono font-semibold pointer-events-auto">
                  CAD SCHEMATIC • {activeConfig.carpetArea} CARPET
                </span>

                <span className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs text-white font-mono pointer-events-auto">
                  TRANCHE: {activeConfig.priceStarting}
                </span>
              </div>

              {/* Interactive Room Hotspots Pins on the Blueprint */}
              {activeConfig.rooms.map((room) => {
                const isActive = room.id === activeRoomId;
                return (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => setActiveRoomId(room.id)}
                    style={{ top: `${room.topPct}%`, left: `${room.leftPct}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group p-2 transition-all focus:outline-none`}
                    aria-label={`Inspect ${room.name}`}
                  >
                    <div className="relative flex items-center justify-center">
                      <span
                        className={`absolute w-8 h-8 rounded-full transition-all ${
                          isActive
                            ? 'bg-[#C59B27]/40 animate-ping'
                            : 'bg-white/10 group-hover:bg-[#C59B27]/30'
                        }`}
                      />
                      <span
                        className={`relative w-4 h-4 rounded-full border-2 transition-all shadow-lg flex items-center justify-center ${
                          isActive
                            ? 'bg-[#EAD07C] border-[#040B18] scale-125'
                            : 'bg-[#040B18] border-[#C59B27] group-hover:scale-110'
                        }`}
                      />
                    </div>

                    <span
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2.5 py-1 rounded-md text-[10px] font-mono whitespace-nowrap shadow-xl transition-all ${
                        isActive
                          ? 'bg-[#040B18] text-[#EAD07C] border border-[#C59B27]/60 block'
                          : 'hidden sm:group-hover:block bg-black/80 text-white border border-white/10'
                      }`}
                    >
                      {room.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Room Selector Strip */}
            <div className="p-3 sm:p-4 bg-[#061024] border-t border-white/10 flex items-center gap-2 overflow-x-auto z-20">
              <span className="text-[10px] font-mono text-slate-400 uppercase shrink-0 mr-1">
                Room Hotspots:
              </span>
              {activeConfig.rooms.map((rm) => (
                <button
                  key={rm.id}
                  type="button"
                  onClick={() => setActiveRoomId(rm.id)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-medium whitespace-nowrap transition-all border ${
                    rm.id === activeRoomId
                      ? 'bg-white/10 text-[#EAD07C] border-[#C59B27]/60 shadow-md'
                      : 'bg-white/[0.02] text-slate-300 border-white/5 hover:border-white/20'
                  }`}
                >
                  {rm.name.split('&')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Spatial Specifications HUD */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4 bg-[#061024]/90 backdrop-blur-xl p-5 sm:p-7 rounded-3xl border border-white/10 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#EAD07C]">
                  SPATIAL MONOGRAPH
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {activeConfig.bhk.split(' ')[0]} {activeConfig.bhk.split(' ')[1]}
                </span>
              </div>

              {/* Active Room Title & Area */}
              <div className="space-y-1 mb-4">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-mono">
                  Inspecting Space:
                </span>
                <h3 className="text-lg sm:text-xl font-serif text-white font-medium">
                  {activeRoom.name}
                </h3>
                <div className="flex items-center space-x-3 pt-1 text-xs text-[#EAD07C] font-mono">
                  <span>DIMENSIONS: {activeRoom.dimensions}</span>
                  <span>•</span>
                  <span>{activeRoom.sqFt} SQ. FT.</span>
                </div>
              </div>

              {/* Finishes & Pre-Casting Customization */}
              <div className="space-y-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-0.5">
                    Architectural Finishes
                  </span>
                  <p className="text-slate-200 font-light leading-relaxed">
                    {activeRoom.finishes}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <span className="text-[10px] uppercase font-mono text-[#00F2FE] block mb-0.5">
                    Pre-Casting Customization
                  </span>
                  <p className="text-slate-300 font-light leading-relaxed">
                    {activeRoom.customization}
                  </p>
                </div>
              </div>

              {/* Structural Highlights */}
              <div className="pt-4 space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-mono">
                  Key Residence Inclusions
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300 font-light">
                  {activeConfig.highlights.map((h, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-[#C59B27] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-4 border-t border-white/10 space-y-2.5">
              <button
                type="button"
                onClick={() => handleEnquiry()}
                className="w-full py-3 px-5 rounded-full gold-shimmer-btn text-[#040B18] text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-95 shadow-xl shadow-[#C59B27]/25"
              >
                <span>Request Custom Layout Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => handleEnquiry('Download Blueprint PDF')}
                className="w-full py-2.5 px-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 text-xs transition-all flex items-center justify-center space-x-2"
              >
                <Download className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Download Architectural CAD (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
