'use client'

import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import ReactGA from 'react-ga4';

const GoogleAnalytics: React.FC = () => {
  const [cookies] = useCookies(['marketing']);

  useEffect(() => {
    if (cookies.marketing === 'accepted') {
      ReactGA.initialize('G-47E46SXZR1'); // Replace with your GA4 Measurement ID
      ReactGA.send('pageview');
    }
  }, [cookies.marketing]);

  return null;
};

export default GoogleAnalytics;
