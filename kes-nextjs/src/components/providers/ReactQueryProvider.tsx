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
          // Data is considered fresh for 5 minutes
          staleTime: 5 * 60 * 1000,
          // Data stays in cache for 30 minutes
          gcTime: 30 * 60 * 1000, // Renamed from cacheTime in v5
          // Retry failed requests 3 times
          retry: 3,
          // Retry with exponential backoff
          retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
          // Don't refetch on window focus in production for better performance
          refetchOnWindowFocus: process.env.NODE_ENV === 'development',
          // Enable background refetching
          refetchOnMount: 'always',
        },
        mutations: {
          // Retry mutations once
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