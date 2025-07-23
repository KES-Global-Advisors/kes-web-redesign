// app/page.tsx (SSG Implementation)
import { Metadata } from 'next'
import { fetchSiteContentServer, fetchActiveInsightsServer, createDehydratedState } from '../lib/serverDataFetchers'
import HydrationBoundary from '../components/providers/HydrationBoundary'
import { LazyHero, LazyAbout, LazyInsights, LazyApproach } from '../components/LazyComponents'
import Testimonials from '../components/ui/Testimonials'
import Service from '../components/ui/Service'
import Contact from '../components/ui/Contact'

// Enable static generation with ISR
export const revalidate = 86400 // Revalidate 24 hours

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
  
  // Fetch data on the server at build time
  const [siteContent, activeInsights] = await Promise.all([
    fetchSiteContentServer(),
    fetchActiveInsightsServer()
  ])
  
  // Create dehydrated state for React Query
  const dehydratedState = createDehydratedState(siteContent, activeInsights)
  
  return (
    <HydrationBoundary state={dehydratedState}>
      <LazyHero />
      <Testimonials />
      <LazyApproach />
      <Service />
      <LazyAbout />
      <LazyInsights />
      <Contact />
    </HydrationBoundary>
  )
}