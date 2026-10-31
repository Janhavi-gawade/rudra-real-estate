import React from 'react';
import type { Metadata } from 'next';
import HeroCinematic from '@/components/luxury/HeroCinematic';
import ProjectOverview from '@/components/luxury/ProjectOverview';
import CinematicVideosSection from '@/components/luxury/CinematicVideosSection';
import ConstructionProgress from '@/components/luxury/ConstructionProgress';
import CinematicGallery from '@/components/luxury/CinematicGallery';
import LuxuryAmenities from '@/components/luxury/LuxuryAmenities';
import FloorPlansSection from '@/components/luxury/FloorPlansSection';
import LocationSection from '@/components/luxury/LocationSection';
import { projectConfig } from '@/config/projectConfig';

export const metadata: Metadata = {
  title: `${projectConfig.identity.projectName} | ${projectConfig.identity.tagline}`,
  description: projectConfig.hero.subheadline,
  openGraph: {
    title: `${projectConfig.identity.projectName} | Under Construction Luxury Residences`,
    description: projectConfig.hero.subheadline,
    images: [{ url: projectConfig.hero.fallbackPoster }],
  },
};

export default function HomePage() {
  return (
    <div className="bg-[#040B18] text-[#FAF8F5] min-h-screen selection:bg-[#C59B27] selection:text-[#040B18]">
      {/* 1. Cinematic Full-Screen Video & Architectural Hero */}
      <HeroCinematic />

      {/* 2. Essential Project Overview & Monograph Metrics */}
      <ProjectOverview />

      {/* 3. 3D Architectural Animation & Construction Walkthrough Cinema */}
      <CinematicVideosSection />

      {/* 4. Live Construction Tracker & Milestone Engineering Progress */}
      <ConstructionProgress />

      {/* 5. Cinematic Architectural Showcase Gallery (3D Renders) */}
      <CinematicGallery />

      {/* 6. Curated Resort-Grade Amenities */}
      <LuxuryAmenities />

      {/* 7. Bespoke Under-Construction Schematics & Floor Plans */}
      <FloorPlansSection />

      {/* 8. Strategic Location & Connectivity */}
      <LocationSection />
    </div>
  );
}
