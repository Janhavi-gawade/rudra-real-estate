'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, HardHat } from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';

interface HeroCinematicProps {
  onOpenEnquiry?: () => void;
}

export default function HeroCinematic({ onOpenEnquiry }: HeroCinematicProps) {
  const { identity, hero } = projectConfig;

  const scrollToExplore = () => {
    const target = document.getElementById('project-overview');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnquiry = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-enquiry-modal'));
    }
  };

  return (
    <section className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#040B18] py-20 sm:py-0">
      {/* 1. Cinematic Background Layer: Video with Poster Fallback */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        {/* High-Resolution Poster Always Present */}
        <div className="absolute inset-0 z-0">
          <Image
            src={hero.fallbackPoster}
            alt={identity.projectName}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center animate-ken-burns"
          />
        </div>

        {/* 4K Cinematic Architectural Video Loop */}
        {hero.youtubeId && (
          <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${hero.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${hero.youtubeId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1`}
              title="Architectural Background Loop"
              allow="autoplay; encrypted-media"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240vw] sm:w-[180vw] h-[240vh] sm:h-[180vh] min-w-full min-h-full border-0 pointer-events-none opacity-85 scale-105"
            />
          </div>
        )}

        {/* Cinematic Vignette & Ambient Golden Architectural Lighting */}
        <div className="absolute inset-0 z-2 bg-gradient-to-t from-[#040B18] via-[#040B18]/50 to-[#040B18]/70" />
        <div className="absolute inset-0 z-2 bg-gradient-to-r from-[#040B18]/70 via-transparent to-[#040B18]/70" />
        <div className="absolute inset-0 z-2 bg-[radial-gradient(circle_at_center,_rgba(197,155,39,0.12)_0%,_transparent_65%)] pointer-events-none" />
      </div>

      {/* 2. Minimalist Hero Content Container with Staggered Reveals */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 text-center flex flex-col items-center justify-center pt-16 sm:pt-20">
        {/* Subtle Architectural Status Badge */}
        <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-[#C59B27]/40 text-[#EAD07C] text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-6 shadow-2xl animate-cinematic-reveal hero-stagger-1">
          <HardHat className="w-3.5 h-3.5 text-[#C59B27] animate-pulse" />
          <span>{identity.statusBadge}</span>
        </div>

        {/* Project Name Monogram */}
        <p className="text-[11px] sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.35em] text-slate-300 font-medium mb-2.5 sm:mb-3 animate-cinematic-reveal hero-stagger-2">
          {identity.projectName}
        </p>

        {/* One Premium Headline */}
        <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-light font-serif text-white tracking-tight leading-[1.18] sm:leading-[1.12] mb-4 sm:mb-6 max-w-4xl animate-cinematic-reveal hero-stagger-3">
          {hero.headline}
        </h1>

        {/* One Short Description (Max 2-3 lines) */}
        <p className="text-xs sm:text-base md:text-lg text-slate-300/90 font-light max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 tracking-wide animate-cinematic-reveal hero-stagger-4">
          {hero.subheadline}
        </p>

        {/* Calls to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto animate-cinematic-reveal hero-stagger-5 max-w-xs sm:max-w-none">
          {/* Primary CTA Button */}
          <button
            type="button"
            onClick={scrollToExplore}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-full font-semibold text-xs tracking-widest uppercase text-[#040B18] gold-shimmer-btn shadow-2xl shadow-[#C59B27]/30 transition-all hover:scale-105 active:scale-95"
          >
            {hero.primaryCtaText}
          </button>

          {/* Secondary Action */}
          <button
            type="button"
            onClick={handleEnquiry}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-full font-semibold text-xs tracking-widest uppercase text-[#EAD07C] bg-white/5 hover:bg-white/10 backdrop-blur-md border border-[#C59B27]/40 transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>{hero.secondaryCtaText}</span>
          </button>
        </div>
      </div>

      {/* 3. Subtle Animated Scroll Indicator */}
      <button
        type="button"
        onClick={scrollToExplore}
        className="absolute bottom-6 z-10 flex flex-col items-center space-y-2 text-[10px] tracking-[0.25em] uppercase text-slate-400 hover:text-[#EAD07C] transition-colors focus:outline-none"
        aria-label="Scroll to explore the project"
      >
        <span className="font-light">SCROLL TO DISCOVER</span>
        <div className="w-4 h-7 rounded-full border border-slate-500/60 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[#C59B27] animate-scroll-drop" />
        </div>
      </button>
    </section>
  );
}
