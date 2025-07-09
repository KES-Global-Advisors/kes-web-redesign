'use client'

import { useRef, useEffect, useState, useCallback } from 'react';

const testimonials = [
  {
    id: 1,
    text: "Kevin has been a trusted advisor for me for over 15 years. He and his teams have helped facilitate a number of employee strategic programs for me over the years and to date, every one of those programs has not only delivered on the original goals but have been sustained over time. Most recently Kevin and his team have helped Marathon implement a corporate wide, employee led strategic improvement effort for refining that is truly owned by our employees and delivering real value to all aspects of our business.",
    author: "Kevin Bogard",
    position: "SVP Refining, Marathon Petroleum",
  },
  {
    id: 2,
    text: "I strongly recommend working with Kevin and his KES Global Advisors company. My experience as a client working together with Kevin and his team has been unique. The capacity and strategy of Kevin to fully let the client realize its goals is impressive. Immediate results are there showing benefits for the companies as implementation takes place. Best practices is the daily thinking.",
    author: "Rubén Vásquez",
    position: "Supervisor at Halliburton",
  },
  {
    id: 3,
    text: "KES is a trusted and valued partner for SPP. Over the past 4 years, they have supported a fundamental change in how we develop and execute our site strategy. Changing from a top down to bottoms up ownership of our strategic initiative has been a game changer. This approach, guided by KES, fortified our strategic initiative by leveraging the knowledge, ideas, and energy of all employees, not just a select few leaders. The resulting alignment and ownership we see across the site supports our continued growth and improvement.",
    author: "Holly Jackson",
    position: "GM, Marathon Petroleum",
  },
  {
    id: 4,
    text: "For several years, KES has consistently demonstrated an ability to facilitate discussion on strategy which led to successful results with vision, strategy and tactics for SPP. KES possesses a unique talent to guide discussion to coalesce what are often complex problem statements and distill ideas into cultivated solutions.",
    author: "Josh Mallonee",
    position: "Product Control Manager, Marathon Petroleum",
  },
  {
    id: 5,
    text: "I have worked with KES professionals across multiple Marathon Petroleum sites and have been witness to the individualized approach they take to understand each site's key strategic opportunities, and focus the local teams on evaluating and overcoming hurdles to achieving their potential. The ground-up methodology taken by KES ensures ownership of the vision, tactics and strategies from the individual contributor to the GM, long after KES has completed their part of the engagement.",
    author: "Bob Lawrence",
    position: "Controller Refining, Marathon Petroleum ",
  },
  {
    id: 6,
    text: "I have had the opportunity to work with Kevin and his team at KES on two separate strategic visioning efforts over the last 6 years. Kevin's ability to align leadership teams and the broader organization is exceptional. His strategic vision ensures that every level of the site work cohesively toward shared goals, driving impactful long-term results. He excels at engaging employees throughout the organization, empowering them to lead change initiatives effectively. It has been a pleasure working with his organization.",
    author: "David Leaver",
    position: " VP Refining, Marathon Petroleum",
  },
  {
    id: 7,
    text: "I have had the pleasure to work with KES Global Advisors over the last 18 months. I believe the biggest tool or change that Kevin has brought to Salt Lake City is a positive move in our employees trusting our leadership and our leadership trusting in our employees. In building trust throughout our facility, employees now feel comfortable to bring up new issues and or ideas for improvements without the fear of judgement. This has significantly brought up the site's morale and desire to be a high performing culture.",
    author: "Brock Carter",
    position: "Strategy Program Lead, Marathon Petroleum",
  },
];

