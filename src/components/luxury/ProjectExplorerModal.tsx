'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
  ChevronLeft,
  ChevronRight,
  HardHat,
  ShieldCheck,
  MapPin,
  Play,
  Image as ImageIcon,
  MessageCircle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';

interface ProjectExplorerModalProps {
  projectIndex: number | null;
  projects?: any[];
  onClose: () => void;
  onOpenEnquiry?: (projectName: string) => void;
}

export default function ProjectExplorerModal({
  projectIndex,
  projects: customProjects,
  onClose,
  onOpenEnquiry,
}: ProjectExplorerModalProps) {
  const { underConstructionPortfolio, contact } = projectConfig;
  const projects =
    customProjects && customProjects.length > 0
      ? customProjects
      : underConstructionPortfolio.projects;

  const [activeMediaTab, setActiveMediaTab] = useState<'PHOTOS' | 'VIDEO'>('PHOTOS');
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  if (projectIndex === null || !projects[projectIndex]) {
    return null;
  }

  const currentProject = projects[projectIndex];
  const gallery = currentProject.galleryImages || [currentProject.imageUrl];
  const totalProjects = projects.length;

  const goToPrevProject = () => {
    const nextIdx = (projectIndex - 1 + totalProjects) % totalProjects;
    window.dispatchEvent(
      new CustomEvent('open-project-explorer', {
        detail: { projectIndex: nextIdx },
      })
    );
    setActivePhotoIndex(0);
    setActiveMediaTab('PHOTOS');
  };

  const goToNextProject = () => {
    const nextIdx = (projectIndex + 1) % totalProjects;
    window.dispatchEvent(
      new CustomEvent('open-project-explorer', {
        detail: { projectIndex: nextIdx },
      })
    );
    setActivePhotoIndex(0);
    setActiveMediaTab('PHOTOS');
  };

  const handleHardhatEnquiry = () => {
    onClose();
    if (onOpenEnquiry) {
      onOpenEnquiry(currentProject.name);
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-enquiry-modal', {
          detail: { projectName: currentProject.name },
        })
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-5xl bg-[#061024] rounded-3xl border border-[#C59B27]/40 shadow-2xl my-auto flex flex-col max-h-[94dvh] overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar with Project Title, One-at-a-Time Counter & Close */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 shrink-0 bg-[#040B18]">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="px-2.5 py-1 rounded-full bg-[#C59B27]/15 border border-[#C59B27]/40 text-[#EAD07C] text-[10px] font-mono uppercase tracking-wider shrink-0">
              PROJECT {projectIndex + 1} OF {totalProjects}
            </div>

            <div className="min-w-0">
              <h2 className="text-base sm:text-xl font-serif text-white truncate">
                {currentProject.name}
              </h2>
              <span className="text-[11px] text-slate-400 flex items-center space-x-1 truncate">
                <MapPin className="w-3 h-3 text-[#C59B27] shrink-0" />
                <span className="truncate">{currentProject.location}</span>
              </span>
            </div>
          </div>

          {/* Quick One-at-a-Time Navigation Arrows & Close */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              type="button"
              onClick={goToPrevProject}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
              title="Previous Project"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={goToNextProject}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
              title="Next Project"
              aria-label="Next Project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-rose-500/20 text-slate-300 hover:text-white transition-colors ml-1"
              aria-label="Close Project Explorer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content: Media Explorer (Left/Top) + Full Project Telemetry (Right/Bottom) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {/* Visual Showcase (Photos & Walkthrough Video) */}
          <div className="lg:col-span-7 flex flex-col p-4 sm:p-6 space-y-4">
            {/* Media Mode Tabs: Photos vs 3D Walkthrough Video */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center p-1 rounded-full bg-[#040B18] border border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveMediaTab('PHOTOS')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                    activeMediaTab === 'PHOTOS'
                      ? 'bg-[#C59B27] text-[#040B18] shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Photos ({gallery.length})</span>
                </button>

                {currentProject.youtubeId && (
                  <button
                    type="button"
                    onClick={() => setActiveMediaTab('VIDEO')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                      activeMediaTab === 'VIDEO'
                        ? 'bg-[#00F2FE] text-[#040B18] shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>3D Virtual Tour</span>
                  </button>
                )}
              </div>

              <span className="text-[10px] font-mono text-amber-300 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                0% BROKERAGE ALLOTMENT
              </span>
            </div>

            {/* Main Media Stage */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-black shadow-xl">
              {activeMediaTab === 'PHOTOS' ? (
                <>
                  <Image
                    key={gallery[activePhotoIndex]}
                    src={gallery[activePhotoIndex]}
                    alt={`${currentProject.name} photo ${activePhotoIndex + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center animate-in fade-in duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Photo Index Tag */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white">
                    Photo {activePhotoIndex + 1} of {gallery.length}
                  </div>
                </>
              ) : (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${currentProject.youtubeId}?autoplay=1&mute=0&controls=1&rel=0&playsinline=1`}
                  title={`${currentProject.name} 3D Tour`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )}
            </div>

            {/* Thumbnails Filmstrip (When in Photo Mode) */}
            {activeMediaTab === 'PHOTOS' && gallery.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {gallery.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePhotoIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden border shrink-0 transition-all ${
                      activePhotoIndex === idx
                        ? 'border-[#C59B27] ring-2 ring-[#C59B27]/50 scale-105'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Project Short Synopsis */}
            {currentProject.description && (
              <p className="text-xs text-slate-300 font-light leading-relaxed pt-1">
                {currentProject.description}
              </p>
            )}
          </div>

          {/* Detailed Project Specifications & Direct Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between p-4 sm:p-6 space-y-5 bg-[#040B18]/70">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#EAD07C] block mb-1">
                  Active Construction Stage
                </span>
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-white mb-2">
                  <span className="flex items-center space-x-1.5 text-amber-300">
                    <HardHat className="w-4 h-4 text-amber-400" />
                    <span>{currentProject.stage}</span>
                  </span>
                  <span className="font-mono">{currentProject.progress}% Built</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#B2881E] to-[#EAD07C]"
                    style={{ width: `${currentProject.progress}%` }}
                  />
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 py-2 border-y border-white/10">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block mb-0.5 font-mono">
                    Starting Pre-Launch
                  </span>
                  <span className="text-sm sm:text-base font-serif font-semibold text-[#EAD07C]">
                    {currentProject.priceStarting}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block mb-0.5 font-mono">
                    Target Handover
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>{currentProject.possession}</span>
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 col-span-2">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block mb-0.5 font-mono">
                    Available Typologies
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {currentProject.typology}
                  </span>
                </div>
              </div>

              {/* Highlights */}
              {currentProject.highlights && (
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block tracking-wider">
                    Key Development Advantages
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300 font-light">
                    {currentProject.highlights.map((h: string, i: number) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C59B27] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* MahaRERA Compliance Tag */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="flex items-center space-x-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>MahaRERA Audited</span>
                </span>
                <span className="text-white font-medium">{currentProject.reraNumber}</span>
              </div>
            </div>

            {/* Direct High-Intent Actions */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleHardhatEnquiry}
                className="w-full py-3.5 px-6 rounded-full font-semibold text-xs tracking-widest uppercase text-[#040B18] gold-shimmer-btn shadow-xl shadow-[#C59B27]/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>Book Hardhat Site Inspection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={`https://wa.me/${contact.whatsappNumber}?text=Hello%20Rudra%20Real%20Estate,%20I%20would%20like%20photos,%20floor%20plans%20and%20the%20price%20sheet%20for%20${encodeURIComponent(currentProject.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-5 rounded-full bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-all shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Get Full Floor Plans on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
