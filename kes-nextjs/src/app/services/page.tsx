// src/app/services/page.tsx (SSG Implementation)
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllServices } from '@/lib/services'

// Enable static generation - services are relatively static
export async function generateStaticParams() {
  return []
}

export const metadata: Metadata = {
  title: 'Services | KES Global Advisors - Business Strategy & Corporate Advisory',
  description: 'Transforming Leadership into Performance through employee-led strategic improvement, organizational change, executive coaching, and digital operational excellence.',
  keywords: 'consulting services, business strategy, corporate advisory, leadership development, organizational change, digital transformation',
  openGraph: {
    title: 'Services | KES Global Advisors',
    description: 'Transforming Leadership into Performance through comprehensive consulting services.',
    url: 'https://www.kesglobaladvisors.com/services',
  },
}

export default async function ServicesPage() {
  
  // Get services data at build time (this is static)
  const services = getAllServices()
  
  console.log(`📊 SSG Services: ${services.length} services generated at build time`)

  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Our Services
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Transforming Leadership into Performance through comprehensive consulting services 
              designed to unlock your organization&apos;s full potential.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid - Statically rendered */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.slug}
              className="relative isolate flex flex-col gap-8 lg:flex-row"
            >
              <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                <Image
                  src={service.imgSrc}
                  alt={service.name}
                  fill
                  className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 256px"
                  loading={services.indexOf(service) < 2 ? 'eager' : 'lazy'} // Eager load first 2
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div>
                <div className="flex items-center gap-x-4 text-xs">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                    <service.icon className="h-4 w-4 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-gray-500 font-medium">{service.tagline}</span>
                </div>
                <div className="group relative max-w-xl">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href={`/services/${service.slug}`}>
                      <span className="absolute inset-0" />
                      {service.name}
                    </Link>
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">
                    {service.shortDescription}
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 sm:mt-20">
          <div className="rounded-2xl bg-gray-50 px-6 py-16 sm:p-16">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Need a custom solution?
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Every organization is unique. Let&apos;s discuss how we can tailor our services to meet your specific needs.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Contact Us Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}