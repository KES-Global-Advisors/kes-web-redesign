// src/app/contact/page.tsx
import { Metadata } from 'next'
import Contact from '@/components/ui/Contact'

export const metadata: Metadata = {
  title: 'Contact Us | KES Global Advisors',
  description: 'Get in touch with KES Global Advisors. Contact us today for consulting, business strategy, and corporate advisory services.',
}

export default function ContactPage() {
  return <Contact />
}
