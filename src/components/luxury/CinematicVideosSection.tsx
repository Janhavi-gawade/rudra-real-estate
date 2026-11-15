'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Film, Sparkles } from 'lucide-react';
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
      className="relative py-16 sm:py-28 bg-[#040B18] text-white overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C59B27]/30 to-transparent" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-[#C59B27]/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-8 sm:mb-12 reveal-fade-up ${isVisible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#C59B27]/10 border border-[#C59B27]/30 text-[#EAD07C] text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mb-3 sm:mb-4">
            <Film className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>3D ARCHITECTURAL CINEMA</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light font-serif text-white tracking-tight mb-2 sm:mb-3">
            {animationVideos.title}
          </h2>

          <p className="text-xs sm:text-base text-slate-300/80 font-light leading-relaxed">
            {animationVideos.subtitle}
          </p>
        </div>

        {/* Video Cinema Player */}
        <div className={`relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#C59B27]/40 bg-black shadow-2xl reveal-scale ${isVisible ? 'is-visible' : ''}`}>
          <div className="relative aspect-video w-full max-h-[72vh] bg-black">
            <iframe
              key={`${activeVideo.youtubeId}-${isMuted}`}
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${activeVideo.youtubeId}&playsinline=1&rel=0&modestbranding=1&enablejsapi=1&controls=1`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />

            {/* Video Controls Bar */}
            <div className="absolute top-3 sm:top-5 inset-x-3 sm:inset-x-6 flex items-center justify-between pointer-events-none z-20">
              <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#C59B27]/40 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#EAD07C] pointer-events-auto">
                {activeVideo.tag}
              </span>

              <button
                type="button"
                onClick={toggleMute}
                className="px-3 py-1 rounded-full bg-black/75 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all flex items-center space-x-1.5 text-xs pointer-events-auto"
                aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-slate-300" />
                    <span className="text-[10px] sm:text-xs text-slate-300">Unmute</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#EAD07C]" />
                    <span className="text-[10px] sm:text-xs text-[#EAD07C]">Audio On</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Clean Part Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2.5 sm:p-4 bg-[#061024] border-t border-white/10">
            {animationVideos.videos.map((vid, idx) => (
              <button
                key={vid.id}
                type="button"
                onClick={() => handleVideoSelect(idx)}
                className={`p-2.5 sm:p-3 rounded-xl text-left transition-all duration-300 relative overflow-hidden group ${
                  activeVideoIndex === idx
                    ? 'bg-white/10 border border-[#C59B27]/60 shadow-lg'
                    : 'bg-white/[0.02] border border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] tracking-wider uppercase text-slate-400 mb-1">
                  <span className={`font-semibold ${activeVideoIndex === idx ? 'text-[#EAD07C]' : 'text-slate-400'}`}>
                    Tour 0{idx + 1}
                  </span>
                  <span className="font-mono text-[9px] text-slate-500">{vid.duration}</span>
                </div>
                <h4 className={`text-xs sm:text-sm font-serif truncate transition-colors ${
                  activeVideoIndex === idx ? 'text-[#EAD07C]' : 'text-white'
                }`}>
                  {vid.title}
                </h4>
                {activeVideoIndex === idx && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C59B27]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
