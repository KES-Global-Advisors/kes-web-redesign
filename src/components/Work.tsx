// import { useState, useRef, useEffect } from 'react';
// import { Element } from 'react-scroll';
// import { ArchiveBoxIcon, ArrowsRightLeftIcon, ChartBarIcon, CogIcon, UserGroupIcon, BoltIcon } from '@heroicons/react/24/outline'

// const services = [
//   {
//     tagline: 'Real Ownership and Alignment ',
//     name: 'Employee Led Strategic Improvement ',
//     description:
//       'Creating real ownership and alignment can be messy, but its essential for true employee engagement. KES Global Advisors embraces this process, helping employees design and deliver strategic improvement programs that create lasting change.',
//     icon: ChartBarIcon,
//   },
//   {
//     tagline: 'Effective Change Management ',
//     name: 'Organizational Change & Alignment ',
//     description:
//       'Leading change is complex, especially in industrial settings. We help clients build effective change plans, providing guidance and support to ensure the full value of targeted programs is realized.',
//     icon: ArrowsRightLeftIcon,
//   },
//   {
//     tagline: 'Driving Leadership Effectiveness ',
//     name: 'Leadership Coaching & Development ',
//     description:
//       'Effective leadership requires constructive feedback. We design leadership development programs that integrate developmental activities with organizational improvement efforts, providing practical learning environments that drive measurable value.',
//     icon: UserGroupIcon,
//   },
//   {
//     tagline: 'Optimizing Plant Operations ',
//     name: 'Experiential Knowledge Capture ',
//     description:
//       'Capturing experiential knowledge before experienced employees leave is critical. Our method turns this knowledge into actionable insights, optimizing operations and delivering bottom-line improvements.',
//     icon: ArchiveBoxIcon,
//   },
//   {
//     tagline: 'Accelerating Plant Operator Capability ',
//     name: 'Rapid Capability Development',
//     description:
//       'Active, blended learning accelerates capability development, ensuring employees become truly competent in their roles. We design and develop programs that blend various training methods to deliver immediate business impact.',
//     icon: BoltIcon,
//   },
//   {
//     tagline: 'Practical Digital Transformation ',
//     name: 'Digital Operational Excellence ',
//     description:
//       'Digital transformation changes how people work, not just the technology they use. We design and implement programs that align with operational excellence efforts and the unique challenges of production environments, ensuring sustainable results.',
//     icon: CogIcon,
//   },
// ]

// const Work = () => {
//   const [openModal, setOpenModal] = useState<string | null>(null);
//   const sectionRef = useRef(null);

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
//         threshold: 0.1, // Adjust the threshold as needed
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

//   const handleOpenModal = (name: string) => {
//     setOpenModal(name);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(null);
//   };

//   return (
//     <Element name="services">
//       <div ref={sectionRef} className="bg-[#f5f2f7] py-24 sm:py-32">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">
//           <div className="mx-auto max-w-2xl lg:text-center">
//             <h2 className="text-base font-semibold leading-7 text-indigo-600">What We Do</h2>
//             <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//               Transforming Leadership into Performance 
//             </p>
//           </div>
//           <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
//             <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
//               {services.map((service) => (
//                 <div key={service.name} className="relative pl-16">
//                   <div>
//                     <dt className="text-gray-700 text-sm font-semibold mb-2">
//                       {service.tagline}
//                     </dt>
//                     <dt className="text-base font-semibold leading-7 text-gray-900">
//                       <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
//                         <service.icon aria-hidden="true" className="h-6 w-6 text-white" />
//                       </div>
//                       {service.name}
//                     </dt>
//                     <dd className="mt-2 text-base leading-7 text-gray-600 min-h-[180px]">
//                       {service.description}
//                     </dd>
//                   </div>
//                   <div className="mt-4">
//                     <a href="#" onClick={() => handleOpenModal(service.name)} className="text-sm font-semibold leading-6 text-indigo-700">
//                       Learn more <span aria-hidden="true">→</span>
//                     </a>
//                   </div>

//                   {openModal === service.name && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                       <div className="bg-white p-8 rounded-lg shadow-lg">
//                         <h3 className="text-lg font-semibold mb-4">{service.name}</h3>
//                         <p className="mb-4">{service.description}</p>
//                         <button onClick={handleCloseModal} className="text-indigo-700 font-semibold">Close</button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </dl>
//           </div>
//         </div>
//       </div>
//     </Element>
//   )
// }

