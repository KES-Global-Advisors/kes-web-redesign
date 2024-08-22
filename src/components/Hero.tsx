// import { useEffect, useRef } from 'react';
// import { Element } from 'react-scroll';

// const Hero = () => {
//   const sectionRef = useRef(null);
//   const heroRef = useRef<HTMLDivElement>(null);
  
//   useEffect(() => {
//     const heroElement = heroRef.current;
//     if (heroElement) {
//       heroElement.classList.add('animate-slide-up');
//     }
//   }, []);

//   useEffect(() => {
//     // Scroll to the section if the URL has the #home hash
//     if (window.location.hash === '#home' && sectionRef.current) {
//       (sectionRef.current as HTMLElement).scrollIntoView({ behavior: 'smooth' });
//     }
//   }, []);

//   return (
//     <Element name="home">
//       <div id="home" ref={heroRef} className="bg-white lg:min-h-[calc(100vh-56px)] min-h-[600px] lg:h-auto">
//         <div className="relative h-full">
//           <div className="mx-auto max-w-3xl lg:max-w-7xl">
//             <div className="relative pt-14 z-10 max-w-3xl w-full">
//               <svg
//                 viewBox="0 0 100 100"
//                 preserveAspectRatio="none"
//                 aria-hidden="true"
//                 className="absolute top-0 bottom-0 left-[225px] hidden lg:block h-full w-[30rem] translate-x-1/2 fill-white"
//               >
//                 <polygon points="0,0 90,0 50,100 0,100"></polygon>
//               </svg>
//               <div className="relative px-6 py-8 sm:py-40 sm:px-40 mt-20 lg:px-8 lg:py-56 lg:mt-0">
//                 <div className="mx-auto max-w-3xl text-center lg:text-left">
//                   <h1 className="mx-auto max-w-4xl font-display text-3xl md:text-5xl lg:text-7xl font-medium tracking-tight text-slate-900">
//                     <span className="relative">
//                       <span className="whitespace-nowrap">Unlocking Your</span><br/>
//                     </span> 
//                     <span className="relative whitespace-nowrap text-blue-600">
//                       <svg
//                         aria-hidden="true"
//                         viewBox="0 0 418 42"
//                         className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70"
//                         preserveAspectRatio="none"
//                       >
//                         <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
//                       </svg>
//                       <span className="relative">Organization`s Full</span>
//                     </span>
//                     <br/>Potential by engaging your Frontline to Drive the Bottom Line.
//                   </h1>
        
//                   <p className="mt-6 text-lg leading-8 text-gray-600 text-center lg:text-left">
//                     By engaging, aligning, and empowering your workforce, KES Global Advisors can help unlock your organization`s full potential to drive sustainable improvements for your business.
//                   </p>
//                   {/* <div className="mt-10 flex justify-center lg:justify-start">
//                     <Link to="testimonials" smooth={true} duration={500}>
//                       <button className="rounded-md bg-[rgb(55,134,181)] px-3.5 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
//                           <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
//                         </svg>
//                       </button>
//                     </Link>
//                   </div> */}
//                 </div>
//               </div>
//             </div>
//             <div className="absolute inset-y-0 right-0 hidden lg:block w-1/2 bg-gray-50">
//               <img
//                 alt="KES Global Advisors Banner"
//                 // https://i.postimg.cc/NFfWJPM8/KES-Banner-5.png
//                 src="https://i.postimg.cc/tTPMrGpV/KES-Banner-5.webp"
//                 className="object-cover h-full w-full"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </Element>
//   );
// };

// export default Hero;

import { useEffect, useRef } from 'react';
import { Element } from 'react-scroll';

const Hero = () => {
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

  return (
    <Element name="home">
      <div id="home" ref={heroRef} className="bg-white lg:min-h-[calc(100vh-56px)] min-h-[600px] lg:h-auto">
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
                      <span className="whitespace-nowrap">Unlocking Your</span><br/>
                    </span> 
                    <span className="relative  text-blue-600">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 418 42"
                        className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70"
                        preserveAspectRatio="none"
                      >
                        <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
                      </svg>
                      <span className="relative">Organization’s Full Potential</span>
                    </span>
                    {/* <br/> by engaging your Frontline to Drive the Bottom Line. */}
                  </h1>
        
                  <p className="mt-10 mb-11 text-xl lg:text-2xl leading-9 text-gray-600 text-center lg:text-left">
                    By engaging, aligning, and empowering your workforce, KES Global Advisors can help unlock your organization`s full potential to drive sustainable improvements for your business.
                  </p>
                  {/* <div className="mt-10 flex justify-center lg:justify-start">
                    <Link to="testimonials" smooth={true} duration={500}>
                      <button className="rounded-md bg-[rgb(55,134,181)] px-3.5 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                        </svg>
                      </button>
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 hidden lg:block w-1/2 bg-gray-50">
              <img
                alt="KES Global Advisors Banner"
                // https://i.postimg.cc/NFfWJPM8/KES-Banner-5.png
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
