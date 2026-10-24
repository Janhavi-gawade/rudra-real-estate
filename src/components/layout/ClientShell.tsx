'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import FloatingContactActions from './FloatingContactActions';
import InstantEnquiryModal from '../modals/InstantEnquiryModal';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  // Instant trigger when user opens the website
  useEffect(() => {
    if (isAdmin) return;

    // Listen for custom open events from Header, Hero, Floating Buttons
    const handleOpen = () => setIsEnquiryOpen(true);
    window.addEventListener('open-enquiry-modal', handleOpen);

    // Trigger popup immediately on page visit
    const timer = setTimeout(() => {
      // Check if user has already submitted a lead in this session, otherwise prompt them
      const alreadySubmitted = localStorage.getItem('rudra_lead_filled');
      if (!alreadySubmitted) {
        setIsEnquiryOpen(true);
      }
    }, 800);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('open-enquiry-modal', handleOpen);
    };
  }, [isAdmin]);

  if (isAdmin) {
    return <main className="min-h-screen bg-slate-900">{children}</main>;
  }

  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#C59B27] selection:text-[#050E21]">
      <Header onOpenInstantEnquiry={() => setIsEnquiryOpen(true)} />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <FloatingContactActions onOpenEnquiry={() => setIsEnquiryOpen(true)} />
      <InstantEnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </div>
  );
}
