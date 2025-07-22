// Add this test component to verify caching works
// components/TestCaching.tsx
'use client'

import { useContent } from '@/hooks/useContentQuery'
import { useInsights } from '@/hooks/useInsightsQuery'

export default function TestCaching() {
  const { content, loading: contentLoading } = useContent()
  const { insights, loading: insightsLoading } = useInsights()
  
  return (
    <div className="p-4 bg-yellow-100 border border-yellow-400">
      <h3>Cache Test Component</h3>
      <p>Content Loading: {contentLoading ? 'Yes' : 'No'}</p>
      <p>Insights Loading: {insightsLoading ? 'Yes' : 'No'}</p>
      <p>Content Items: {Object.keys(content).length}</p>
      <p>Insights Count: {insights.length}</p>
    </div>
  )
}