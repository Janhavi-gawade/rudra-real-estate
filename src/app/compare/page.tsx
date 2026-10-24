'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PropertyItem } from '@/types';
import { formatPrice, formatArea, buildWhatsAppUrl } from '@/lib/utils';
import { Scale, X, Sparkles, BedDouble, Bath, Maximize2, MapPin, Check, MessageCircle, ArrowRight } from 'lucide-react';

export default function ComparePage() {
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadComparedProperties = async () => {
    setLoading(true);
    try {
      const storedIds: string[] = JSON.parse(localStorage.getItem('rudra_compare') || '[]');
      if (storedIds.length === 0) {
        setProperties([]);
        setLoading(false);
        return;
      }

      // Fetch all and filter by IDs
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
    loadComparedProperties();
  }, []);

  const removeProperty = (id: string) => {
    const storedIds: string[] = JSON.parse(localStorage.getItem('rudra_compare') || '[]');
    const updated = storedIds.filter((item) => item !== id);
    localStorage.setItem('rudra_compare', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    setProperties(properties.filter((p) => p.id !== id));
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#B2881E] mb-2">
            <Scale className="w-4 h-4 text-[#C59B27]" />
            <span>SIDE-BY-SIDE PROPERTY ANALYSIS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#08183A]">
            Compare Pune Properties
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Evaluate configurations, pricing, carpet area, and verified amenities side by side to choose your perfect home.
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-400">Loading comparison...</div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm max-w-md mx-auto">
            <Scale className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold font-serif text-slate-800">
              No Properties Selected
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Browse our portfolio and click the scale icon on up to 3 properties to compare them side by side.
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
          <div className="overflow-x-auto bg-white rounded-3xl border border-slate-200/80 shadow-lg p-6">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-4 px-4 w-48 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Feature
                  </th>
                  {properties.map((p) => (
                    <th key={p.id} className="py-4 px-4 w-72 align-top">
                      <div className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 mb-3">
                        <button
                          onClick={() => removeProperty(p.id)}
                          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-colors"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="relative aspect-[16/10] w-full">
                          <Image
                            src={p.images?.[0]?.url || '/branding/rudra-banner.png'}
                            alt={p.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <span className="text-[10px] font-mono text-[#B2881E] block">
                            {p.propertyCode}
                          </span>
                          <Link
                            href={`/properties/${p.slug || p.id}`}
                            className="text-sm font-bold text-[#08183A] hover:text-[#B2881E] transition-colors line-clamp-1"
                          >
                            {p.title}
                          </Link>
                          <span className="text-base font-bold font-serif text-[#08183A] block mt-1">
                            {p.priceDisplay || formatPrice(p.price, p.listingType)}
                          </span>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-500">Locality</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-4 font-medium text-slate-900">
                      {p.locality}, Pune
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-500">BHK & Type</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-4">
                      {p.bhk} BHK • {p.propertyType}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-500">Carpet Area</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-4 font-bold text-[#08183A]">
                      {formatArea(p.carpetArea)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-500">Bathrooms / Balconies</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-4">
                      {p.bathrooms} Baths • {p.balconies} Balcony
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-500">Floor Details</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-4">
                      {p.floor || 'Middle Floor'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-500">Furnishing</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-4">
                      {p.furnishing}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-500">Possession</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 font-semibold border border-amber-200">
                        {p.possessionStatus} ({p.possessionDate || 'Immediate'})
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-500">RERA Number</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-4 font-mono text-[11px] text-slate-600">
                      {p.reraNumber || 'Verified Project'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-slate-500">Action</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-4 px-4">
                      <a
                        href={buildWhatsAppUrl(
                          '7798504435',
                          `Hello Rudra Property, I was comparing ${p.title} (${p.propertyCode}) and would like to schedule a site visit.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Book Visit</span>
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
