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

  // Session-based registration trigger:
  // Shows smoothly after the visitor has had a chance to explore the cinematic hero
  useEffect(() => {
    if (isAdmin) return;

    const handleOpen = () => setIsEnquiryOpen(true);
    window.addEventListener('open-enquiry-modal', handleOpen);

    try {
      const isDismissed = sessionStorage.getItem('rudra_luxury_modal_dismissed');
      const isRegistered = sessionStorage.getItem('rudra_luxury_registered');

      if (!isDismissed && !isRegistered) {
        // Subtle gentle delay so user can absorb the cinematic visuals first
        const timer = setTimeout(() => {
          setIsEnquiryOpen(true);
        }, 7500);

        return () => {
          clearTimeout(timer);
          window.removeEventListener('open-enquiry-modal', handleOpen);
        };
      }
    } catch (e) {
      // ignore
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
      {/* 1. Minimalist Luxury Header */}
      <LuxuryHeader onOpenEnquiry={() => setIsEnquiryOpen(true)} />

      {/* 2. Main Canvas */}
      <main className="flex-1">{children}</main>

      {/* 3. Discreet Luxury Footer */}
      <LuxuryFooter />

      {/* 4. Elegant Floating Action Buttons (Desktop) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center space-x-3">
        {/* WhatsApp Consultation */}
        <a
          href={`https://wa.me/${contact.whatsappNumber}?text=Hello,%20I%20am%20interested%20in%20The%20Riviera%20Reserve.`}
          target="_blank"
          rel="noopener noreferrer"
          title="Direct WhatsApp Consultation"
          className="relative w-11 h-11 rounded-full bg-emerald-600/90 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl hover:scale-105 transition-all p-2.5"
        >
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#040B18] rounded-full radar-online" />
          <MessageCircle className="w-4 h-4" />
        </a>

        {/* Register Interest Trigger */}
        <button
          type="button"
          onClick={() => setIsEnquiryOpen(true)}
          className="px-4 py-2.5 rounded-full bg-[#061024]/90 hover:bg-[#0A1B3B] text-white border border-[#C59B27]/50 shadow-xl hover:scale-105 transition-all flex items-center space-x-2 group backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
          <span className="text-[10px] font-semibold tracking-widest uppercase text-[#EAD07C] group-hover:text-white transition-colors">
            Register Interest
          </span>
        </button>
      </div>

      {/* Mobile Floating Action Strip */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#040B18]/95 backdrop-blur-md border-t border-white/10 px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xl">
        <a
          href={`tel:+91${contact.phone}`}
          className="flex-1 py-2 px-3 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center space-x-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
          <span>Call Desk</span>
        </a>

        <a
          href={`https://wa.me/${contact.whatsappNumber}?text=Hello,%20I%20am%20interested%20in%20The%20Riviera%20Reserve.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-3 rounded-full bg-emerald-600 text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center space-x-1.5"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={() => setIsEnquiryOpen(true)}
          className="flex-1 py-2 px-3 rounded-full gold-shimmer-btn text-[#040B18] text-xs font-bold tracking-wider uppercase flex items-center justify-center space-x-1"
        >
          <Sparkles className="w-3 h-3 text-[#040B18]" />
          <span>Register</span>
        </button>
      </div>

      {/* Modal Popup */}
      <LuxuryEnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </div>
  );
}
