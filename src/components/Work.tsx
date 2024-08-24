import { useState, useRef, useEffect } from 'react';
import { ArchiveBoxIcon, ArrowsRightLeftIcon, ChartBarIcon, CogIcon, UserGroupIcon, BoltIcon } from '@heroicons/react/24/outline'
import ServiceDrawer from './ServiceDrawer';
// import Globe from '../assets/Globe.png';

interface Service {
  tagline: string;
  name: string;
  imgSrc: string;
  description: Array<string> | string;
  shortDescription: string;
  subContentTitle1: string;
  subContentDescription1: string;
  subContentTitle2: string;
  subContentDescription2: string;
  subContentTitle3: string;
  subContentDescription3: string;

  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const services = [
  {
    imgSrc: "https://i.postimg.cc/1zrC6cYY/Employee-Led-Change.avif",
    tagline: 'Facilitating Real Ownership and Alignment',
    name: 'Employee-Led Strategic Improvement ',
    shortDescription:
      'Creating real ownership and alignment can be messy, but it is essential for true employee engagement. KES Global Advisors embraces this process, helping employees design and deliver strategic improvement programs that create lasting change.',
    description: [
       "Creating real ownership and alignment can be messy, but it is essential for true employee engagement. KES Global Advisors embraces this messiness, helping employees design and deliver strategic improvement programs that create lasting change.",
       "From discreet site level programs to full corporate strategic improvement efforts, we create employee-led improvement programs that not only deliver results but become embedded as evergreen programs that keep employees engaged."  
    ],
    subContentTitle1: 'Strategic Context Development',
    subContentDescription1: 'We help leadership teams establish and align on their strategic context (Vision, Mission, Goals, Values) to provide a framework for improvement efforts.',
    subContentTitle2: 'Flight Mapping ',
    subContentDescription2: 'We support your teams as they create flight maps that help visualize the improvement journey, and make it easier to prioritize resource allocation and capture synergies between initiatives.',
    subContentTitle3: 'Coaching and Guidance ',
    subContentDescription3: 'Our consultants provide valuable external insights, posing questions and observations that clarify the path forward and sharpen focus on challenges.',
    icon: ChartBarIcon,
  },
  {
    imgSrc: "https://i.postimg.cc/ZKLxwKLC/Adobe-Stock-201803237.avif",
    tagline: 'Creating Sustainable Change',
    name: 'Organizational Change & Alignment ',
    shortDescription:
      'Leading change is complex, especially in industrial settings. We help clients design and lead effective change programs, providing guidance and support to ensure the full value of targeted programs is realized.',
    description: [
      "Leading change is complex, especially in industrial settings. We help clients design and lead effective change programs, providing guidance and support to ensure the full value of targeted programs is realized.",
      "We work with clients to build a plan for effective change and then provide guidance and support every step of the way."
    ],
    subContentTitle1: 'Change Program Leadership & Coaching',
    subContentDescription1: 'From idea inception to execution, we guide teams through the change process, engaging stakeholders and creating ownership for sustainable change.',
    subContentTitle2: 'Change Leader Training',
    subContentDescription2: 'We provide targeted training and coaching for change leaders, enhancing their effectiveness at all organizational levels.',
    subContentTitle3: 'Team & Individual Role Alignment',
    subContentDescription3: 'We facilitate role and responsibility realignment within organizations, from minor adjustments to significant restructuring, in support of organizational change programs.',
    icon: ArrowsRightLeftIcon,
  },
  {
    imgSrc: "https://i.postimg.cc/Y05fThsW/Exec-Coaching.avif",
    tagline: 'Driving Leadership Effectiveness ',
    name: 'Executive Coaching & Leadership Development',
    shortDescription:
      'Effective leadership requires constructive feedback. We design leadership development programs that integrate developmental activities with organizational improvement efforts, providing practical learning environments that create real value.',
    description: [
      "Effective leadership is highly contextual and rarely follows hard and fast rules.  While leadership styles and skills are typically honed over years or decades, development can be accelerated greatly through targeted constructive feedback and guidance anchored by deep industry experience.",
      "Working with our clients, KES Global Advisors designs leadership development programs ranging from one-off training sessions to longer-term programs. Our approach integrates developmental activities with organizational improvement efforts to provide a practical learning environment that drives targeted changes to organizational performance."
    ],
    subContentTitle1: 'Leadership Team Alignment',
    subContentDescription1: 'We help leadership teams align on common values, philosophies, and practices, integrating them into the organizational culture.',
    subContentTitle2: 'Leadership Training',
    subContentDescription2: 'Our training programs can be custom-tailored to address specific needs, covering topics like Influence-Based Leadership, Targeted Behavior Change, and Empowering Ownership.',
    subContentTitle3: 'Application Based Coaching',
    subContentDescription3: 'We provide targeted, contextual coaching guiding the application leadership values and techniques to drive performance while creating a positive employee experience.   ',
    icon: UserGroupIcon,
  },
  {
    imgSrc: "https://i.postimg.cc/02SLjmxh/Exec-Coaching-2.avif",
    tagline: 'Turning Experience into Insight',
    name: 'Experiential Knowledge Capture ',
    shortDescription:
      'Capturing experiential knowledge before experienced employees leave is critical. Our method turns this knowledge into actionable insights that support real-time application, optimizing operations and delivering bottom-line improvements.',
    description: [
      "The loss of experienced employees is one of the most significant emerging challenges facing most companies in the energy and chemicals sectors.  The ability to capture and harness this experiential knowledge before it leaves is not only a competitive advantage, but, in many instances, foundational to continued safe, reliable operations.",
      "We work with our clients to help them design and implement experiential knowledge capture programs that mitigate the impacts of the experience drain and help optimize operations by turning experience into actionable, real-time insights."
    ],
    subContentTitle1: 'Targeted Experience Capture',
    subContentDescription1: 'Our experts facilitate the extraction of contextual experiential knowledge, creating real-time guidance for future employees.',
    subContentTitle2: 'Experience Capture System Design & Development',
    subContentDescription2: 'We design structured methods for extracting, storing, and leveraging experiential knowledge, integrating with analytics and data visualization platforms for real-time guidance.',
    subContentTitle3: '',
    subContentDescription3: '',
    icon: ArchiveBoxIcon,
  },
  {
    imgSrc: "https://i.postimg.cc/MK1FqSmS/Capability-Dev-1.avif",
    tagline: 'Enhancing Plant Operator Capability',
    name: 'Rapid Capability Development',
    shortDescription:
      'Active, blended learning accelerates capability development, ensuring employees become truly competent in their roles. We design and develop programs that blend various training methods to deliver immediate business impact.',
    description: [
      "Active, blended learning that actively engages the employee can accelerate capability development, ensuring employees become truly competent in their roles in significantly less time. The combination of traditional training methods with engaging digital content can greatly enhance the overall learning experience.",
      "KES Global Advisors designs programs that blend various training methods to accelerate the development process and deliver immediate business impact."
    ],
    subContentTitle1: 'Accelerated Capability Development Programs',
    subContentDescription1: 'We can help you design and develop a program that is practical for your organization to deliver and sustain. We blend traditional competency development with active learning methods to significantly improve knowledge retention and competence.',
    subContentTitle2: 'Asset Specific Training Material Development',
    subContentDescription2: 'We create training materials tailored to the needs of your organization, from full turn-key development programs to client-assisted programs.',
    subContentTitle3: 'Targeted Technical Training',
    subContentDescription3: 'We offer a wide array of technical and functional training for operational and engineering personnel. Contact us for specific requests.',
    icon: BoltIcon,
  },
  {
    imgSrc: "https://i.postimg.cc/0jM0tpcv/digital-Operational-Excellence.avif",
    tagline: 'Making Digital Transformation Practical',
    name: 'Digital Operational Excellence ',
    shortDescription:
      'Digital transformation changes how people work, not just the technology they use. We design and implement programs that align with operational excellence efforts and the unique challenges of production environments, ensuring sustainable results.',
    description: [
      "Digital transformation changes how people work, not just the technology they use. It is this change in working practices that creates value through efficiency or new capabilities.",
      "We help our clients design and implement digital transformation programs that align with operational excellence improvement efforts to deliver sustainable results and create a natural adoption mechanism for targeted employees."
    ],
    subContentTitle1: 'Operational Digital Transformation',
    subContentDescription1: 'We work with our clients to define transformation maps anchored in observable, measurable changes in how employees work, and provide guidance and support through-out the transformation journey.',
    subContentTitle2: 'Targeted Adoption Program Support',
    subContentDescription2: 'We focus on changing employee behaviors to ensure the effective utilization of new technologies, enhancing operational capabilities and creating value.',
    subContentTitle3: '',
    subContentDescription3: '',
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

  useEffect(() => {
    // Scroll to the section if the URL has the #services hash
    if (window.location.hash === '#services' && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleOpenDrawer = (service: Service) => {
    setSelectedService(service);
  };

  const handleCloseDrawer = () => {
    setSelectedService(null);
  };

  return (
    <>
      <div 
        id="services" 
        ref={sectionRef} 
        className="bg-[#f5f2f7] py-24 sm:py-32"
        // style={{
        //   backgroundImage: `url(${Globe})`,
        //   backgroundAttachment: 'fixed',
        //   backgroundPosition: 'center',
        //   backgroundRepeat: 'no-repeat',
        //   backgroundSize: '45%',
        //   backgroundBlendMode: 'overlay',
        //   backgroundColor: 'rgba(255, 255, 255, 0.8)',
        // }}
        >
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
              <div key={service.name} className="relative pl-16 flex flex-col justify-between">
                <div>
                  <dt className="mb-2 text-base font-semibold leading-7 text-gray-900">
                    {service.name}
                  </dt>
                  <dt className="text-gray-700 text-sm font-semibold italic">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <service.icon aria-hidden="true" className="h-6 w-6 text-white" />
                    </div>
                    {service.tagline}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600 flex-grow">
                    {service.shortDescription}
                  </dd>
                </div>
                <div className="mt-4">
                  <button onClick={() => handleOpenDrawer(service)} className="text-sm font-semibold leading-6 text-indigo-700">
                    Learn more <span aria-hidden="true">→</span>
                  </button>
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
    </>
  )
}

export default Work;
