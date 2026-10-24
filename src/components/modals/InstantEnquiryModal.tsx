'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Sparkles, Phone, MessageCircle, CheckCircle2, ShieldCheck, MapPin, Building } from 'lucide-react';

interface InstantEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InstantEnquiryModal({ isOpen, onClose }: InstantEnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    lookingFor: 'BUY',
    locality: 'Keshav Nagar',
    bhk: '3 BHK',
    budget: '₹80 Lakhs - ₹1.5 Cr',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your Name and Mobile Number.');
      return;
    }

    if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      setErrorMsg('Please provide a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          enquiryType: 'INSTANT_POPUP',
          budget: `${formData.lookingFor} | ${formData.bhk} | Budget: ${formData.budget} | Locality: ${formData.locality}`,
          message: formData.message || `Customer looking to ${formData.lookingFor} ${formData.bhk} in ${formData.locality} within ${formData.budget}`,
        }),
      });

      if (!res.ok) {
        throw new Error('Could not submit enquiry. Please try again.');
      }

      setIsSuccess(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('rudra_lead_filled', 'true');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please call directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#C59B27]/40 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#050E21] via-[#08183A] to-[#0D224D] text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 mb-2">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-[#C59B27]/60 bg-white p-0.5 shrink-0">
              <Image
                src="/branding/rudra-logo.jpg"
                alt="Rudra Property"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-[#C59B27]" />
                <span className="text-xs uppercase tracking-widest font-semibold text-[#EAD07C]">
                  Rudra Property Consultancy
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-white">
                Find Your Ideal Property in Pune
              </h2>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Directly connect with Pune's trusted real estate specialist. Tell us your preference for Keshav Nagar, Mundhwa, Kharadi, Koregaon Park & Hadapsar.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-serif">
                Thank You, {formData.name}!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your requirement has been sent to our senior consultant. We will call you at{' '}
                <strong className="text-slate-900">{formData.phone}</strong> shortly with verified options matching your budget.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/917798504435?text=Hello%20Rudra%20Property,%20I%20just%20submitted%20an%20enquiry%20for%20${encodeURIComponent(
                    formData.bhk + ' in ' + formData.locality
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat Immediately on WhatsApp</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm"
                >
                  Browse Website Properties
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded-lg">
                  {errorMsg}
                </div>
              )}

              {/* Requirement Type Pill Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  I am looking to:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['BUY', 'RENT', 'INVEST', 'COMMERCIAL'].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setFormData({ ...formData, lookingFor: type })}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                        formData.lookingFor === type
                          ? 'bg-[#08183A] text-white border-[#08183A] shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#C59B27] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-sm text-slate-500 font-medium">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="7798504435"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-12 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#C59B27] focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Preferred Locality & BHK */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Preferred Pune Locality
                  </label>
                  <select
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#C59B27] focus:border-transparent outline-none bg-white"
                  >
                    <option value="Keshav Nagar">Keshav Nagar (Mundhwa)</option>
                    <option value="Mundhwa">Mundhwa</option>
                    <option value="Kharadi">Kharadi (EON / WTC)</option>
                    <option value="Hadapsar">Hadapsar / Amanora</option>
                    <option value="Kalyani Nagar">Kalyani Nagar</option>
                    <option value="Koregaon Park">Koregaon Park & Annexe</option>
                    <option value="Viman Nagar">Viman Nagar</option>
                    <option value="Other Pune Area">Other Prime Pune Area</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Configuration / BHK
                  </label>
                  <select
                    value={formData.bhk}
                    onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#C59B27] focus:border-transparent outline-none bg-white"
                  >
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK Luxury</option>
                    <option value="4+ BHK">4+ BHK / Penthouse</option>
                    <option value="Commercial">Commercial Showroom / Office</option>
                  </select>
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Budget Expectation
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#C59B27] focus:border-transparent outline-none bg-white"
                >
                  <option value="Under ₹60 Lakhs">Under ₹60 Lakhs</option>
                  <option value="₹60 Lakhs - ₹90 Lakhs">₹60 Lakhs - ₹90 Lakhs</option>
                  <option value="₹90 Lakhs - ₹1.5 Cr">₹90 Lakhs - ₹1.5 Cr</option>
                  <option value="₹1.5 Cr - ₹2.5 Cr">₹1.5 Cr - ₹2.5 Cr</option>
                  <option value="₹2.5 Cr+ (Ultra Luxury)">₹2.5 Cr+ (Ultra Luxury)</option>
                  <option value="Rent: ₹20k - ₹40k / mo">Rent: ₹20,000 - ₹40,000 / mo</option>
                  <option value="Rent: ₹40k+ / mo">Rent: ₹40,000+ / mo</option>
                </select>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm text-[#050E21] bg-gradient-to-r from-[#C59B27] via-[#E0B345] to-[#B2881E] hover:brightness-105 shadow-md shadow-[#C59B27]/30 transition-all flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <span>Submitting Requirement...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Get Instant Property Options & Free Callback</span>
                  </>
                )}
              </button>

              {/* Footer Trust Bar */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
                <span className="flex items-center text-slate-600">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                  Zero Brokerage on Select Direct Builder Tie-ups
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-700 underline"
                >
                  Browse website listings first
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
