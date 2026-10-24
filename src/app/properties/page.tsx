'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PropertyItem } from '@/types';
import PropertyCard from '@/components/ui/PropertyCard';
import {
  Filter,
  X,
  Search,
  Sparkles,
  SlidersHorizontal,
  RotateCcw,
  Building2,
  ChevronDown,
} from 'lucide-react';

function PropertiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter states
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [locality, setLocality] = useState(searchParams.get('locality') || 'all');
  const [listingType, setListingType] = useState(searchParams.get('type') || 'ALL');
  const [propertyType, setPropertyType] = useState(searchParams.get('propertyType') || 'all');
  const [bhk, setBhk] = useState(searchParams.get('bhk') || 'all');
  const [furnishing, setFurnishing] = useState(searchParams.get('furnishing') || 'all');
  const [possession, setPossession] = useState(searchParams.get('possession') || 'all');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('q', search);
      if (locality !== 'all') params.set('locality', locality);
      if (listingType !== 'ALL') params.set('type', listingType);
      if (propertyType !== 'all') params.set('propertyType', propertyType);
      if (bhk !== 'all') params.set('bhk', bhk);
      if (furnishing !== 'all') params.set('furnishing', furnishing);
      if (possession !== 'all') params.set('possession', possession);
      if (minPrice) params.set('minPrice', minPrice);
      if (maxPrice) params.set('maxPrice', maxPrice);
      if (sort) params.set('sort', sort);

      const res = await fetch(`/api/properties?${params.toString()}`);
      const data = await res.json();
      if (data.properties) {
        setProperties(data.properties);
      }
    } catch (err) {
      console.error('Failed to load properties', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [locality, listingType, propertyType, bhk, furnishing, possession, minPrice, maxPrice, sort]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProperties();
  };

  const clearAllFilters = () => {
    setSearch('');
    setLocality('all');
    setListingType('ALL');
    setPropertyType('all');
    setBhk('all');
    setFurnishing('all');
    setPossession('all');
    setMinPrice('');
    setMaxPrice('');
    setSort('newest');
    router.push('/properties');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#B2881E] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PUNE REAL ESTATE PORTFOLIO</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#08183A]">
            Discover Properties in Pune
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Browse verified luxury flats, riverside homes, penthouses, and commercial spaces.
          </p>
        </div>

        {/* Search & Top Action Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by project, society, or locality..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#C59B27] outline-none"
            />
          </form>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2 rounded-xl bg-[#08183A] text-white text-xs font-semibold flex items-center space-x-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-500 hidden sm:inline">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-3 py-2 text-xs font-semibold border border-slate-200 rounded-xl bg-white text-slate-700 focus:ring-2 focus:ring-[#C59B27] outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="views">Most Viewed</option>
              </select>
            </div>

            {/* Clear Button */}
            <button
              onClick={clearAllFilters}
              title="Clear all filters"
              className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm sticky top-28">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div className="flex items-center space-x-2 font-bold text-sm text-[#08183A]">
                  <SlidersHorizontal className="w-4 h-4 text-[#C59B27]" />
                  <span>Refine Properties</span>
                </div>
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#B2881E] hover:underline"
                >
                  Reset All
                </button>
              </div>

              <div className="space-y-5 text-left">
                {/* Buy / Rent / Commercial */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Listing Type
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl text-center">
                    {['ALL', 'BUY', 'RENT'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setListingType(t)}
                        className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                          listingType === t
                            ? 'bg-white text-[#08183A] shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Locality */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Locality (Pune)
                  </label>
                  <select
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-200 rounded-xl bg-slate-50 focus:bg-white outline-none"
                  >
                    <option value="all">All Prime Localities</option>
                    <option value="Keshav Nagar">Keshav Nagar</option>
                    <option value="Mundhwa">Mundhwa</option>
                    <option value="Kharadi">Kharadi (EON / WTC)</option>
                    <option value="Hadapsar">Hadapsar & Magarpatta</option>
                    <option value="Kalyani Nagar">Kalyani Nagar</option>
                    <option value="Koregaon Park">Koregaon Park</option>
                  </select>
                </div>

                {/* BHK */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    BHK Configuration
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {['all', '1', '2', '3', '4'].map((val) => (
                      <button
                        key={val}
                        onClick={() => setBhk(val)}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                          bhk === val
                            ? 'bg-[#08183A] text-white border-[#08183A]'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {val === 'all' ? 'All' : `${val} BHK`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-200 rounded-xl bg-slate-50 focus:bg-white outline-none"
                  >
                    <option value="all">All Types</option>
                    <option value="Apartment">Apartment / Flat</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Commercial Office">Commercial Office / Retail</option>
                  </select>
                </div>

                {/* Furnishing */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Furnishing
                  </label>
                  <select
                    value={furnishing}
                    onChange={(e) => setFurnishing(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-200 rounded-xl bg-slate-50 focus:bg-white outline-none"
                  >
                    <option value="all">Any Furnishing</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Fully Furnished">Fully Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>

                {/* Possession */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Possession Status
                  </label>
                  <select
                    value={possession}
                    onChange={(e) => setPossession(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-200 rounded-xl bg-slate-50 focus:bg-white outline-none"
                  >
                    <option value="all">Any Status</option>
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Under Construction">Under Construction</option>
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Price Range (₹)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Max Price"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Properties Grid Area */}
          <main className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl h-80 animate-pulse border border-slate-200"
                  />
                ))}
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm">
                <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800 font-serif">
                  No properties matched your criteria
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
                  Try broadening your budget, clearing select filters, or contact our broker directly for unlisted off-market options.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-5 py-2.5 rounded-xl bg-[#08183A] text-white text-xs font-bold hover:bg-[#0D224D]"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div>
                <div className="text-xs text-slate-500 font-medium mb-4">
                  Showing <strong>{properties.length}</strong> verified properties in Pune
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] p-12 text-center text-slate-500">Loading portfolio...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}
