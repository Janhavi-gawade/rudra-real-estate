'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Film, ArrowRight, Play, Maximize } from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface CinematicVideosSectionProps {
  onOpenEnquiry?: () => void;
}

export default function CinematicVideosSection({ onOpenEnquiry }: CinematicVideosSectionProps) {
  const { animationVideos } = projectConfig;
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  const activeVideo = animationVideos.videos[activeVideoIndex];

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVideoSelect = (index: number) => {
    setActiveVideoIndex(index);
  };

  const handleEnquiry = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-enquiry-modal'));
    }
  };

  return (
    <section
      id="cinematic-videos"
      ref={sectionRef}
      className="relative py-28 sm:py-36 bg-[#040B18] text-white overflow-hidden"
    >
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C59B27]/30 to-transparent" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#C59B27]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 reveal-fade-up ${isVisible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#C59B27]/10 border border-[#C59B27]/30 text-[#EAD07C] text-[11px] font-semibold tracking-widest uppercase mb-4">
            <Film className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>3D ARCHITECTURAL CINEMA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light font-serif text-white tracking-tight mb-5">
            {animationVideos.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-300/80 font-light leading-relaxed">
            {animationVideos.subtitle}
          </p>
        </div>

        {/* Main Video Cinema Screen */}
        <div className={`relative rounded-3xl overflow-hidden border border-[#C59B27]/40 bg-black shadow-2xl reveal-scale ${isVisible ? 'is-visible' : ''}`}>
          <div className="relative aspect-video w-full max-h-[70vh] bg-black">
            {/* Embedded 4K Architectural Walkthrough Iframe */}
            <iframe
              key={`${activeVideo.youtubeId}-${isMuted}`}
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${activeVideo.youtubeId}&playsinline=1&rel=0&modestbranding=1&enablejsapi=1`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />

            {/* Top Bar Over Video */}
            <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 flex items-center justify-between pointer-events-none z-20">
              <span className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#C59B27]/40 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#EAD07C] pointer-events-auto shadow-lg">
                {activeVideo.tag}
              </span>

              <div className="flex items-center space-x-2 pointer-events-auto">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="px-3.5 py-1.5 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all flex items-center space-x-1.5 text-xs shadow-lg"
                  aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4 text-slate-300" />
                      <span className="text-[11px] text-slate-300">Unmute</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-[#EAD07C]" />
                      <span className="text-[11px] text-[#EAD07C]">Audio On</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Bottom Floating Bar */}
            <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none z-20">
              <div className="max-w-xl space-y-1 bg-black/60 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/10 pointer-events-auto shadow-2xl">
                <h3 className="text-lg sm:text-xl font-serif text-white">
                  {activeVideo.title}
                </h3>
                <p className="text-xs text-slate-300 font-light line-clamp-2">
                  {activeVideo.description}
                </p>
              </div>

              <div className="pointer-events-auto shrink-0">
                <button
                  type="button"
                  onClick={handleEnquiry}
                  className="px-6 py-3 rounded-full gold-shimmer-btn text-[#040B18] font-bold text-xs tracking-wider uppercase transition-all shadow-xl flex items-center space-x-2 hover:scale-105"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#040B18]" />
                  <span>Book Hardhat Site Tour</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Video Switcher Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-3 sm:p-4 bg-[#061024] border-t border-white/10">
            {animationVideos.videos.map((vid, idx) => (
              <button
                key={vid.id}
                type="button"
                onClick={() => handleVideoSelect(idx)}
                className={`p-3 rounded-xl text-left transition-all duration-300 relative overflow-hidden group ${
                  activeVideoIndex === idx
                    ? 'bg-white/10 border border-[#C59B27]/60 shadow-lg'
                    : 'bg-white/[0.02] border border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] tracking-wider uppercase text-slate-400 mb-1">
                  <span className="font-semibold text-[#EAD07C]">Part 0{idx + 1}</span>
                  <span className="font-mono text-slate-300">{vid.duration}</span>
                </div>
                <h4 className={`text-xs sm:text-sm font-serif line-clamp-1 transition-colors ${
                  activeVideoIndex === idx ? 'text-[#EAD07C]' : 'text-white group-hover:text-slate-200'
                }`}>
                  {vid.title}
                </h4>
                {activeVideoIndex === idx && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C59B27] to-transparent" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
