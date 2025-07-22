// components/providers/ReactQueryProvider.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

// Query keys factory for consistent naming
export const queryKeys = {
  siteContent: ['site-content'] as const,
  insights: ['insights'] as const,
  insightsActive: () => [...queryKeys.insights, 'active'] as const,
} as const

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // Create the query client inside the component to avoid SSR issues
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          // Data stays fresh for 24 hours
          staleTime: 24 * 60 * 60 * 1000, // 24 hours
          // Keep in cache for 7 days
          gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days
          // CRITICAL: Never refetch if we have data
          refetchOnMount: false,
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          // Only retry once on initial fetch
          retry: 1,
          retryDelay: 1000,
        },
        mutations: {
          retry: 1,
        },
      },
    })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools 
          initialIsOpen={false}
        />
      )}
    </QueryClientProvider>
  )
}