

import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const slides = [
  {
    id: 1,
    imgSrc: "https://cdn.prod.website-files.com/6331e9344ba23e6359005fcf/636a8028e95bb8641d5aeb5b_process-suite-image.jpg",
    alt: "Process Suit",
    title: "Employee Led Strategic Improvement",
    tagline: "Real Ownership and Alignment",
    description: "Creating real ownership and alignment can be messy, but true engagement is crucial. At KES Global Advisors, we embrace this 'messiness' and believe that your employees already have the answers. We act as catalysts, helping employees design and deliver strategic improvement programs. Our programs, from discreet initiatives to full corporate strategies, deliver results and keep employees engaged.",
    link: "/",
  },
  {
    id: 2,
    imgSrc: "https://cdn.prod.website-files.com/6331e9344ba23e6359005fcf/636a805be95bb8ecbe5aeea8_asset-suite-image.jpg",
    alt: "Process Suit",
    title: "Organizational Change & Alignment",
    tagline: "Effective Change Management",
    description: "Business performance is driven by people, and often improving performance means changing how people work. It is this change process that challenges most organizations. Specifically, it’s the effective integration of functional change elements with the emotional aspects of the change that creates the challenge and ultimately dictates the success of a program.",
    link: "/",
  },
  {
    id: 3,
    imgSrc: "https://cdn.prod.website-files.com/6331e9344ba23e6359005fcf/636a805be95bb8ecbe5aeea8_asset-suite-image.jpg",
    alt: "Process Suit",
    title: "Executive Coaching & Leadership Development",
    tagline: "Effective Change Management",
    description: "One of the biggest challenges facing senior leaders in continuing to improve their personal effectiveness as leaders and drive their own careers forward, is the ability to get constructive and, when needed, critical feedback.  This is where executive coaching can help.",
    link: "/",
  },
];

const SlideGrid = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative lg:w-[60rem] p-6 bg-transparent">
      <div className="overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`grid grid-cols-1 md:grid-cols-2 gap-10 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ display: index === currentSlide ? 'grid' : 'none' }}
          >
            <div className="relative w-full h-64 md:h-auto">
              <img
                src={slide.imgSrc}
                alt={slide.alt}
                className="w-full h-full object-cover rounded-r-[48px]"
              />
            </div>
            <div className="flex flex-col justify-center p-4">
              <div className="mb-4">
                <div className="flex space-x-2">
                  <div className="w-8 h-1 bg-yellow-500"></div>
                  <div className="w-8 h-1 bg-blue-500"></div>
                  <div className="w-8 h-1 bg-purple-500"></div>
                  <div className="w-8 h-1 bg-pink-500"></div>
                </div>
              </div>
              <div className="text-gray-700 text-xl font-semibold mb-2">
                {slide.tagline}
              </div>
              <div className="text-gray-900 text-2xl font-bold mb-4">
                {slide.title}
              </div>
              <div className="text-gray-600 text-lg mb-6">
                {slide.description}
              </div>
              <a
                href={slide.link}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-lg font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Learn More
                <svg
                  className="ml-2 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 13 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 6.13498C0 5.93607 0.0790178 5.7453 0.21967 5.60465C0.360322 5.464 0.551088 5.38498 0.75 5.38498H9.4395L6.219 2.16598C6.07817 2.02515 5.99905 1.83414 5.99905 1.63498C5.99905 1.43582 6.07817 1.24481 6.219 1.10398C6.35983 0.963151 6.55084 0.884033 6.75 0.884033C6.94916 0.884033 7.14017 0.963151 7.281 1.10398L11.781 5.60398C11.8508 5.67365 11.9063 5.75641 11.9441 5.84753C11.9819 5.93865 12.0013 6.03633 12.0013 6.13498C12.0013 6.23363 11.9819 6.33131 11.9441 6.42243C11.9063 6.51355 11.8508 6.59631 11.781 6.66598L7.281 11.166C7.14017 11.3068 6.94916 11.3859 6.75 11.3859C6.55084 11.3859 6.35983 11.3068 6.219 11.166C6.07817 11.0252 5.99905 10.8341 5.99905 10.635C5.99905 10.4358 6.07817 10.2448 6.219 10.104L9.4395 6.88498H0.75C0.551088 6.88498 0.360322 6.80596 0.21967 6.66531C0.0790178 6.52466 0 6.33389 0 6.13498Z"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 lg:mt-[-200px]">
        <button
            className="bg-gray-200 p-2 rounded-full hover:text-blue-600"
            onClick={prevSlide}
        >
            <FaArrowLeft />
        </button>
        <button
            className=" bg-gray-200 p-2 rounded-full hover:text-blue-600"
            onClick={nextSlide}
        >
            <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default SlideGrid;
