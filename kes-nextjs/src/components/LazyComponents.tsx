'use client'

import dynamic from 'next/dynamic'

// Lazy load components that are below the fold
export const LazyTestimonials = dynamic(() => import('./ui/Testimonials'), {
  loading: () => (
    <div className="bg-[rgb(55,134,181)] py-24 sm:py-32 lg:h-[625px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>
  ),
})

export const LazyInsights = dynamic(() => import('./ui/Insights'), {
  loading: () => (
    <div className="bg-[rgb(55,134,181)] py-24 sm:py-32 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>
  ),
})

export const LazyContact = dynamic(() => import('./ui/Contact'), {
  loading: () => (
    <div className="bg-white py-24 sm:py-32 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  ),
})