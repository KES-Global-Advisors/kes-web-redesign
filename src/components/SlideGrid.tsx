import {useRef, useEffect} from 'react';

const slides = [
  {
    id: 1,
    imgSrc: "https://i.postimg.cc/wTc3W9Y7/Employee-Led-Change.jpg",
    alt: "Process Suit",
    title: "Employee Led Strategic Improvement",
    tagline: "Real Ownership and Alignment",
    description: "Creating real ownership and alignment can be messy, but true engagement is crucial. At KES Global Advisors, we embrace this 'messiness' and believe that your employees already have the answers. We act as catalysts, helping employees design and deliver strategic improvement programs. Our programs, from discreet initiatives to full corporate strategies, deliver results and keep employees engaged.",
    link: "/",
  },
  {
    id: 2,
    imgSrc: "https://i.postimg.cc/tJGNPb6M/Adobe-Stock-201803237.jpg",
    alt: "Process Suit",
    title: "Organizational Change & Alignment",
    tagline: "Effective Change Management",
    description: "Business performance is driven by people, and often improving performance means changing how people work. It is this change process that challenges most organizations. Specifically, it’s the effective integration of functional change elements with the emotional aspects of the change that creates the challenge and ultimately dictates the success of a program.",
    link: "/",
  },
  {
    id: 3,
    imgSrc: "https://i.postimg.cc/9QHHMwzd/Exec-Coaching.jpg",
    alt: "Process Suit",
    title: "Executive Coaching & Leadership Development",
    tagline: "Driving Personal Effectiveness",
    description: "One of the biggest challenges facing senior leaders in continuing to improve their personal effectiveness as leaders and drive their own careers forward, is the ability to get constructive and, when needed, critical feedback. This is where executive coaching can help.",
    link: "/",
  },
  {
    id: 4,
    imgSrc: "https://i.postimg.cc/631D02YC/Exec-Coaching-2.jpg",
    alt: "Experiential Knowledge Capture",
    title: "Experiential Knowledge Capture",
    tagline: "Optimizing Plant Operations",
    description: "We work with our clients to help them design and implement experiential knowledge capture programs to not only mitigate the impacts of the experience drain but to help optimize plant operations delivering bottom line improvements.",
    link: "/",
  },
  {
    id: 5,
    imgSrc: "https://i.postimg.cc/FFGxzMRD/Capability-Dev-1.jpg",
    alt: "Rapid Capability Development",
    title: "Rapid Capability Development",
    tagline: "Accelerating Plant Operator Capability",
    description: "Blending various training methods (e.g., classroom, e-learning, structured self-paced learning, guided job shadowing, experiential development exercises), we help you significantly accelerate plant operator capability development delivering immediate business impact.",
    link: "/",
  },
  {
    id: 6,
    imgSrc: "https://i.postimg.cc/4dmhMqbj/digital-Operational-Excellence.jpg",
    alt: "Digital Operational Excellence",
    title: "Digital Operational Excellence",
    tagline: "Sustainable Digital Transformation",
    description: "We help design and implement digital transformation programs anchored to improvements that directly impact the users to ensure sustainable results.",
    link: "/",
  },
];

const SlideGrid = () => {
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
    <div ref={sectionRef} className="bg-[#f5f2f7] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">What We Do</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Transforming Leadership into Performance</p>
        </div>
      </div>
      <div className="pt-10 grid grid-cols-1 md:grid-cols-2 gap-10 mx-auto mt-16 lg:max-w-[90%]">
        {slides.map((slide) => (
          <div key={slide.id} className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden w-full">
            <div className="relative w-full md:w-1/2 h-64 md:h-auto">
              <img
                src={slide.imgSrc}
                alt={slide.alt}
                className="w-full h-full object-cover rounded-r-[48px]"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:w-1/2">
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
    </div>
  );
};

export default SlideGrid;
