// src/app/services/[slug]/page.tsx (SSG Implementation)
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { getServiceBySlug, getServiceSlugs } from '../../../lib/services'
import type { Service } from '@/lib/services'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all services at build time
export async function generateStaticParams() {
  const slugs = getServiceSlugs()
  
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  
  if (!service) {
    return {
      title: 'Service Not Found | KES Global Advisors',
    }
  }

  const title = `${service.name} | KES Global Advisors`
  const description = service.shortDescription.slice(0, 160)

  return {
    title,
    description,
    keywords: service.keywords.join(', '),
    openGraph: {
      title,
      description,
      images: [
        {
          url: service.imgSrc,
          width: 1200,
          height: 630,
          alt: service.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [service.imgSrc],
    },
  }
}

function ServiceJsonLd({ service }: { service: Service }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...service.schema,
        }),
      }}
    />
  )
}

export default async function ServicePage({ params }: ServicePageProps) {
  
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  return (
    <>
      <ServiceJsonLd service={service} />
      <div className="bg-white min-h-screen pt-20">
        {/* Back Navigation */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <Link 
            href="/services"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Services
          </Link>
        </div>

        {/* Hero Section */}
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
                {service.name}
              </h1>
              <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                <p className="text-lg leading-8 text-indigo-600 font-semibold">
                  {service.tagline}
                </p>
                <p className="mt-4 text-xl leading-8 text-gray-600">
                  {service.shortDescription}
                </p>
              </div>
              <Image
                src={service.imgSrc}
                alt={service.name}
                width={800}
                height={600}
                className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            {/* Service Icon and Description */}
            <div className="lg:flex lg:items-start lg:gap-x-8">
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-indigo-600">
                  <service.icon className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
              </div>
              <div className="mt-6 lg:mt-0 lg:flex-1">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Service Overview
                </h2>
                <div className="mt-6 space-y-6 text-lg leading-8 text-gray-600">
                  {service.description.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Service Features */}
            {service.subContent.length > 0 && (
              <div className="mt-16 sm:mt-20">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  How We Help
                </h2>
                <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {service.subContent.map((item, index) => (
                    item.title && (
                      <div key={index} className="relative">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                          <div className="text-lg font-semibold text-indigo-600">
                            {index + 1}
                          </div>
                        </div>
                        <h3 className="mt-4 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-base leading-7 text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-16 sm:mt-20">
              <div className="rounded-2xl bg-gray-50 px-6 py-16 sm:p-16">
                <div className="mx-auto max-w-xl text-center">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Ready to get started?
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-gray-600">
                    Contact us to learn how {service.name.toLowerCase()} can benefit your organization.
                  </p>
                  <div className="mt-8 flex items-center justify-center gap-x-6">
                    <Link
                      href="/contact"
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Contact Us
                    </Link>
                    <Link
                      href="/services"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      View All Services <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}