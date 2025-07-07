// src/app/page.tsx
import { Metadata } from 'next'
import Hero from '@/components/ui/Hero'
import Approach from '@/components/ui/Approach'
import Service from '@/components/ui/Service'
import About from '@/components/ui/About'
import { LazyTestimonials, LazyInsights, LazyContact } from '@/components/LazyComponents'

export const metadata: Metadata = {
  title: 'KES Global Advisors LLC | Unlocking Your Organization\'s Full Potential',
  description: 'By engaging, aligning, and empowering your workforce, KES Global Advisors can help unlock your organization\'s full potential to drive sustainable improvements for your business.',
  openGraph: {
    title: 'KES Global Advisors LLC | Unlocking Your Organization\'s Full Potential',
    description: 'By engaging, aligning, and empowering your workforce, KES Global Advisors can help unlock your organization\'s full potential',
    url: 'https://www.kesglobaladvisors.com',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <LazyTestimonials />
      <Approach />
      <Service id="services" />
      <About id="about" />
      <LazyInsights id="insights" />
      <LazyContact id="contact" />
    </>
  )
}