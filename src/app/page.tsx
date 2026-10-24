import React from 'react';
import { prisma } from '@/lib/prisma';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import LocalitySpotlight from '@/components/home/LocalitySpotlight';
import InvestmentTrends from '@/components/home/InvestmentTrends';
import EmiCalculator from '@/components/home/EmiCalculator';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FaqSection from '@/components/home/FaqSection';
import Link from 'next/link';
import { Phone, MessageCircle, Calendar, Sparkles, Building2, MapPin } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getFeaturedProperties() {
  try {
    const properties = await prisma.property.findMany({
      where: { status: 'AVAILABLE' },
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        amenities: { include: { amenity: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 6,
    });
    return properties;
  } catch (e) {
    console.error('Error fetching featured properties:', e);
    return [];
  }
}

export default async function HomePage() {
  const properties: any = await getFeaturedProperties();

  return (
    <div>
      {/* 1. Hero Section with Live Stats & Property Search */}
      <HeroSection />

      {/* 2. Featured Listings Grid with Luxury Hover Cards */}
      <FeaturedProperties properties={properties} />

      {/* 3. Pune Micro-Markets & Investment Intelligence 2026 */}
      <InvestmentTrends />

      {/* 4. Pune Neighborhoods Visual Spotlight */}
      <LocalitySpotlight />

      {/* 5. Interactive Home Loan EMI Calculator */}
      <EmiCalculator />

      {/* 6. Why Choose Rudra Property */}
      <WhyChooseUs />

      {/* 7. Private Site Visit & Tour CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-[#050E21] via-[#08183A] to-[#0D224D] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C59B27]/15 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 text-[#EAD07C] text-xs font-semibold uppercase tracking-wider mb-6 border border-[#C59B27]/40 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>VIP Private Property Tours</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif max-w-3xl mx-auto mb-6 leading-tight">
            Plan a Private Site Visit in Keshav Nagar or Kharadi Today
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Our luxury advisory team provides personalized cab pickups, on-site walkthroughs, and direct builder rate negotiations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+917798504435"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-[#050E21] gold-shimmer-btn shadow-xl shadow-[#C59B27]/30 transition-all flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Broker: +91 7798504435</span>
            </a>

            <a
              href="https://wa.me/917798504435?text=Hello%20Rudra%20Property,%20I%20would%20like%20to%20schedule%20a%20site%20visit%20this%20weekend."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-xl transition-all flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book via WhatsApp</span>
            </a>

            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center justify-center space-x-2"
            >
              <MapPin className="w-4 h-4 text-[#C59B27]" />
              <span>Visit Our Office</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Testimonials Section */}
      <TestimonialsSection />

      {/* 9. FAQ Accordion */}
      <FaqSection />
    </div>
  );
}
