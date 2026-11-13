'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AmbientSoundscape() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const isInitializedRef = useRef(false);

  const initAudio = () => {
    if (isInitializedRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // 1. Subtle Riverfront Breeze / Water Ambience (Filtered Noise)
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.12;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, ctx.currentTime);
      filter.Q.setValueAtTime(0.8, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      whiteNoise.start();

      // 2. Harmonic Ambient Drone (Warm low sine chords)
      const osc1 = ctx.createOscillator();
      const oscGain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(108, ctx.currentTime); // Deep warm tonic
      oscGain1.gain.setValueAtTime(0.015, ctx.currentTime);
      osc1.connect(oscGain1);
      oscGain1.connect(masterGain);
      osc1.start();

      const osc2 = ctx.createOscillator();
      const oscGain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(162, ctx.currentTime); // Harmonic fifth
      oscGain2.gain.setValueAtTime(0.008, ctx.currentTime);
      osc2.connect(oscGain2);
      oscGain2.connect(masterGain);
      osc2.start();

      isInitializedRef.current = true;
    } catch (e) {
      console.warn('AudioContext initialization prevented:', e);
    }
  };

  const toggleSound = () => {
    if (!isPlaying) {
      initAudio();
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, audioCtxRef.current.currentTime);
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.12, audioCtxRef.current.currentTime + 1.5);
      }
      setIsPlaying(true);
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, audioCtxRef.current.currentTime);
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1.2);
      }
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      type="button"
      onClick={toggleSound}
      title={isPlaying ? 'Mute Ambient Soundscape' : 'Play Riverfront Soundscape'}
      className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#C59B27]/50 text-slate-300 hover:text-white transition-all text-xs shadow-md group"
      aria-label={isPlaying ? 'Mute ambient sound' : 'Enable ambient sound'}
    >
      {isPlaying ? (
        <>
          <div className="flex items-end space-x-0.5 h-3 w-3.5">
            <span className="w-0.5 bg-[#EAD07C] animate-pulse h-full" />
            <span className="w-0.5 bg-[#EAD07C] animate-ping h-2/3" />
            <span className="w-0.5 bg-[#EAD07C] animate-pulse h-4/5" />
            <span className="w-0.5 bg-[#EAD07C] animate-bounce h-1/2" />
          </div>
          <span className="text-[10px] tracking-wider uppercase text-[#EAD07C] font-medium hidden sm:inline">
            River Ambience
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#EAD07C] transition-colors" />
          <span className="text-[10px] tracking-wider uppercase text-slate-400 group-hover:text-slate-200 hidden sm:inline">
            Sound: Off
          </span>
        </>
      )}
    </button>
  );
}
