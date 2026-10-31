'use client';

import React from 'react';
import { Sparkles, CheckCircle2, Clock, ShieldCheck, TrendingUp, Layers, Lock, ArrowRight, HardHat } from 'lucide-react';
import { projectConfig } from '@/config/projectConfig';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ConstructionProgressProps {
  onOpenEnquiry?: () => void;
}

export default function ConstructionProgress({ onOpenEnquiry }: ConstructionProgressProps) {
  const { constructionProgress, identity } = projectConfig;
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  const handleEnquiry = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-enquiry-modal'));
    }
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#C59B27]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-[#C59B27]" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-[#C59B27]" />;
      case 'Lock':
        return <Lock className="w-5 h-5 text-[#C59B27]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#C59B27]" />;
    }
  };

  return (
    <section
      id="construction-progress"
      ref={sectionRef}
      className="relative py-28 sm:py-36 bg-[#061024] text-white overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C59B27]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-20 reveal-fade-up ${isVisible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#C59B27]/10 border border-[#C59B27]/30 text-[#EAD07C] text-[11px] font-semibold tracking-widest uppercase mb-4">
            <HardHat className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>LIVE CONSTRUCTION TRACKER</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light font-serif text-white tracking-tight mb-5">
            {constructionProgress.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-300/80 font-light leading-relaxed">
            {constructionProgress.subtitle}
          </p>
        </div>

        {/* Live Progress Hero Card */}
        <div className={`relative rounded-3xl overflow-hidden border border-[#C59B27]/40 bg-[#040B18] shadow-2xl p-8 sm:p-12 mb-16 reveal-scale ${isVisible ? 'is-visible' : ''}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>ACTIVE STAGE: {constructionProgress.currentStage}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white leading-tight">
                Engineering Integrity Backed by MahaRERA
              </h3>

              <p className="text-sm text-slate-300/80 font-light leading-relaxed max-w-2xl">
                Every structural milestone is certified by licensed structural consultants and independently inspected. Construction is on track for handover by{' '}
                <strong className="text-[#EAD07C] font-medium">{constructionProgress.targetPossession}</strong>.
              </p>

              {/* Progress Bar */}
              <div className="pt-2">
                <div className="flex justify-between text-xs font-semibold tracking-wider uppercase text-slate-300 mb-2">
                  <span>Overall Structural Completion</span>
                  <span className="text-[#EAD07C] font-mono text-sm">{constructionProgress.overallProgress}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#B2881E] via-[#C59B27] to-[#EAD07C] transition-all duration-1000 shadow-md"
                    style={{ width: `${constructionProgress.overallProgress}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 font-light mt-2">
                  {constructionProgress.reraFilingDate} • RERA Registration: {identity.reraNumber}
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-4">
              <button
                type="button"
                onClick={handleEnquiry}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-xs tracking-widest uppercase text-[#040B18] gold-shimmer-btn shadow-lg shadow-[#C59B27]/20 transition-all flex items-center justify-center space-x-2 hover:scale-105"
              >
                <span>Request Progress Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleEnquiry}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-xs tracking-widest uppercase text-[#EAD07C] bg-white/5 hover:bg-white/10 border border-[#C59B27]/40 transition-all text-center"
              >
                Schedule Site Visit
              </button>
            </div>
          </div>
        </div>

        {/* Construction Milestones Grid */}
        <div className="mb-20">
          <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#EAD07C] mb-8 text-center sm:text-left">
            PROJECT PHASE TIMELINE
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {constructionProgress.milestones.map((ms) => (
              <div
                key={ms.step}
                className={`p-6 rounded-2xl border transition-all duration-300 relative group ${
                  ms.status === 'COMPLETED'
                    ? 'bg-emerald-950/20 border-emerald-500/30'
                    : ms.status === 'IN_PROGRESS'
                    ? 'bg-amber-950/20 border-[#C59B27]/50 shadow-lg shadow-[#C59B27]/10'
                    : 'bg-white/[0.02] border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    Phase 0{ms.step}
                  </span>

                  {ms.status === 'COMPLETED' && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>100% Done</span>
                    </span>
                  )}

                  {ms.status === 'IN_PROGRESS' && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#C59B27]/20 text-[#EAD07C] text-[10px] font-semibold flex items-center space-x-1 border border-[#C59B27]/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] animate-ping" />
                      <span>In Active Progress</span>
                    </span>
                  )}

                  {ms.status === 'UPCOMING' && (
                    <span className="text-[10px] text-slate-500 font-medium">
                      Target: {ms.targetDate}
                    </span>
                  )}
                </div>

                <h5 className="text-base sm:text-lg font-serif text-white mb-2 group-hover:text-[#EAD07C] transition-colors">
                  {ms.title}
                </h5>

                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {ms.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Invest Under-Construction Card Grid */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#EAD07C] mb-8 text-center sm:text-left">
            PRE-COMPLETION INVESTOR ADVANTAGES
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {constructionProgress.investorAdvantages.map((adv, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#040B18] border border-white/10 hover:border-[#C59B27]/40 transition-all duration-300 group shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-[#C59B27]/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {renderIcon(adv.iconName)}
                </div>

                <h5 className="text-base font-serif text-white mb-2 group-hover:text-[#EAD07C] transition-colors">
                  {adv.title}
                </h5>

                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {adv.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
