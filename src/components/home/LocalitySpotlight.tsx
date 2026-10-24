import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MapPin } from 'lucide-react';

export default function LocalitySpotlight() {
  const localities = [
    {
      name: 'Keshav Nagar',
      title: 'Riverside Living & Peaceful Corridors',
      description: 'Rapidly appreciating residential haven flanked by the Mula-Mutha river. Seamless 10-minute commute to Magarpatta & Kharadi.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      priceRange: '₹65 L – ₹1.6 Cr',
      query: 'Keshav+Nagar',
    },
    {
      name: 'Mundhwa',
      title: 'Strategic East Pune Urban Hub',
      description: 'The vital bridge connecting Koregaon Park, Hadapsar, and Kharadi. High rental yields and flourishing commercial spaces.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      priceRange: '₹70 L – ₹1.8 Cr',
      query: 'Mundhwa',
    },
    {
      name: 'Kharadi',
      title: 'The IT & Corporate Epicenter',
      description: 'Home to EON Free Zone, World Trade Center (WTC), top international schools, and five-star luxury developments.',
      image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80',
      priceRange: '₹85 L – ₹2.5 Cr+',
      query: 'Kharadi',
    },
    {
      name: 'Koregaon Park',
      title: 'Elite Heritage & Ultra-Luxury Living',
      description: 'Pune’s most prestigious address featuring tree-lined avenues, renowned fine dining, and palatial signature penthouses.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      priceRange: '₹2.2 Cr – ₹6.5 Cr+',
      query: 'Koregaon+Park',
    },
  ];

  return (
    <section className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B2881E]">
            EXPLORE NEIGHBORHOODS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#08183A] mt-2 mb-4">
            Prime Localities in East Pune
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Discover Pune’s fastest-growing residential and commercial growth corridors where Rudra Property has verified inventory and exclusive builder allocations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {localities.map((loc, idx) => (
            <Link
              key={idx}
              href={`/properties?locality=${loc.query}`}
              className="group relative h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-6 border border-slate-200"
            >
              <Image
                src={loc.image}
                alt={loc.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.75]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050E21] via-[#050E21]/60 to-transparent" />

              <div className="relative z-10 text-white">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#C59B27] text-[#050E21]">
                    {loc.priceRange}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#C59B27] group-hover:text-[#050E21] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-xl font-bold font-serif text-white group-hover:text-[#EAD07C] transition-colors">
                  {loc.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed font-light">
                  {loc.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
