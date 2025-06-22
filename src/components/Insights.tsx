import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useContent } from '../hooks/useContent';
import { useInsights } from '../hooks/useInsights';

interface InsightProps {
  id: string;
}

const Insights: React.FC<InsightProps> = ({ id }) => {
  const { getContent, loading: contentLoading } = useContent();
  const { insights, loading: insightsLoading } = useInsights();
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSlidesToShow(1);
      } else if (width < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);

    return () => {
      window.removeEventListener('resize', updateSlidesToShow);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: insights.length > 1,
    swipe: true,
    swipetoSlide: true,
    touchMove: true,
    speed: 500,
    slidesToShow: Math.min(slidesToShow, insights.length),
    slidesToScroll: 1,
    nextArrow: <div className="slick-next slick-arrow" />,
    prevArrow: <div className="slick-prev slick-arrow" />,
  };

  // Show loading state while either content or insights are loading
  if (contentLoading || insightsLoading) {
    return (
      <div id={id} className="lg:bg-[rgb(55,134,181)] py-24 sm:py-32 bg-[#f5f2f7]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 animate-pulse">
            <div className="h-8 bg-gray-200 lg:bg-gray-700 rounded mb-4"></div>
            <div className="h-12 bg-gray-200 lg:bg-gray-700 rounded mb-6"></div>
            <div className="h-6 bg-gray-200 lg:bg-gray-700 rounded"></div>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 lg:bg-gray-700 h-48 rounded-xl mb-4"></div>
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
      <div id={id} className="lg:bg-[rgb(55,134,181)] py-24 sm:py-32 bg-[#f5f2f7]">
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

  return (
    <div id={id} className="lg:bg-[rgb(55,134,181)] py-24 sm:py-32 bg-[#f5f2f7]">
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

        {/* Use Slider only if there are multiple insights, otherwise show a simple grid */}
        {insights.length > 3 ? (
          <Slider {...settings} className="mt-10">
            {insights.map((insight) => (
              <div key={insight.id} className="px-3">
                <article className="flex flex-col items-start justify-between">
                  <img 
                    className="w-[522px] h-[220px] rounded-xl object-cover" 
                    src={insight.image_url} 
                    alt={insight.title}
                    onError={(e) => {
                      // Fallback to a default image if the image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/522x220/6366f1/ffffff?text=Insight+Image';
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
              </div>
            ))}
          </Slider>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((insight) => (
              <article key={insight.id} className="flex flex-col items-start justify-between">
                <img 
                  className="w-full h-[220px] rounded-xl object-cover" 
                  src={insight.image_url} 
                  alt={insight.title}
                  onError={(e) => {
                    // Fallback to a default image if the image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/522x220/6366f1/ffffff?text=Insight+Image';
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