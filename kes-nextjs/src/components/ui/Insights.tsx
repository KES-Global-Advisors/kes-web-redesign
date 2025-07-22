'use client'

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image'
import { useContent } from '../../hooks/useContentQuery';
import { useInsights } from '../../hooks/useInsightsQuery';

interface InsightProps {
  id: string;
}

const Insights: React.FC<InsightProps> = ({ id }) => {
  const { getContent, loading: contentLoading } = useContent();
  const { insights, loading: insightsLoading } = useInsights();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerPage(1);
      } else if (width < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // Calculate the maximum index based on items and items per page
  const maxIndex = Math.max(0, insights.length - itemsPerPage);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      return prev >= maxIndex ? 0 : prev + 1;
    });
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      return prev <= 0 ? maxIndex : prev - 1;
    });
  }, [maxIndex]);

    // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (insights.length <= itemsPerPage) return;
      
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [insights.length, itemsPerPage, nextSlide, prevSlide]);

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && insights.length > itemsPerPage) {
      nextSlide();
    }
    if (isRightSwipe && insights.length > itemsPerPage) {
      prevSlide();
    }
  };

  // Show loading state with fixed dimensions to prevent CLS
  if (contentLoading || insightsLoading) {
    return (
      <div id={id} className="lg:bg-[rgb(55,134,181)] py-24 sm:py-32 bg-[#f5f2f7]" style={{ minHeight: '600px' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 lg:bg-gray-700 rounded mb-4 w-32"></div>
              <div className="h-12 bg-gray-200 lg:bg-gray-700 rounded mb-6 w-64"></div>
              <div className="h-6 bg-gray-200 lg:bg-gray-700 rounded w-96"></div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 lg:bg-gray-700 rounded-xl mb-4" style={{ height: '220px' }}></div>
                <div className="bg-gray-200 lg:bg-gray-700 h-6 rounded mb-2"></div>
                <div className="bg-gray-200 lg:bg-gray-700 h-4 rounded mb-1"></div>
                <div className="bg-gray-200 lg:bg-gray-700 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show message if no insights are available
  if (insights.length === 0) {
    return (
      <div id={id} className="lg:bg-[rgb(55,134,181)] py-24 sm:py-32 bg-[#f5f2f7]" style={{ minHeight: '400px' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-2xl font-bold leading-7 text-indigo-600 lg:text-white">
              {getContent('insights_title', 'Insights')}
            </h2>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 lg:text-white sm:text-4xl">
              Our Perspective
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600 lg:text-white">
              {getContent('insights_description')}
            </p>
          </div>
          <div className="mt-10 text-center">
            <p className="text-lg text-gray-600 lg:text-white">
              No insights are currently available. Check back soon for new content!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate dot indicators count
  const dotsCount = Math.max(1, insights.length - itemsPerPage + 1);

  return (
    <div id={id} className="lg:bg-[rgb(55,134,181)] py-24 sm:py-32 bg-[#f5f2f7]" style={{ minHeight: '600px' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-2xl font-bold leading-7 text-indigo-600 lg:text-white">
            {getContent('insights_title', 'Insights')}
          </h2>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 lg:text-white sm:text-4xl">
            Our Perspective
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 lg:text-white">
            {getContent('insights_description')}
          </p>
        </div>

        {/* Custom lightweight carousel */}
        {insights.length > itemsPerPage ? (
          <div className="relative mt-10">
            <div 
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ 
                  transform: `translateX(-${(currentIndex * 100) / insights.length}%)`,
                  width: `${(insights.length * 100) / itemsPerPage}%`
                }}
              >
                {insights.map((insight, index) => (
                  <div 
                    key={insight.id} 
                    className="px-3"
                    style={{ 
                      width: `${100 / insights.length}%`,
                      flexShrink: 0 
                    }}
                  >
                    <article className="flex flex-col items-start justify-between h-full">
                      <div className="w-full">
                        <Image 
                          src={insight.image_url} 
                          alt={insight.title}
                          width={522}
                          height={220}
                          className="w-full rounded-xl object-cover"
                          style={{ height: '220px' }}
                          loading={index < itemsPerPage ? 'eager' : 'lazy'}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = 'https://via.placeholder.com/522x220/6366f1/ffffff?text=Insight+Image'
                          }}
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 lg:text-white">
                          {insight.title}
                        </h3>
                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 lg:text-white">
                          {insight.description}
                        </p>
                      </div>
                      <div className="mt-8 flex items-center gap-x-4">
                        {insight.document_url && (
                          <a 
                            href={insight.document_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm font-semibold leading-6 text-indigo-700 lg:text-white lg:hover:text-gray-600"
                          >
                            Read <span aria-hidden="true">→</span>
                          </a>
                        )}
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation controls */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
              aria-label="Previous insights"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
              aria-label="Next insights"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: dotsCount }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex 
                      ? 'bg-white' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          // Static grid for fewer items
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((insight, index) => (
              <article key={insight.id} className="flex flex-col items-start justify-between">
                <Image 
                  src={insight.image_url} 
                  alt={insight.title}
                  width={522}
                  height={220}
                  className="w-full rounded-xl object-cover"
                  style={{ height: '220px' }}
                  loading={index < 3 ? 'eager' : 'lazy'}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'https://via.placeholder.com/522x220/6366f1/ffffff?text=Insight+Image'
                  }}
                />
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 lg:text-white">
                    <span className="absolute inset-0" />
                    {insight.title}
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 lg:text-white">
                    {insight.description}
                  </p>
                </div>
                <div className="lg:relative mt-8 flex items-center gap-x-4">
                  {insight.document_url && (
                    <a 
                      href={insight.document_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-semibold leading-6 text-indigo-700 lg:text-white lg:hover:text-gray-600"
                    >
                      Read <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Insights;