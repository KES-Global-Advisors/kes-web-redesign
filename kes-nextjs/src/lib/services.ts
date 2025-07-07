import { 
  ArchiveBoxIcon, 
  ArrowsRightLeftIcon, 
  ChartBarIcon, 
  CogIcon, 
  UserGroupIcon, 
  BoltIcon 
} from '@heroicons/react/24/outline'

export interface Service {
  slug: string
  name: string
  tagline: string
  shortDescription: string
  description: string[]
  imgSrc: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  subContent: {
    title: string
    description: string
  }[]
  keywords: string[]
  schema: {
    "@type": "Service"
    name: string
    description: string
    provider: {
      "@type": "Organization"
      name: "KES Global Advisors LLC"
    }
    serviceType: string
    areaServed: string
  }
}

export const services: Service[] = [
  {
    slug: 'employee-led-strategic-improvement',
    name: 'Employee-Led Strategic Improvement',
    tagline: 'Facilitating Real Ownership and Alignment',
    shortDescription: 'Creating real ownership and alignment can be messy, but it is essential for true employee engagement. KES Global Advisors embraces this process, helping employees design and deliver strategic improvement programs that create lasting change.',
    description: [
      "Creating real ownership and alignment can be messy, but it is essential for true employee engagement. KES Global Advisors embraces this process, helping employees design and deliver strategic improvement programs that create lasting change.",
      "From discreet site level programs to full corporate strategic improvement efforts, we create employee-led improvement programs that not only deliver results but become embedded as evergreen programs that keep employees engaged."
    ],
    imgSrc: "https://i.postimg.cc/1zrC6cYY/Employee-Led-Change.avif",
    icon: ChartBarIcon,
    subContent: [
      {
        title: 'Strategic Context Development',
        description: 'We help leadership teams establish and align on their strategic context (Vision, Mission, Goals, Values) to provide a framework for improvement efforts.'
      },
      {
        title: 'Flight Mapping',
        description: 'We support your teams as they create flight maps that help visualize the improvement journey, and make it easier to prioritize resource allocation and capture synergies between initiatives.'
      },
      {
        title: 'Coaching and Guidance',
        description: 'Our consultants provide valuable external insights, posing questions and observations that clarify the path forward and sharpen focus on challenges.'
      }
    ],
    keywords: ['employee engagement', 'strategic improvement', 'organizational alignment', 'employee-led change', 'strategic planning'],
    schema: {
      "@type": "Service",
      name: "Employee-Led Strategic Improvement",
      description: "Creating real ownership and alignment for true employee engagement through strategic improvement programs.",
      provider: {
        "@type": "Organization",
        name: "KES Global Advisors LLC"
      },
      serviceType: "Business Consulting",
      areaServed: "United States"
    }
  },
  {
    slug: 'organizational-change-alignment',
    name: 'Organizational Change & Alignment',
    tagline: 'Creating Sustainable Change',
    shortDescription: 'Leading change is complex, especially in industrial settings. We help clients design and lead effective change programs, providing guidance and support to ensure the full value of targeted programs is realized.',
    description: [
      "Leading change is complex, especially in industrial settings. We help clients design and lead effective change programs, providing guidance and support to ensure the full value of targeted programs is realized."
    ],
    imgSrc: "https://i.postimg.cc/ZKLxwKLC/Adobe-Stock-201803237.avif",
    icon: ArrowsRightLeftIcon,
    subContent: [
      {
        title: 'Change Program Leadership & Coaching',
        description: 'From idea inception to execution, we guide teams through the change process, engaging stakeholders and creating ownership for sustainable change.'
      },
      {
        title: 'Change Leader Training',
        description: 'We provide targeted training and coaching for change leaders, enhancing their effectiveness at all organizational levels.'
      },
      {
        title: 'Team & Individual Role Alignment',
        description: 'We facilitate role and responsibility realignment within organizations, from minor adjustments to significant restructuring, in support of organizational change programs.'
      }
    ],
    keywords: ['organizational change', 'change management', 'organizational alignment', 'change leadership', 'business transformation'],
    schema: {
      "@type": "Service",
      name: "Organizational Change & Alignment",
      description: "Leading effective change programs in industrial settings with guidance and support for sustainable transformation.",
      provider: {
        "@type": "Organization",
        name: "KES Global Advisors LLC"
      },
      serviceType: "Change Management Consulting",
      areaServed: "United States"
    }
  },
  {
    slug: 'executive-coaching-leadership-development',
    name: 'Executive Coaching & Leadership Development',
    tagline: 'Driving Leadership Effectiveness',
    shortDescription: 'Working with our clients, KES Global Advisors designs leadership development programs ranging from one-off training sessions to longer-term programs. Our approach integrates developmental activities with organizational improvement efforts to provide a practical learning environment that drives targeted changes to organizational performance.',
    description: [
      "Effective leadership is highly contextual and rarely follows hard and fast rules. While leadership styles and skills are typically honed over years or decades, development can be accelerated greatly through targeted, constructive feedback and guidance anchored by deep industry experience.",
      "Working with our clients, KES Global Advisors designs leadership development programs ranging from one-off training sessions to longer-term programs. Our approach integrates developmental activities with organizational improvement efforts to provide a practical learning environment that drives targeted changes to organizational performance."
    ],
    imgSrc: "https://i.postimg.cc/Y05fThsW/Exec-Coaching.avif",
    icon: UserGroupIcon,
    subContent: [
      {
        title: 'Leadership Team Alignment',
        description: 'We help leadership teams align on common values, philosophies, and practices, integrating them into the organizational culture.'
      },
      {
        title: 'Leadership Training',
        description: 'Our training programs can be custom-tailored to address specific needs, covering topics like Influence-Based Leadership, Targeted Behavior Change, and Empowering Ownership.'
      },
      {
        title: 'Application Based Coaching',
        description: 'We provide targeted coaching that guides the application of leadership values and techniques to drive performance while creating a positive employee experience.'
      }
    ],
    keywords: ['executive coaching', 'leadership development', 'leadership training', 'executive development', 'leadership skills'],
    schema: {
      "@type": "Service",
      name: "Executive Coaching & Leadership Development",
      description: "Custom leadership development programs integrating developmental activities with organizational improvement efforts.",
      provider: {
        "@type": "Organization",
        name: "KES Global Advisors LLC"
      },
      serviceType: "Executive Coaching",
      areaServed: "United States"
    }
  },
  {
    slug: 'experiential-knowledge-capture',
    name: 'Experiential Knowledge Capture',
    tagline: 'Turning Experience into Insight',
    shortDescription: 'We work with our clients to help them design and implement experiential knowledge capture programs that mitigate the impacts of the experience drain and help optimize operations by turning experience into actionable, real-time insights.',
    description: [
      "The loss of experienced employees is one of the most significant emerging challenges facing most companies in the energy and chemicals sectors. The ability to capture and harness this experiential knowledge before it leaves is not only a competitive advantage but is also foundational to continued safe and reliable operations.",
      "We work with our clients to help them design and implement experiential knowledge capture programs that mitigate the impacts of the experience drain and help optimize operations by turning experience into actionable, real-time insights."
    ],
    imgSrc: "https://i.postimg.cc/02SLjmxh/Exec-Coaching-2.avif",
    icon: ArchiveBoxIcon,
    subContent: [
      {
        title: 'Targeted Experience Capture',
        description: 'Our experts facilitate the extraction of contextual experiential knowledge, creating real-time guidance for future employees.'
      },
      {
        title: 'Experience Capture System Design & Development',
        description: 'We design structured methods for extracting, storing, and leveraging experiential knowledge, integrating with analytics and data visualization platforms for real-time guidance.'
      }
    ],
    keywords: ['knowledge capture', 'knowledge management', 'experience transfer', 'knowledge retention', 'organizational knowledge'],
    schema: {
      "@type": "Service",
      name: "Experiential Knowledge Capture",
      description: "Design and implement programs to capture and leverage experiential knowledge for operational optimization.",
      provider: {
        "@type": "Organization",
        name: "KES Global Advisors LLC"
      },
      serviceType: "Knowledge Management Consulting",
      areaServed: "United States"
    }
  },
  {
    slug: 'rapid-capability-development',
    name: 'Rapid Capability Development',
    tagline: 'Enhancing Plant Operator Capability',
    shortDescription: 'Blended learning that actively engages the employee can accelerate capability development, ensuring employees become truly competent in their roles. We design and develop programs that blend various training methods to deliver immediate business impact.',
    description: [
      "Blended learning that actively engages the employee can accelerate capability development, ensuring employees become truly competent in their roles in significantly less time. The combination of traditional training methods with engaging digital content can greatly enhance the overall learning experience.",
      "KES Global Advisors designs programs that blend various training methods to accelerate the development process and deliver immediate business impact."
    ],
    imgSrc: "https://i.postimg.cc/MK1FqSmS/Capability-Dev-1.avif",
    icon: BoltIcon,
    subContent: [
      {
        title: 'Accelerated Capability Development Programs',
        description: 'We can help you design and develop a program that is practical for your organization to deliver and sustain. We blend traditional competency development with active learning methods to significantly improve knowledge retention and competence.'
      },
      {
        title: 'Asset Specific Training Material Development',
        description: 'We create training materials tailored to the needs of your organization, from full turn-key development programs to client-assisted programs.'
      },
      {
        title: 'Targeted Technical Training',
        description: 'We offer a wide array of technical and functional training for operational and engineering personnel. Contact us for specific requests.'
      }
    ],
    keywords: ['capability development', 'training programs', 'employee development', 'technical training', 'competency development'],
    schema: {
      "@type": "Service",
      name: "Rapid Capability Development",
      description: "Blended learning programs that accelerate employee capability development for immediate business impact.",
      provider: {
        "@type": "Organization",
        name: "KES Global Advisors LLC"
      },
      serviceType: "Training and Development",
      areaServed: "United States"
    }
  },
  {
    slug: 'digital-operational-excellence',
    name: 'Digital Operational Excellence',
    tagline: 'Making Digital Transformation Practical',
    shortDescription: 'Digital transformation changes how people work, not just the technology they use. We help our clients design and implement programs that align with operational excellence improvement efforts to deliver sustainable results and create a natural adoption mechanism for targeted employees.',
    description: [
      "Digital transformation changes how people work, not just the technology they use. It is this change in working practices that creates value through efficiency or new capabilities.",
      "We help our clients design and implement digital transformation programs that align with operational excellence improvement efforts to deliver sustainable results and create a natural adoption mechanism for targeted employees."
    ],
    imgSrc: "https://i.postimg.cc/0jM0tpcv/digital-Operational-Excellence.avif",
    icon: CogIcon,
    subContent: [
      {
        title: 'Operational Digital Transformation',
        description: 'We work with our clients to define transformation maps anchored in observable, measurable changes in how employees work, and provide guidance and support throughout the transformation journey.'
      },
      {
        title: 'Targeted Adoption Program Support',
        description: 'We focus on changing employee behaviors to ensure the effective utilization of new technologies, enhancing operational capabilities and creating value.'
      }
    ],
    keywords: ['digital transformation', 'operational excellence', 'digital adoption', 'technology implementation', 'digital strategy'],
    schema: {
      "@type": "Service",
      name: "Digital Operational Excellence",
      description: "Digital transformation programs that align with operational excellence to deliver sustainable results and technology adoption.",
      provider: {
        "@type": "Organization",
        name: "KES Global Advisors LLC"
      },
      serviceType: "Digital Transformation Consulting",
      areaServed: "United States"
    }
  }
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug)
}

export function getAllServices(): Service[] {
  return services
}

export function getServiceSlugs(): string[] {
  return services.map(service => service.slug)
}