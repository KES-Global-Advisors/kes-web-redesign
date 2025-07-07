// src/components/WebVitals.tsx
'use client'

import { useEffect } from 'react'
import { sendToGoogleAnalytics } from '@/lib/analytics'

// Proper typing for gtag function
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void
  }
}

export function WebVitals() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('web-vitals').then(
        ({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
          const report = sendToGoogleAnalytics;
          onCLS(report);
          onFCP(report);
          onLCP(report);
          onTTFB(report);
          onINP(report); // INP is Google’s replacement for FID
        }
      ).catch((err) => {
        console.warn('Failed to load web‑vitals:', err);
      });
    }
  }, []);

  return null;
}