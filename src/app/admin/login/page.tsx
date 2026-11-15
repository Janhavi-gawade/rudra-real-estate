'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Mail, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('rudrapropertypune@gmail.com');
  const [password, setPassword] = useState('rudra@pune2026');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050E21] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#08183A] rounded-3xl border border-[#0D224D] shadow-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C59B27] via-[#E0B345] to-[#B2881E]" />

        <div className="text-center mb-8">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-[#C59B27]/40 bg-white p-1 mx-auto mb-4 shadow-lg">
            <Image
              src="/branding/rudra-logo.jpg"
              alt="Rudra Property"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#EAD07C]">
            ADMIN PORTAL
          </span>
          <h1 className="text-2xl font-bold font-serif text-white mt-1">
            Broker CRM & Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage properties, uploads, prices & customer enquiries
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Admin Email / Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rudrapropertypune@gmail.com"
                className="w-full pl-10 pr-3 py-2.5 bg-[#050E21] border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-[#C59B27] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2.5 bg-[#050E21] border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-[#C59B27] outline-none"
              />
            </div>
          </div>

          {/* Quick Demo Credentials Info */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-300 space-y-1">
            <div className="font-semibold text-[#EAD07C] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]" />
              Default Credentials (Pre-filled):
            </div>
            <div>User: <span className="text-white font-mono">rudrapropertypune@gmail.com</span></div>
            <div>Pass: <span className="text-white font-mono">rudra@pune2026</span></div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-[#050E21] bg-gradient-to-r from-[#C59B27] via-[#E0B345] to-[#B2881E] hover:brightness-110 shadow-lg shadow-[#C59B27]/30 transition-all flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
