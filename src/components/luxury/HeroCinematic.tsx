'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  HardHat,
  ShieldCheck,
  Building,
  Layers,
  Plane,
  ArrowRight,
  ChevronDown,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';

interface HeroCinematicProps {
  onOpenEnquiry?: () => void;
}

export default function HeroCinematic({ onOpenEnquiry }: HeroCinematicProps) {
  const { identity, hero, brokerStats } = projectConfig;
  const [isMuted, setIsMuted] = useState(true);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
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
      {/* 1. Cinematic Background Layer: 4K Drone/Architecture Video with Poster Fallback */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        {/* High-Resolution Architectural Poster (Always Present as Base Layer) */}
        <div className="absolute inset-0 z-0">
          <Image
            src={hero.fallbackPoster}
            alt={identity.projectName}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center animate-ken-burns scale-105"
          />
        </div>

        {/* 4K Cinematic Architectural Video Loop */}
        {hero.youtubeId && (
          <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
            <iframe
              key={`${hero.youtubeId}-${isMuted}`}
              src={`https://www.youtube-nocookie.com/embed/${hero.youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${hero.youtubeId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1`}
              title="Architectural Background Loop"
              allow="autoplay; encrypted-media"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240vw] sm:w-[180vw] h-[240vh] sm:h-[180vh] min-w-full min-h-full border-0 pointer-events-none opacity-85 scale-110"
            />
          </div>
        )}

        {/* Deep Cyber-Luxury Gradients & Ambient Lighting Over Video */}
        <div className="absolute inset-0 z-2 bg-gradient-to-t from-[#040B18] via-[#040B18]/60 to-[#040B18]/75" />
        <div className="absolute inset-0 z-2 bg-gradient-to-r from-[#040B18]/90 via-[#040B18]/45 to-[#040B18]/90" />
        <div className="absolute inset-0 z-2 bg-[radial-gradient(circle_at_center,_rgba(197,155,39,0.16)_0%,_transparent_60%)] pointer-events-none" />
      </div>

      {/* 2. Focused Cyber-Luxury Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 text-center flex flex-col items-center justify-center pt-24 sm:pt-28 pb-12">
        {/* Live Telemetry Pill */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-[#00F2FE]/40 text-[#4FACFE] text-[10px] sm:text-xs font-mono font-semibold tracking-wider uppercase mb-5 sm:mb-6 shadow-2xl animate-cinematic-reveal hero-stagger-1">
          <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-ping" />
          <span>LIVE TELEMETRY: ACTIVE 14TH SLAB CASTING • 100% MAHARERA AUDITED</span>
        </div>

        {/* Brand Monogram */}
        <p className="text-xs sm:text-sm uppercase tracking-[0.45em] text-[#C59B27] font-semibold mb-3 animate-cinematic-reveal hero-stagger-2">
          {identity.projectName} • LUXURY PROPERTY BROKERAGE
        </p>

        {/* High-Impact Editorial Headline */}
        <h1 className="text-3xl sm:text-6xl md:text-7xl font-light font-serif text-white tracking-tight leading-[1.1] mb-4 sm:mb-6 max-w-4xl animate-cinematic-reveal hero-stagger-3">
          The Skyline Was Designed First.
        </h1>

        {/* Subheadline */}
        <p className="text-xs sm:text-base md:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 tracking-wide animate-cinematic-reveal hero-stagger-4">
          Curated under-construction luxury residences, riverfront sky mansions, and high-growth pre-launch developments across Pune with zero client brokerage.
        </p>

        {/* Quick Interactive Mode Switcher Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 animate-cinematic-reveal hero-stagger-4">
          <button
            type="button"
            onClick={() => scrollToSection('tower-elevation')}
            className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-[#00F2FE]/50 text-[#00F2FE] text-[11px] font-mono tracking-wider transition-all flex items-center space-x-1.5 hover:scale-105 shadow-md"
          >
            <Building className="w-3.5 h-3.5 text-[#00F2FE]" />
            <span>3D Tower Telemetry HUD</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('tower-elevation')}
            className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-[#4FACFE]/50 text-[#4FACFE] text-[11px] font-mono tracking-wider transition-all flex items-center space-x-1.5 hover:scale-105 shadow-md"
          >
            <Plane className="w-3.5 h-3.5 text-[#4FACFE]" />
            <span>Drone Balcony Altitude Simulator</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('under-construction-portfolio')}
            className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-[#C59B27]/50 text-[#EAD07C] text-[11px] font-mono tracking-wider transition-all flex items-center space-x-1.5 hover:scale-105 shadow-md"
          >
            <Building className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Explore Projects & Videos</span>
          </button>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto animate-cinematic-reveal hero-stagger-5 max-w-xs sm:max-w-none mb-10 sm:mb-12">
          <button
            type="button"
            onClick={() => scrollToSection('tower-elevation')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-xs tracking-widest uppercase text-[#040B18] gold-shimmer-btn shadow-2xl shadow-[#C59B27]/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
          >
            <span>Launch 3D Skyscraper HUD</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleEnquiry}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-xs tracking-widest uppercase text-[#EAD07C] bg-white/5 hover:bg-white/10 backdrop-blur-md border border-[#C59B27]/40 transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Book VIP Hardhat Tour</span>
          </button>
        </div>

        {/* 4 Proof Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pt-6 border-t border-white/10 w-full max-w-4xl">
          {brokerStats.map((stat, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm text-center"
            >
              <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1 font-mono">
                {stat.label}
              </span>
              <span className="text-base sm:text-xl font-serif font-semibold text-[#EAD07C] block mb-0.5">
                {stat.value}
              </span>
              <span className="text-[10px] text-slate-400 font-light block">
                {stat.subtext}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Audio Ambience Control Pill (Bottom-Right) */}
      {hero.youtubeId && (
        <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="px-3.5 py-1.5 rounded-full bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/20 text-[10px] font-mono text-slate-300 hover:text-white transition-all flex items-center space-x-1.5 shadow-xl"
            aria-label={isMuted ? 'Enable video sound' : 'Mute video sound'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span>UNMUTE REEL</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#00F2FE]" />
                <span className="text-[#00F2FE]">AUDIO ACTIVE</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* 4. Subtle Animated Scroll Indicator */}
      <button
        type="button"
        onClick={() => scrollToSection('tower-elevation')}
        className="absolute bottom-3 sm:bottom-5 z-10 flex flex-col items-center space-y-1.5 text-[10px] tracking-[0.25em] uppercase text-slate-400 hover:text-[#EAD07C] transition-colors focus:outline-none"
        aria-label="Scroll to 3D elevation"
      >
        <span className="font-light">EXPLORE ELEVATION</span>
        <ChevronDown className="w-4 h-4 text-[#C59B27] animate-bounce" />
      </button>
    </section>
  );
}
