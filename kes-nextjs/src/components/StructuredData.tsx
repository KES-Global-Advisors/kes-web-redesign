import { getAllServices } from '@/lib/services'

export function OrganizationSchema() {
  const services = getAllServices()
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KES Global Advisors LLC",
    url: "https://www.kesglobaladvisors.com",
    logo: "https://www.kesglobaladvisors.com/assets/KES-Logo-print.png",
    description: "KES Global Advisors, your trusted partner in maximizing organization's potential through business strategy and corporate advisory services.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-720-257-4053",
      contactType: "Customer Service",
      areaServed: "US",
      availableLanguage: ["English"]
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "3065 Daniels Road, #1280",
      addressLocality: "Winter Garden",
      addressRegion: "FL",
      postalCode: "34787",
      addressCountry: "US"
    },
    founder: {
      "@type": "Person",
      name: "Kevin Smith",
      jobTitle: "CEO & Founder"
    },
    foundingDate: "2018",
    sameAs: [
      "https://www.linkedin.com/company/kes-global-advisors"
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Business Consulting Services",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.shortDescription,
          url: `https://www.kesglobaladvisors.com/services/${service.slug}`
        },
        position: index + 1
      }))
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      ratingCount: "7",
      bestRating: "5",
      worstRating: "1"
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Kevin Bogard"
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5"
        },
        reviewBody: "Kevin has been a trusted advisor for me for over 15 years. He and his teams have helped facilitate a number of employee strategic programs for me over the years and to date, every one of those programs has not only delivered on the original goals but have been sustained over time."
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "KES Global Advisors LLC",
    url: "https://www.kesglobaladvisors.com",
    description: "Business Strategy and Corporate Advisory Services",
    publisher: {
      "@type": "Organization",
      name: "KES Global Advisors LLC"
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.kesglobaladvisors.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}