// Custom hook for touch/swipe functionality
const useSwipeNavigation = (onSwipeLeft: () => void, onSwipeRight: () => void, threshold = 50) => {
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    isSwiping.current = true;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    touchEndX.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isSwiping.current) return;
    isSwiping.current = false;

    const swipeDistance = touchStartX.current - touchEndX.current;
    const absDistance = Math.abs(swipeDistance);

    if (absDistance > threshold) {
      if (swipeDistance > 0) {
        onSwipeLeft(); // Swipe left - next
      } else {
        onSwipeRight(); // Swipe right - previous
      }
    }
  }, [onSwipeLeft, onSwipeRight, threshold]);

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Infinite scroll navigation with smooth transitions
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning]);

  // Enhanced swipe navigation
  const swipeHandlers = useSwipeNavigation(nextSlide, prevSlide, 50);

  // Auto-play functionality with improved mobile detection
  useEffect(() => {
    if (isAutoPlaying && !isPaused) {
      intervalRef.current = setInterval(nextSlide, 15000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, isPaused, nextSlide]);

  // Enhanced mobile detection with resize handling
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setIsAutoPlaying(!isMobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    swipeHandlers.handleTouchStart(e);
  };
  const handleTouchEnd = () => {
    setIsPaused(false);
    swipeHandlers.handleTouchEnd();
  };

  return (
    <section className="relative overflow-hidden bg-[#f5f2f7] lg:bg-[rgb(55,134,181)] px-4 sm:px-6 py-16 sm:py-24 lg:py-32 lg:px-8 lg:h-[700px]">
      
      {/* Mobile-only decorative elements */}
      <div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle floating elements */}
        <div className="absolute top-12 right-6 w-24 h-24 bg-purple-100/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-32 left-4 w-16 h-16 bg-indigo-100/40 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-24 right-8 w-20 h-20 bg-violet-100/25 rounded-full blur-lg animate-pulse delay-500"></div>
        <div className="absolute bottom-12 left-6 w-12 h-12 bg-purple-200/35 rounded-full blur-md animate-pulse delay-700"></div>
        
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-purple-50/20"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-2xl lg:max-w-full">
        <h1 className="text-center text-2xl sm:text-3xl leading-8 sm:leading-9 mb-8 sm:mb-12 lg:mb-10 text-indigo-600 lg:text-white font-bold lg:text-3xl">
          What Our Clients Say
        </h1>
        
        <div 
          className="relative select-none"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={swipeHandlers.handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main content with enhanced mobile design */}
          <div className="min-h-[480px] sm:min-h-[520px] lg:min-h-[380px] lg:max-w-4xl mx-auto">
            <figure className="h-full relative">
              {/* Mobile-only quote styling */}
              <div className="lg:hidden absolute -top-4 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              
              <blockquote className="text-center font-medium sm:font-semibold leading-7 sm:leading-8 lg:font-medium lg:text-white text-gray-800 pt-8 lg:pt-0 text-lg sm:text-xl lg:text-2xl lg:leading-9">
                {/* Mobile-only content wrapper with enhanced styling */}
                <div className="lg:hidden rounded-3xl p-6 sm:p-8 mx-2 sm:mx-4 shadow-sm border border-white/20 w-full">
                  <div className="h-[280px] sm:h-[320px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    <p className="transition-opacity duration-300 text-gray-700 leading-relaxed">
                      {testimonials[currentIndex].text}
                    </p>
                  </div>
                </div>
                
                {/* Desktop content (unchanged) */}
                <p className="hidden lg:block transition-opacity duration-300">
                  {testimonials[currentIndex].text}
                </p>
              </blockquote>
              
              <figcaption className="mt-6 sm:mt-8 flex-shrink-0">
                <div className="flex items-center justify-center space-x-3 text-base sm:text-lg lg:text-base px-4">
                  <div className="font-bold sm:font-semibold lg:font-semibold lg:text-white text-gray-800 transition-opacity duration-300 text-center truncate max-w-[140px] sm:max-w-[180px] lg:max-w-none">
                    {testimonials[currentIndex].author}
                  </div>
                  <svg width={3} height={3} viewBox="0 0 2 2" aria-hidden="true" className="fill-gray-600 lg:fill-white flex-shrink-0">
                    <circle r={1} cx={1} cy={1} />
                  </svg>
                  <div className="lg:text-white text-gray-600 transition-opacity duration-300 text-sm sm:text-base lg:text-base text-center truncate max-w-[140px] sm:max-w-[200px] lg:max-w-none">
                    {testimonials[currentIndex].position}
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>

          {/* Enhanced navigation arrows with mobile-specific styling */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 lg:bg-white/20 lg:hover:bg-white/30 disabled:opacity-50 rounded-full p-2 sm:p-3 lg:p-2 transition-all duration-200 active:scale-95 shadow-lg lg:shadow-none backdrop-blur-sm"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 lg:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 lg:bg-white/20 lg:hover:bg-white/30 disabled:opacity-50 rounded-full p-2 sm:p-3 lg:p-2 transition-all duration-200 active:scale-95 shadow-lg lg:shadow-none backdrop-blur-sm"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 lg:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Enhanced pagination dots with mobile-specific styling */}
          <div className="flex justify-center mt-8 sm:mt-10  space-x-2 sm:space-x-3 lg:space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 disabled:opacity-50 active:scale-110 ${
                  index === currentIndex 
                    ? 'bg-indigo-500 scale-110 sm:scale-125 lg:scale-110 lg:bg-gray-500 shadow-md lg:shadow-none' 
                    : 'bg-gray-300 hover:bg-gray-400 lg:bg-gray-100 lg:hover:bg-gray-50 hover:scale-105 shadow-sm lg:shadow-none'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Custom mobile animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
          50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.5); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 4s ease-in-out infinite;
        }
        
        @media (min-width: 1024px) {
          .animate-float,
          .animate-glow {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;