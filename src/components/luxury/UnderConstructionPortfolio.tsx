'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  HardHat,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Sparkles,
  MessageCircle,
  Eye,
  Play,
  ImageIcon,
} from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { formatPrice } from '@/lib/utils';
import ProjectExplorerModal from './ProjectExplorerModal';

interface UnderConstructionPortfolioProps {
  onOpenEnquiry?: () => void;
}

function mapDbPropertyToProject(prop: any) {
  const loc = (prop.locality || '').toLowerCase();
  let corridor = 'Keshav Nagar - Mundhwa';
  if (loc.includes('koregaon')) corridor = 'Koregaon Park Annexe';
  else if (loc.includes('kharadi')) corridor = 'Kharadi IT Corridor';
  else if (loc.includes('baner') || loc.includes('balewadi')) corridor = 'Baner - Balewadi';
  else if (loc.includes('kalyani')) corridor = 'Kalyani Nagar';
  else if (prop.locality) corridor = prop.locality;

  const isReady = prop.possessionStatus?.toLowerCase().includes('ready');
  const stage = prop.possessionStatus || 'Structural RCC Underway';
  const progress = isReady ? 100 : Math.min(85, Math.max(25, 45));

  const rawImages =
    prop.images && prop.images.length > 0
      ? prop.images
          .map((img: any) => (typeof img === 'string' ? img : img.url))
          .filter(Boolean)
      : [];

  const fallbackImages = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
  ];

  const galleryImages = rawImages.length > 0 ? rawImages : fallbackImages;
  const imageUrl = galleryImages[0];

  let priceStarting = prop.priceDisplay;
  if (!priceStarting && prop.price) {
    priceStarting = formatPrice(prop.price);
  }

  return {
    id: prop.id || prop.propertyCode || `proj-${Math.random()}`,
    name: prop.title,
    corridor,
    location: prop.address || `${prop.locality || 'Pune'}, Maharashtra`,
    stage,
    progress,
    typology: `${prop.bhk ? `${prop.bhk} BHK ` : ''}${prop.propertyType || 'Luxury Residence'} (${prop.carpetArea || 1200} sq.ft)`,
    possession: prop.possessionDate || prop.possessionStatus || 'Upcoming 2027',
    priceStarting: priceStarting ? `${priceStarting}*` : 'Price On Request',
    reraNumber: prop.reraNumber || 'P52100038912',
    imageUrl,
    youtubeId: prop.videoUrl || 'peTnFrq3oEA',
    description:
      prop.description ||
      'Exclusive luxury residence in prime Pune corridor advised by Rudra Property Consultancy.',
    galleryImages,
    highlights: [
      'Verified Direct Developer Allotment',
      '0% Brokerage on Pre-Launch Bookings',
      'MahaRERA Audited Title & Milestone Tracking',
    ],
    isFlagship: Boolean(prop.isFeatured),
    isFromAdmin: true,
  };
}

