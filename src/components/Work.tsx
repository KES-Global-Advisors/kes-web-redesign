import { GlobeAltIcon, UserGroupIcon, UserPlusIcon, RocketLaunchIcon, ChartPieIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Organizational Alignment & Change',
    description: `
        Utilizing our extensive experience integrating and aligning businesses,
        business lines, and teams, we work with clients to build a plan for effective change.
        We then continue providing guidance every step of the way to align the organization and
        manage the associated organizational changes. Working together we help ensure that the full intended
        value of the targeted program is realized.`,
    icon: UserGroupIcon,
  },
  {
    name: 'Leadership Team Alignment',
    description: `
        The performance of any organization starts with the effectiveness of its leadership.
        We work with client leadership team(s) to ensure alignment in both the vision and strategy.
        This alignment in turn forms the foundation for improving organizational performance against strategic business goals.
        Working collaboratively with our clients, we engage leadership at every level to  maximize overall effectiveness.`,
    icon: ChartPieIcon,
  },
  {
    name: 'Digital Operational Excellence',
    description: `
        Leveraging decades of experience designing and implementing operational excellence programs,
        we are able to effectively help our clients align their digitalization programs to their operational excellence standards and guidelines. 
        Further, we work with clients to ensure that their overall digitalization strategy is not only designed to deliver both short- and long-term value,
        but to be practical and sustainable over time.`,
    icon: GlobeAltIcon,
  },
  {
    name: 'Rapid Capability Development',
    description: `
        Following our SPEED (Scalable, Practical, Experiential, Engaging, Developmental) capability development
        philosophy and blending various training methods, we work with clients to design programs that can significantly
        accelerate the capability development process to deliver immediate and lasting business impact.`,
    icon: RocketLaunchIcon,
  },
  {
    name: 'Executive Coaching & Development',
    description:`
        Leveraging our extensive global experience leading and transforming organizations, we work with individual
        clients as well as entire work teams to help guide their personal development.  Along the way, we provide perspective
        and targeted guidance to help drive performance and adapt to the inevitable changes that will occur.`,
    icon: UserPlusIcon,
  },
]

const Work = () => {
  return (
    <div className="bg-blue-200 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What We Do
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Transforming Leadership into Performance
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Work;