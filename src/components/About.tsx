import { useEffect, useRef } from 'react';
import { Element } from 'react-scroll';
// import glass from '../assets/glass-office.jpg'
// https://i.postimg.cc/mgvKj4t6/Adobe-Stock-813074427.jpg
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
    <Element name="about">
      <div
        ref={sectionRef}
        className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 opacity-0"
      >
        {/* <div className="absolute inset-0 -z-10 overflow-hidden">
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
        </div> */}
        
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-indigo-600">About Us</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Company</h1>
                <p className="mt-6 text-xl leading-8 text-gray-700">
                  We work with business leaders to maximize organizational
                  potential by engaging the frontline to drive the bottom line.
                </p>
              </div>
            </div>
          </div>

          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <img
              alt=""
              src="https://i.postimg.cc/wTXgDQCf/Exp-Capture-3.jpg"
              className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            />
          </div>

          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <p>
                  Our team of experts, with decades of global experience in the oil, gas,
                  and chemicals sectors can help your teams drive performance improvement that enhance the safe,
                  reliable, profitable operation of your facilities.  We approach every engagement as a partnership,
                  with the end goal being to create and recognize significant and sustainable value.
                </p>

                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Our Mission</h2>
                <p className="mt-6">
                  Our mission is simple — to add value by creating sustainable improvements in business performance.
                  This commitment extends to every interaction, from the first meeting to the final project closeout.
                </p>
                {/* Mobile image after "Our Experience"
                <div className="lg:hidden mt-6">
                  <img
                    alt="Mobile additional image"
                    src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                    className="w-full rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10"
                  />
                </div> */}
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Our Commitment</h2>
                <p className="mt-6">
                  Our passion for helping companies realize their employees' full potential drives us.
                  Our role as a trusted advisor is core to who we are, working collaboratively to improve the performance of our clients organizations.
                </p>
                <p className="mt-6">
                  We believe that focusing on our clients and their needs creates a business based on relationships sustained over decades.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default About;
