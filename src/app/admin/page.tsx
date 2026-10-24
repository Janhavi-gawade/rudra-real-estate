'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Building2,
  Users,
  Calendar,
  Sparkles,
  Plus,
  Trash2,
  Edit,
  Search,
  MessageCircle,
  Phone,
  Eye,
  LogOut,
  Upload,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck,
  X,
} from 'lucide-react';
import { PropertyItem, EnquiryItem } from '@/types';
import { formatPrice, formatArea, buildWhatsAppUrl, buildCallUrl, formatDate } from '@/lib/utils';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'properties' | 'enquiries'>('properties');
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter in admin
  const [propertySearch, setPropertySearch] = useState('');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState('ALL');

  // Modals
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<PropertyItem | null>(null);

  // New Property Form state
  const [newProp, setNewProp] = useState({
    title: '',
    listingType: 'BUY',
    propertyType: 'Apartment',
    bhk: '2',
    price: '',
    priceDisplay: '',
    carpetArea: '',
    bedrooms: '2',
    bathrooms: '2',
    balconies: '1',
    floor: '',
    furnishing: 'Semi-Furnished',
    possessionStatus: 'Ready to Move',
    possessionDate: 'Immediate',
    locality: 'Keshav Nagar',
    address: 'Keshav Nagar, Mundhwa, Pune',
    landmark: '',
    reraNumber: '',
    isFeatured: false,
    description: '',
    images: [] as { url: string; caption?: string }[],
  });

  const [uploadingImages, setUploadingImages] = useState(false);
  const [savingProperty, setSavingProperty] = useState(false);

  // Check auth and fetch data
  const loadData = async () => {
    setLoading(true);
    try {
      const authRes = await fetch('/api/auth/me');
      if (!authRes.ok) {
        router.push('/admin/login');
        return;
      }

      const [propRes, enqRes] = await fetchPropertiesAndEnquiries();
      setProperties(propRes || []);
      setEnquiries(enqRes || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPropertiesAndEnquiries = async () => {
    const [pRes, eRes] = await Promise.all([
      fetch('/api/properties'),
      fetch('/api/enquiries'),
    ]);
    const pData = await pRes.json();
    const eData = await eRes.json();
    return [pData.properties, eData.enquiries];
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  // Image upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.urls) {
        const added = data.urls.map((u: string) => ({ url: u }));
        setNewProp((prev) => ({
          ...prev,
          images: [...prev.images, ...added],
        }));
      }
    } catch (err) {
      alert('Failed to upload image');
    } finally {
      setUploadingImages(false);
    }
  };

  // Save New Property
  const handleCreateProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProp.title || !newProp.price) {
      alert('Title and Price are mandatory.');
      return;
    }

    setSavingProperty(true);
    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProp),
      });

      if (!res.ok) throw new Error('Failed to create listing');
      setAddModalOpen(false);
      // Reset form
      setNewProp({
        title: '',
        listingType: 'BUY',
        propertyType: 'Apartment',
        bhk: '2',
        price: '',
        priceDisplay: '',
        carpetArea: '',
        bedrooms: '2',
        bathrooms: '2',
        balconies: '1',
        floor: '',
        furnishing: 'Semi-Furnished',
        possessionStatus: 'Ready to Move',
        possessionDate: 'Immediate',
        locality: 'Keshav Nagar',
        address: 'Keshav Nagar, Mundhwa, Pune',
        landmark: '',
        reraNumber: '',
        isFeatured: false,
        description: '',
        images: [],
      });
      await loadData();
    } catch (err: any) {
      alert(err.message || 'Error creating property');
    } finally {
      setSavingProperty(false);
    }
  };

  // Delete property
  const handleDeleteProperty = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property listing permanently?')) return;
    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProperties(properties.filter((p) => p.id !== id));
      }
    } catch (e) {
      alert('Failed to delete property');
    }
  };

  // Update lead status
  const handleUpdateLeadStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/enquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      setEnquiries(
        enquiries.map((enq) => (enq.id === id ? { ...enq, status: status as any } : enq))
      );
    } catch (e) {
      alert('Failed to update status');
    }
  };

  // Stats
  const totalProperties = properties.length;
  const availableProperties = properties.filter((p) => p.status === 'AVAILABLE').length;
  const newLeads = enquiries.filter((e) => e.status === 'NEW').length;
  const scheduledVisits = enquiries.filter((e) => e.enquiryType === 'SCHEDULE_VISIT').length;

  return (
    <div className="min-h-screen bg-[#050E21] text-slate-100 flex flex-col">
      {/* Top Admin Navbar */}
      <nav className="bg-[#08183A] border-b border-[#0D224D] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#C59B27]/40 bg-white p-0.5 shrink-0">
            <Image
              src="/branding/rudra-logo.jpg"
              alt="Rudra Property"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold font-serif text-white tracking-wide">
              RUDRA PROPERTY <span className="text-[#C59B27]">ADMIN HQ</span>
            </h1>
            <p className="text-[10px] text-slate-400">Brokerage Management & Lead CRM</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C59B27]" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-xs text-rose-300 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </nav>

      {/* Main Admin Content Container */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#08183A] p-5 rounded-2xl border border-[#0D224D] shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                Total Properties
              </span>
              <Building2 className="w-5 h-5 text-[#C59B27]" />
            </div>
            <span className="text-2xl sm:text-3xl font-bold font-serif text-white">
              {totalProperties}
            </span>
            <span className="text-[11px] text-emerald-400 block mt-1">
              {availableProperties} Active Listings
            </span>
          </div>

          <div className="bg-[#08183A] p-5 rounded-2xl border border-[#0D224D] shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                New Leads
              </span>
              <Users className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-2xl sm:text-3xl font-bold font-serif text-amber-400">
              {newLeads}
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">Pending Follow-up</span>
          </div>

          <div className="bg-[#08183A] p-5 rounded-2xl border border-[#0D224D] shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                Scheduled Visits
              </span>
              <Calendar className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-2xl sm:text-3xl font-bold font-serif text-emerald-400">
              {scheduledVisits}
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">Site Pickups / Tours</span>
          </div>

          <div className="bg-[#08183A] p-5 rounded-2xl border border-[#0D224D] shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                Total Inquiries
              </span>
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-2xl sm:text-3xl font-bold font-serif text-white">
              {enquiries.length}
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">Direct Customer Contacts</span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center justify-between border-b border-[#0D224D] pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab('properties')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'properties'
                  ? 'bg-gradient-to-r from-[#C59B27] to-[#E0B345] text-[#050E21] shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Properties Portfolio ({properties.length})
            </button>
            <button
              onClick={() => setActiveTab('enquiries')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'enquiries'
                  ? 'bg-gradient-to-r from-[#C59B27] to-[#E0B345] text-[#050E21] shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Customer Leads & CRM</span>
              {newLeads > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                  {newLeads} new
                </span>
              )}
            </button>
          </div>

          {activeTab === 'properties' && (
            <button
              onClick={() => setAddModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C59B27] via-[#E0B345] to-[#B2881E] text-[#050E21] text-xs font-bold flex items-center space-x-1.5 shadow-md hover:brightness-110 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Property</span>
            </button>
          )}
        </div>

        {/* TAB 1: PROPERTIES MANAGEMENT */}
        {activeTab === 'properties' && (
          <div className="space-y-4">
            <div className="bg-[#08183A] rounded-2xl border border-[#0D224D] overflow-hidden">
              <div className="p-4 border-b border-[#0D224D] flex items-center justify-between">
                <div className="relative w-72">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search properties by title, locality..."
                    value={propertySearch}
                    onChange={(e) => setPropertySearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#050E21] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 outline-none"
                  />
                </div>
                <span className="text-xs text-slate-400">
                  Total {properties.length} listings in database
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#050E21]/60 text-slate-400 font-semibold uppercase tracking-wider border-b border-[#0D224D]">
                      <th className="py-3 px-4">Property</th>
                      <th className="py-3 px-4">Locality</th>
                      <th className="py-3 px-4">Type / BHK</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Views</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#0D224D] text-slate-300">
                    {properties
                      .filter((p) =>
                        p.title.toLowerCase().includes(propertySearch.toLowerCase()) ||
                        p.locality.toLowerCase().includes(propertySearch.toLowerCase())
                      )
                      .map((p) => (
                        <tr key={p.id} className="hover:bg-white/[0.02]">
                          <td className="py-3 px-4 flex items-center space-x-3">
                            <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-slate-800 shrink-0">
                              <Image
                                src={p.images?.[0]?.url || '/branding/rudra-banner.png'}
                                alt="Thumb"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <span className="font-mono text-[10px] text-[#C59B27] block">
                                {p.propertyCode}
                              </span>
                              <Link
                                href={`/properties/${p.slug || p.id}`}
                                target="_blank"
                                className="font-bold text-white hover:text-[#C59B27] line-clamp-1"
                              >
                                {p.title}
                              </Link>
                            </div>
                          </td>
                          <td className="py-3 px-4">{p.locality}</td>
                          <td className="py-3 px-4">
                            {p.bhk} BHK • {p.listingType}
                          </td>
                          <td className="py-3 px-4 font-bold text-white">
                            {p.priceDisplay || formatPrice(p.price, p.listingType)}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                p.status === 'AVAILABLE'
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                  : 'bg-rose-950 text-rose-400 border border-rose-800'
                              }`}
                            >
                              {p.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono">{p.viewsCount}</td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <Link
                              href={`/properties/${p.slug || p.id}`}
                              target="_blank"
                              className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 inline-block"
                              title="View on public site"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              onClick={() => handleDeleteProperty(p.id)}
                              className="p-1.5 rounded bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800"
                              title="Delete Listing"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CUSTOMER LEADS & CRM */}
        {activeTab === 'enquiries' && (
          <div className="bg-[#08183A] rounded-2xl border border-[#0D224D] overflow-hidden">
            <div className="p-4 border-b border-[#0D224D] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-400">Filter status:</span>
                {['ALL', 'NEW', 'CONTACTED', 'VISIT_SCHEDULED', 'CONVERTED', 'CLOSED'].map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => setEnquiryStatusFilter(st)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        enquiryStatusFilter === st
                          ? 'bg-[#C59B27] text-[#050E21]'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {st}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#050E21]/60 text-slate-400 font-semibold uppercase tracking-wider border-b border-[#0D224D]">
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Type & Requirement</th>
                    <th className="py-3 px-4">Visit Date / Note</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0D224D] text-slate-300">
                  {enquiries
                    .filter((e) =>
                      enquiryStatusFilter === 'ALL' ? true : e.status === enquiryStatusFilter
                    )
                    .map((enq) => (
                      <tr key={enq.id} className="hover:bg-white/[0.02]">
                        <td className="py-3 px-4">
                          <span className="font-bold text-white block">{enq.name}</span>
                          <span className="text-[10px] text-slate-400">
                            {formatDate(enq.createdAt)}
                          </span>
                        </td>
                        <td className="py-3 px-4 space-y-0.5">
                          <div className="font-mono text-white">{enq.phone}</div>
                          {enq.email && <div className="text-slate-400">{enq.email}</div>}
                        </td>
                        <td className="py-3 px-4 max-w-xs">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-950 text-blue-300 border border-blue-800 mr-2">
                            {enq.enquiryType}
                          </span>
                          <p className="text-slate-300 text-xs mt-1 line-clamp-2">
                            {enq.budget || enq.message || 'General Enquiry'}
                          </p>
                        </td>
                        <td className="py-3 px-4">
                          {enq.preferredDate ? (
                            <div className="font-semibold text-emerald-400">
                              {enq.preferredDate} ({enq.preferredTime || 'Any slot'})
                            </div>
                          ) : (
                            <span className="text-slate-500">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={enq.status}
                            onChange={(e) => handleUpdateLeadStatus(enq.id, e.target.value)}
                            className="bg-[#050E21] border border-slate-700 text-xs text-white rounded-lg px-2 py-1 outline-none"
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="VISIT_SCHEDULED">VISIT_SCHEDULED</option>
                            <option value="CONVERTED">CONVERTED</option>
                            <option value="CLOSED">CLOSED</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <a
                            href={buildWhatsAppUrl(
                              enq.phone,
                              `Hello ${enq.name}, greetings from Rudra Property Consultancy (Pune). Thank you for your inquiry regarding properties in Pune. How may I assist you today?`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white inline-block"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={buildCallUrl(enq.phone)}
                            className="p-1.5 rounded-lg bg-[#C59B27] hover:bg-[#D4AF37] text-[#050E21] inline-block"
                            title="Call Phone"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ADD NEW PROPERTY MODAL */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#08183A] w-full max-w-2xl rounded-3xl border border-[#0D224D] shadow-2xl p-6 max-h-[90vh] overflow-y-auto text-white">
            <div className="flex items-center justify-between pb-4 border-b border-[#0D224D] mb-4">
              <h2 className="text-lg font-bold font-serif text-white">
                Add New Luxury Property Listing
              </h2>
              <button
                onClick={() => setAddModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProperty} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Property Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3 BHK Ultra Luxury Riverside Flat in Keshav Nagar"
                  value={newProp.title}
                  onChange={(e) => setNewProp({ ...newProp, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#050E21] border border-slate-700 rounded-xl outline-none focus:ring-1 focus:ring-[#C59B27]"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Listing Type</label>
                  <select
                    value={newProp.listingType}
                    onChange={(e) => setNewProp({ ...newProp, listingType: e.target.value })}
                    className="w-full px-3 py-2 bg-[#050E21] border border-slate-700 rounded-xl outline-none"
                  >
                    <option value="BUY">BUY</option>
                    <option value="RENT">RENT</option>
                    <option value="INVEST">INVEST / COMMERCIAL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">BHK</label>
                  <select
                    value={newProp.bhk}
                    onChange={(e) => setNewProp({ ...newProp, bhk: e.target.value })}
                    className="w-full px-3 py-2 bg-[#050E21] border border-slate-700 rounded-xl outline-none"
                  >
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                    <option value="5">5+ BHK</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Price (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 8500000"
                    value={newProp.price}
                    onChange={(e) => setNewProp({ ...newProp, price: e.target.value })}
                    className="w-full px-3 py-2 bg-[#050E21] border border-slate-700 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Price Label</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹85 Lakhs"
                    value={newProp.priceDisplay}
                    onChange={(e) => setNewProp({ ...newProp, priceDisplay: e.target.value })}
                    className="w-full px-3 py-2 bg-[#050E21] border border-slate-700 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Carpet Area (sq.ft.)</label>
                  <input
                    type="number"
                    placeholder="e.g. 1150"
                    value={newProp.carpetArea}
                    onChange={(e) => setNewProp({ ...newProp, carpetArea: e.target.value })}
                    className="w-full px-3 py-2 bg-[#050E21] border border-slate-700 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Locality (Pune)</label>
                  <select
                    value={newProp.locality}
                    onChange={(e) => setNewProp({ ...newProp, locality: e.target.value })}
                    className="w-full px-3 py-2 bg-[#050E21] border border-slate-700 rounded-xl outline-none"
                  >
                    <option value="Keshav Nagar">Keshav Nagar</option>
                    <option value="Mundhwa">Mundhwa</option>
                    <option value="Kharadi">Kharadi</option>
                    <option value="Hadapsar">Hadapsar</option>
                    <option value="Kalyani Nagar">Kalyani Nagar</option>
                    <option value="Koregaon Park">Koregaon Park</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Possession</label>
                  <select
                    value={newProp.possessionStatus}
                    onChange={(e) => setNewProp({ ...newProp, possessionStatus: e.target.value })}
                    className="w-full px-3 py-2 bg-[#050E21] border border-slate-700 rounded-xl outline-none"
                  >
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Under Construction">Under Construction</option>
                  </select>
                </div>
              </div>

              {/* Photo Upload Section */}
              <div className="p-4 rounded-2xl bg-[#050E21] border border-slate-700 space-y-3">
                <label className="block text-slate-300 font-semibold">
                  Property Photos (Upload Multiple)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#C59B27] file:text-[#050E21] hover:file:brightness-110 cursor-pointer"
                />
                {uploadingImages && (
                  <p className="text-xs text-[#EAD07C]">Uploading and optimizing images...</p>
                )}

                {/* Previews */}
                {newProp.images.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto pt-2">
                    {newProp.images.map((img, i) => (
                      <div
                        key={i}
                        className="relative w-20 h-16 rounded-lg overflow-hidden border border-slate-600 shrink-0"
                      >
                        <Image src={img.url} alt="Uploaded" fill className="object-cover" />
                        <span className="absolute top-1 left-1 bg-black/60 text-[9px] px-1 rounded text-white">
                          #{i + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Address & Landmarks</label>
                <input
                  type="text"
                  placeholder="Near Prestige Chamber, Keshav Nagar-Mundhwa Main Road"
                  value={newProp.address}
                  onChange={(e) => setNewProp({ ...newProp, address: e.target.value })}
                  className="w-full px-3 py-2 bg-[#050E21] border border-slate-700 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Property Description</label>
                <textarea
                  rows={3}
                  placeholder="Details regarding luxury specifications, marble flooring, river view..."
                  value={newProp.description}
                  onChange={(e) => setNewProp({ ...newProp, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#050E21] border border-slate-700 rounded-xl outline-none"
                ></textarea>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featCheck"
                  checked={newProp.isFeatured}
                  onChange={(e) => setNewProp({ ...newProp, isFeatured: e.target.checked })}
                  className="w-4 h-4 rounded text-[#C59B27] bg-[#050E21] border-slate-700"
                />
                <label htmlFor="featCheck" className="text-slate-300">
                  Feature this listing on the homepage spotlight
                </label>
              </div>

              <button
                type="submit"
                disabled={savingProperty}
                className="w-full py-3 rounded-xl font-bold text-xs text-[#050E21] bg-gradient-to-r from-[#C59B27] via-[#E0B345] to-[#B2881E] hover:brightness-110 shadow-lg"
              >
                {savingProperty ? 'Publishing Property...' : 'Save & Publish to Live Website'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
