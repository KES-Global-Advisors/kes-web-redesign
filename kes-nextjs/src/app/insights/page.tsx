import { Metadata } from 'next'
import Insights from '@/components/ui/Insights'

export const metadata: Metadata = {
  title: 'Insights | KES Global Advisors',
  description: 'We know how important it is to see other perspectives, and for that reason we freely share ours here.',
}

export default function InsightsPage() {
  return <Insights id="insights" />
}
