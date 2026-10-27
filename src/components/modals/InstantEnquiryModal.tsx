'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Sparkles, Phone, MessageCircle, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

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

  const handleDismiss = () => {
    onClose();
  };

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
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please call directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      onClick={handleDismiss}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#C59B27]/50 my-auto flex flex-col max-h-[88dvh] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile-Visible High-Contrast Sticky Close & Skip Bar */}
        <div className="bg-[#050E21] text-white px-3.5 py-3 sm:px-6 sm:py-4 flex items-center justify-between border-b border-[#0D224D] shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#C59B27]/60 bg-white p-0.5 shrink-0">
              <Image
                src="/branding/rudra-logo.jpg"
                alt="Rudra Property"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#EAD07C] block -mb-0.5">
                RUDRA PROPERTY
              </span>
              <h2 className="text-sm sm:text-base font-bold font-serif text-white">
                Find Your Ideal Property
              </h2>
            </div>
          </div>

          {/* High-Contrast Easy-to-Tap Close & Skip Button */}
          <button
            type="button"
            onClick={handleDismiss}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#050E21] hover:bg-amber-50 font-bold text-xs shadow-md transition-all active:scale-95 shrink-0 border border-amber-300"
            aria-label="Skip enquiry and close modal"
          >
            <span>Skip</span>
            <X className="w-4 h-4 text-slate-900 stroke-[3]" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-slate-800">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-serif">
                Thank You, {formData.name}!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Your requirement has been sent. Our senior consultant will call you at{' '}
                <strong className="text-slate-900">{formData.phone}</strong> shortly with handpicked options.
              </p>
              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href={`https://wa.me/917798504435?text=Hello%20Rudra%20Property,%20I%20just%20submitted%20an%20enquiry%20for%20${encodeURIComponent(
                    formData.bhk + ' in ' + formData.locality
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Now</span>
                </a>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                >
                  Browse Website Properties
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {errorMsg && (
                <div className="p-2.5 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded-lg">
                  {errorMsg}
                </div>
              )}

              {/* Requirement Type Selector */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  I am looking to:
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {['BUY', 'RENT', 'INVEST', 'COMMERCIAL'].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setFormData({ ...formData, lookingFor: type })}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#C59B27] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs font-bold text-slate-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="7798504435"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-11 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#C59B27] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Preferred Locality & BHK */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Locality (Pune)
                  </label>
                  <select
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#C59B27] outline-none bg-white font-medium"
                  >
                    <option value="Keshav Nagar">Keshav Nagar (Mundhwa)</option>
                    <option value="Mundhwa">Mundhwa</option>
                    <option value="Kharadi">Kharadi (EON / WTC)</option>
                    <option value="Hadapsar">Hadapsar / Amanora</option>
                    <option value="Kalyani Nagar">Kalyani Nagar</option>
                    <option value="Koregaon Park">Koregaon Park</option>
                    <option value="Viman Nagar">Viman Nagar</option>
                    <option value="Other Area">Other Prime Pune Area</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    BHK / Space Type
                  </label>
                  <select
                    value={formData.bhk}
                    onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#C59B27] outline-none bg-white font-medium"
                  >
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK Luxury</option>
                    <option value="4+ BHK">4+ BHK / Penthouse</option>
                    <option value="Commercial">Commercial Office / Shop</option>
                  </select>
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Budget Expectation
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#C59B27] outline-none bg-white font-medium"
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 sm:py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-[#050E21] gold-shimmer-btn shadow-md shadow-[#C59B27]/30 transition-all flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Get Instant Property Options</span>
                  </>
                )}
              </button>

              {/* Mobile Explicit Skip Button */}
              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="w-full py-2 text-xs text-slate-500 hover:text-slate-800 font-medium underline flex items-center justify-center space-x-1"
                >
                  <span>Skip for now & browse listings</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
