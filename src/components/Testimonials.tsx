// import React, { useRef, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import { Navigation, Autoplay, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
// import SwiperCore from 'swiper';
// import '../styles.css';

// const testimonials = [
//   {
//     id: 1,
//     text: `
//           "Kevin has been a trusted advisor for me for over 15 years.
//           He and his teams have helped facilitate a number of employee strategic programs for me over the years and to date,
//           every one of those programs has not only delivered on the original goals but have been sustained over time.
//           Most recently Kevin and his team have helped Marathon implement a corporate wide,
//           employee led strategic improvement effort for refining that is truly owned by our employees and delivering real value to all aspects of our business."
//           `,
//     author: "Kevin Bogard",
//     position: "SVP Refining, Marathon Petroleum",
//   },
//   {
//     id: 2,
//     text: `
//           "I strongly recommend working with Kevin and his KES Global Advisors company.
//           My experience as a client working together with Kevin and his team has been unique.
//           The capacity and strategy of Kevin to fully let the client realize its goals is impressive.
//           Immediate results are there showing benefits for the companies as implementation takes place.
//           Best practices is the daily thinking."
//           `,
//     author: "Rubén Vásquez",
//     position: "Supervisor at Halliburton",
//   },
//   {
//     id: 3,
//     text: `
//           "KES is a trusted and valued partner for SPP.
//           Over the past 4 years, they have supported a fundamental change in how we develop and execute our site strategy.
//           Changing from a top down to bottoms up ownership of our strategic initiative has been a game changer.
//           This approach, guided by KES, fortified our strategic initiative by leveraging the knowledge, ideas, and energy of all employees, not just a select few leaders.
//           The resulting alignment and ownership we see across the site supports our continued growth and improvement."
//           `,
//     author: "Holly Jackson",
//     position: "GM, Marathon Petroleum",
//   },
//   {
//     id: 4,
//     text: `
//           "For several years, KES has consistently demonstrated an ability to facilitate discussion on strategy which led to successful results with vision,
//           strategy and tactics for SPP. KES possesses a unique talent to guide discussion to coalesce what are often complex problem statements and distill ideas into cultivated solutions."
//           `,
//     author: "Josh Mallonee",
//     position: "Product Control Manager, Marathon Petroleum",
//   },
//   {
//     id: 5,
//     text: `
//           "I have worked with KES professionals across multiple Marathon Petroleum sites and have been witness to the
//           individualized approach they take to understand each site's key strategic opportunities,
//           and focus the local teams on evaluating and overcoming hurdles to achieving their potential.
//           The ground-up methodology taken by KES ensures ownership of the vision, tactics and strategies
//           from the individual contributor to the GM, long after KES has completed their part of the engagement."
//           `,
//     author: "Bob Lawrence",
//     position: "Controller Refining, Marathon Petroleum ",
//   },
//   {
//     id: 6,
//     text: `
//           "I have had the opportunity to work with Kevin and his team at KES on two separate strategic visioning efforts over the last 6 years.
//           Kevin's ability to align leadership teams and the broader organization is exceptional. His strategic vision ensures that every level
//           of the site work cohesively toward shared goals, driving impactful long-term results. He excels at engaging employees throughout the organization,
//           empowering them to lead change initiatives effectively. It has been a pleasure working with his organization."
//           `,
//     author: "David Leaver",
//     position: " VP Refining, Marathon Petroleum",
//   },
//   {
//     id: 7,
//     text: `
//           "I have had the pleasure to work with KES Global Advisors over the last 18 months. I believe the biggest tool or change that Kevin has
//            brought to Salt Lake City is a positive move in our employees trusting our leadership and our leadership trusting in our employees.
//            In building trust throughout our facility, employees now feel comfortable to bring up new issues and or ideas for improvements without the fear of judgement.
//            This has significantly brought up the site's morale and desire to be a high performing culture."
//           `,
//     author: "Brock Carter",
//     position: "Strategy Program Lead, Marathon Petroleum",
//   },
// ];

// const Testimonials: React.FC = () => {
//   const swiperRef = useRef<SwiperCore | null>(null);
//   const sectionRef = useRef(null);

//   const isMobileDevice = () => {
//     return typeof window !== 'undefined' && window.innerWidth <= 768;
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('animate-slide-up');
//             observer.unobserve(entry.target);
//           }
//         });
//       },
//       {
//         threshold: 0.1,
//       }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, []);

