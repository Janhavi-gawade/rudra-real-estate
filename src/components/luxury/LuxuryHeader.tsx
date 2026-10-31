'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Sparkles, Phone, HardHat } from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';

interface LuxuryHeaderProps {
  onOpenEnquiry?: () => void;
}

export default function LuxuryHeader({ onOpenEnquiry }: LuxuryHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { identity, contact } = projectConfig;
  const placement = identity.logo.placement || 'left';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnquiryClick = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-enquiry-modal'));
    }
  };

  const navLinks = [
    { label: 'Overview', href: '#project-overview' },
    { label: '3D Cinema', href: '#cinematic-videos' },
    { label: 'Live Progress', href: '#construction-progress' },
    { label: 'Showcase', href: '#project-showcase' },
    { label: 'Amenities', href: '#project-amenities' },
    { label: 'Plans', href: '#project-plans' },
    { label: 'Location', href: '#project-location' },
  ];

  const renderBrand = () => (
    <Link href="/" className="flex items-center space-x-3 group">
      {identity.logo.showEmblem && (
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-[#C59B27]/40 bg-white p-0.5 shrink-0 transition-transform duration-300 group-hover:scale-105">
          <Image
            src={identity.logo.src}
            alt={identity.logo.alt}
            fill
            className="object-contain"
            priority
          />
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-base sm:text-lg font-serif tracking-wider text-white">
          {identity.projectName}
        </span>
        <span className="text-[9px] uppercase tracking-[0.25em] text-[#EAD07C] flex items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] animate-pulse" />
          <span>Under Construction</span>
        </span>
      </div>
    </Link>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#040B18]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div
          className={`flex items-center justify-between ${
            placement === 'center' ? 'lg:grid lg:grid-cols-3' : ''
          }`}
        >
          {/* Logo Container */}
          <div className={placement === 'center' ? 'lg:col-span-1' : ''}>
            {renderBrand()}
          </div>

          {/* Desktop Navigation Links */}
          <nav
            className={`hidden lg:flex items-center space-x-7 ${
              placement === 'center' ? 'lg:col-span-1 lg:justify-center' : ''
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-widest text-slate-300 hover:text-[#EAD07C] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div
            className={`flex items-center space-x-4 ${
              placement === 'center' ? 'lg:col-span-1 lg:justify-end' : ''
            }`}
          >
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
              className="px-5 py-2.5 rounded-full font-semibold text-xs tracking-wider uppercase text-[#040B18] gold-shimmer-btn shadow-md shadow-[#C59B27]/25 transition-all hover:scale-105 active:scale-95 flex items-center space-x-1.5"
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
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#040B18]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-widest text-slate-300 hover:text-[#EAD07C] py-2 border-b border-white/5"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleEnquiryClick();
              }}
              className="w-full py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-[#040B18] gold-shimmer-btn shadow-lg text-center"
            >
              Register Your Interest
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
