// components/SSGDebugInfo.tsx
'use client'

import { useContent } from '@/hooks/useContentQuery'
import { useInsights } from '@/hooks/useInsightsQuery'
import { useQueryClient } from '@tanstack/react-query'

export default function SSGDebugInfo() {
  const { content, loading: contentLoading } = useContent()
  const { insights, loading: insightsLoading } = useInsights()
  const queryClient = useQueryClient()

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const contentQuery = queryClient.getQueryState(['site-content'])
  const insightsQuery = queryClient.getQueryState(['insights', 'active'])

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-gray-900 text-white text-xs p-4 rounded-lg shadow-lg">
        <h3 className="font-bold mb-2">🔧 SSG Debug Info</h3>
        
        <div className="space-y-2">
          <div>
            <strong>Content:</strong>
            <br />
            Loading: {contentLoading ? '⏳' : '✅'}
            <br />
            Items: {Object.keys(content).length}
            <br />
            Cache Status: {contentQuery?.status || 'unknown'}
            <br />
            Data Age: {contentQuery?.dataUpdatedAt ? `${Math.round((Date.now() - contentQuery.dataUpdatedAt) / 1000)}s` : 'N/A'}
          </div>
          
          <div>
            <strong>Insights:</strong>
            <br />
            Loading: {insightsLoading ? '⏳' : '✅'}
            <br />
            Count: {insights.length}
            <br />
            Cache Status: {insightsQuery?.status || 'unknown'}
            <br />
            Data Age: {insightsQuery?.dataUpdatedAt ? `${Math.round((Date.now() - insightsQuery.dataUpdatedAt) / 1000)}s` : 'N/A'}
          </div>
          
          <div className="pt-2 border-t border-gray-700">
            <strong>Performance:</strong>
            <br />
            Page Load: {typeof window !== 'undefined' && window.performance ? `${Math.round(window.performance.now())}ms` : 'N/A'}
            <br />
            Hydrated: {contentQuery && insightsQuery ? '✅' : '⏳'}
          </div>
        </div>
      </div>
    </div>
  )
}