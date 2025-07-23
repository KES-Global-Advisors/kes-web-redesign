// components/providers/HydrationBoundary.tsx
'use client'

import { useQueryClient } from '@tanstack/react-query'
import { ReactNode, useEffect, useRef } from 'react'

interface QueryStateData {
  queryKey: unknown[]
  data: unknown
}

interface HydrationBoundaryProps {
  children: ReactNode
  state?: {
    queries: QueryStateData[]
  }
}

export default function HydrationBoundary({ children, state }: HydrationBoundaryProps) {
  const queryClient = useQueryClient()
  const hydratedRef = useRef(false)

  useEffect(() => {
    // Only hydrate once to avoid overwriting client-side updates
    if (!hydratedRef.current && state?.queries) {
      console.log('🚰 Hydrating React Query cache with server data...')
      
      state.queries.forEach((query) => {
        // Simply set the query data in the cache
        // React Query will handle the rest of the state management
        queryClient.setQueryData(query.queryKey, query.data)
      })
      
      hydratedRef.current = true
      console.log(`✅ Hydrated ${state.queries.length} queries`)
    }
  }, [queryClient, state])

  return <>{children}</>
}

// Helper hook to check if data is from server or client
export function useDataSource() {
  const queryClient = useQueryClient()
  
  const checkDataSource = (queryKey: unknown[]) => {
    const query = queryClient.getQueryState(queryKey)
    const isServerData = query?.dataUpdatedAt ? Date.now() - query.dataUpdatedAt < 1000 : false
    return {
      isServerData,
      isClientData: !isServerData && query?.status === 'success',
      isFetching: query?.fetchStatus === 'fetching',
    }
  }
  
  return { checkDataSource }
}