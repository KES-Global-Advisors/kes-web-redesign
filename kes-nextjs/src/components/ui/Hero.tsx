'use client'

import { useEffect, useRef } from 'react';
import Image from 'next/image'
import { useContent } from '../../hooks/useContent';

const Hero = () => {
  const { getContent, loading } = useContent();
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.classList.add('animate-slide-up');
    }
  }, []);

  // Preload critical LCP image
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = 'https://i.postimg.cc/tTPMrGpV/KES-Banner-5.webp';
    link.type = 'image/webp';
    document.head.appendChild(link);
    
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  // Show loading skeleton while content is being fetched
  if (loading) {
    return (
      <div className="bg-white lg:bg-white bg-gradient-to-b from-sky-100 to-white min-h-screen lg:h-auto lg:min-h-[100%]">
        <div className="relative h-full">
          <div className="mx-auto max-w-3xl lg:max-w-7xl">
            <div className="relative pt-14 z-10 max-w-3xl w-full">
              <div className="relative px-6 py-8 sm:py-40 sm:px-40 mt-20 lg:px-8 lg:py-56 lg:mt-0">
                <div className="mx-auto max-w-3xl text-center lg:text-left">
                  <div className="animate-pulse">
                    <div className="h-20 bg-gray-200 rounded mb-6"></div>
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Fixed dimensions to prevent CLS */}
            <div className="absolute inset-y-0 right-0 hidden lg:block w-1/2 bg-gray-50" style={{ minHeight: '600px' }}>
              <div className="h-full w-full bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Extract title parts for the animated underline effect
  const heroTitle = getContent('hero_title');
  const heroSubtitle = getContent('hero_subtitle');
  
  // Split title to apply styling to "Organization's Full Potential"
  const titleParts = heroTitle.split('Organization\'s Full Potential');
  const firstPart = titleParts[0] || 'Unlocking Your';
  const highlightedPart = 'Organization\'s Full Potential';

  return (
      <div id="home" ref={heroRef} className="bg-gradient-to-b from-sky-100 via-sky-50 to-white lg:bg-white min-h-screen lg:h-auto lg:min-h-[100%] relative overflow-hidden">
        
        {/* Mobile-only decorative elements */}
        <div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating circles for mobile */}
          <div className="absolute top-20 right-8 w-32 h-32 bg-sky-200/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 left-4 w-24 h-24 bg-blue-200/15 rounded-full blur-lg animate-pulse delay-700"></div>
          <div className="absolute bottom-32 right-12 w-20 h-20 bg-sky-300/25 rounded-full blur-md animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-8 w-16 h-16 bg-blue-300/20 rounded-full blur-sm animate-pulse delay-500"></div>
        </div>

        <div className="relative h-full">
          <div className="mx-auto max-w-3xl lg:max-w-7xl">
            <div className="relative pt-14 z-10 max-w-3xl w-full">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute top-0 bottom-0 left-[225px] hidden lg:block h-full w-[30rem] translate-x-1/2"
              >
                <defs>
                  <linearGradient id="polygonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f0f9ff" />
                    <stop offset="10%" stopColor="#e0f2fe" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>
                <polygon points="0,0 90,0 50,100 0,100" fill="url(#polygonGradient)"></polygon>
              </svg>
              
              <div className="relative px-6 py-12 sm:py-40 sm:px-40 mt-12 lg:px-8 lg:py-56 lg:mt-0">
                {/* Mobile-only accent line */}
                <div className="lg:hidden w-16 h-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full mb-8 mx-auto animate-pulse"></div>
                
                <div className="mx-auto max-w-3xl text-center lg:text-left">
                  <h1 className="mx-auto max-w-4xl font-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-medium tracking-tight text-slate-900 leading-tight">
                    <span className="relative block mb-2 lg:mb-0">
                      <span className="whitespace-nowrap bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent lg:bg-none lg:text-slate-900 animate-fade-in">{firstPart}</span>
                    </span> 
                    <span className="relative text-blue-600 block lg:inline">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 418 42"
                        className="absolute left-0 top-2/3 h-[0.58em] hidden lg:block w-full fill-blue-300/70"
                        preserveAspectRatio="none"
                      >
                        <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
                      </svg>
                      <span className="relative bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent lg:bg-none lg:text-blue-600 animate-fade-in-delayed">{highlightedPart}</span>
                    </span>
                  </h1>
                  
                  <p className="mt-8 mb-11 text-lg sm:text-xl lg:text-2xl text-balance leading-8 lg:leading-9 text-gray-600 text-center lg:text-left max-w-2xl mx-auto lg:mx-0 animate-fade-in-delayed relative">
                    {/* Mobile-only subtle background for subtitle */}
                    <span className="lg:hidden absolute inset-0 bg-white/20 backdrop-blur-sm rounded-2xl -z-10"></span>
                    <span className="relative z-10 block px-4 py-2 lg:px-0 lg:py-0">{heroSubtitle}</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Fixed dimensions and optimized image - Desktop only */}
            <div className="absolute inset-y-0 right-0 hidden lg:block w-1/2 bg-gray-50" style={{ minHeight: '600px' }}>
              <Image
                src="https://i.postimg.cc/tTPMrGpV/KES-Banner-5.webp"
                alt="KES Global Advisors Banner"
                fill
                className="object-cover"
                priority
                sizes="50vw"
                quality={85}
                loading="eager"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
          </div>
        </div>
        
        {/* Add custom animations */}
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
      </div>
  );
};

export default Hero;