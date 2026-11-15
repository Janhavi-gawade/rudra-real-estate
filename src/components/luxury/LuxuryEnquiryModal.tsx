'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Sparkles, CheckCircle2, MessageCircle, ShieldCheck, ArrowRight, Car } from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';

interface LuxuryEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LuxuryEnquiryModal({ isOpen, onClose }: LuxuryEnquiryModalProps) {
  const { identity, contact } = projectConfig;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    bhk: 'The Riverfront Mansions (Keshav Nagar)',
    chauffeured: false,
    message: '',
  });

  React.useEffect(() => {
    const handleCustomOpen = (e: any) => {
      if (e?.detail?.projectName) {
        setFormData((prev) => ({ ...prev, bhk: e.detail.projectName }));
      }
    };
    window.addEventListener('open-enquiry-modal', handleCustomOpen);
    return () => window.removeEventListener('open-enquiry-modal', handleCustomOpen);
  }, []);

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleDismiss = () => {
    try {
      sessionStorage.setItem('rudra_luxury_modal_dismissed', 'true');
    } catch (e) {
      // ignore
    }
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (cleanPhone.length < 10) {
      setErrorMsg('Please provide a valid 10-digit mobile number.');
      return;
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: cleanPhone,
          email: formData.email.trim() || null,
          enquiryType: 'LUXURY_REGISTRATION',
          budget: formData.bhk,
          message:
            `${formData.message.trim() || `Registration for ${formData.bhk} at ${identity.projectName}.`}${formData.chauffeured ? ' (Requested Chauffeured Site Inspection)' : ''}`,
        }),
      });

      if (!res.ok) {
        throw new Error('Unable to register at this time. Please try again or connect via WhatsApp.');
      }

      try {
        sessionStorage.setItem('rudra_luxury_registered', 'true');
        sessionStorage.setItem('rudra_luxury_modal_dismissed', 'true');
      } catch (e) {
        // ignore
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please connect with our advisor directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto"
      onClick={handleDismiss}
      role="dialog"
      aria-modal="true"
      aria-labelledby="luxury-modal-heading"
    >
      <div
        className="relative w-full max-w-lg bg-[#061024] rounded-3xl border border-[#C59B27]/40 shadow-2xl my-auto flex flex-col max-h-[92dvh] overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Gold Gradient */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C59B27] to-transparent" />

        {/* Header Bar with Monogram & Close Button */}
        <div className="p-4 sm:p-6 pb-3 sm:pb-4 flex items-start justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-[#C59B27]/50 bg-white p-0.5 shrink-0">
              <Image
                src={identity.logo.src}
                alt={identity.logo.alt}
                fill
                className="object-contain"
              />
            </div>
            <div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-semibold text-[#EAD07C] block">
                {identity.projectName}
              </span>
              <h2
                id="luxury-modal-heading"
                className="text-base sm:text-xl font-serif text-white tracking-wide"
              >
                VIP REGISTRATION
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            className="p-1.5 sm:p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            aria-label="Dismiss and continue browsing"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-[#C59B27]/15 border border-[#C59B27]/40 text-[#EAD07C] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h3 className="text-2xl font-serif text-white font-light">
                Registration Confirmed
              </h3>

              <p className="text-xs sm:text-sm text-slate-300/80 max-w-sm mx-auto leading-relaxed font-light">
                Thank you, <strong className="text-white font-medium">{formData.name}</strong>. A dedicated residence advisor will connect with priority allocation details.
              </p>

              <div className="pt-4 flex flex-col gap-3">
                <a
                  href={`https://wa.me/${contact.whatsappNumber}?text=Hello%20${encodeURIComponent(
                    identity.projectName
                  )},%20I%20have%20registered%20my%20interest%20for%20the%20${encodeURIComponent(
                    formData.bhk
                  )}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-colors shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect with Advisor on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleDismiss}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-medium text-xs tracking-wider uppercase transition-colors"
                >
                  Continue Exploring
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-4">
                Register for priority floor plans, construction updates, and pre-launch pricing.
              </p>

              {errorMsg && (
                <div className="p-3 text-xs bg-rose-950/60 border border-rose-500/40 text-rose-200 rounded-xl">
                  {errorMsg}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1.5">
                  Full Name <span className="text-[#EAD07C]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Singhania"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#040B18] border border-white/15 rounded-xl text-white placeholder-slate-500 focus:border-[#C59B27] focus:ring-1 focus:ring-[#C59B27] outline-none transition-all"
                />
              </div>

              {/* Mobile Number & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1.5">
                    Mobile Number <span className="text-[#EAD07C]">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs font-medium text-[#EAD07C]">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-12 pr-3 py-2.5 text-xs sm:text-sm bg-[#040B18] border border-white/15 rounded-xl text-white placeholder-slate-500 focus:border-[#C59B27] focus:ring-1 focus:ring-[#C59B27] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#040B18] border border-white/15 rounded-xl text-white placeholder-slate-500 focus:border-[#C59B27] focus:ring-1 focus:ring-[#C59B27] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Preferred Project or Typology */}
              <div>
                <label className="block text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1.5">
                  Interested Project / Typology
                </label>
                <select
                  value={formData.bhk}
                  onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#040B18] border border-white/15 rounded-xl text-white focus:border-[#C59B27] focus:ring-1 focus:ring-[#C59B27] outline-none transition-all font-light"
                >
                  <option value="The Riverfront Mansions (Keshav Nagar)" className="bg-[#040B18] text-white">
                    The Riverfront Mansions (Keshav Nagar – 3 & 4 BHK)
                  </option>
                  <option value="Koregaon Park Sky Suites" className="bg-[#040B18] text-white">
                    Koregaon Park Sky Suites (Koregaon Park Annexe – 4 BHK)
                  </option>
                  <option value="The Riverside Promenade (Mundhwa)" className="bg-[#040B18] text-white">
                    The Riverside Promenade (Mundhwa – 3 BHK)
                  </option>
                  <option value="Elysium Towers Kharadi" className="bg-[#040B18] text-white">
                    Elysium Towers (Kharadi IT Corridor – 2.5 & 3.5 BHK)
                  </option>
                  <option value="The Crestline Baner" className="bg-[#040B18] text-white">
                    The Crestline (Baner - Balewadi – 3 & 4 BHK)
                  </option>
                  <option value="Kalyani Crest Residences" className="bg-[#040B18] text-white">
                    Kalyani Crest Residences (Kalyani Nagar – 4.5 BHK)
                  </option>
                  <option value="General Under-Construction Consultation" className="bg-[#040B18] text-white">
                    General Consultation (All Under-Construction Projects)
                  </option>
                </select>
              </div>

              {/* Optional Message */}
              <div>
                <label className="block text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1.5">
                  Optional Message
                </label>
                <textarea
                  rows={2}
                  placeholder="Specific requirements, preferred floor band, or site visit timing..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-[#040B18] border border-white/15 rounded-xl text-white placeholder-slate-500 focus:border-[#C59B27] focus:ring-1 focus:ring-[#C59B27] outline-none transition-all resize-none font-light"
                />
              </div>

              {/* Chauffeured Concierge Option */}
              <label className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between cursor-pointer hover:bg-white/[0.05] transition-colors">
                <div className="flex items-center space-x-2">
                  <Car className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span className="text-[11px] text-slate-300">Request Chauffeured Site Inspection</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.chauffeured}
                  onChange={(e) => setFormData({ ...formData, chauffeured: e.target.checked })}
                  className="rounded border-white/20 accent-[#C59B27] w-4 h-4 cursor-pointer"
                />
              </label>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-full font-semibold text-xs tracking-widest uppercase text-[#040B18] gold-shimmer-btn shadow-xl shadow-[#C59B27]/25 transition-all flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-95 disabled:opacity-60"
                >
                  {loading ? (
                    <span>Registering Interest...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#040B18]" />
                      <span>REGISTER YOUR INTEREST</span>
                    </>
                  )}
                </button>
              </div>

              {/* Privacy & Dismiss link */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27] mr-1" />
                  <span>Strict confidentiality assured</span>
                </span>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="text-slate-400 hover:text-white underline"
                >
                  Dismiss
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
