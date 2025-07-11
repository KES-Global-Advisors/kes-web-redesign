'use client'

import React, { useEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const GoogleAnalytics: React.FC = () => {
  const [cookies] = useCookies(['marketing']);

  const loadGoogleAnalytics = useCallback(async () => {
    if (typeof window === 'undefined') return;

    try {
      // Only load after user interaction or after 3 seconds
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
          window.gtag('config', 'G-47E46SXZR1', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true,
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false
          });
          console.log('Google Analytics loaded successfully');
        };

        script.onerror = () => {
          console.error('Failed to load Google Analytics');
        };
      };

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
    } catch (error) {
      console.error('Failed to initialize Google Analytics:', error);
    }
  }, []);

  useEffect(() => {
    if (cookies.marketing !== 'accepted') return;

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

// Optimized tracking functions
export const trackEvent = (eventName: string, parameters: Record<string, unknown> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: eventName,
      ...parameters,
    });
  }
};

export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-47E46SXZR1', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.origin + path,
    });
  }
};

export default GoogleAnalytics;