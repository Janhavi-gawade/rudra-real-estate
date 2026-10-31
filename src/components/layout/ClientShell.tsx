'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LuxuryHeader from '../luxury/LuxuryHeader';
import LuxuryFooter from '../luxury/LuxuryFooter';
import LuxuryEnquiryModal from '../luxury/LuxuryEnquiryModal';
import { MessageCircle, Sparkles, Phone } from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const { contact } = projectConfig;

  // Session-based display logic:
  // Shows smoothly after a gentle delay on initial visit unless already dismissed or registered in this session
  useEffect(() => {
    if (isAdmin) return;

    // Listen for custom open events from buttons across components
    const handleOpen = () => setIsEnquiryOpen(true);
    window.addEventListener('open-enquiry-modal', handleOpen);

    try {
      const isDismissed = sessionStorage.getItem('rudra_luxury_modal_dismissed');
      const isRegistered = sessionStorage.getItem('rudra_luxury_registered');

      if (!isDismissed && !isRegistered) {
        // Allow cinematic hero to settle first before displaying the registration popup
        const timer = setTimeout(() => {
          setIsEnquiryOpen(true);
        }, 2200);

        return () => {
          clearTimeout(timer);
          window.removeEventListener('open-enquiry-modal', handleOpen);
        };
      }
    } catch (e) {
      // ignore storage errors
    }

    return () => {
      window.removeEventListener('open-enquiry-modal', handleOpen);
    };
  }, [isAdmin]);

  if (isAdmin) {
    return <main className="min-h-screen bg-slate-900">{children}</main>;
  }

  return (
    <div className="flex flex-col min-h-screen relative bg-[#040B18] text-[#FAF8F5] selection:bg-[#C59B27] selection:text-[#040B18]">
      {/* 1. Minimalist Configurable Luxury Header */}
      <LuxuryHeader onOpenEnquiry={() => setIsEnquiryOpen(true)} />

      {/* 2. Main Canvas */}
      <main className="flex-1">{children}</main>

      {/* 3. Discreet Luxury Footer */}
      <LuxuryFooter />

      {/* 4. Elegant Floating Action Pill (Desktop & Mobile) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center space-x-3">
        {/* WhatsApp Direct Advisor */}
        <a
          href={`https://wa.me/${contact.whatsappNumber}?text=Hello,%20I%20am%20interested%20in%20The%20Riviera%20Reserve.`}
          target="_blank"
          rel="noopener noreferrer"
          title="Direct WhatsApp Consultation"
          className="relative w-12 h-12 rounded-full bg-emerald-600/90 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all p-3"
        >
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#040B18] rounded-full radar-online" />
          <MessageCircle className="w-5 h-5" />
        </a>

        {/* Instant Registration Modal Trigger */}
        <button
          type="button"
          onClick={() => setIsEnquiryOpen(true)}
          className="px-5 py-3 rounded-full bg-[#061024]/90 hover:bg-[#0A1B3B] text-white border border-[#C59B27]/50 shadow-2xl hover:scale-105 transition-all flex items-center space-x-2 group backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
          <span className="text-[11px] font-semibold tracking-widest uppercase text-[#EAD07C] group-hover:text-white transition-colors">
            Register Interest
          </span>
        </button>
      </div>

      {/* Mobile Floating Action Strip */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#040B18]/95 backdrop-blur-md border-t border-white/10 px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xl">
        <a
          href={`tel:+91${contact.phone}`}
          className="flex-1 py-2.5 px-3 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center space-x-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
          <span>Call Desk</span>
        </a>

        <button
          type="button"
          onClick={() => setIsEnquiryOpen(true)}
          className="flex-1 py-2.5 px-3 rounded-full gold-shimmer-btn text-[#040B18] text-xs font-bold tracking-wider uppercase flex items-center justify-center space-x-1.5 shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#040B18]" />
          <span>Register</span>
        </button>
      </div>

      {/* 5. Luxury Registration Modal with Session-Based Display */}
      <LuxuryEnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </div>
  );
}
