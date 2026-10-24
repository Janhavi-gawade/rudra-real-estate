'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  BedDouble,
  Bath,
  Maximize2,
  MapPin,
  Heart,
  Scale,
  MessageCircle,
  Phone,
  Sparkles,
  ShieldCheck,
  Check,
  ArrowRight,
  Calendar,
} from 'lucide-react';
import { PropertyItem } from '@/types';
import { formatPrice, formatArea, buildWhatsAppUrl, buildCallUrl } from '@/lib/utils';

interface PropertyCardProps {
  property: PropertyItem;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isCompared, setIsCompared] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const coverImage =
    property.images?.find((img) => img.isCover)?.url ||
    property.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80';

  useEffect(() => {
    try {
      const favs: string[] = JSON.parse(localStorage.getItem('rudra_favourites') || '[]');
      setIsSaved(favs.includes(property.id));
      const comp: string[] = JSON.parse(localStorage.getItem('rudra_compare') || '[]');
      setIsCompared(comp.includes(property.id));
    } catch (e) {
      // ignore
    }
  }, [property.id]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      let favs: string[] = JSON.parse(localStorage.getItem('rudra_favourites') || '[]');
      if (favs.includes(property.id)) {
        favs = favs.filter((id) => id !== property.id);
        setIsSaved(false);
        showToast('Removed from saved properties');
      } else {
        favs.push(property.id);
        setIsSaved(true);
        showToast('Saved to your favourites');
      }
      localStorage.setItem('rudra_favourites', JSON.stringify(favs));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      // ignore
    }
  };

  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      let comp: string[] = JSON.parse(localStorage.getItem('rudra_compare') || '[]');
      if (comp.includes(property.id)) {
        comp = comp.filter((id) => id !== property.id);
        setIsCompared(false);
        showToast('Removed from comparison');
      } else {
        if (comp.length >= 3) {
          showToast('You can compare maximum 3 properties at a time.');
          return;
        }
        comp.push(property.id);
        setIsCompared(true);
        showToast('Added to property comparison');
      }
      localStorage.setItem('rudra_compare', JSON.stringify(comp));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      // ignore
    }
  };

  const pricePerSqft = property.carpetArea && property.price
    ? Math.round(property.price / property.carpetArea)
    : null;

  const waMessage = `Hello Rudra Property Pune, I am interested in "${property.title}" (ID: ${property.propertyCode}, Price: ${formatPrice(
    property.price,
    property.listingType
  )} in ${property.locality}). Please share full details and schedule a site visit.`;

  return (
    <div className="relative group bg-white rounded-3xl overflow-hidden luxury-card flex flex-col h-full">
      {/* Toast popup */}
      {toastMessage && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1.5 bg-[#050E21]/95 text-[#EAD07C] text-xs font-medium rounded-full shadow-2xl border border-[#C59B27]/50 pointer-events-none transition-all">
          {toastMessage}
        </div>
      )}

      {/* Image Area */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        <Link href={`/properties/${property.slug || property.id}`} className="block w-full h-full">
          <Image
            src={coverImage}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase bg-[#08183A]/90 text-white backdrop-blur-md border border-white/10 shadow-sm">
              {property.listingType === 'RENT'
                ? 'FOR RENT'
                : property.listingType === 'INVEST'
                ? 'COMMERCIAL'
                : 'FOR SALE'}
            </span>
            {property.isFeatured && (
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-[#C59B27] to-[#E0B345] text-[#050E21] shadow-md flex items-center gap-1 font-sans">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1.5 pointer-events-auto">
            {/* Compare Button */}
            <button
              onClick={toggleCompare}
              title="Compare side-by-side"
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                isCompared
                  ? 'bg-[#C59B27] text-[#050E21] scale-110'
                  : 'bg-black/40 text-white hover:bg-white hover:text-slate-900'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
            </button>

            {/* Favorite Button */}
            <button
              onClick={toggleSave}
              title="Save to Favourites"
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                isSaved
                  ? 'bg-rose-500 text-white scale-110'
                  : 'bg-black/40 text-white hover:bg-white hover:text-rose-500'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>

        {/* Bottom Image Overlay: Code & Locality */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between pointer-events-none">
          <span className="text-[10px] font-mono font-medium text-slate-200 bg-black/70 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
            {property.propertyCode}
          </span>
          <span className="text-xs font-medium text-white flex items-center drop-shadow-md">
            <MapPin className="w-3.5 h-3.5 text-[#C59B27] mr-1" />
            {property.locality}, Pune
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price & Possession Tag */}
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-xl sm:text-2xl font-bold font-serif text-[#08183A]">
                {property.priceDisplay || formatPrice(property.price, property.listingType)}
              </span>
              {pricePerSqft && property.listingType !== 'RENT' && (
                <span className="text-[11px] text-slate-500 block font-normal -mt-0.5">
                  ≈ ₹{pricePerSqft.toLocaleString('en-IN')} / sq.ft.
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold px-2 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200/60 uppercase tracking-wide">
              {property.possessionStatus}
            </span>
          </div>

          {/* Title */}
          <Link
            href={`/properties/${property.slug || property.id}`}
            className="block text-base font-bold text-slate-900 hover:text-[#B2881E] transition-colors line-clamp-1 mb-1"
          >
            {property.title}
          </Link>

          {/* Address snippet */}
          <p className="text-xs text-slate-500 line-clamp-1 mb-3.5">
            {property.landmark ? `${property.landmark}, ` : ''}{property.address}
          </p>

          {/* Specs Grid */}
          <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-slate-100 text-xs text-slate-700 mb-4 bg-slate-50/80 rounded-xl px-3">
            <div className="flex items-center space-x-1.5">
              <BedDouble className="w-4 h-4 text-[#C59B27] shrink-0" />
              <span className="font-semibold">{property.bhk} BHK</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Bath className="w-4 h-4 text-[#C59B27] shrink-0" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Maximize2 className="w-4 h-4 text-[#C59B27] shrink-0" />
              <span className="truncate">{formatArea(property.carpetArea)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-1 flex items-center gap-2">
          {/* WhatsApp Direct */}
          <a
            href={buildWhatsAppUrl('7798504435', waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center justify-center space-x-1.5 border border-emerald-200 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </a>

          {/* Call Direct */}
          <a
            href={buildCallUrl('7798504435')}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Call +91 7798504435"
          >
            <Phone className="w-4 h-4 text-[#C59B27]" />
          </a>

          {/* View Details */}
          <Link
            href={`/properties/${property.slug || property.id}`}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#08183A] hover:bg-[#0D224D] text-white text-xs font-semibold text-center transition-all shadow-sm flex items-center justify-center space-x-1 group"
          >
            <span>Explore</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
