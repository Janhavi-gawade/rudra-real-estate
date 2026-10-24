'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PropertyItem } from '@/types';
import PropertyCard from '@/components/ui/PropertyCard';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

export default function FavouritesPage() {
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavourites = async () => {
    setLoading(true);
    try {
      const storedIds: string[] = JSON.parse(localStorage.getItem('rudra_favourites') || '[]');
      if (storedIds.length === 0) {
        setProperties([]);
        setLoading(false);
        return;
      }

      const res = await fetch('/api/properties');
      const data = await res.json();
      if (data.properties) {
        const filtered = data.properties.filter((p: PropertyItem) =>
          storedIds.includes(p.id)
        );
        setProperties(filtered);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavourites();
    window.addEventListener('storage', loadFavourites);
    return () => window.removeEventListener('storage', loadFavourites);
  }, []);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#B2881E] mb-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>YOUR SHORTLISTED HOMES</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#08183A]">
            Saved Favourites
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Keep track of the properties you loved in Pune. Reach out to Rudra Property anytime to schedule private visits.
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-400">Loading your saved properties...</div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm max-w-md mx-auto">
            <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold font-serif text-slate-800">
              No Favourites Saved Yet
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Click the heart icon on any property card to save it here for quick access later.
            </p>
            <Link
              href="/properties"
              className="px-6 py-3 rounded-xl font-bold text-xs text-[#050E21] bg-gradient-to-r from-[#C59B27] via-[#E0B345] to-[#B2881E] inline-flex items-center space-x-2"
            >
              <span>Explore All Properties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
