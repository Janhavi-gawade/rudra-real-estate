'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { buildWhatsAppUrl, buildCallUrl } from '@/lib/utils';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Property Consultation',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg('Please provide Name and Phone number.');
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
          enquiryType: 'GENERAL',
          budget: formData.subject,
          message: formData.message || 'Direct enquiry from Contact Page',
        }),
      });

      if (!res.ok) throw new Error('Failed to send message');
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#B2881E] mb-3">
            <Sparkles className="w-4 h-4 text-[#C59B27]" />
            <span>CONNECT WITH US</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#08183A]">
            Contact Rudra Property
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Visit our office at Prestige Chamber Keshav Nagar–Mundhwa, or reach out for immediate assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Office Details */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center space-x-3 pb-6 border-b border-slate-100">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#C59B27]/40 bg-white p-0.5 shrink-0">
                  <Image
                    src="/branding/rudra-logo.jpg"
                    alt="Rudra Property"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#08183A] font-serif">
                    Rudra Property
                  </h3>
                  <p className="text-xs text-slate-400">Real Estate Consultancy</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#C59B27] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Office Address</span>
                    <span className="leading-relaxed">
                      Office No. 47, Prestige Chamber,<br />
                      Keshav Nagar–Mundhwa,<br />
                      Pune 411036, Maharashtra
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-[#C59B27] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Call Directly</span>
                    <a href="tel:+917798504435" className="hover:text-[#B2881E] font-medium text-sm">
                      +91 7798504435
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-[#C59B27] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Email Inquiries</span>
                    <a href="mailto:rudrapropertypune@gmail.com" className="hover:text-[#B2881E]">
                      rudrapropertypune@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-[#C59B27] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Consultation Hours</span>
                    <span>Monday – Sunday: 9:30 AM to 8:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                <a
                  href="https://wa.me/917798504435?text=Hello%20Rudra%20Property,%20I%20would%20like%20to%20consult%20regarding%20properties%20in%20Pune."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm">
              <h3 className="text-xl font-bold font-serif text-[#08183A] mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Tell us about your property requirement, budget, or preferred locality. We will respond promptly.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-xl font-bold text-[#08183A] font-serif">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Thank you, {formData.name}. Our senior consultant has received your inquiry and will reach out to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 text-xs bg-rose-50 text-rose-700 rounded-xl border border-rose-200">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Patil"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#C59B27]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Mobile Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 7798504435"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#C59B27]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="you@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#C59B27]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Topic of Inquiry
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#C59B27] bg-white"
                      >
                        <option value="Buy Residential Flat in Keshav Nagar / Mundhwa">
                          Buy Residential Flat in Keshav Nagar / Mundhwa
                        </option>
                        <option value="Buy Luxury Home in Kharadi / Koregaon Park">
                          Buy Luxury Home in Kharadi / Koregaon Park
                        </option>
                        <option value="Commercial Space / Investment">Commercial Space / Investment</option>
                        <option value="Rental Property Solution">Rental Property Solution</option>
                        <option value="Sell or Rent Out My Property">Sell or Rent Out My Property</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Message or Specific Requirements
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share BHK preference, preferred floor, budget, or questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#C59B27]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-[#050E21] bg-gradient-to-r from-[#C59B27] via-[#E0B345] to-[#B2881E] hover:brightness-105 shadow-md shadow-[#C59B27]/30 transition-all"
                  >
                    {loading ? 'Sending...' : 'Submit Inquiry'}
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
