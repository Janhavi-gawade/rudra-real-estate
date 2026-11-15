import React from 'react';
import type { Metadata } from 'next';
import HeroCinematic from '@/components/luxury/HeroCinematic';
import ProjectOverview from '@/components/luxury/ProjectOverview';
import TowerElevationVisualizer from '@/components/luxury/TowerElevationVisualizer';
import UnderConstructionPortfolio from '@/components/luxury/UnderConstructionPortfolio';
import UnderConstructionAdvantages from '@/components/luxury/UnderConstructionAdvantages';
import BrokerAdvisoryProcess from '@/components/luxury/BrokerAdvisoryProcess';
import CinematicVideosSection from '@/components/luxury/CinematicVideosSection';
import CinematicGallery from '@/components/luxury/CinematicGallery';
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
      {/* 1. Cinematic Ambient Hero: 4K Drone Loop, Editorial Headline & Interactive Mode Switcher */}
      <HeroCinematic />

      {/* 2. Brokerage Overview & Core Proof Metrics */}
      <ProjectOverview />

      {/* 3. Interactive 3D Skyscraper HUD & Drone Balcony Altitude Simulator (Ref: The Worli Skyline) */}
      <TowerElevationVisualizer />

      {/* 4. Curated Under-Construction Developments (Explore Photos, 3D Videos & Live Telemetry One-at-a-Time) */}
      <UnderConstructionPortfolio />

      {/* 5. The Strategic Investor Advantage (Why Buy Under-Construction via Rudra) */}
      <UnderConstructionAdvantages />

      {/* 6. 3-Step Simple Advisory Journey */}
      <BrokerAdvisoryProcess />

      {/* 7. 3D Architectural Cinema & Virtual Walkthroughs */}
      <CinematicVideosSection />

      {/* 8. Architectural Showcase (3D Renders Gallery) */}
      <CinematicGallery />

      {/* 9. Prime Investment Corridors & Advisory Desk */}
      <LocationSection />
    </div>
  );
}