//   const handleMouseEnter = () => {
//     if (swiperRef.current && swiperRef.current.autoplay) {
//       swiperRef.current.autoplay.stop();
//     }
//   };

//   const handleMouseLeave = () => {
//     if (swiperRef.current && swiperRef.current.autoplay) {
//       swiperRef.current.autoplay.start();
//     }
//   };

//   const handleTouchStart = () => {
//     if (swiperRef.current && swiperRef.current.autoplay) {
//       swiperRef.current.autoplay.stop();
//     }
//   };

//   const handleTouchEnd = () => {
//     if (swiperRef.current && swiperRef.current.autoplay) {
//       swiperRef.current.autoplay.start();
//     }
//   };

//   useEffect(() => {
//     // Scroll to the section if the URL has the #testimonials hash
//     if (window.location.hash === '#testimonials' && sectionRef.current) {
//       (sectionRef.current as HTMLElement).scrollIntoView({ behavior: 'smooth' });
//     }
//   }, []);

//   return (
//       <section id="testimonials" ref={sectionRef} className="relative overflow-hidden lg:bg-[rgb(55,134,181)] bg-white px-6 py-24 sm:py-32 lg:px-8 lg:h-[580px]">
//         <div className="mx-auto max-w-2xl lg:max-w-7xl">
//           <h1 className="text-center font-semibold leading-7 mb-10 text-indigo-600 lg:text-white lg:font-bold lg:text-3xl">What Our Clients Say</h1>
//           <Swiper
//             cssMode={true}
//             autoplay={!isMobileDevice() ? { delay: 9000, disableOnInteraction: false } : undefined}
//             navigation={true}
//             pagination={true}
//             mousewheel={true}
//             keyboard={true}
//             loop={true}
//             modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
//             className="mySwiper"
//             onSwiper={(swiper) => {
//               swiperRef.current = swiper;
//             }}
//           >
//             {testimonials.map((testimonial) => (
//               <SwiperSlide key={testimonial.id}>
//                 <figure
//                   className="lg:min-h-[320px] min-h-[520px] lg:max-w-6xl mx-auto"
//                   onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}
//                   onTouchStart={handleTouchStart}
//                   onTouchEnd={handleTouchEnd}
//                 >
//                   <blockquote className="text-center font-semibold leading-8 lg:font-medium lg:text-white text-gray-900 sm:text-2xl sm:leading-9 ">
//                     <p>{testimonial.text}</p>
//                   </blockquote>
//                   <figcaption className="mt-8">
//                     <div className="mt-4 flex items-center justify-center space-x-3 text-base">
//                       <div className="font-semibold lg:text-white text-gray-900">{testimonial.author}</div>
//                       <svg width={3} height={3} viewBox="0 0 2 2" aria-hidden="true" className="fill-gray-900">
//                         <circle r={1} cx={1} cy={1} />
//                       </svg>
//                       <div className="lg:text-white text-gray-600">{testimonial.position}</div>
//                     </div>
//                   </figcaption>
//                 </figure>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </section>
//   );
// };

// export default Testimonials;

import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Autoplay, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import SwiperCore from 'swiper';
import '../styles.css';

