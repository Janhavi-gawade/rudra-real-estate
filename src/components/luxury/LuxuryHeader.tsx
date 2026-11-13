'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Sparkles, Phone } from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';
import AmbientSoundscape from './AmbientSoundscape';

interface LuxuryHeaderProps {
  onOpenEnquiry?: () => void;
}

export default function LuxuryHeader({ onOpenEnquiry }: LuxuryHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { identity, contact } = projectConfig;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnquiryClick = () => {
    setMobileMenuOpen(false);
    if (onOpenEnquiry) {
      onOpenEnquiry();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-enquiry-modal'));
    }
  };

  const navLinks = [
    { label: 'Overview', href: '#project-overview' },
    { label: 'Portfolio', href: '#under-construction-portfolio' },
    { label: 'Elevation', href: '#tower-elevation' },
    { label: 'Status', href: '#construction-progress' },
    { label: 'Cinema', href: '#cinematic-videos' },
    { label: 'Plans', href: '#project-plans' },
    { label: 'Materials', href: '#customization-studio' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#040B18]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-2.5 sm:py-3.5'
          : 'bg-transparent py-3 sm:py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Container */}
          <Link href="/" className="flex items-center space-x-2.5 group min-w-0">
            {identity.logo.showEmblem && (
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden border border-[#C59B27]/40 bg-white p-0.5 shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={identity.logo.src}
                  alt={identity.logo.alt}
                  fill
                  sizes="36px"
                  className="object-contain"
                  priority
                />
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="text-sm sm:text-base font-serif tracking-wider text-white truncate max-w-[200px] sm:max-w-none">
                {identity.projectName}
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-amber-300 font-semibold flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>Under Construction Only</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] uppercase tracking-widest text-slate-300 hover:text-[#EAD07C] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <AmbientSoundscape />

            <a
              href={`tel:+91${contact.phone}`}
              className="hidden xl:flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>{contact.displayPhone}</span>
            </a>

            <button
              type="button"
              onClick={handleEnquiryClick}
              className="hidden sm:flex px-4 py-2 rounded-full font-semibold text-xs tracking-wider uppercase text-[#040B18] gold-shimmer-btn shadow-md shadow-[#C59B27]/25 transition-all hover:scale-105 active:scale-95 items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#040B18]" />
              <span>Register</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:bg-white/10 lg:hidden"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#040B18]/98 border-b border-white/10 px-6 py-5 animate-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col space-y-3.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-widest text-slate-200 hover:text-[#EAD07C] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleEnquiryClick}
                className="w-full py-2.5 rounded-full font-semibold text-xs tracking-wider uppercase text-[#040B18] gold-shimmer-btn flex items-center justify-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#040B18]" />
                <span>Register Interest</span>
              </button>

              <a
                href={`tel:+91${contact.phone}`}
                className="text-xs text-center text-slate-400 py-1"
              >
                Call: {contact.displayPhone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
