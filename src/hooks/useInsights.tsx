import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { useSupabase } from '../components/admin/SupabaseContext';

interface Insight {
  id: string;
  title: string;
  description: string;
  image_url: string;
  document_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface InsightsContextType {
  insights: Insight[];
  loading: boolean;
  error: string | null;
  refreshInsights: () => Promise<void>;
}

// Default fallback insights (your existing hardcoded data)
const defaultInsights: Insight[] = [
  {
    id: '1',
    title: 'Translating Motivation into Performance',
    description: 'When looking at leveraging the value of an organization\'s workforce, you are effectively considering the value of changing on-the-job behaviors of the employees to drive positive changes in business performance.',
    image_url: '/assets/Motivation to Performance.jpg',
    document_url: 'https://drive.google.com/file/d/1lmDPXpryrGHLXoKMjKVANFYxqcAILOkh/view?usp=sharing',
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
    display_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Intentional Leadership',
    description: 'General thinking is that leaders are always intentional and purposeful. However, many, if not most, leaders are reactionary and opportunistic, and while there is nothing wrong with those leadership styles and at times these are good tools for the kit, real and lasting change requires intentional leadership.',
    image_url: '/assets/Intentioanl 2.png',
    document_url: 'https://drive.google.com/file/d/11kzMmPZ1Dqh9OKiBeineoNMPAbY9dQxh/view?usp=sharing',
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
    display_order: 6,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const InsightsContext = createContext<InsightsContextType>({} as InsightsContextType);

interface InsightsProviderProps {
  children: ReactNode;
}

export const InsightsProvider = ({ children }: InsightsProviderProps) => {
  const { supabase } = useSupabase();
  const [insights, setInsights] = useState<Insight[]>(defaultInsights);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadInsights = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('insights')
        .select('*')
        .eq('is_active', true)
        // .order('display_order', { ascending: true })
        .execute();

      if (error) throw error;

      // Use fetched data if available, otherwise fall back to defaults
      if (data && data.length > 0) {
        setInsights(data);
      } else {
        setInsights(defaultInsights);
      }
    } catch (err) {
      console.error('Failed to load insights:', err);
      setError((err as Error).message);
      // Keep using default insights on error
      setInsights(defaultInsights);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, []);

  const refreshInsights = async () => {
    await loadInsights();
  };

  const value: InsightsContextType = {
    insights,
    loading,
    error,
    refreshInsights
  };

  return (
    <InsightsContext.Provider value={value}>
      {children}
    </InsightsContext.Provider>
  );
};

export const useInsights = (): InsightsContextType => {
  const context = useContext(InsightsContext);
  if (context === undefined) {
    throw new Error('useInsights must be used within an InsightsProvider');
  }
  return context;
};