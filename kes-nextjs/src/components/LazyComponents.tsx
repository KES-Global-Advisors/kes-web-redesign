'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// Enhanced lazy loading with better loading states and SSR optimization
export const LazyTestimonials = dynamic(() => import('./ui/Testimonials'), {
  loading: () => (
    <div className="bg-[rgb(55,134,181)] py-24 sm:py-32 lg:h-[625px] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-sm">Loading testimonials...</p>
      </div>
    </div>
  ),
  ssr: false, // This component doesn't need SSR for better performance
})

export const LazyInsights = dynamic(() => import('./ui/Insights'), {
  loading: () => (
    <div className="lg:bg-[rgb(55,134,181)] bg-[#f5f2f7] py-24 sm:py-32 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 lg:border-white mx-auto mb-4"></div>
        <p className="text-gray-600 lg:text-white text-sm">Loading insights...</p>
      </div>
    </div>
  ),
})

export const LazyContact = dynamic(() => import('./ui/Contact'), {
  loading: () => (
    <div className="bg-white py-24 sm:py-32 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-sm">Loading contact form...</p>
      </div>
    </div>
  ),
  ssr: false,
})

// Add these new lazy components for better performance
export const LazyApproach = dynamic(() => import('./ui/Approach'), {
  loading: () => (
    <div className="bg-gray-900 py-24 sm:py-32 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-sm">Loading approach...</p>
      </div>
    </div>
  ),
})

export const LazyAbout = dynamic(() => import('./ui/About'), {
  loading: () => (
    <div className="bg-white py-24 sm:py-32 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-sm">Loading about section...</p>
      </div>
    </div>
  ),
})

export const LazyService = dynamic(() => import('./ui/Service'), {
  loading: () => (
    <div className="bg-[#f5f2f7] py-24 sm:py-32 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-sm">Loading services...</p>
      </div>
    </div>
  ),
})

// Admin components - only load when needed
export const LazyAdminLogin = dynamic(() => import('./admin/AdminLogin'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  ),
  ssr: false,
})

export const LazyAdminPanel = dynamic(() => import('./admin/AdminPanel'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  ),
  ssr: false,
})

// Intersection Observer hook for progressive loading
export const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, options]);

  return isIntersecting;
};