import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  Compass,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
} from 'lucide-react';

export const metadata = {
  title: 'About Us | Rudra Property Pune',
  description:
    "Learn about Rudra Property - Pune's trusted real estate partner with office at Prestige Chamber Keshav Nagar-Mundhwa.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#B2881E] mb-3">
            <Sparkles className="w-4 h-4 text-[#C59B27]" />
            <span>PUNE'S TRUSTED REAL ESTATE PARTNER</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#08183A] leading-tight">
            Your Property. <span className="gold-gradient-text">Our Priority.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
            Founded with a commitment to integrity, transparency, and deep neighborhood knowledge, Rudra Property Consultancy represents buyers, sellers, and investors across Pune’s prime eastern corridor.
          </p>
        </div>

        {/* Brand Banner Visual */}
        <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full rounded-3xl overflow-hidden border border-[#C59B27]/40 shadow-xl mb-16 bg-[#050E21]">
          <Image
            src="/branding/rudra-banner.png"
            alt="Rudra Property Consultancy Banner"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            {
              title: 'Buy Your Home',
              desc: 'Curated 1, 2, 3, and 4 BHK luxury residences and penthouses in verified gated communities.',
            },
            {
              title: 'Sell With Trust',
              desc: 'High-visibility marketing, realistic valuation, and seamless buyer vetting to maximize your returns.',
            },
            {
              title: 'Rent Right Space',
              desc: 'Premium residential rentals and corporate leases for IT professionals and executives.',
            },
            {
              title: 'Invest Better Tomorrow',
              desc: 'High-yield commercial shops, corporate office floors, and land opportunities in Pune growth hubs.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-8 h-8 rounded-lg bg-[#C59B27]/20 text-[#B2881E] flex items-center justify-center font-bold text-xs mb-4">
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold font-serif text-[#08183A] mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Office & Founder Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B2881E]">
              LOCAL PRESENCE & HEADQUARTERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#08183A]">
              Centrally Located in Keshav Nagar–Mundhwa
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We operate from Prestige Chamber, situated right at the crossroads of Keshav Nagar and Mundhwa. This central location gives us immediate on-the-ground access to new developer launches, emerging infrastructure, and resale opportunities.
            </p>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                <span>
                  Office No. 47, Prestige Chamber, Keshav Nagar–Mundhwa, Pune 411036
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#C59B27] shrink-0" />
                <a href="tel:+917798504435" className="hover:text-[#B2881E] font-medium">
                  +91 7798504435
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#C59B27] shrink-0" />
                <a href="mailto:rudrapropertypune@gmail.com" className="hover:text-[#B2881E] font-medium">
                  rudrapropertypune@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-lg">
            <Image
              src="/branding/rudra-logo.jpg"
              alt="Rudra Property"
              fill
              className="object-contain p-8 bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
