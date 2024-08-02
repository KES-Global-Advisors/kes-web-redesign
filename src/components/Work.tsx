import SlideGrid from './SlideGrid';

const posts = [
  {
    id: 1,
    title: 'Experiential Knowledge Capture',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
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
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
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
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
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
                <img alt="" src={post.author.imageUrl} className="h-10 w-10 rounded-full bg-gray-50" />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <a href={post.author.href}>
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </a>
                  </p>
                  <p className="text-gray-600">{post.author.role}</p>
                </div>
              </div>

            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Work;
