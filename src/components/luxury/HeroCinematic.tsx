'use client';

import React from 'react';
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

        {/* Cinematic Vignette & Ambient Lighting */}
        <div className="absolute inset-0 z-2 bg-gradient-to-t from-[#040B18] via-[#040B18]/50 to-[#040B18]/70" />
        <div className="absolute inset-0 z-2 bg-gradient-to-r from-[#040B18]/70 via-transparent to-[#040B18]/70" />
        <div className="absolute inset-0 z-2 bg-[radial-gradient(circle_at_center,_rgba(197,155,39,0.12)_0%,_transparent_65%)] pointer-events-none" />
      </div>

      {/* 2. Minimalist Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center flex flex-col items-center justify-center pt-16 sm:pt-20">
        {/* Architectural Status Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/5 backdrop-blur-md border border-[#C59B27]/40 text-[#EAD07C] text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-6 shadow-2xl animate-cinematic-reveal hero-stagger-1">
          <HardHat className="w-3.5 h-3.5 text-[#C59B27] animate-pulse" />
          <span>{identity.statusBadge}</span>
        </div>

        {/* Project Monogram */}
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-slate-300 font-medium mb-3 animate-cinematic-reveal hero-stagger-2">
          {identity.projectName}
        </p>

        {/* Bold, Clean Headline */}
        <h1 className="text-3xl sm:text-6xl md:text-7xl font-light font-serif text-white tracking-tight leading-[1.12] mb-4 sm:mb-5 max-w-3xl animate-cinematic-reveal hero-stagger-3">
          {hero.headline}
        </h1>

        {/* Crisp Single-Sentence Subheadline */}
        <p className="text-xs sm:text-base md:text-lg text-slate-300/90 font-light max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10 tracking-wide animate-cinematic-reveal hero-stagger-4">
          {hero.subheadline}
        </p>

        {/* Clean, Decisive CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto animate-cinematic-reveal hero-stagger-5 max-w-xs sm:max-w-none mb-8 sm:mb-10">
          <button
            type="button"
            onClick={scrollToExplore}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-xs tracking-widest uppercase text-[#040B18] gold-shimmer-btn shadow-2xl shadow-[#C59B27]/30 transition-all hover:scale-105 active:scale-95"
          >
            {hero.primaryCtaText}
          </button>

          <button
            type="button"
            onClick={handleEnquiry}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-xs tracking-widest uppercase text-[#EAD07C] bg-white/5 hover:bg-white/10 backdrop-blur-md border border-[#C59B27]/40 transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>{hero.secondaryCtaText}</span>
          </button>
        </div>

        {/* Live Under-Construction Proof Bar */}
        <div className="grid grid-cols-3 gap-2 sm:gap-8 pt-4 border-t border-white/10 w-full max-w-2xl text-center">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-slate-400 block mb-0.5">
              Current Stage
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-[#EAD07C] flex items-center justify-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>14th Floor Slab</span>
            </span>
          </div>

          <div>
            <span className="text-[9px] uppercase tracking-widest text-slate-400 block mb-0.5">
              MahaRERA Possession
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-white">
              December 2027
            </span>
          </div>

          <div>
            <span className="text-[9px] uppercase tracking-widest text-slate-400 block mb-0.5">
              Payment Terms
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-white">
              Construction Linked
            </span>
          </div>
        </div>
      </div>

      {/* 3. Subtle Animated Scroll Indicator */}
      <button
        type="button"
        onClick={scrollToExplore}
        className="absolute bottom-6 z-10 flex flex-col items-center space-y-2 text-[10px] tracking-[0.25em] uppercase text-slate-400 hover:text-[#EAD07C] transition-colors focus:outline-none"
        aria-label="Scroll to explore the project"
      >
        <span className="font-light">EXPLORE</span>
        <div className="w-4 h-7 rounded-full border border-slate-500/60 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[#C59B27] animate-scroll-drop" />
        </div>
      </button>
    </section>
  );
}
