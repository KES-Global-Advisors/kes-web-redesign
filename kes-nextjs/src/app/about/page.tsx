import { Metadata } from 'next'
import About from '@/components/ui/About'

export const metadata: Metadata = {
  title: 'About Us | KES Global Advisors',
  description: 'Our team of experts, with decades of global experience in the oil, gas, and chemicals sectors, can help your teams drive performance improvement.',
}

export default function AboutPage() {
  return <About id="about" />
}
