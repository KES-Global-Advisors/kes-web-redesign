// hooks/useInsightsQuery.ts
'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { queryKeys } from '../components/providers/ReactQueryProvider'
import type { Database } from '../lib/supabase'

type InsightRow = Database['public']['Tables']['insights']['Row']

// Default fallback insights (same as original)
const defaultInsights: InsightRow[] = [
  {
    id: '1',
    title: 'Translating Motivation into Performance',
    description: 'When looking at leveraging the value of an organization\'s workforce, you are effectively considering the value of changing on-the-job behaviors of the employees to drive positive changes in business performance.',
    image_url: '/assets/Motivation to Performance.jpg',
    document_url: 'https://drive.google.com/file/d/1lmDPXpryrGHLXoKMjKVANFYxqcAILOkh/view?usp=sharing',
    document_filename: 'motivation-to-performance.pdf',
    display_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'The Value of Digital Transformation',
    description: 'The key to getting the most out of the technology available today is to ensure that the technology being utilized fits into an overall plan for an organization that not just aligns and enables the various core work processes or enables completely new work processes or practices but ensures that the organizational capabilities are developed to fully support the utilization of that technology.',
    image_url: '/assets/digital transformation 5.jpg',
    document_url: 'https://drive.google.com/file/d/1RRkdevcorIbaYL-BShZXp_dIccbmTIvx/view?usp=sharing',
    document_filename: 'digital-transformation.pdf',
    display_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Intentional Leadership',
    description: 'General thinking is that leaders are always intentional and purposeful. However, many, if not most, leaders are reactionary and opportunistic, and while there is nothing wrong with those leadership styles and at times these are good tools for the kit, real and lasting change requires intentional leadership.',
    image_url: '/assets/Intentional 2.png',
    document_url: 'https://drive.google.com/file/d/11kzMmPZ1Dqh9OKiBeineoNMPAbY9dQxh/view?usp=sharing',
    document_filename: 'intentional-leadership.pdf',
    display_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Multi-Dimensional Digital Transformation',
    description: 'The current industry focus on digital transformation is driving some great innovations in industry, and in some cases, enabling complete transformation in how we work and what we can do.',
    image_url: '/assets/What If - Technology3.jpg',
    document_url: 'https://drive.google.com/file/d/1rQIpEHRuO_hkXOwHlQH1NbjdIDRcT_nJ/view?usp=sharing',
    document_filename: 'multi-dimensional-digital-transformation.pdf',
    display_order: 4,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Does Technology Have Value?',
    description: 'Technology has no value. This simple truth, although unpopular with some and seemingly at odds with conventional thinking, should be the basis behind every digitalization strategy.',
    image_url: 'https://i.postimg.cc/MKPJfxTW/Digital-No-Value-2.avif',
    document_url: 'https://drive.google.com/file/d/1bh7LeTN73oBiFt8uNs7PZbyJnheY8DpT/view?usp=sharing',
    document_filename: 'technology-no-value.pdf',
    display_order: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Digital Operational Excellence',
    description: 'For operating companies in the energy and chemicals sectors, there should be a clear integration between their digitalization strategies and their operational excellence programs/practices.',
    image_url: 'https://i.postimg.cc/sD2tr8Jb/Digital-Operational-Excellence.avif',
    document_url: 'https://drive.google.com/file/d/1GuKYniRyEX7gwBse-dTj63HMsU4ZFtah/view?usp=sharing',
    document_filename: 'operational-excellence.pdf',
    display_order: 6,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

// Fetch function for active insights
const fetchActiveInsights = async (): Promise<InsightRow[]> => {
  try {
    const { data, error } = await supabase
      .from('insights')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error) throw error

    return data && data.length > 0 ? data : defaultInsights
  } catch (error) {
    console.error('Failed to fetch insights:', error)
    return defaultInsights
  }
}

// Main hook for fetching active insights
export const useInsightsQuery = () => {
  return useQuery({
    queryKey: queryKeys.insightsActive(),
    queryFn: fetchActiveInsights,
    staleTime: 15 * 60 * 1000, // 15 minutes - insights change less frequently
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    refetchOnWindowFocus: false,
    placeholderData: defaultInsights,
  })
}

// Hook compatible with existing useInsights interface
export const useInsights = () => {
  const { data: insights, isLoading, error } = useInsightsQuery()
  
  return {
    insights: insights || defaultInsights,
    loading: isLoading,
    error: error?.message || null,
    refreshInsights: () => {
      console.log('Insights refresh triggered by React Query')
    }
  }
}

// Hook for fetching all insights (admin use)
export const useAllInsightsQuery = () => {
  return useQuery({
    queryKey: queryKeys.insights,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('insights')
        .select('*')
        .order('display_order', { ascending: true })
      
      if (error) throw error
      return data || []
    },
    staleTime: 5 * 60 * 1000, // 5 minutes for admin data
  })
}

// Mutation hooks for admin operations
export const useCreateInsightMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (insight: Omit<InsightRow, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('insights')
        .insert({
          ...insight,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.insights })
      queryClient.invalidateQueries({ queryKey: queryKeys.insightsActive() })
    }
  })
}

export const useUpdateInsightMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<InsightRow> & { id: string }) => {
      const { data, error } = await supabase
        .from('insights')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.insights })
      queryClient.invalidateQueries({ queryKey: queryKeys.insightsActive() })
    }
  })
}

export const useDeleteInsightMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('insights')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.insights })
      queryClient.invalidateQueries({ queryKey: queryKeys.insightsActive() })
    }
  })
}