// export default Work;

import { useState, useRef, useEffect } from 'react';
import { ArchiveBoxIcon, ArrowsRightLeftIcon, ChartBarIcon, CogIcon, UserGroupIcon, BoltIcon } from '@heroicons/react/24/outline'
import { Element } from 'react-scroll';
import ServiceDrawer from './ServiceDrawer';

interface Service {
  tagline: string;
  name: string;
  imgSrc: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const services = [
  {
    imgSrc: "https://i.postimg.cc/wTc3W9Y7/Employee-Led-Change.jpg",
    tagline: 'Real Ownership and Alignment ',
    name: 'Employee Led Strategic Improvement ',
    description:
      'Creating real ownership and alignment can be messy, but its essential for true employee engagement. KES Global Advisors embraces this process, helping employees design and deliver strategic improvement programs that create lasting change.',
    icon: ChartBarIcon,
  },
  {
    imgSrc: "https://i.postimg.cc/tJGNPb6M/Adobe-Stock-201803237.jpg",
    tagline: 'Effective Change Management ',
    name: 'Organizational Change & Alignment ',
    description:
      'Leading change is complex, especially in industrial settings. We help clients build effective change plans, providing guidance and support to ensure the full value of targeted programs is realized.',
    icon: ArrowsRightLeftIcon,
  },
  {
    imgSrc: "https://i.postimg.cc/9QHHMwzd/Exec-Coaching.jpg",
    tagline: 'Driving Leadership Effectiveness ',
    name: 'Leadership Coaching & Development ',
    description:
      'Effective leadership requires constructive feedback. We design leadership development programs that integrate developmental activities with organizational improvement efforts, providing practical learning environments that drive measurable value.',
    icon: UserGroupIcon,
  },
  {
    imgSrc: "https://i.postimg.cc/631D02YC/Exec-Coaching-2.jpg",
    tagline: 'Optimizing Plant Operations ',
    name: 'Experiential Knowledge Capture ',
    description:
      'Capturing experiential knowledge before experienced employees leave is critical. Our method turns this knowledge into actionable insights, optimizing operations and delivering bottom-line improvements.',
    icon: ArchiveBoxIcon,
  },
  {
    imgSrc: "https://i.postimg.cc/FFGxzMRD/Capability-Dev-1.jpg",
    tagline: 'Accelerating Plant Operator Capability ',
    name: 'Rapid Capability Development',
    description:
      'Active, blended learning accelerates capability development, ensuring employees become truly competent in their roles. We design and develop programs that blend various training methods to deliver immediate business impact.',
    icon: BoltIcon,
  },
  {
    imgSrc: "https://i.postimg.cc/4dmhMqbj/digital-Operational-Excellence.jpg",
    tagline: 'Practical Digital Transformation ',
    name: 'Digital Operational Excellence ',
    description:
      'Digital transformation changes how people work, not just the technology they use. We design and implement programs that align with operational excellence efforts and the unique challenges of production environments, ensuring sustainable results.',
    icon: CogIcon,
  },
]


const Work = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

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
        threshold: 0.1,
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

  const handleOpenDrawer = (service: Service) => {
    setSelectedService(service);
  };

  const handleCloseDrawer = () => {
    setSelectedService(null);
  };

  return (
    <Element name="services">
      <div ref={sectionRef} className="bg-[#f5f2f7] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">What We Do</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Transforming Leadership into Performance 
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {services.map((service) => (
                <div key={service.name} className="relative pl-16">
                  <div>
                    <dt className="text-gray-700 text-sm font-semibold mb-2">
                      {service.tagline}
                    </dt>
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                        <service.icon aria-hidden="true" className="h-6 w-6 text-white" />
                      </div>
                      {service.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600 min-h-[180px]">
                      {service.description}
                    </dd>
                  </div>
                  <div className="mt-4">
                    <a onClick={() => handleOpenDrawer(service)} className="text-sm font-semibold leading-6 text-indigo-700 cursor-pointer">
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      
      <ServiceDrawer 
        isOpen={!!selectedService}
        onClose={handleCloseDrawer}
        service={selectedService}
      />
    </Element>
  )
}

export default Work;
