import { useEffect, useRef } from 'react';
import { useContent } from '../hooks/useContent';

interface AboutProps {
  id: string;
}

const About: React.FC<AboutProps> = ({ id }) => {
  const { getContent, loading } = useContent();
  const sectionRef = useRef(null);

  useEffect(() => {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Scroll to the section if the URL has the #about hash
    if (window.location.hash === '#about' && sectionRef.current) {
      (sectionRef.current as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Loading state
  if (loading) {
    return (
      <div
        id={id}
        className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0"
      >
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-12 bg-gray-200 rounded mb-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id={id}
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0"
    > 
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-2xl font-bold leading-7 text-indigo-600">About Us</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {getContent('about_title')}
              </h1>
            </div>
          </div>
        </div>

        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden hidden lg:block">
          <img
            alt="Experience Capture by KES Global Advisors"
            src="https://i.postimg.cc/qRJZNy36/About-Us-Banner.avif"
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
          />
        </div>

        <div className="mt-[-35px] lg:mt-[-15px] lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <p>
                {getContent('about_description')}
              </p>

              <p>
                <br /> We approach every engagement as a partnership, with the end goal being to create and recognize significant and sustainable value.
              </p>

              <h2 className="mt-16 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Mission</h2>
              <p className="mt-6">
                {getContent('mission_text')}
              </p>
              
              <h2 className="mt-16 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Commitment</h2>
              <p className="mt-6">
                {getContent('commitment_text')}
              </p>
              <p className="mt-6">
                We believe that focusing on our clients and their needs creates a business based on relationships sustained over decades.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;