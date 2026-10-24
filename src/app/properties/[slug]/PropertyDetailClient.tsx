'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  BedDouble,
  Bath,
  Maximize2,
  MapPin,
  Calendar,
  Share2,
  Heart,
  Scale,
  Phone,
  MessageCircle,
  ShieldCheck,
  Building,
  CheckCircle2,
  Sparkles,
  Compass,
  Layers,
  Clock,
  ArrowRight,
  Maximize,
  X,
} from 'lucide-react';
import { PropertyItem } from '@/types';
import { formatPrice, formatArea, buildWhatsAppUrl, buildCallUrl } from '@/lib/utils';
import PropertyCard from '@/components/ui/PropertyCard';

interface PropertyDetailClientProps {
  property: PropertyItem;
  similarProperties: PropertyItem[];
}

export default function PropertyDetailClient({
  property,
  similarProperties,
}: PropertyDetailClientProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Visit Scheduling Form state
  const [visitName, setVisitName] = useState('');
  const [visitPhone, setVisitPhone] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('Morning (10 AM - 1 PM)');
  const [visitSubmitted, setVisitSubmitted] = useState(false);
  const [submittingVisit, setSubmittingVisit] = useState(false);
  const [visitError, setVisitError] = useState('');

  const images = property.images && property.images.length > 0
    ? property.images
    : [
        {
          id: 'default',
          url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80',
          caption: property.title,
          isCover: true,
          sortOrder: 0,
        },
      ];

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const handleScheduleVisit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitName.trim() || !visitPhone.trim()) {
      setVisitError('Please enter Name and Phone');
      return;
    }

    setSubmittingVisit(true);
    setVisitError('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: visitName,
          phone: visitPhone,
          enquiryType: 'SCHEDULE_VISIT',
          preferredDate: visitDate,
          preferredTime: visitTime,
          propertyId: property.id,
          message: `Scheduled site visit for ${property.title} (${property.propertyCode}) on ${visitDate || 'Next available slot'} - ${visitTime}`,
        }),
      });

      if (!res.ok) throw new Error('Failed to record visit schedule');
      setVisitSubmitted(true);
    } catch (err: any) {
      setVisitError(err.message || 'Error booking visit');
    } finally {
      setSubmittingVisit(false);
    }
  };

  const waMessage = `Hello Rudra Property Pune, I would like to enquire about "${property.title}" (ID: ${property.propertyCode}, Price: ${formatPrice(
    property.price,
    property.listingType
  )} in ${property.locality}). Please share full details and brochure.`;

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-20">
      {/* Lightbox full-screen viewer */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 backdrop-blur-md">
          <div className="flex items-center justify-between text-white pb-4">
            <span className="text-sm font-mono">
              Photo {activeImageIdx + 1} of {images.length}
            </span>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-1 w-full max-w-6xl mx-auto my-auto aspect-[16/10] sm:aspect-[16/9]">
            <Image
              src={images[activeImageIdx]?.url}
              alt="Full view"
              fill
              className="object-contain"
            />
          </div>

          {/* Thumbnail strip in lightbox */}
          <div className="flex items-center justify-center space-x-2 pt-4 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={img.id || i}
                onClick={() => setActiveImageIdx(i)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                  activeImageIdx === i ? 'border-[#C59B27] scale-105' : 'border-transparent opacity-60'
                }`}
              >
                <Image src={img.url} alt="Thumb" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Top Breadcrumb & Actions Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <Link href="/" className="hover:text-slate-900">
              Home
            </Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-slate-900">
              Properties
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md">
              {property.title}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleShare}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedShare ? 'Link Copied!' : 'Share Listing'}</span>
            </button>

            <span className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-700">
              ID: {property.propertyCode}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Main Title & Price Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#08183A] text-white">
                {property.listingType === 'RENT'
                  ? 'FOR RENT'
                  : property.listingType === 'INVEST'
                  ? 'COMMERCIAL'
                  : 'FOR SALE'}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Verified Listing
              </span>
              {property.reraNumber && (
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-amber-50 text-amber-900 border border-amber-200">
                  RERA: {property.reraNumber}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-[#08183A]">
              {property.title}
            </h1>

            <p className="text-sm text-slate-600 flex items-center mt-1.5">
              <MapPin className="w-4 h-4 text-[#C59B27] mr-1 shrink-0" />
              <span>{property.address}</span>
            </p>
          </div>

          <div className="text-left md:text-right">
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block">
              Offered Price
            </span>
            <span className="text-3xl sm:text-4xl font-bold font-serif text-[#08183A]">
              {property.priceDisplay || formatPrice(property.price, property.listingType)}
            </span>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm p-3 mb-10">
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900">
            <Image
              src={images[activeImageIdx]?.url}
              alt={property.title}
              fill
              priority
              className="object-cover"
            />
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <Maximize className="w-4 h-4" />
              <span>Full Screen ({images.length} Photos)</span>
            </button>
          </div>

          {/* Thumbnails Row */}
          {images.length > 1 && (
            <div className="flex items-center space-x-3 pt-3 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-24 sm:w-28 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIdx === idx
                      ? 'border-[#C59B27] ring-2 ring-[#C59B27]/40 scale-[1.02]'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img.url} alt="Thumbnail" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Two-Column Details & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Specifications & Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Specs Highlight Grid */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 pb-2 border-b border-slate-100">
                Key Property Specifications
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-slate-200/60">
                  <span className="text-slate-400 block mb-1">Configuration</span>
                  <span className="text-base font-bold text-[#08183A]">{property.bhk} BHK</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-slate-200/60">
                  <span className="text-slate-400 block mb-1">Carpet Area</span>
                  <span className="text-base font-bold text-[#08183A]">
                    {formatArea(property.carpetArea)}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-slate-200/60">
                  <span className="text-slate-400 block mb-1">Bathrooms</span>
                  <span className="text-base font-bold text-[#08183A]">{property.bathrooms} Baths</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-slate-200/60">
                  <span className="text-slate-400 block mb-1">Balconies</span>
                  <span className="text-base font-bold text-[#08183A]">{property.balconies} Balcony</span>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-slate-200/60">
                  <span className="text-slate-400 block mb-1">Floor Level</span>
                  <span className="text-sm font-bold text-[#08183A]">{property.floor || 'Middle Floor'}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-slate-200/60">
                  <span className="text-slate-400 block mb-1">Furnishing</span>
                  <span className="text-sm font-bold text-[#08183A]">{property.furnishing}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-slate-200/60">
                  <span className="text-slate-400 block mb-1">Possession</span>
                  <span className="text-sm font-bold text-[#08183A]">{property.possessionStatus}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-slate-200/60">
                  <span className="text-slate-400 block mb-1">Handover Date</span>
                  <span className="text-sm font-bold text-[#08183A]">
                    {property.possessionDate || 'Immediate'}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold font-serif text-[#08183A] mb-4">
                Property Overview & Lifestyle
              </h3>
              <div className="text-sm text-slate-700 leading-relaxed space-y-4">
                <p>{property.description}</p>
                <p>
                  Strategically situated in {property.locality}, one of Pune’s most vibrant residential corridors. 
                  Enjoy seamless connectivity to Pune Airport, Koregaon Park lifestyle hubs, and premier IT centers including 
                  EON Free Zone, World Trade Center Kharadi, and Magarpatta Cybercity.
                </p>
              </div>
            </div>

            {/* Amenities Grid */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
                <h3 className="text-lg font-bold font-serif text-[#08183A] mb-4">
                  Community Facilities & Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2.5 p-3 rounded-xl bg-[#FAF8F5] border border-slate-200/60 text-xs font-semibold text-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0" />
                      <span>{item.amenity?.name || 'Luxury Amenity'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verified Landmarks */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold font-serif text-[#08183A] mb-2">
                Nearby Landmarks & Connectivity
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Verified travel approximations from {property.locality}, Pune:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span>EON IT Park & WTC Kharadi</span>
                  <span className="font-bold text-[#08183A]">7 – 12 mins</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span>Magarpatta Cybercity Hadapsar</span>
                  <span className="font-bold text-[#08183A]">10 – 14 mins</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span>Koregaon Park & Kalyani Nagar</span>
                  <span className="font-bold text-[#08183A]">12 – 15 mins</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span>Pune International Airport (PNQ)</span>
                  <span className="font-bold text-[#08183A]">22 mins</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Lead Capture & Schedule Visit */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#C59B27]/40 shadow-xl sticky top-28">
              {/* Broker Contact Card */}
              <div className="pb-5 border-b border-slate-100 flex items-center space-x-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#C59B27]/50 bg-white p-0.5 shrink-0">
                  <Image
                    src="/branding/rudra-logo.jpg"
                    alt="Rudra Property"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#08183A] font-serif">
                    Rudra Property Consultancy
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Office No. 47, Prestige Chamber, Keshav Nagar–Mundhwa
                  </p>
                </div>
              </div>

              {/* Instant WhatsApp & Call Actions */}
              <div className="py-4 space-y-2.5">
                <a
                  href={buildWhatsAppUrl('7798504435', waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire via WhatsApp</span>
                </a>

                <a
                  href={buildCallUrl('7798504435')}
                  className="w-full py-3 rounded-xl bg-[#08183A] hover:bg-[#0D224D] text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C59B27]" />
                  <span>Call Broker: +91 7798504435</span>
                </a>
              </div>

              {/* Schedule Private Site Visit Form */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center">
                  <Calendar className="w-3.5 h-3.5 text-[#C59B27] mr-1.5" />
                  Schedule a Private Site Visit
                </h4>

                {visitSubmitted ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <p className="text-xs font-bold text-emerald-900">
                      Visit Request Received!
                    </p>
                    <p className="text-[11px] text-emerald-700">
                      Our specialist will call you at {visitPhone} to confirm your appointment time and cab pickup.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleScheduleVisit} className="space-y-3">
                    {visitError && (
                      <div className="p-2 text-xs bg-rose-50 text-rose-700 rounded border border-rose-200">
                        {visitError}
                      </div>
                    )}
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={visitName}
                        onChange={(e) => setVisitName(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-[#C59B27]"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Mobile Number (+91)"
                        required
                        value={visitPhone}
                        onChange={(e) => setVisitPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-[#C59B27]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-slate-500 font-semibold mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-[#C59B27]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-slate-500 font-semibold mb-1">
                        Preferred Time Slot
                      </label>
                      <select
                        value={visitTime}
                        onChange={(e) => setVisitTime(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-[#C59B27] bg-white"
                      >
                        <option value="Morning (10 AM - 1 PM)">Morning (10 AM – 1 PM)</option>
                        <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM – 4 PM)</option>
                        <option value="Evening (4 PM - 7 PM)">Evening (4 PM – 7 PM)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={submittingVisit}
                      className="w-full py-2.5 rounded-xl text-xs font-bold text-[#050E21] bg-gradient-to-r from-[#C59B27] via-[#E0B345] to-[#B2881E] hover:brightness-105 shadow transition-all"
                    >
                      {submittingVisit ? 'Scheduling...' : 'Confirm Free Site Visit'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#B2881E]">
                  CURATED ALTERNATIVES
                </span>
                <h3 className="text-2xl font-bold font-serif text-[#08183A]">
                  Similar Properties in {property.locality}
                </h3>
              </div>
              <Link
                href="/properties"
                className="text-xs font-bold text-[#B2881E] hover:underline flex items-center"
              >
                <span>View All Properties</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
