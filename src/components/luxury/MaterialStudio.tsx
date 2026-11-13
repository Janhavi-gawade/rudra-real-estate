'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Check, ArrowRight, Paintbrush, ShieldCheck } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface MaterialOption {
  id: string;
  name: string;
  origin: string;
  category: 'FLOORING' | 'ACCENTS';
  textureUrl: string;
  renderPreviewUrl: string;
  description: string;
}

const materials: MaterialOption[] = [
  {
    id: 'mat-volakas',
    name: 'Greek Volakas Marble',
    origin: 'Drama, Greece',
    category: 'FLOORING',
    textureUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    renderPreviewUrl:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    description: 'Fine crystalline white marble with delicate book-matched veins.',
  },
  {
    id: 'mat-botticino',
    name: 'Italian Botticino Fiorito',
    origin: 'Brescia, Italy',
    category: 'FLOORING',
    textureUrl:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80',
    renderPreviewUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    description: 'Warm cream-beige limestone with luminous golden clouding.',
  },
  {
    id: 'mat-oak',
    name: 'Smoked French Chevron Oak',
    origin: 'Normandy, France',
    category: 'FLOORING',
    textureUrl:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
    renderPreviewUrl:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    description: 'Engineered multi-layer timber parquet with acoustic dampening.',
  },
  {
    id: 'mat-brass',
    name: 'Brushed Champagne Brass',
    origin: 'Architectural Joinery',
    category: 'ACCENTS',
    textureUrl:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
    renderPreviewUrl:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
    description: 'Subtle satin warm metallic detailing for door frames and sundeck trim.',
  },
  {
    id: 'mat-bronze',
    name: 'Matte Obsidian Bronze',
    origin: 'Architectural Joinery',
    category: 'ACCENTS',
    textureUrl:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    renderPreviewUrl:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    description: 'Deep contemporary dark patina finish with anti-fingerprint coating.',
  },
];

interface MaterialStudioProps {
  onOpenEnquiry?: () => void;
}

export default function MaterialStudio({ onOpenEnquiry }: MaterialStudioProps) {
  const [selectedFloorId, setSelectedFloorId] = useState('mat-volakas');
  const [selectedAccentId, setSelectedAccentId] = useState('mat-brass');
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  const activeFloor = materials.find((m) => m.id === selectedFloorId) || materials[0];
  const activeAccent = materials.find((m) => m.id === selectedAccentId) || materials[3];

  const handleSavePalette = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-enquiry-modal'));
    }
  };

  return (
    <section
      id="customization-studio"
      ref={sectionRef}
      className="relative py-16 sm:py-28 bg-[#061024] text-white overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C59B27]/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-10 sm:mb-16 reveal-fade-up ${isVisible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#C59B27]/10 border border-[#C59B27]/30 text-[#EAD07C] text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mb-3 sm:mb-4">
            <Paintbrush className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>PRE-CASTING BESPOKE STUDIO</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light font-serif text-white tracking-tight mb-2 sm:mb-3">
            Bespoke Material Curation
          </h2>

          <p className="text-xs sm:text-base text-slate-300/80 font-light leading-relaxed">
            Curate your primary flooring and architectural accents prior to final structural slab casting.
          </p>
        </div>

        {/* Studio Canvas */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center reveal-scale ${isVisible ? 'is-visible' : ''}`}>
          {/* Left Column: Visual Swatches Selector */}
          <div className="lg:col-span-6 space-y-6">
            {/* 1. Primary Flooring Swatches */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#EAD07C] font-semibold block mb-3">
                1. Select Master Flooring
              </span>
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {materials
                  .filter((m) => m.category === 'FLOORING')
                  .map((mat) => {
                    const isSelected = selectedFloorId === mat.id;
                    return (
                      <button
                        key={mat.id}
                        type="button"
                        onClick={() => setSelectedFloorId(mat.id)}
                        className={`p-3 rounded-2xl text-left border transition-all relative overflow-hidden group ${
                          isSelected
                            ? 'bg-[#040B18] border-[#C59B27] shadow-lg ring-1 ring-[#C59B27]/40'
                            : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="relative h-14 w-full rounded-xl overflow-hidden mb-2">
                          <Image
                            src={mat.textureUrl}
                            alt={mat.name}
                            fill
                            className="object-cover"
                          />
                          {isSelected && (
                            <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C59B27] text-[#040B18] flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <h4 className="text-[11px] font-serif text-white line-clamp-1">
                          {mat.name}
                        </h4>
                        <span className="text-[9px] text-slate-400 block font-mono">
                          {mat.origin}
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* 2. Architectural Accent Swatches */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#EAD07C] font-semibold block mb-3">
                2. Select Joinery & Accent Trim
              </span>
              <div className="grid grid-cols-2 gap-3">
                {materials
                  .filter((m) => m.category === 'ACCENTS')
                  .map((mat) => {
                    const isSelected = selectedAccentId === mat.id;
                    return (
                      <button
                        key={mat.id}
                        type="button"
                        onClick={() => setSelectedAccentId(mat.id)}
                        className={`p-3 rounded-2xl text-left border transition-all relative overflow-hidden group ${
                          isSelected
                            ? 'bg-[#040B18] border-[#C59B27] shadow-lg ring-1 ring-[#C59B27]/40'
                            : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="relative h-12 w-full rounded-xl overflow-hidden mb-2">
                          <Image
                            src={mat.textureUrl}
                            alt={mat.name}
                            fill
                            className="object-cover"
                          />
                          {isSelected && (
                            <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C59B27] text-[#040B18] flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <h4 className="text-xs font-serif text-white">
                          {mat.name}
                        </h4>
                        <span className="text-[9px] text-slate-400 block font-mono">
                          {mat.origin}
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Curated Palette Preview */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#C59B27]/40 bg-[#040B18] p-6 sm:p-8 shadow-2xl space-y-5">
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={activeFloor.renderPreviewUrl}
                  alt={activeFloor.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040B18] via-transparent to-transparent opacity-60" />

                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-xs">
                  <span className="text-[9px] uppercase tracking-widest text-[#EAD07C] font-semibold block mb-0.5">
                    CURATED RESIDENCE COMPOSITION
                  </span>
                  <div className="flex items-center justify-between text-white font-serif">
                    <span>{activeFloor.name}</span>
                    <span className="text-slate-400 font-sans text-[11px]">+ {activeAccent.name}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="text-[11px] text-slate-400 flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27] mr-1.5 shrink-0" />
                  <span>Integrated prior to MEP & slab casting</span>
                </div>

                <button
                  type="button"
                  onClick={handleSavePalette}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full font-semibold text-xs tracking-widest uppercase text-[#040B18] gold-shimmer-btn shadow-md shadow-[#C59B27]/25 flex items-center justify-center space-x-2 hover:scale-105 transition-all"
                >
                  <span>Save Palette To Dossier</span>
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
