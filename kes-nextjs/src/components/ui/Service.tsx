'use client'

import { useEffect, useRef } from 'react';
import Link from 'next/link'
import { useContent } from '@/hooks/useContent';
import { getAllServices } from '@/lib/services'

interface ServiceProps {
  id: string;
}

const Service: React.FC<ServiceProps> = ({ id }) => {
  const { getContent, loading } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const services = getAllServices()

  useEffect(() => {
    const currentRef = sectionRef.current 

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
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, []);

  useEffect(() => {
    // Scroll to the section if the URL has the #services hash
    if (window.location.hash === '#services' && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Loading state
  if (loading) {
    return (
      <div 
        id={id}
        className="bg-[#f5f2f7] py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      id={id}
      ref={sectionRef} 
      className="bg-[#f5f2f7] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-2xl font-bold leading-7 text-indigo-600">What We Do</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {getContent('services_title', 'Transforming Leadership into Performance')}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {services.map((service) => (
              <div key={service.name} className="relative pl-16 flex flex-col justify-between">
                <div>
                  <dt className="mb-2 text-base font-semibold leading-7 text-gray-900">
                    {service.name}
                  </dt>
                  <dt className="text-gray-700 text-sm font-semibold italic">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <service.icon aria-hidden="true" className="h-6 w-6 text-white" />
                    </div>
                    {service.tagline}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600 flex-grow">
                    {service.shortDescription}
                  </dd>
                </div>
                <div className="mt-4">
                  <Link 
                    href={`/services/${service.slug}`}
                    className="text-sm font-semibold leading-6 text-indigo-700"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Service;