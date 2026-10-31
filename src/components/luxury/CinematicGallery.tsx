'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Maximize2, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function CinematicGallery() {
  const { gallery } = projectConfig;
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  const filteredItems =
    activeCategory === 'All'
      ? gallery.items
      : gallery.items.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section
      id="project-showcase"
      ref={sectionRef}
      className="relative py-14 sm:py-32 bg-[#061024] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-16 gap-5 reveal-fade-up ${isVisible ? 'is-visible' : ''}`}>
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#C59B27]/10 border border-[#C59B27]/30 text-[#EAD07C] text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>3D ARCHITECTURAL RENDERS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-light font-serif text-white tracking-tight">
              Architectural Showcase
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {gallery.categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-[#C59B27] text-[#040B18] font-bold shadow-lg shadow-[#C59B27]/20'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Large Format Cinematic Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className={`group relative h-[380px] sm:h-[440px] rounded-2xl overflow-hidden bg-[#040B18] border border-white/10 hover:border-[#C59B27]/50 cursor-pointer transition-all duration-500 shadow-2xl reveal-fade-up ${
                isVisible ? 'is-visible' : ''
              }`}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:brightness-90"
              />

              {/* Minimalist Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#040B18] via-[#040B18]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Expand Icon Indicator */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-[#EAD07C]" />
              </div>

              {/* Caption & Metadata */}
              <div className="absolute bottom-0 inset-x-0 p-6 space-y-1.5 transform transition-transform duration-300">
                <span className="text-[10px] tracking-widest uppercase font-semibold text-[#EAD07C]">
                  {item.category} • 3D Render
                </span>
                <h3 className="text-lg sm:text-xl font-serif text-white group-hover:text-[#EAD07C] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 font-light line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Preview Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            aria-label="Close Preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Image Container */}
          <div
            className="relative w-full max-w-5xl h-[75vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#C59B27]/30 shadow-2xl">
              <Image
                src={filteredItems[selectedImageIndex].imageUrl}
                alt={filteredItems[selectedImageIndex].title}
                fill
                priority
                className="object-contain"
              />
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs uppercase tracking-widest text-[#EAD07C]">
                {filteredItems[selectedImageIndex].category} • Indicative Render
              </p>
              <h4 className="text-xl font-serif text-white">
                {filteredItems[selectedImageIndex].title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300/80 mt-1 max-w-lg mx-auto">
                {filteredItems[selectedImageIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
