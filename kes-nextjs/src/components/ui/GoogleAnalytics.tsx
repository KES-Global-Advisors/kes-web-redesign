/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ui/GoogleAnalytics.tsx
'use client'

import React, { useEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    [key: string]: any;
  }
}

const GoogleAnalytics: React.FC = () => {
  const [cookies] = useCookies(['marketing']);

  const loadGoogleAnalytics = useCallback(async () => {
    if (typeof window === 'undefined') return;

    try {
      // Check if Google Analytics is already loaded by CookieConsent
      if (typeof window.gtag === 'function') {
        console.log('Google Analytics already loaded via CookieConsent');
        return;
      }

      const loadAnalytics = () => {
        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-47E46SXZR1';
        script.async = true;
        script.defer = true;
        
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        window.gtag = function(...args: unknown[]) { 
          window.dataLayer.push(args); 
        };

        script.onload = () => {
          window.gtag('js', new Date());
          
          // Configure with appropriate consent state
          const consentState = cookies.marketing === 'accepted' ? 'granted' : 'denied';
          
          window.gtag('config', 'G-47E46SXZR1', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true,
            analytics_storage: consentState,
            ad_storage: consentState,
            // Additional privacy-focused settings
            anonymize_ip: true,
            allow_google_signals: consentState === 'granted',
            allow_ad_personalization_signals: consentState === 'granted'
          });
          
          console.log(`Google Analytics loaded with consent: ${consentState}`);
        };

        script.onerror = () => {
          console.error('Failed to load Google Analytics');
        };
      };

      // Only load if consent has been given
      if (cookies.marketing === 'accepted') {
        // Load after user interaction or 3 seconds, whichever comes first
        let hasLoaded = false;
        const loadOnce = () => {
          if (!hasLoaded) {
            hasLoaded = true;
            loadAnalytics();
          }
        };

        // Load after user interaction
        const interactionEvents = ['click', 'scroll', 'keydown', 'touchstart'];
        const handleInteraction = () => {
          loadOnce();
          interactionEvents.forEach(event => {
            document.removeEventListener(event, handleInteraction);
          });
        };

        interactionEvents.forEach(event => {
          document.addEventListener(event, handleInteraction, { passive: true });
        });

        // Fallback: load after 3 seconds
        const timer = setTimeout(loadOnce, 3000);

        return () => {
          clearTimeout(timer);
          interactionEvents.forEach(event => {
            document.removeEventListener(event, handleInteraction);
          });
        };
      } else if (cookies.marketing === 'declined') {
        // Ensure Analytics is disabled if user declined
        window[`ga-disable-G-47E46SXZR1`] = true;
        console.log('Google Analytics disabled due to declined consent');
      }
    } catch (error) {
      console.error('Failed to initialize Google Analytics:', error);
    }
  }, [cookies.marketing]);

  useEffect(() => {
    // Don't load if no consent decision has been made yet
    if (!cookies.marketing) return;

    let cleanup: (() => void) | undefined;

    loadGoogleAnalytics().then(fn => {
      cleanup = fn;
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, [cookies.marketing, loadGoogleAnalytics]);

  return null;
};

// Optimized tracking functions that respect consent
export const trackEvent = (eventName: string, parameters: Record<string, unknown> = {}) => {
  if (typeof window !== 'undefined' && window.gtag && !window[`ga-disable-G-47E46SXZR1`]) {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: eventName,
      ...parameters,
    });
  }
};

export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag && !window[`ga-disable-G-47E46SXZR1`]) {
    window.gtag('config', 'G-47E46SXZR1', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.origin + path,
    });
  }
};

// New function to check if analytics is enabled
export const isAnalyticsEnabled = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !window[`ga-disable-G-47E46SXZR1`] && !!window.gtag;
};

export default GoogleAnalytics;