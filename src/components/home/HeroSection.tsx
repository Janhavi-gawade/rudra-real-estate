'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Search,
  MapPin,
  Sparkles,
  Phone,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenInstantEnquiry?: () => void;
}

export default function HeroSection({ onOpenInstantEnquiry }: HeroSectionProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'BUY' | 'RENT' | 'INVEST'>('BUY');
  const [locality, setLocality] = useState('all');
  const [bhk, setBhk] = useState('all');
  const [budget, setBudget] = useState('all');

  const triggerEnquiry = () => {
    if (onOpenInstantEnquiry) {
      onOpenInstantEnquiry();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-enquiry-modal'));
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('type', activeTab);
    if (locality !== 'all') params.set('locality', locality);
    if (bhk !== 'all') params.set('bhk', bhk);

    if (budget === 'under-75l') params.set('maxPrice', '7500000');
    if (budget === '75l-1.5cr') {
      params.set('minPrice', '7500000');
      params.set('maxPrice', '15000000');
    }
    if (budget === 'above-1.5cr') params.set('minPrice', '15000000');
    if (budget === 'rent-30k') params.set('maxPrice', '30000');
    if (budget === 'rent-50k') params.set('maxPrice', '50000');

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#050E21]">
      {/* Background Architectural Imagery & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/branding/rudra-banner.png"
          alt="Rudra Property - Pune's Trusted Real Estate Partner"
          fill
          priority
          className="object-cover object-center brightness-[0.38] scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050E21] via-[#050E21]/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center flex flex-col items-center">
        {/* Brand Pre-header Pill */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C59B27]/50 text-[#EAD07C] text-xs sm:text-sm font-medium mb-6 shadow-lg shadow-[#C59B27]/10 animate-in fade-in slide-in-from-top-4 duration-500">
          <span className="w-2 h-2 rounded-full bg-emerald-400 radar-online" />
          <span className="font-semibold tracking-wider uppercase text-white">
            PUNE'S TRUSTED REAL ESTATE PARTNER
          </span>
          <span className="text-white/40">•</span>
          <span className="text-[#EAD07C]">Verified Inventory</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-white tracking-tight max-w-4xl leading-tight mb-6">
          Your Property. <br />
          <span className="gold-gradient-text drop-shadow-md">Our Priority.</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-light mb-10 leading-relaxed">
          Premium Residential Apartments, Penthouses, and Commercial Spaces in Keshav Nagar, Mundhwa, Kharadi, Koregaon Park & Hadapsar.
        </p>

        {/* Search Engine Container */}
        <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-3xl p-3 sm:p-5 shadow-2xl border border-white/20 text-slate-900">
          {/* Tabs */}
          <div className="flex items-center justify-start sm:justify-center space-x-2 pb-4 border-b border-slate-200/80 overflow-x-auto">
            <button
              onClick={() => setActiveTab('BUY')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
                activeTab === 'BUY'
                  ? 'bg-[#08183A] text-white shadow-md scale-105'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Buy Homes
            </button>
            <button
              onClick={() => setActiveTab('RENT')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
                activeTab === 'RENT'
                  ? 'bg-[#08183A] text-white shadow-md scale-105'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Rent Flats
            </button>
            <button
              onClick={() => setActiveTab('INVEST')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
                activeTab === 'INVEST'
                  ? 'bg-[#08183A] text-white shadow-md scale-105'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Commercial & Investment
            </button>
          </div>

          {/* Filter Row Form */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 text-left">
            {/* Locality */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1">
                Locality / Area
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#C59B27] absolute left-3 top-3 pointer-events-none" />
                <select
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm font-medium border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#C59B27] outline-none"
                >
                  <option value="all">All Prime Pune Localities</option>
                  <option value="Keshav Nagar">Keshav Nagar (Mundhwa)</option>
                  <option value="Mundhwa">Mundhwa</option>
                  <option value="Kharadi">Kharadi (EON / WTC)</option>
                  <option value="Hadapsar">Hadapsar & Magarpatta</option>
                  <option value="Kalyani Nagar">Kalyani Nagar</option>
                  <option value="Koregaon Park">Koregaon Park</option>
                </select>
              </div>
            </div>

            {/* BHK Configuration */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1">
                BHK Type
              </label>
              <select
                value={bhk}
                onChange={(e) => setBhk(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm font-medium border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#C59B27] outline-none"
              >
                <option value="all">Any Configuration</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK Luxury</option>
                <option value="4">4+ BHK / Penthouse</option>
              </select>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1">
                Budget
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm font-medium border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#C59B27] outline-none"
              >
                <option value="all">Any Budget</option>
                {activeTab === 'RENT' ? (
                  <>
                    <option value="rent-30k">Under ₹30,000 / mo</option>
                    <option value="rent-50k">₹30,000 - ₹50,000 / mo</option>
                    <option value="rent-above">₹50,000+ / mo</option>
                  </>
                ) : (
                  <>
                    <option value="under-75l">Under ₹75 Lakhs</option>
                    <option value="75l-1.5cr">₹75 Lakhs - ₹1.50 Cr</option>
                    <option value="above-1.5cr">₹1.50 Cr & Above</option>
                  </>
                )}
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-[#050E21] gold-shimmer-btn shadow-lg shadow-[#C59B27]/30 transition-all flex items-center justify-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>Search Properties</span>
              </button>
            </div>
          </form>

          {/* Quick action helper below search */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <span className="flex items-center text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1.5" />
              Verified Inventory & Direct Consultations
            </span>
            <button
              type="button"
              onClick={triggerEnquiry}
              className="text-[#B2881E] font-semibold hover:underline flex items-center group"
            >
              <span>Want custom recommendations? Fill Quick Enquiry Form</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Live Authority Metrics Bar */}
        <div className="mt-12 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#C59B27]/40 transition-colors">
            <span className="text-2xl sm:text-3xl font-bold font-serif text-[#C59B27] block">
              500+
            </span>
            <span className="text-xs text-slate-300 font-medium">Families Consulted</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#C59B27]/40 transition-colors">
            <span className="text-2xl sm:text-3xl font-bold font-serif text-[#C59B27] block">
              ₹250 Cr+
            </span>
            <span className="text-xs text-slate-300 font-medium">Property Value Advised</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#C59B27]/40 transition-colors">
            <span className="text-2xl sm:text-3xl font-bold font-serif text-[#C59B27] block">
              100%
            </span>
            <span className="text-xs text-slate-300 font-medium">RERA & Title Checked</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#C59B27]/40 transition-colors">
            <span className="text-2xl sm:text-3xl font-bold font-serif text-[#C59B27] block">
              0%
            </span>
            <span className="text-xs text-slate-300 font-medium">Brokerage on New Launches</span>
          </div>
        </div>

        {/* Quick Contact & Office Callouts */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300">
          <a
            href="tel:+917798504435"
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 transition-colors"
          >
            <Phone className="w-4 h-4 text-[#C59B27]" />
            <span>Call Broker: +91 7798504435</span>
          </a>

          <a
            href="https://wa.me/917798504435?text=Hello%20Rudra%20Property,%20I%20am%20exploring%20properties%20in%20Pune."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 backdrop-blur-md border border-emerald-500/30 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Enquiry</span>
          </a>

          <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-slate-300">
            <MapPin className="w-4 h-4 text-[#C59B27]" />
            <span>Office No. 47, Prestige Chamber, Keshav Nagar–Mundhwa</span>
          </div>
        </div>
      </div>
    </div>
  );
}
