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
      // Create script element
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-47E46SXZR1';
      script.async = true;
      
      // Add script to document
      document.head.appendChild(script);

      // Initialize dataLayer and gtag function
      window.dataLayer = window.dataLayer || [];
      window.gtag = function(...args: unknown[]) { 
        window.dataLayer.push(args); 
      };

      // Wait for script to load
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Google Analytics'));
      });

      // Configure Google Analytics
      window.gtag('js', new Date());
      window.gtag('config', 'G-47E46SXZR1', {
        page_title: document.title,
        page_location: window.location.href,
        // Performance optimizations
        send_page_view: true,
        custom_map: {
          'custom_parameter': 'value'
        },
        // Privacy settings
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false
      });

      console.log('Google Analytics loaded successfully');
    } catch (error) {
      console.error('Failed to load Google Analytics:', error);
    }
  }, []);

  useEffect(() => {
    if (cookies.marketing !== 'accepted') return;

    // Delay loading to improve initial page performance
    const loadTimer = setTimeout(() => {
      loadGoogleAnalytics();
    }, 1500); // Load after 1.5 seconds

    return () => clearTimeout(loadTimer);
  }, [cookies.marketing, loadGoogleAnalytics]);

  // Track page views for SPA navigation
  useEffect(() => {
    if (cookies.marketing !== 'accepted' || !window.gtag) return;

    const handleRouteChange = () => {
      window.gtag('config', 'G-47E46SXZR1', {
        page_path: window.location.pathname,
        page_title: document.title,
        page_location: window.location.href,
      });
    };

    // Listen for navigation events (for SPA routing)
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [cookies.marketing]);

  return null;
};

// Additional utility functions for tracking
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