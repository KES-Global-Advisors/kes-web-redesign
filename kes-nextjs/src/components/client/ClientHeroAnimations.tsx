// components/client/ClientHeroAnimations.tsx
'use client'

import { useEffect, useRef } from 'react'

export default function ClientHeroAnimations() {
  const heroRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.classList.add('animate-slide-up')
    }
  }, [])

  // Preload critical LCP image
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = 'https://i.postimg.cc/tTPMrGpV/KES-Banner-5.webp'
    link.type = 'image/webp'
    document.head.appendChild(link)
    
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link)
      }
    }
  }, [])

  return (
    <>
      {/* Custom animations styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-delayed {
          0% { opacity: 0; transform: translateY(20px); }
          50% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scale-in {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in-delayed {
          animation: fade-in-delayed 1.2s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.6s ease-out 0.4s forwards;
          transform-origin: center;
          transform: scaleX(0);
        }
        
        @media (min-width: 1024px) {
          .animate-fade-in,
          .animate-fade-in-delayed,
          .animate-scale-in {
            animation: none;
            transform: none;
            opacity: 1;
          }
        }
      `}</style>
      
      {/* Hidden ref div to trigger animations */}
      <div ref={heroRef} className="absolute inset-0 pointer-events-none opacity-0" />
    </>
  )
}