const testimonials = [
  {
    id: 1,
    text: `
          "Kevin has been a trusted advisor for me for over 15 years.
          He and his teams have helped facilitate a number of employee strategic programs for me over the years and to date,
          every one of those programs has not only delivered on the original goals but have been sustained over time.
          Most recently Kevin and his team have helped Marathon implement a corporate wide,
          employee led strategic improvement effort for refining that is truly owned by our employees and delivering real value to all aspects of our business."
          `,
    author: "Kevin Bogard",
    position: "SVP Refining, Marathon Petroleum",
  },
  {
    id: 2,
    text: `
          "I strongly recommend working with Kevin and his KES Global Advisors company.
          My experience as a client working together with Kevin and his team has been unique.
          The capacity and strategy of Kevin to fully let the client realize its goals is impressive.
          Immediate results are there showing benefits for the companies as implementation takes place.
          Best practices is the daily thinking."
          `,
    author: "Rubén Vásquez",
    position: "Supervisor at Halliburton",
  },
  {
    id: 3,
    text: `
          "KES is a trusted and valued partner for SPP.
          Over the past 4 years, they have supported a fundamental change in how we develop and execute our site strategy.
          Changing from a top down to bottoms up ownership of our strategic initiative has been a game changer.
          This approach, guided by KES, fortified our strategic initiative by leveraging the knowledge, ideas, and energy of all employees, not just a select few leaders.
          The resulting alignment and ownership we see across the site supports our continued growth and improvement."
          `,
    author: "Holly Jackson",
    position: "GM, Marathon Petroleum",
  },
  {
    id: 4,
    text: `
          "For several years, KES has consistently demonstrated an ability to facilitate discussion on strategy which led to successful results with vision,
          strategy and tactics for SPP. KES possesses a unique talent to guide discussion to coalesce what are often complex problem statements and distill ideas into cultivated solutions."
          `,
    author: "Josh Mallonee",
    position: "Product Control Manager, Marathon Petroleum",
  },
  {
    id: 5,
    text: `
          "I have worked with KES professionals across multiple Marathon Petroleum sites and have been witness to the
          individualized approach they take to understand each site's key strategic opportunities,
          and focus the local teams on evaluating and overcoming hurdles to achieving their potential.
          The ground-up methodology taken by KES ensures ownership of the vision, tactics and strategies
          from the individual contributor to the GM, long after KES has completed their part of the engagement."
          `,
    author: "Bob Lawrence",
    position: "Controller Refining, Marathon Petroleum ",
  },
  {
    id: 6,
    text: `
          "I have had the opportunity to work with Kevin and his team at KES on two separate strategic visioning efforts over the last 6 years.
          Kevin's ability to align leadership teams and the broader organization is exceptional. His strategic vision ensures that every level
          of the site work cohesively toward shared goals, driving impactful long-term results. He excels at engaging employees throughout the organization,
          empowering them to lead change initiatives effectively. It has been a pleasure working with his organization."
          `,
    author: "David Leaver",
    position: " VP Refining, Marathon Petroleum",
  },
  {
    id: 7,
    text: `
          "I have had the pleasure to work with KES Global Advisors over the last 18 months. I believe the biggest tool or change that Kevin has
           brought to Salt Lake City is a positive move in our employees trusting our leadership and our leadership trusting in our employees.
           In building trust throughout our facility, employees now feel comfortable to bring up new issues and or ideas for improvements without the fear of judgement.
           This has significantly brought up the site's morale and desire to be a high performing culture."
          `,
    author: "Brock Carter",
    position: "Strategy Program Lead, Marathon Petroleum",
  },
];

const Testimonials: React.FC = () => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const sectionRef = useRef(null);

  const isMobileDevice = () => {
    return typeof window !== 'undefined' && window.innerWidth <= 768;
  };

  const updateAutoplay = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      if (isMobileDevice()) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
    }
  };

  useEffect(() => {
    // Initial autoplay setup based on device width
    updateAutoplay();

    // Add event listener to handle screen resizing
    window.addEventListener('resize', updateAutoplay);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateAutoplay);
    };
  }, []);

  useEffect(() => {
    // Scroll to the section if the URL has the #testimonials hash
    if (window.location.hash === '#testimonials' && sectionRef.current) {
      (sectionRef.current as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="relative overflow-hidden lg:bg-[rgb(55,134,181)] bg-white px-6 py-24 sm:py-32 lg:px-8 lg:h-[580px]">
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <h1 className="text-center font-semibold leading-7 mb-10 text-indigo-600 lg:text-white lg:font-bold lg:text-3xl">What Our Clients Say</h1>
        <Swiper
          cssMode={true}
          autoplay={{ delay: 9000, disableOnInteraction: false }}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          loop={true}
          modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <figure
                className="lg:min-h-[320px] min-h-[520px] lg:max-w-6xl mx-auto"
                onMouseEnter={() => swiperRef.current?.autoplay.stop()}
                onMouseLeave={() => !isMobileDevice() && swiperRef.current?.autoplay.start()}
                onTouchStart={() => swiperRef.current?.autoplay.stop()}
                onTouchEnd={() => !isMobileDevice() && swiperRef.current?.autoplay.start()}
              >
                <blockquote className="text-center font-semibold leading-8 lg:font-medium lg:text-white text-gray-900 sm:text-2xl sm:leading-9">
                  <p>{testimonial.text}</p>
                </blockquote>
                <figcaption className="mt-8">
                  <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                    <div className="font-semibold lg:text-white text-gray-900">{testimonial.author}</div>
                    <svg width={3} height={3} viewBox="0 0 2 2" aria-hidden="true" className="fill-gray-900">
                      <circle r={1} cx={1} cy={1} />
                    </svg>
                    <div className="lg:text-white text-gray-600">{testimonial.position}</div>
                  </div>
                </figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
