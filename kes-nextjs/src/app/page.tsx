// app/page.tsx (SSG Implementation)
import { Metadata } from 'next'
import { fetchSiteContentServer, fetchActiveInsightsServer, createDehydratedState } from '@/lib/serverDataFetchers'
import ServerHero from '@/components/server/ServerHero'
import ServerApproach from '@/components/server/ServerApproach'
import HydrationBoundary from '@/components/providers/HydrationBoundary'
import { LazyTestimonials, LazyInsights, LazyContact } from '@/components/LazyComponents'
import Service from '@/components/ui/Service'
import About from '@/components/ui/About'
import SSGDebugInfo from '@/components/SSGDebugInfo'

// Enable static generation with ISR
export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
  title: 'KES Global Advisors LLC | Unlocking Your Organization\'s Full Potential',
  description: 'By engaging, aligning, and empowering your workforce, KES Global Advisors can help unlock your organization\'s full potential to drive sustainable improvements for your business.',
  openGraph: {
    title: 'KES Global Advisors LLC | Unlocking Your Organization\'s Full Potential',
    description: 'By engaging, aligning, and empowering your workforce, KES Global Advisors can help unlock your organization\'s full potential',
    url: 'https://www.kesglobaladvisors.com',
  },
}

export default async function HomePage() {
  console.log('🏗️ Building homepage with SSG...')
  
  // Fetch data on the server at build time
  const [siteContent, activeInsights] = await Promise.all([
    fetchSiteContentServer(),
    fetchActiveInsightsServer()
  ])
  
  // Create dehydrated state for React Query
  const dehydratedState = createDehydratedState(siteContent, activeInsights)
  
  console.log('📊 SSG Data Summary:')
  console.log(`- Content items: ${Object.keys(siteContent).length}`)
  console.log(`- Active insights: ${activeInsights.length}`)
  console.log(`- Generated at: ${new Date().toISOString()}`)
  
  return (
    <HydrationBoundary state={dehydratedState}>
      {/* Server-rendered Hero with pre-fetched content */}
      <ServerHero 
        heroTitle={siteContent.hero_title}
        heroSubtitle={siteContent.hero_subtitle}
      />
      
      {/* Testimonials - lazy loaded for performance */}
      <LazyTestimonials />
      
      {/* Approach - server-rendered with pre-fetched content */}
      <ServerApproach 
        approachTitle={siteContent.approach_title}
        approachDescription={siteContent.approach_description}
      />
      
      {/* Services - uses static data */}
      <Service id="services" />
      
      {/* About - will use cached data from React Query */}
      <About id="about" />
      
      {/* Insights - will use pre-hydrated data */}
      <LazyInsights id="insights" />
      
      {/* Contact - lazy loaded */}
      <LazyContact id="contact" />

            {/* Debug info - only shows in development */}
      <SSGDebugInfo />
    </HydrationBoundary>
  )
}