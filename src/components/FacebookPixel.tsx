import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import ReactPixel from 'react-facebook-pixel';

const FacebookPixel: React.FC = () => {
  const [cookies] = useCookies(['marketing']);

  useEffect(() => {
    if (cookies.marketing === 'accepted') {
      ReactPixel.init('XXXXXXXXXX'); // Replace with your Pixel ID
      ReactPixel.pageView();
    }
  }, [cookies.marketing]);

  return null;
};

export default FacebookPixel;
