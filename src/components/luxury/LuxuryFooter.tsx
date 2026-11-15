'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck, ArrowUp } from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';

export default function LuxuryFooter() {
  const { identity, contact } = projectConfig;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="broker-contact" className="relative bg-[#02060F] text-slate-400 border-t border-white/10 pt-14 sm:pt-16 pb-24 sm:pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-[#C59B27]/40 bg-white p-0.5 shrink-0">
                <Image
                  src={identity.logo.src}
                  alt={identity.logo.alt}
                  fill
                  sizes="36px"
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-lg font-serif text-white tracking-wider block">
                  {identity.projectName}
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#EAD07C]">
                  {identity.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm">
              Independent luxury real estate brokerage and advisory firm. We guide home buyers and investors into Pune's highest-appreciation under-construction residential landmarks with certified MahaRERA transparency and zero client brokerage.
            </p>

            <div className="flex items-center space-x-2 text-xs text-[#EAD07C]">
              <ShieldCheck className="w-4 h-4 text-[#C59B27]" />
              <span>{identity.reraNumber}</span>
            </div>
          </div>

          {/* Quick Anchor Links */}
          <div className="lg:col-span-3 space-y-2">
            <h4 className="text-[11px] uppercase tracking-widest text-white font-semibold mb-3">
              Brokerage Portfolio
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#project-overview" className="hover:text-[#EAD07C] transition-colors">
                  Advisory Overview
                </a>
              </li>
              <li>
                <a href="#tower-elevation" className="hover:text-[#EAD07C] transition-colors">
                  3D Skyscraper HUD & Drone View
                </a>
              </li>
              <li>
                <a href="#under-construction-portfolio" className="hover:text-[#EAD07C] transition-colors">
                  Under-Construction Projects
                </a>
              </li>
              <li>
                <a href="#under-construction-advantages" className="hover:text-[#EAD07C] transition-colors">
                  Why Buy Under-Construction
                </a>
              </li>
              <li>
                <a href="#cinematic-videos" className="hover:text-[#EAD07C] transition-colors">
                  3D Virtual Cinema
                </a>
              </li>
              <li>
                <a href="#project-location" className="hover:text-[#EAD07C] transition-colors">
                  Prime Investment Corridors
                </a>
              </li>
            </ul>
          </div>

          {/* Advisory Office & Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-[11px] uppercase tracking-widest text-white font-semibold mb-3">
              Rudra Advisory Office
            </h4>

            <div className="space-y-2.5 text-xs font-light">
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#C59B27] shrink-0 mt-0.5" />
                <span>{contact.siteOfficeAddress}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                <a href={`tel:+91${contact.phone}`} className="hover:text-white transition-colors">
                  {contact.displayPhone}
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                  {contact.email}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${contact.whatsappNumber}?text=Hello%20Rudra%20Real%20Estate,%20I%20would%20like%20to%20consult%20regarding%20under-construction%20luxury%20projects.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-600/90 hover:bg-emerald-600 text-white font-medium text-xs tracking-wider uppercase transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Advisory Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>
            © {new Date().getFullYear()} {identity.projectName}. Authorized Real Estate Brokerage. Zero Brokerage on Pre-Launch Bookings.
          </p>

          <div className="flex items-center space-x-5">
            <Link href="/privacy" className="hover:text-slate-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300">
              Terms & Conditions
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center space-x-1 text-slate-400 hover:text-[#EAD07C] transition-colors"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
