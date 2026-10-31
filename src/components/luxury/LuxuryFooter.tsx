'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck, ArrowUp } from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';

export default function LuxuryFooter() {
  const { identity, contact, location } = projectConfig;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="project-contact" className="relative bg-[#02060F] text-slate-400 border-t border-white/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Identity Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-[#C59B27]/40 bg-white p-0.5 shrink-0">
                <Image
                  src={identity.logo.src}
                  alt={identity.logo.alt}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-serif text-white tracking-wider block">
                  {identity.projectName}
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#EAD07C]">
                  {identity.developerName}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400/90 font-light leading-relaxed max-w-sm">
              An exclusive residential landmark offering bespoke riverfront residences and sky penthouses. Meticulously engineered for the discerning few.
            </p>

            <div className="pt-2 flex items-center space-x-2 text-xs text-[#EAD07C]">
              <ShieldCheck className="w-4 h-4 text-[#C59B27]" />
              <span>RERA Registered: {identity.reraNumber}</span>
            </div>
          </div>

          {/* Quick Navigation Anchor Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold mb-4">
              The Development
            </h4>
            <ul className="space-y-2 text-xs uppercase tracking-wider">
              <li>
                <a href="#project-overview" className="hover:text-[#EAD07C] transition-colors">
                  Project Overview
                </a>
              </li>
              <li>
                <a href="#project-showcase" className="hover:text-[#EAD07C] transition-colors">
                  Architectural Showcase
                </a>
              </li>
              <li>
                <a href="#project-amenities" className="hover:text-[#EAD07C] transition-colors">
                  Resort Amenities
                </a>
              </li>
              <li>
                <a href="#project-plans" className="hover:text-[#EAD07C] transition-colors">
                  Residence Schematics
                </a>
              </li>
              <li>
                <a href="#project-location" className="hover:text-[#EAD07C] transition-colors">
                  Strategic Location
                </a>
              </li>
              <li>
                <Link href="/admin/login" className="text-[#C59B27] hover:underline">
                  Broker Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Site Office & Experience Centre Contacts */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold mb-4">
              Private Enquiries & Site Visits
            </h4>

            <div className="space-y-3 text-xs sm:text-sm font-light">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                <span>{contact.siteOfficeAddress}</span>
              </div>

              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#C59B27] shrink-0" />
                <a href={`tel:+91${contact.phone}`} className="hover:text-white transition-colors">
                  {contact.displayPhone}
                </a>
              </div>

              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#C59B27] shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                  {contact.email}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${contact.whatsappNumber}?text=Hello,%20I%20would%20like%20to%20enquire%20about%20The%20Riviera%20Reserve.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs tracking-wider uppercase transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Residence Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer & Back-to-Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} {identity.projectName}. All artistic impressions are indicative architectural representations.
          </p>

          <div className="flex items-center space-x-6">
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
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
