'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered reveal animations using Intersection Observer.
 * Provides smooth cinematic fade-in / slide-up effects as sections enter the viewport.
 */
export function useScrollReveal(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options?.once !== false) {
            observer.unobserve(el);
          }
        } else if (options?.once === false) {
          setIsVisible(false);
        }
      },
      {
        threshold: options?.threshold ?? 0.05,
        rootMargin: options?.rootMargin ?? '50px 0px 0px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin, options?.once]);

  return { ref, isVisible };
}

/**
 * Helper to get staggered animation delay classes for child elements.
 */
export function staggerDelay(index: number, baseMs = 100): string {
  const delayMs = index * baseMs;
  return `${delayMs}ms`;
}
