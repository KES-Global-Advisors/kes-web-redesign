/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ui/CookieConsent.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const CookieConsent: React.FC = () => {
  const [cookies, setCookie] = useCookies(['marketing']);
  const [showBanner, setShowBanner] = useState(false);

  // Initialize showBanner state based on existing cookie
  useEffect(() => {
    // Show banner only if no marketing preference has been set
    const hasMarketingPreference = cookies.marketing === 'accepted' || cookies.marketing === 'declined';
    setShowBanner(!hasMarketingPreference);
  }, [cookies.marketing]);

  const acceptCookies = () => {
    try {
      setCookie('marketing', 'accepted', { 
        path: '/', 
        maxAge: 31536000, // 1 year in seconds
        sameSite: 'lax'
      });
      setShowBanner(false);
      
      // Initialize Google Analytics immediately after consent
      initializeGoogleAnalytics();
      
      console.log('Cookies accepted - Google Analytics initialized');
    } catch (error) {
      console.error('Error setting cookie:', error);
      setShowBanner(false);
    }
  };

  const declineCookies = () => {
    try {
      setCookie('marketing', 'declined', { 
        path: '/', 
        maxAge: 31536000,
        sameSite: 'lax'
      });
      setShowBanner(false);
      
      // Disable Google Analytics if it was already loaded
      disableGoogleAnalytics();
      
      console.log('Cookies declined - Analytics disabled');
    } catch (error) {
      console.error('Error setting cookie:', error);
      setShowBanner(false);
    }
  };

  // Function to initialize Google Analytics immediately
  const initializeGoogleAnalytics = () => {
    if (typeof window === 'undefined') return;

    // If gtag is already loaded, just update consent
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      });
      return;
    }

    // Load Google Analytics script immediately
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-47E46SXZR1';
    script.async = true;
    script.defer = true;
    
    document.head.appendChild(script);

    // Initialize gtag
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
        // Grant consent immediately since user just accepted
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      });
      console.log('Google Analytics loaded and configured with consent');
    };

    script.onerror = () => {
      console.error('Failed to load Google Analytics');
    };
  };

  // Function to disable Google Analytics
  const disableGoogleAnalytics = () => {
    if (typeof window === 'undefined') return;

    // If gtag exists, update consent to denied
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied'
      });
    }

    // Set Google Analytics disable flag
    window[`ga-disable-G-47E46SXZR1`] = true;

    // Clear any existing Google Analytics cookies
    const gaCookies = ['_ga', '_ga_G-47E46SXZR1', '_gid', '_gat_gtag_G-47E46SXZR1'];
    gaCookies.forEach(cookieName => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-800 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Cookie Preferences</h3>
                <p className="text-sm leading-relaxed text-gray-300">
                  We use cookies to improve your experience and for analytics purposes. 
                  By accepting, you help us understand how you use our site.
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button 
              onClick={declineCookies} 
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Decline
            </button>
            <button 
              onClick={acceptCookies} 
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Global type declarations
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    [key: string]: any; // For ga-disable flag
  }
}

export default CookieConsent;