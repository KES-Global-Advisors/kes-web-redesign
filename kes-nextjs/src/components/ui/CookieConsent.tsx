'use client'

import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

const CookieConsent: React.FC = () => {
  const [cookies, setCookie] = useCookies(['marketing']);
  const [showBanner, setShowBanner] = useState(!cookies.marketing);

  const acceptCookies = () => {
    setCookie('marketing', 'accepted', { path: '/', maxAge: 31536000 });
    setShowBanner(false);
    // Initialize your marketing tools here, e.g., Google Analytics, Facebook Pixel
  };

  const declineCookies = () => {
    setCookie('marketing', 'declined', { path: '/', maxAge: 31536000 });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 z-50 w-full bg-gray-800 text-white p-4 flex justify-between">
      <div>
        We use cookies to improve your experience and for marketing purposes. By clicking &quot;Accept&quot;, you consent to the use of cookies.
      </div>
      <div>
        <button onClick={acceptCookies} className="bg-blue-600 px-4 py-2 rounded mr-2">Accept</button>
        <button onClick={declineCookies} className="bg-gray-600 px-4 py-2 rounded">Decline</button>
      </div>
    </div>
  );
};

export default CookieConsent;
