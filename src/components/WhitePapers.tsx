// const Testimonials = () => {
//   return (
//     <section className="relative overflow-hidden lg:bg-black bg-white px-6 py-24 sm:py-32 lg:px-8">
//       <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
//       <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
//       <div className="mx-auto max-w-2xl lg:max-w-4xl">
//         <img alt="" src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg" className="mx-auto h-12" />
//         <figure className="mt-10">
//           <blockquote className="text-center text-xl font-semibold leading-8 lg:text-white text-gray-900 sm:text-2xl sm:leading-9">
//             <p>
//               “Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias
//               molestiae. Numquam corrupti in laborum sed rerum et corporis.”
//             </p>
//           </blockquote>
//           <figcaption className="mt-10">
//             <img
//               alt=""
//               src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//               className="mx-auto h-10 w-10 rounded-full"
//             />
//             <div className="mt-4 flex items-center justify-center space-x-3 text-base">
//               <div className="font-semibold lg:text-white text-gray-900">Judith Black</div>
//               <svg width={3} height={3} viewBox="0 0 2 2" aria-hidden="true" className="fill-gray-900">
//                 <circle r={1} cx={1} cy={1} />
//               </svg>
//               <div className="lg:text-white text-gray-600">CEO of Workcation</div>
//             </div>
//           </figcaption>
//         </figure>
//       </div>
//     </section>
//   )
// }

// export default Testimonials;

import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  position: string;
  imageUrl: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.",
    author: "Judith Black",
    position: "CEO of Workcation",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    author: "John Doe",
    position: "CTO of Example Co.",
    imageUrl: "https://images.unsplash.com/photo-1503264111161-8cda51c5f93a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // Add more testimonials as needed
];

const WhitePapers: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative overflow-hidden lg:bg-blue-700 bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <img alt="" src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg" className="mx-auto h-12" />
        <figure className="mt-10 transition-opacity duration-500 ease-in-out">
          <blockquote className="text-center text-xl font-semibold leading-8 lg:text-white text-gray-900 sm:text-2xl sm:leading-9">
            <p>{currentTestimonial?.text}</p>
          </blockquote>
          <figcaption className="mt-10">
            <img
              alt={currentTestimonial?.author}
              src={currentTestimonial?.imageUrl}
              className="mx-auto h-10 w-10 rounded-full"
            />
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold lg:text-white text-gray-900">{currentTestimonial?.author}</div>
              <svg width={3} height={3} viewBox="0 0 2 2" aria-hidden="true" className="fill-gray-900">
                <circle r={1} cx={1} cy={1} />
              </svg>
              <div className="lg:text-white text-gray-600">{currentTestimonial?.position}</div>
            </div>
          </figcaption>
        </figure>
        <div className="flex justify-between mt-4">
          <button onClick={handlePrev} className="bg-gray-200 rounded-full p-2 hover:bg-gray-300">
            <FaArrowLeft />
          </button>
          <button onClick={handleNext} className="bg-gray-200 rounded-full p-2 hover:bg-gray-300">
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhitePapers;
