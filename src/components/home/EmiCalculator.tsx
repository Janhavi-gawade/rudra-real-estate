'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, Sparkles, MessageCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils';

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(8500000); // 85 Lakhs default
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5% p.a.
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years

  // Calculate EMI
  const { monthlyEmi, totalInterest, totalPayment, principalRatio, interestRatio } = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / 12 / 100; // monthly rate
    const n = tenureYears * 12; // total months

    if (P <= 0 || r <= 0 || n <= 0) {
      return { monthlyEmi: 0, totalInterest: 0, totalPayment: 0, principalRatio: 50, interestRatio: 50 };
    }

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    const interest = total - P;

    const pRatio = Math.round((P / total) * 100);
    const iRatio = 100 - pRatio;

    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(interest),
      totalPayment: Math.round(total),
      principalRatio: pRatio,
      interestRatio: iRatio,
    };
  }, [loanAmount, interestRate, tenureYears]);

  const formatLakhsCr = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(amount / 100000).toFixed(1)} Lakhs`;
  };

  const loanPresets = [
    { label: '₹50 Lakhs', value: 5000000 },
    { label: '₹85 Lakhs', value: 8500000 },
    { label: '₹1.20 Cr', value: 12000000 },
    { label: '₹1.80 Cr', value: 18000000 },
    { label: '₹2.50 Cr', value: 25000000 },
  ];

  const waLoanMessage = `Hello Rudra Property, I used your Home Loan EMI calculator for a loan of ${formatLakhsCr(
    loanAmount
  )} at ${interestRate}% for ${tenureYears} years (Monthly EMI: ₹${monthlyEmi.toLocaleString(
    'en-IN'
  )}). Can you help connect me with your preferred banking partners for the best interest rates?`;

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#B2881E] mb-2">
            <Calculator className="w-4 h-4 text-[#C59B27]" />
            <span>FINANCIAL PLANNING TOOLS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#08183A]">
            Home Loan EMI Calculator
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Estimate your monthly outgoings and plan your luxury Pune home purchase with zero surprises.
          </p>
        </div>

        <div className="bg-[#FAF8F5] rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-7">
            {/* Loan Amount Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Required Loan Amount
                </label>
                <span className="text-lg font-bold font-serif text-[#08183A]">
                  {formatLakhsCr(loanAmount)}
                </span>
              </div>
              <input
                type="range"
                min={1500000}
                max={40000000}
                step={250000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C59B27]"
              />
              {/* Presets */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {loanPresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => setLoanAmount(preset.value)}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all ${
                      loanAmount === preset.value
                        ? 'bg-[#08183A] text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Interest Rate (% per annum)
                </label>
                <span className="text-lg font-bold font-serif text-[#08183A]">
                  {interestRate.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min={7.5}
                max={12.0}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C59B27]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>7.5% (Prime Tier-1 Bank)</span>
                <span>8.5% (Standard)</span>
                <span>12.0%</span>
              </div>
            </div>

            {/* Tenure Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Loan Tenure (Years)
                </label>
                <span className="text-lg font-bold font-serif text-[#08183A]">
                  {tenureYears} Years
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C59B27]"
              />
              <div className="flex gap-2 mt-2">
                {[10, 15, 20, 25, 30].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setTenureYears(yr)}
                    className={`px-3 py-1 text-[11px] font-semibold rounded-lg transition-all ${
                      tenureYears === yr
                        ? 'bg-[#08183A] text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {yr} Yrs
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#08183A] text-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#C59B27]/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C59B27]/10 rounded-full blur-2xl pointer-events-none" />

            <span className="text-xs uppercase tracking-widest text-[#EAD07C] font-semibold block mb-1">
              Estimated Monthly Outflow
            </span>
            <div className="text-3xl sm:text-4xl font-bold font-serif text-[#C59B27] mb-6">
              ₹{monthlyEmi.toLocaleString('en-IN')}{' '}
              <span className="text-xs font-sans text-slate-400 font-normal">/ month</span>
            </div>

            {/* Breakdown Bars */}
            <div className="space-y-3 pb-6 border-b border-[#0D224D]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">Principal Loan Amount:</span>
                <span className="font-bold text-white">₹{loanAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">Total Interest Payable:</span>
                <span className="font-bold text-[#EAD07C]">₹{totalInterest.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-white/10 font-bold">
                <span className="text-white">Total Amount (P + I):</span>
                <span className="text-[#C59B27]">₹{totalPayment.toLocaleString('en-IN')}</span>
              </div>

              {/* Ratio Visualizer */}
              <div className="pt-2">
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${principalRatio}%` }}
                    className="bg-[#C59B27] h-full"
                    title={`Principal: ${principalRatio}%`}
                  />
                  <div
                    style={{ width: `${interestRatio}%` }}
                    className="bg-[#143168] h-full"
                    title={`Interest: ${interestRatio}%`}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#C59B27]" /> Principal ({principalRatio}%)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#143168]" /> Interest ({interestRatio}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Bank Tie-ups WhatsApp Action */}
            <div className="pt-5 space-y-2.5">
              <a
                href={buildWhatsAppUrl('7798504435', waLoanMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl gold-shimmer-btn text-[#050E21] font-bold text-xs flex items-center justify-center space-x-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Check Eligibility & Loan Assistance</span>
              </a>

              <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Direct Tie-ups with SBI, HDFC, ICICI, Axis Bank</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
