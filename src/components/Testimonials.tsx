import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
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
          Immediate results are there showing benefits for the companies as implementation take place.
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
    position: "Controller Refining Division, Marathon Petroleum ",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="relative overflow-hidden lg:bg-blue-700 bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-6xl">
      <h2 className="text-center font-semibold leading-7 text-indigo-600 lg:hidden">Testimonials</h2>
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <figure className="mt-10 transition-opacity duration-500 ease-in-out lg:min-h-[400px] min-h-[520px]">
                <blockquote className="text-center font-semibold leading-8 lg:text-white text-gray-900 sm:text-2xl sm:leading-9">
                  <p>{testimonial.text}</p>
                </blockquote>
                <figcaption className="mt-10">
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
