import { useEffect, useRef } from 'react';
import { Element } from 'react-scroll';
import { useContent } from '../hooks/useContent';

const Hero = () => {
  const { getContent, loading } = useContent();
  const sectionRef = useRef(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.classList.add('animate-slide-up');
    }
  }, []);

  useEffect(() => {
    // Scroll to the section if the URL has the #home hash
    if (window.location.hash === '#home' && sectionRef.current) {
      (sectionRef.current as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Show loading skeleton while content is being fetched
  if (loading) {
    return (
      <Element name="home">
        <div id="home" className="bg-white min-h-screen lg:h-auto lg:min-h-[100%]">
          <div className="relative h-full">
            <div className="mx-auto max-w-3xl lg:max-w-7xl">
              <div className="relative pt-14 z-10 max-w-3xl w-full">
                <div className="relative px-6 py-8 sm:py-40 sm:px-40 mt-20 lg:px-8 lg:py-56 lg:mt-0">
                  <div className="mx-auto max-w-3xl text-center lg:text-left">
                    {/* Loading skeleton */}
                    <div className="animate-pulse">
                      <div className="h-20 bg-gray-200 rounded mb-6"></div>
                      <div className="h-6 bg-gray-200 rounded mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 hidden lg:block w-1/2 bg-gray-50">
                <img
                  alt="KES Global Advisors Banner"
                  src="https://i.postimg.cc/tTPMrGpV/KES-Banner-5.webp"
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </Element>
    );
  }

  // Extract title parts for the animated underline effect
  const heroTitle = getContent('hero_title');
  const heroSubtitle = getContent('hero_subtitle');
  
  // Split title to apply styling to "Organization's Full Potential"
  const titleParts = heroTitle.split('Organization\'s Full Potential');
  const firstPart = titleParts[0] || 'Unlocking Your';
  const highlightedPart = 'Organization\'s Full Potential';

  return (
    <Element name="home">
      <div id="home" ref={heroRef} className="bg-white min-h-screen lg:h-auto lg:min-h-[100%]">
        <div className="relative h-full">
          <div className="mx-auto max-w-3xl lg:max-w-7xl">
            <div className="relative pt-14 z-10 max-w-3xl w-full">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute top-0 bottom-0 left-[225px] hidden lg:block h-full w-[30rem] translate-x-1/2 fill-white"
              >
                <polygon points="0,0 90,0 50,100 0,100"></polygon>
              </svg>
              <div className="relative px-6 py-8 sm:py-40 sm:px-40 mt-20 lg:px-8 lg:py-56 lg:mt-0">
                <div className="mx-auto max-w-3xl text-center lg:text-left">
                  <h1 className="mx-auto max-w-4xl font-display text-5xl md:text-6xl lg:text-8xl font-medium tracking-tight text-slate-900">
                    <span className="relative">
                      <span className="whitespace-nowrap">{firstPart}</span><br/>
                    </span> 
                    <span className="relative text-blue-600">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 418 42"
                        className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70"
                        preserveAspectRatio="none"
                      >
                        <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
                      </svg>
                      <span className="relative">{highlightedPart}</span>
                    </span>
                  </h1>
                  <p className="mt-10 mb-11 text-xl text-balance lg:text-2xl leading-9 text-gray-600 text-center lg:text-left">
                    {heroSubtitle}
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 hidden lg:block w-1/2 bg-gray-50">
              <img
                alt="KES Global Advisors Banner"
                src="https://i.postimg.cc/tTPMrGpV/KES-Banner-5.webp"
                className="object-cover h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default Hero;