'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MessageCircle, Menu, X, Heart, Scale, Sparkles, Building2, MapPin } from 'lucide-react';

interface HeaderProps {
  onOpenInstantEnquiry?: () => void;
}

export default function Header({ onOpenInstantEnquiry }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const [compareCount, setCompareCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const updateCounts = () => {
      try {
        const favs = JSON.parse(localStorage.getItem('rudra_favourites') || '[]');
        setSavedCount(favs.length);
        const comp = JSON.parse(localStorage.getItem('rudra_compare') || '[]');
        setCompareCount(comp.length);
      } catch (e) {
        // ignore
      }
    };

    window.addEventListener('scroll', handleScroll);
    updateCounts();
    window.addEventListener('storage', updateCounts);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', updateCounts);
    };
  }, []);

  return (
    <>
      {/* Top Notification / Direct Broker Bar */}
      <div className="bg-[#050E21] text-xs text-slate-300 py-2 border-b border-[#0D224D]/60 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-[#EAD07C]">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#C59B27]" />
              Pune's Trusted Real Estate Partner
            </span>
            <span className="flex items-center text-slate-300">
              <MapPin className="w-3.5 h-3.5 mr-1 text-[#C59B27]" />
              Keshav Nagar, Mundhwa, Kharadi, Koregaon Park
            </span>
          </div>

          <div className="flex items-center space-x-5">
            <a
              href="tel:+917798504435"
              className="flex items-center hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 mr-1.5 text-[#C59B27]" />
              +91 7798504435
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="https://wa.me/917798504435?text=Hello%20Rudra%20Property%20Pune,%20I%20want%20to%20enquire%20about%20properties."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="w-3 h-3 mr-1.5" />
              WhatsApp Direct
            </a>
            <span className="text-slate-600">|</span>
            <Link href="/admin/login" className="text-slate-400 hover:text-white transition-colors">
              Broker Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#08183A]/95 backdrop-blur-md shadow-xl border-b border-[#0D224D]'
            : 'bg-[#08183A] border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg border border-[#C59B27]/40 bg-white p-0.5">
                <Image
                  src="/branding/rudra-logo.jpg"
                  alt="Rudra Property"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold tracking-wider text-white font-serif">
                  RUDRA <span className="text-[#C59B27]">PROPERTY</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase text-slate-300 -mt-1">
                  Real Estate Consultancy
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-7">
              <Link
                href="/"
                className="text-sm font-medium text-slate-200 hover:text-[#EAD07C] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/properties"
                className="text-sm font-medium text-slate-200 hover:text-[#EAD07C] transition-colors"
              >
                All Properties
              </Link>
              <Link
                href="/properties?type=BUY"
                className="text-sm font-medium text-slate-200 hover:text-[#EAD07C] transition-colors"
              >
                Buy
              </Link>
              <Link
                href="/properties?type=RENT"
                className="text-sm font-medium text-slate-200 hover:text-[#EAD07C] transition-colors"
              >
                Rent
              </Link>
              <Link
                href="/properties?type=INVEST"
                className="text-sm font-medium text-slate-200 hover:text-[#EAD07C] transition-colors"
              >
                Commercial
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-slate-200 hover:text-[#EAD07C] transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-slate-200 hover:text-[#EAD07C] transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Actions */}
            <div className="hidden sm:flex items-center space-x-4">
              {/* Compare Button */}
              <Link
                href="/compare"
                title="Compare Properties"
                className="relative p-2.5 rounded-full text-slate-300 hover:text-[#C59B27] hover:bg-white/5 transition-all"
              >
                <Scale className="w-5 h-5" />
                {compareCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C59B27] text-[#050E21] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {compareCount}
                  </span>
                )}
              </Link>

              {/* Favourites Button */}
              <Link
                href="/favourites"
                title="Saved Properties"
                className="relative p-2.5 rounded-full text-slate-300 hover:text-rose-400 hover:bg-white/5 transition-all"
              >
                <Heart className="w-5 h-5" />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {savedCount}
                  </span>
                )}
              </Link>

              {/* Instant Enquiry Trigger */}
              <button
                onClick={onOpenInstantEnquiry}
                className="px-4 py-2.5 rounded-lg text-sm font-semibold text-[#050E21] bg-gradient-to-r from-[#C59B27] via-[#E0B345] to-[#B2881E] hover:brightness-110 shadow-lg shadow-[#C59B27]/20 transition-all flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Instant Enquiry</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                onClick={onOpenInstantEnquiry}
                className="px-3 py-1.5 rounded-md text-xs font-semibold text-[#050E21] bg-[#C59B27] flex items-center"
              >
                Enquire
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-200 hover:bg-white/10"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#050E21] border-b border-[#0D224D] px-4 pt-3 pb-6 space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-white/5 hover:text-[#C59B27]"
            >
              Home
            </Link>
            <Link
              href="/properties"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-white/5 hover:text-[#C59B27]"
            >
              All Properties
            </Link>
            <Link
              href="/properties?type=BUY"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-white/5 hover:text-[#C59B27]"
            >
              Buy Properties (Pune)
            </Link>
            <Link
              href="/properties?type=RENT"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-white/5 hover:text-[#C59B27]"
            >
              Rent Properties
            </Link>
            <Link
              href="/properties?type=INVEST"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-white/5 hover:text-[#C59B27]"
            >
              Commercial & Investment
            </Link>
            <Link
              href="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-white/5 hover:text-[#C59B27]"
            >
              Compare Properties ({compareCount})
            </Link>
            <Link
              href="/favourites"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-white/5 hover:text-[#C59B27]"
            >
              Saved Favourites ({savedCount})
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-white/5 hover:text-[#C59B27]"
            >
              About Rudra Property
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-white/5 hover:text-[#C59B27]"
            >
              Contact & Office Location
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm text-[#C59B27] hover:underline"
            >
              Broker Admin Dashboard →
            </Link>

            <div className="pt-4 border-t border-[#0D224D] flex flex-col gap-2">
              <a
                href="tel:+917798504435"
                className="w-full py-2.5 rounded-lg bg-[#0D224D] text-white text-center font-medium flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4 text-[#C59B27]" />
                <span>Call: +91 7798504435</span>
              </a>
              <a
                href="https://wa.me/917798504435?text=Hello%20Rudra%20Property,%20I%20am%20looking%20for%20property%20options%20in%20Pune."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg bg-emerald-600 text-white text-center font-medium flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
