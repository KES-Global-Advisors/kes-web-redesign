import { useEffect, useRef } from 'react';
import glass from '../assets/glass-office.jpg'

const About = () => {
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
        threshold: 0.1, // Adjust the threshold as needed
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

  return (
    <div
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 opacity-0"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
      
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-indigo-600">About Us</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Company</h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                We work with business leaders to help you get the most from your organizations. Together we engage the frontline to drive the bottom line.
              </p>
            </div>
          </div>
        </div>

        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            alt=""
            src={glass}
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
          />
        </div>

        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <p>
                We work with clients to help them improve the performance of their most valuable asset — their people. By engaging and empowering the workforce and better aligning how the organization works as a unified whole, we help to drive significant improvements in business performance. We approach every engagement as a partnership, with the end goal being to create and recognize significant and sustainable value.
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Our Mission</h2>
              <p className="mt-6">
                Our mission is simple — to ensure that we add value to our clients by creating sustainable improvements in business performance. This commitment to add value extends to every interaction from the very first meeting, before a contract is even discussed, to the last meeting closing out a project.
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Our Experience</h2>
              <p className="mt-6">
                With over 20 years of experience, we have worked with hundreds of executives from companies across industry in over 40 countries spanning 6 continents. We specialize in improving organizational performance in the process industry, with an emphasis on leadership team and workforce effectiveness, including the design, development, and implementation of operational excellence, digital transformation, and accelerated employee capability development programs. Our working experience ranges from large scale transformation programs with nationally owned oil companies; to targeted corporate programs with leading multinationals; to small scale focused engagements with a diverse range of clients. The breadth and depth of our experience allows us to quickly and effectively help our clients address their toughest challenges and capture their most significant opportunities.
              </p>
              {/* Mobile image after "Our Experience" */}
              <div className="lg:hidden mt-6">
                <img
                  alt="Mobile additional image"
                  src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                  className="w-full rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10"
                />
              </div>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Our Commitment</h2>
              <p className="mt-6">
                We are committed to helping leaders in industry transform their organizations to fuel the performance of their businesses, and in turn the growth of their careers. We have built our business on our passion for helping companies realize the full potential of their most valuable asset — their employees. Our decades of experience in international consulting have provided us with the privilege to work with exceptional leadership teams throughout the industry, helping them solve their toughest organizational challenges and capture their most significant operational opportunities. This experience and focus continues to fuel our passion and ground our aspirations. 
              </p>
              <p className="mt-6">
                At KES Global Advisors, we do not view ourselves as a service provider or an outside agency, but instead as a trusted advisor working collaboratively with our clients to improve the performance of their organizations. Simply put, we will never propose a solution that we do not firmly believe will address a client’s needs. We believe that focusing first on our clients and their needs will ultimately provide a business based on relationships sustained over decades.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