export default function UnderConstructionPortfolio({ onOpenEnquiry }: UnderConstructionPortfolioProps) {
  const { underConstructionPortfolio, contact } = projectConfig;
  const [projectsList, setProjectsList] = useState(underConstructionPortfolio.projects);
  const [selectedCorridor, setSelectedCorridor] = useState<string>('All');
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  // Fetch live properties from database (including properties added via Admin Panel)
  useEffect(() => {
    let isMounted = true;
    const fetchLiveProperties = async () => {
      try {
        const res = await fetch('/api/properties');
        if (!res.ok) return;
        const data = await res.json();
        if (data.properties && Array.isArray(data.properties) && data.properties.length > 0) {
          const dbMapped = data.properties.map(mapDbPropertyToProject);
          const staticTitles = new Set(dbMapped.map((p: any) => p.name.trim().toLowerCase()));
          const remainingStatic = underConstructionPortfolio.projects.filter(
            (p) => !staticTitles.has(p.name.trim().toLowerCase())
          );
          if (isMounted) {
            // DB properties (admin additions) displayed first!
            setProjectsList([...dbMapped, ...remainingStatic]);
          }
        }
      } catch (err) {
        console.error('Failed to fetch live properties:', err);
      }
    };

    fetchLiveProperties();
    return () => {
      isMounted = false;
    };
  }, [underConstructionPortfolio.projects]);

  const corridors = Array.from(
    new Set([
      'All',
      'Keshav Nagar - Mundhwa',
      'Koregaon Park Annexe',
      'Kharadi IT Corridor',
      'Baner - Balewadi',
      'Kalyani Nagar',
      ...projectsList.map((p) => p.corridor).filter(Boolean),
    ])
  );

  const filteredProjects =
    selectedCorridor === 'All'
      ? projectsList
      : projectsList.filter(
          (p) => p.corridor.toLowerCase() === selectedCorridor.toLowerCase()
        );

  // Listen to cross-modal project navigation (prev/next)
  useEffect(() => {
    const handleExplorerEvent = (e: any) => {
      if (typeof e?.detail?.projectIndex === 'number') {
        setSelectedProjectIndex(e.detail.projectIndex);
      }
    };
    window.addEventListener('open-project-explorer', handleExplorerEvent);
    return () => window.removeEventListener('open-project-explorer', handleExplorerEvent);
  }, []);

  const openExplorerForProject = (projId: string) => {
    const globalIdx = projectsList.findIndex((p) => p.id === projId);
    if (globalIdx !== -1) {
      setSelectedProjectIndex(globalIdx);
    }
  };

  const handleEnquiry = (projectName?: string) => {
    if (onOpenEnquiry) {
      onOpenEnquiry();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-enquiry-modal', {
          detail: { projectName: projectName || 'General Under-Construction' },
        })
      );
    }
  };

  return (
    <section
      id="under-construction-portfolio"
      ref={sectionRef}
      className="relative py-16 sm:py-28 bg-[#040B18] text-white overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C59B27]/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-10 sm:mb-12 reveal-fade-up ${isVisible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mb-3 sm:mb-4">
            <HardHat className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{underConstructionPortfolio.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light font-serif text-white tracking-tight mb-2 sm:mb-3">
            {underConstructionPortfolio.title}
          </h2>

          <p className="text-xs sm:text-base text-slate-300/80 font-light leading-relaxed mb-6 sm:mb-8">
            Click on any development to inspect multiple high-res photos, 3D video walkthroughs, and live structural telemetry one at a time.
          </p>

          {/* Corridor Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {corridors.map((corridor) => (
              <button
                key={corridor}
                type="button"
                onClick={() => setSelectedCorridor(corridor)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider transition-all duration-300 ${
                  selectedCorridor === corridor
                    ? 'bg-[#C59B27] text-[#040B18] font-bold shadow-lg shadow-[#C59B27]/30'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {corridor}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((proj, idx) => (
            <div
              key={proj.id}
              className={`rounded-3xl overflow-hidden bg-[#061024] border transition-all duration-300 flex flex-col group ${
                proj.isFlagship
                  ? 'border-[#C59B27]/60 shadow-2xl ring-1 ring-[#C59B27]/30'
                  : 'border-white/10 hover:border-[#C59B27]/40'
              } reveal-fade-up ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              {/* Image Frame with Quick Explore Overlay */}
              <div
                onClick={() => openExplorerForProject(proj.id)}
                className="relative h-56 sm:h-64 w-full overflow-hidden cursor-pointer"
              >
                <Image
                  src={proj.imageUrl}
                  alt={proj.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061024] via-[#061024]/40 to-transparent" />

                {/* Under Construction Status Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[10px] font-semibold uppercase tracking-wider flex items-center space-x-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  <span>UNDER CONSTRUCTION</span>
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C59B27]/50 text-[#EAD07C] text-[9px] font-bold uppercase tracking-wider">
                  0% BROKERAGE
                </div>

                {/* Center Hover Pill to Prompt Viewing Photos & Video */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <span className="px-4 py-2 rounded-full bg-[#C59B27] text-[#040B18] text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-2xl scale-95 group-hover:scale-100 transition-transform">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Explore Photos &amp; Video</span>
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="flex items-center text-slate-300 font-light text-[11px] truncate max-w-[180px]">
                    <MapPin className="w-3 h-3 text-[#C59B27] mr-1 shrink-0" />
                    <span className="truncate">{proj.location}</span>
                  </span>
                  <span className="font-serif text-[#EAD07C] text-sm shrink-0 font-medium">
                    {proj.priceStarting}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div
                    onClick={() => openExplorerForProject(proj.id)}
                    className="cursor-pointer"
                  >
                    <h3 className="text-lg font-serif text-white group-hover:text-[#EAD07C] transition-colors mb-1">
                      {proj.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-light mb-3">
                      {proj.typology}
                    </p>
                  </div>

                  {/* Active Construction Progress Bar */}
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400 font-light">Active Stage:</span>
                      <span className="text-white font-medium text-right truncate max-w-[170px]">
                        {proj.stage}
                      </span>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#B2881E] to-[#EAD07C]"
                        style={{ width: `${proj.progress}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Status: {proj.progress}% Built</span>
                      <span>Handover: {proj.possession}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-2 flex items-center justify-between border-t border-white/10 gap-2">
                  <button
                    type="button"
                    onClick={() => openExplorerForProject(proj.id)}
                    className="text-[11px] text-[#EAD07C] hover:text-white transition-colors flex items-center space-x-1"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>View Photos ({proj.galleryImages?.length || 4})</span>
                  </button>

                  <div className="flex items-center space-x-1.5 shrink-0">
                    <a
                      href={`https://wa.me/${contact.whatsappNumber}?text=Hello%20Rudra%20Real%20Estate,%20I%20would%20like%20the%20price%20sheet%20and%20details%20for%20${encodeURIComponent(
                        proj.name
                      )}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Enquire on WhatsApp"
                      className="p-1.5 rounded-full bg-white/5 hover:bg-emerald-600/30 text-emerald-400 border border-white/10 hover:border-emerald-500/40 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleEnquiry(proj.name)}
                      className="px-3.5 py-1.5 rounded-full gold-shimmer-btn text-[#040B18] text-[10px] font-bold tracking-wider uppercase transition-all flex items-center space-x-1 hover:scale-105"
                    >
                      <span>Hardhat Tour</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Single-Project Explorer Modal (Photos & 3D Walkthrough Video) */}
      <ProjectExplorerModal
        projectIndex={selectedProjectIndex}
        projects={projectsList}
        onClose={() => setSelectedProjectIndex(null)}
        onOpenEnquiry={handleEnquiry}
      />
    </section>
  );
}
