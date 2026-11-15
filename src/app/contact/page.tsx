'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  CheckCircle2,
  HardHat,
  ArrowRight,
  Car,
} from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';

export default function ContactPage() {
  const { identity, contact } = projectConfig;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    bhk: '3 BHK Residence',
    date: '',
    transferOption: 'CHAUFFEURED', // 'CHAUFFEURED' | 'SELF_ARRIVAL'
    pickupAddress: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your name and phone number.');
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
          phone: formData.phone.trim(),
          email: formData.email.trim() || null,
          enquiryType: 'SITE_VISIT',
          budget: formData.bhk,
          message: `Site Visit: ${formData.bhk}. Transfer: ${
            formData.transferOption === 'CHAUFFEURED'
              ? `Chauffeured Mercedes/EV Pick-up at: ${formData.pickupAddress || 'To be coordinated'}`
              : 'Direct arrival at Experience Centre'
          }. Date: ${formData.date || 'Flexible'}.`,
        }),
      });

      if (!res.ok) throw new Error('Submission error');
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Unable to schedule right now. Please connect directly via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#040B18] text-[#FAF8F5] min-h-screen py-24 sm:py-32 selection:bg-[#C59B27] selection:text-[#040B18]">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#C59B27]/10 border border-[#C59B27]/30 text-[#EAD07C] text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mb-3 sm:mb-4">
            <HardHat className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>UNDER-CONSTRUCTION EXPERIENCE CENTRE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-light font-serif text-white tracking-tight mb-3">
            Schedule a Private Site Tour
          </h1>
          <p className="text-xs sm:text-base text-slate-300/80 font-light leading-relaxed">
            Tour the active superstructure, inspect our show suite, and review pre-launch architectural plans.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Office & Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-[#061024] border border-white/10 space-y-5">
              <h2 className="text-xs uppercase tracking-widest text-[#EAD07C] font-semibold">
                On-Site Experience Centre
              </h2>

              <div className="space-y-4 text-xs font-light text-slate-300">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white block font-normal">{identity.projectName}</span>
                    <span>{contact.siteOfficeAddress}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-[#C59B27] shrink-0" />
                  <span>{contact.siteOfficeHours}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[#C59B27] shrink-0" />
                  <a href={`tel:+91${contact.phone}`} className="hover:text-white transition-colors">
                    {contact.displayPhone}
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[#C59B27] shrink-0" />
                  <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${contact.whatsappNumber}?text=Hello%20Rudra%20Real%20Estate,%20I%20would%20like%20to%20schedule%20a%20site%20visit%20for%20under-construction%20properties.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-full bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-colors shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Residence Desk</span>
                </a>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-[11px] text-slate-400">
              <span className="text-[#EAD07C] font-semibold block mb-1">MahaRERA Registered</span>
              <span>Project registration number: {identity.reraNumber}</span>
            </div>
          </div>

          {/* Right Column: Appointment Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#061024] border border-[#C59B27]/30 shadow-2xl">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 bg-[#C59B27]/15 border border-[#C59B27]/40 text-[#EAD07C] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif text-white">Visit Scheduled</h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Our private client desk will confirm your {formData.transferOption === 'CHAUFFEURED' ? 'chauffeured site inspection' : 'site tour'} shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-white/10 pb-3 mb-4">
                    <h3 className="text-lg font-serif text-white">Private Tour Request</h3>
                    <p className="text-xs text-slate-400 font-light">
                      Please enter your contact details to reserve your inspection slot.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 text-xs bg-rose-950/60 border border-rose-500/40 text-rose-200 rounded-xl">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Singhania"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#040B18] border border-white/15 rounded-xl text-white placeholder-slate-500 focus:border-[#C59B27] focus:ring-1 focus:ring-[#C59B27] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#040B18] border border-white/15 rounded-xl text-white placeholder-slate-500 focus:border-[#C59B27] focus:ring-1 focus:ring-[#C59B27] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="name@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#040B18] border border-white/15 rounded-xl text-white placeholder-slate-500 focus:border-[#C59B27] focus:ring-1 focus:ring-[#C59B27] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1">
                        Preferred Configuration
                      </label>
                      <select
                        value={formData.bhk}
                        onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#040B18] border border-white/15 rounded-xl text-white focus:border-[#C59B27] outline-none"
                      >
                        <option value="3 BHK Residence">3 BHK Sky Residence (1,380 sq.ft.)</option>
                        <option value="4 BHK Sky Suite">4 BHK Presidential Suite (1,840 sq.ft.)</option>
                        <option value="Sky Penthouse">Sky Penthouse Duplex (2,850 sq.ft.)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1">
                        Preferred Visit Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#040B18] border border-white/15 rounded-xl text-white focus:border-[#C59B27] outline-none"
                      />
                    </div>
                  </div>

                  {/* Arrival & Concierge Transfer Option */}
                  <div className="pt-2 border-t border-white/10">
                    <label className="block text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-2">
                      Arrival Concierge
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-2.5">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, transferOption: 'CHAUFFEURED' })}
                        className={`p-3 rounded-xl text-left border transition-all text-xs flex items-center space-x-2.5 ${
                          formData.transferOption === 'CHAUFFEURED'
                            ? 'bg-white/10 border-[#C59B27] text-white'
                            : 'bg-white/[0.02] border-white/10 text-slate-400'
                        }`}
                      >
                        <Car className="w-4 h-4 text-[#C59B27] shrink-0" />
                        <div>
                          <div className="font-semibold text-white">Chauffeured Pick-up</div>
                          <div className="text-[10px] text-slate-400">Complimentary Mercedes/EV</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, transferOption: 'SELF_ARRIVAL' })}
                        className={`p-3 rounded-xl text-left border transition-all text-xs flex items-center space-x-2.5 ${
                          formData.transferOption === 'SELF_ARRIVAL'
                            ? 'bg-white/10 border-[#C59B27] text-white'
                            : 'bg-white/[0.02] border-white/10 text-slate-400'
                        }`}
                      >
                        <MapPin className="w-4 h-4 text-[#C59B27] shrink-0" />
                        <div>
                          <div className="font-semibold text-white">Direct Arrival</div>
                          <div className="text-[10px] text-slate-400">Site Valet Parking</div>
                        </div>
                      </button>
                    </div>

                    {formData.transferOption === 'CHAUFFEURED' && (
                      <input
                        type="text"
                        placeholder="Enter pick-up area (e.g. Koregaon Park, Kalyani Nagar, Airport)"
                        value={formData.pickupAddress}
                        onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                        className="w-full px-4 py-2 text-xs bg-[#040B18] border border-white/15 rounded-xl text-white placeholder-slate-500 focus:border-[#C59B27] outline-none"
                      />
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 py-3 rounded-full font-semibold text-xs tracking-widest uppercase text-[#040B18] gold-shimmer-btn shadow-lg shadow-[#C59B27]/25 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                  >
                    <span>{loading ? 'Confirming...' : 'Confirm Site Tour'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
