import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck, Clock, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050E21] text-slate-300 border-t border-[#0D224D] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#C59B27]/40 bg-white p-0.5">
                <Image
                  src="/branding/rudra-logo.jpg"
                  alt="Rudra Property"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-bold tracking-wider text-white font-serif">
                  RUDRA <span className="text-[#C59B27]">PROPERTY</span>
                </span>
                <p className="text-[10px] tracking-widest uppercase text-slate-400">
                  Real Estate Consultancy
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Pune’s trusted real estate consultancy specializing in luxury residential apartments, villas, commercial spaces, and high-yield property investments.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-xs text-[#EAD07C]">
              <ShieldCheck className="w-4 h-4 text-[#C59B27]" />
              <span>100% Verified Titles & RERA Registered</span>
            </div>
          </div>

          {/* Prime Localities in Pune */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white mb-4 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] mr-2"></span>
              Prime Localities (Pune)
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/properties?locality=Keshav+Nagar" className="hover:text-[#C59B27] transition-colors">
                  Keshav Nagar (Riverside Corridor)
                </Link>
              </li>
              <li>
                <Link href="/properties?locality=Mundhwa" className="hover:text-[#C59B27] transition-colors">
                  Mundhwa (Magarpatta Junction)
                </Link>
              </li>
              <li>
                <Link href="/properties?locality=Kharadi" className="hover:text-[#C59B27] transition-colors">
                  Kharadi (EON Free Zone & WTC)
                </Link>
              </li>
              <li>
                <Link href="/properties?locality=Hadapsar" className="hover:text-[#C59B27] transition-colors">
                  Hadapsar & Amanora Park Town
                </Link>
              </li>
              <li>
                <Link href="/properties?locality=Kalyani+Nagar" className="hover:text-[#C59B27] transition-colors">
                  Kalyani Nagar
                </Link>
              </li>
              <li>
                <Link href="/properties?locality=Koregaon+Park" className="hover:text-[#C59B27] transition-colors">
                  Koregaon Park & Annexe
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white mb-4 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] mr-2"></span>
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/properties?type=BUY" className="hover:text-[#C59B27] transition-colors">
                  Buy Residential Properties
                </Link>
              </li>
              <li>
                <Link href="/properties?type=RENT" className="hover:text-[#C59B27] transition-colors">
                  Rental Solutions & Tenancy
                </Link>
              </li>
              <li>
                <Link href="/properties?type=INVEST" className="hover:text-[#C59B27] transition-colors">
                  Commercial Offices & Retail
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-[#C59B27] transition-colors">
                  Compare Flats Side-by-Side
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C59B27] transition-colors">
                  About Our Consultancy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C59B27] transition-colors">
                  Schedule Office Visit
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-xs text-[#C59B27] hover:underline">
                  Broker Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Office Contact Info */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white mb-4 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] mr-2"></span>
              Office & Contact
            </h4>
            <div className="space-y-3.5 text-sm text-slate-400">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#C59B27] shrink-0 mt-0.5" />
                <span>
                  Office No. 47, Prestige Chamber,<br />
                  Keshav Nagar–Mundhwa,<br />
                  Pune 411036, Maharashtra, India
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#C59B27] shrink-0" />
                <a href="tel:+917798504435" className="hover:text-white transition-colors">
                  +91 7798504435
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#C59B27] shrink-0" />
                <a href="mailto:rudrapropertypune@gmail.com" className="hover:text-white transition-colors">
                  rudrapropertypune@gmail.com
                </a>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/917798504435?text=Hello%20Rudra%20Property,%20I%20would%20like%20to%20discuss%20properties%20in%20Pune."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp (+91 7798504435)</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Rudra Property Consultancy. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-slate-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-400">
              Terms & Conditions
            </Link>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Pune, Maharashtra</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
