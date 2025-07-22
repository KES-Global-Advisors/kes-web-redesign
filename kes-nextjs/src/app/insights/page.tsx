// src/app/insights/page.tsx
'use client'

import { useEffect, useRef } from 'react';
import Image from 'next/image'
import { useContent } from '../../hooks/useContentQuery';
import { useInsights } from '../../hooks/useInsightsQuery';

const InsightsPage = () => {
  const { getContent, loading: contentLoading } = useContent();
  const { insights, loading: insightsLoading } = useInsights();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Show loading state while either content or insights are loading
  if (contentLoading || insightsLoading) {
    return (
      <div className="bg-white min-h-screen pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
          {/* Header Loading */}
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded mb-4 max-w-md mx-auto"></div>
              <div className="h-6 bg-gray-200 rounded mb-2 max-w-lg mx-auto"></div>
              <div className="h-6 bg-gray-200 rounded max-w-xl mx-auto"></div>
            </div>
          </div>
          
          {/* Grid Loading */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
                <div className="bg-gray-200 h-6 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded mb-1"></div>
                <div className="bg-gray-200 h-4 rounded mb-4 w-3/4"></div>
                <div className="bg-gray-200 h-4 rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="bg-white min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
        {/* Header Section */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            {getContent('insights_title', 'Insights')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
            {getContent('insights_description', 'We know how important it is to see other perspectives, and for that reason we freely share ours here.')}
          </p>
        </div>

        {/* Insights Grid or Empty State */}
        {insights.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto max-w-md">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No insights available</h3>
              <p className="mt-2 text-gray-500">
                Check back soon for new insights and perspectives from our team.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Insights Count */}
            <div className="mb-8">
              <p className="text-sm text-gray-500">
                Showing {insights.length} insight{insights.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {insights.map((insight, index) => (
                <article 
                  key={insight.id} 
                  className="group relative bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="aspect-[16/9] overflow-hidden">
                    <Image 
                      src={insight.image_url} 
                      alt={insight.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/400x225/f3f4f6/6b7280?text=Insight';
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-200">
                      {insight.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {insight.description}
                    </p>

                    {/* Read More Link */}
                    {insight.document_url && (
                      <div className="flex items-center justify-between">
                        <a 
                          href={insight.document_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                        >
                          Read Full Insight
                          <svg 
                            className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                            />
                          </svg>
                        </a>
                        
                        {/* Insight Number Badge */}
                        <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Bottom CTA Section */}
            {insights.length > 0 && (
              <div className="mt-16 text-center">
                <div className="bg-gray-50 rounded-2xl px-6 py-12 sm:px-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Want to discuss these insights?
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Our team is always ready to dive deeper into these topics and explore how they might apply to your organization.
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200"
                  >
                    Get in Touch
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InsightsPage;