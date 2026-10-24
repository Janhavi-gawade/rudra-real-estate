'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PropertyItem } from '@/types';
import PropertyCard from '@/components/ui/PropertyCard';

interface FeaturedPropertiesProps {
  properties: PropertyItem[];
}

export default function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  const [filterLocality, setFilterLocality] = useState<string>('ALL');

  const filtered = properties.filter((p) => {
    if (filterLocality === 'ALL') return true;
    if (filterLocality === 'KESHAV_MUNDHWA')
      return p.locality.includes('Keshav') || p.locality.includes('Mundhwa');
    if (filterLocality === 'KHARADI') return p.locality.includes('Kharadi');
    if (filterLocality === 'RENT') return p.listingType === 'RENT';
    return true;
  });

  return (
    <section className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#B2881E] mb-2">
              <Sparkles className="w-4 h-4 text-[#C59B27]" />
              <span>HANDPICKED COLLECTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#08183A]">
              Featured Luxury Properties
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              Explore our verified portfolio of prime apartments, penthouses, and investment assets across Pune’s most desirable neighborhoods.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 mt-6 md:mt-0 overflow-x-auto pb-2 md:pb-0">
            {[
              { id: 'ALL', label: 'All Listings' },
              { id: 'KESHAV_MUNDHWA', label: 'Keshav Nagar & Mundhwa' },
              { id: 'KHARADI', label: 'Kharadi IT Corridor' },
              { id: 'RENT', label: 'Rental Flats' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterLocality(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  filterLocality === tab.id
                    ? 'bg-[#08183A] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Property Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">No properties found matching this filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.slice(0, 6).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* View All CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/properties"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl font-bold text-sm text-[#050E21] bg-gradient-to-r from-[#C59B27] via-[#E0B345] to-[#B2881E] hover:brightness-105 shadow-md shadow-[#C59B27]/20 transition-all"
          >
            <span>Explore All Properties in Pune</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
