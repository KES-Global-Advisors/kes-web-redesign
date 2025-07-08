'use client'

import { useEffect, useRef } from 'react';
import Image from 'next/image'
import { useContent } from '../../hooks/useContent';

interface AboutProps {
  id: string;
}

const AboutPage: React.FC<AboutProps> = ({ id }) => {
  const { getContent, loading } = useContent();
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

  // Loading state
  if (loading) {
    return (
      <div id={id} className="bg-white min-h-screen pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
          {/* Header Loading */}
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded mb-4 max-w-md mx-auto"></div>
              <div className="h-16 bg-gray-200 rounded mb-6 max-w-2xl mx-auto"></div>
            </div>
          </div>
          
          {/* Content Loading */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="animate-pulse space-y-6">
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="animate-pulse">
              <div className="bg-gray-200 h-80 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id={id} ref={sectionRef} className="bg-white min-h-screen pt-20">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <p className="text-base font-semibold text-indigo-600 mb-4">About Us</p>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl mb-6">
            {getContent('about_title', 'Transforming Organizations Through Strategic Excellence')}
          </h1>
        </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <div className="prose prose-lg prose-gray max-w-none">
              <p className="text-xl leading-8 text-gray-600 mb-8">
                {getContent('about_description', 'Our team of experts, with decades of global experience in the oil, gas, and chemicals sectors, can help your teams drive performance improvement.')}
              </p>
              
              <p className="text-lg leading-8 text-gray-600">
                We approach every engagement as a partnership, with the end goal being to create and recognize significant and sustainable value.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <Image
                alt="Experience Capture by KES Global Advisors"
                src="https://i.postimg.cc/qRJZNy36/About-Us-Banner.avif"
                width={600}
                height={400}
                className="w-full rounded-2xl shadow-2xl object-cover"
                priority
              />
              {/* Decorative element */}
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>

        {/* Mission & Commitment Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Mission Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 shadow-sm border border-indigo-100">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-600 text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h2 className="ml-4 text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-7">
              {getContent('mission_text', 'To empower organizations by unlocking the full potential of their workforce through strategic alignment, employee engagement, and sustainable performance improvement initiatives.')}
            </p>
          </div>

          {/* Commitment Card */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-sm border border-purple-100">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-purple-600 text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
              <h2 className="ml-4 text-2xl font-bold text-gray-900">Our Commitment</h2>
            </div>
            <p className="text-gray-700 leading-7 mb-4">
              {getContent('commitment_text', 'We are committed to delivering exceptional results through collaborative partnerships, innovative strategies, and a deep understanding of your unique organizational challenges.')}
            </p>
            <p className="text-gray-700 leading-7">
              We believe that focusing on our clients and their needs creates a business based on relationships sustained over decades.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape how we partner with our clients to achieve lasting success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Partnership */}
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-600 text-white mx-auto mb-4">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Partnership</h3>
              <p className="text-gray-600">
                We work alongside you as true partners, not just consultants, ensuring shared ownership of outcomes.
              </p>
            </div>

            {/* Excellence */}
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-600 text-white mx-auto mb-4">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                We maintain the highest standards in everything we deliver, from strategy to execution.
              </p>
            </div>

            {/* Sustainability */}
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-600 text-white mx-auto mb-4">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainability</h3>
              <p className="text-gray-600">
                Our solutions are designed for long-term success, creating lasting value that endures.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl px-8 py-12 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to unlock your organization&apos;s potential?
            </h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
              Let&apos;s discuss how our partnership approach can help drive sustainable improvements for your business.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-indigo-600 shadow-sm hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors duration-200"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;