'use client';

import React from 'react';
import { Phone, MessageCircle, Sparkles } from 'lucide-react';

interface FloatingContactActionsProps {
  onOpenEnquiry: () => void;
}

export default function FloatingContactActions({ onOpenEnquiry }: FloatingContactActionsProps) {
  return (
    <>
      {/* Desktop Floating Pill on Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center space-x-3">
        {/* WhatsApp Quick Bubble with Live Status */}
        <a
          href="https://wa.me/917798504435?text=Hello%20Rudra%20Property%20Pune,%20I%20want%20to%20enquire%20about%20properties."
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp (Advisor Online)"
          className="relative w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-emerald-700 transition-all p-3 group"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full radar-online" />
          <MessageCircle className="w-7 h-7" />
        </a>

        {/* Instant Enquiry Button with Shimmer */}
        <button
          onClick={onOpenEnquiry}
          className="px-5 py-3.5 rounded-full bg-gradient-to-r from-[#08183A] via-[#0D224D] to-[#08183A] text-white border border-[#C59B27]/60 shadow-2xl hover:scale-105 hover:shadow-[#C59B27]/30 transition-all flex items-center space-x-2.5 group"
        >
          <div className="w-6 h-6 rounded-full bg-[#C59B27] text-[#050E21] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold tracking-wide uppercase text-[#EAD07C] group-hover:text-white transition-colors">
            Instant Enquiry
          </span>
        </button>
      </div>

      {/* Mobile Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#050E21]/95 backdrop-blur-md border-t border-[#0D224D] px-3 py-2 flex items-center justify-between gap-2 shadow-2xl">
        <a
          href="tel:+917798504435"
          className="flex-1 py-2.5 px-2 rounded-xl bg-[#0D224D] text-white text-xs font-semibold flex items-center justify-center space-x-1.5 active:scale-95 transition-transform"
        >
          <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
          <span>Call Now</span>
        </a>

        <a
          href="https://wa.me/917798504435?text=Hello%20Rudra%20Property,%20I%20am%20interested%20in%20properties%20in%20Pune."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center space-x-1.5 active:scale-95 transition-transform relative"
        >
          <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-emerald-300 radar-online" />
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onOpenEnquiry}
          className="flex-1 py-2.5 px-2 rounded-xl gold-shimmer-btn text-[#050E21] text-xs font-bold flex items-center justify-center space-x-1 active:scale-95 transition-transform shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Enquiry</span>
        </button>
      </div>
    </>
  );
}
