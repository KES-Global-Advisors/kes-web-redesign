// components/TestReactQuery.tsx
'use client'

import { useContent } from '@/hooks/useContentQuery'
import { useInsights } from '@/hooks/useInsightsQuery'

export default function TestReactQuery() {
  const { content, loading: contentLoading, getContent } = useContent()
  const { insights, loading: insightsLoading } = useInsights()
  
  return (
    <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg m-4">
      <h2 className="text-lg font-bold mb-4">🔍 React Query Test Component</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Content Status:</h3>
          <p>Loading: {contentLoading ? '⏳ Yes' : '✅ No'}</p>
          <p>Content Items: {Object.keys(content).length}</p>
          <p>Hero Title: {getContent('hero_title').substring(0, 30)}...</p>
        </div>
        
        <div>
          <h3 className="font-semibold">Insights Status:</h3>
          <p>Loading: {insightsLoading ? '⏳ Yes' : '✅ No'}</p>
          <p>Insights Count: {insights.length}</p>
          <p>First Insight: {insights[0]?.title.substring(0, 30)}...</p>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>🎯 Navigate between pages to test caching behavior</p>
        <p>🛠️ Check React Query DevTools for query status</p>
      </div>
    </div>
  )
}