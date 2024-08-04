import SlideGrid from './SlideGrid';
// import Approach from './Approach';

const posts = [
  {
    id: 1,
    title: 'Experiential Knowledge Capture',
    href: '#',
    description:
      'We work with our clients to help them design and implement experiential knowledge capture programs to not only mitigate the impacts of the experience drain but to help optimize plant operations delivering bottom line improvements.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'Rapid Capability Development',
    href: '#',
    description:
      'Blending various training methods (e.g., classroom, e-learning, structured self-paced learning, guided job shadowing, experiential development exercises), we help you significantly accelerate plant operator capability development delivering immediate business impact.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    title: 'Digital Operational Excellence',
    href: '#',
    description:
      'We help design and implement digital transformation programs anchored to improvements that directly impact the users to ensure sustainable results.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
]

const Work = () => {
  return (
    <div className="bg-[#f5f2f7] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-10">
        {/* <Approach /> */}
        <p className="text-base font-semibold leading-7 text-indigo-600">
          Value in Every Engagement
        </p>
        <p className="text-3xl font-bold mt-6 leading-8 text-gray-900">
          Our Approach
        </p>
        <p className="mt-4 text- leading-8 text-gray-700">
          Recognizing that every client is different, we do not believe in one size fits all approaches.
          Instead, we take a very collaborative approach tailored to the needs and challenges unique to each client.
          Bringing with us decades of technical and organizational experience in the oil and gas and chemicals sectors,
          we facilitate employee led improvement programs, integrating practical guidance and support as needed to drive
          alignment and ensure the overall effectiveness of the resulting improvement efforts.
        </p>
        <p className="mt-4 text- leading-8 text-gray-700">
          Any program designed to bring about organizational change cannot be based on a static planned approach.
          Throughout every engagement, we are constantly evaluating the overall effectiveness of the program approach
          and making adjustments as needed to maximize value creation.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-10">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">What We Do</h2>
          <p className="text-lg font-bold mt-2 leading-8 text-gray-900">
            Transforming Leadership into Performance
          </p>
          <SlideGrid />
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
              {/* <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.datetime} className="text-gray-500">
                  {post.date}
                </time>
                <a
                  href={post.category.href}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {post.category.title}
                </a>
              </div> */}
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
              </div>
              
              <div className="relative mt-8 flex items-center gap-x-4">
                {/* <img alt="" src={post.author.imageUrl} className="h-10 w-10 rounded-full bg-gray-50" />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <a href={post.author.href}>
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </a>
                  </p>
                  <p className="text-gray-600">{post.author.role}</p>
                </div> */}
              <a
                href={post.href}
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

            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Work;
