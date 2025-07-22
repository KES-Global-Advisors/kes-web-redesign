// components/LazyComponents.tsx
'use client'

import dynamic from 'next/dynamic'

// Only lazy load components that fetch from Supabase
export const LazyHero = dynamic(() => import('./ui/Hero'), {
  loading: () => (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  ),
})

export const LazyAbout = dynamic(() => import('./ui/About'), {
  loading: () => (
    <div className="bg-white py-24 sm:py-32 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  ),
})

export const LazyApproach = dynamic(() => import('./ui/Approach'), {
  loading: () => (
    <div className="bg-gray-900 py-24 sm:py-32 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>
  ),
})

export const LazyInsights = dynamic(() => import('./ui/Insights'), {
  loading: () => (
    <div className="lg:bg-[rgb(55,134,181)] bg-[#f5f2f7] py-24 sm:py-32 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 lg:border-white"></div>
    </div>
  ),
})

// Remove lazy loading for these as they don't fetch from Supabase:
// - Testimonials (uses static data)
// - Service (uses static data from lib/services.ts)
// - Contact (just a form, no Supabase data)