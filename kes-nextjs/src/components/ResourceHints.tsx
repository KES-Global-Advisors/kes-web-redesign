import Head from 'next/head'

interface ResourceHintsProps {
  preloadImages?: string[]
  prefetchPages?: string[]
}

export default function ResourceHints({ 
  preloadImages = [], 
  prefetchPages = [] 
}: ResourceHintsProps) {
  const defaultPreloadImages = [
    'https://i.postimg.cc/tTPMrGpV/KES-Banner-5.webp',
    '/assets/KES-Logo-print.png',
    'https://i.postimg.cc/qRJZNy36/About-Us-Banner.avif',
    '/assets/Globe.png'
  ]

  const defaultPrefetchPages = [
    '/services',
    '/about', 
    '/contact',
    '/insights'
  ]

  const imagesToPreload = [...defaultPreloadImages, ...preloadImages]
  const pagesToPrefetch = [...defaultPrefetchPages, ...prefetchPages]

  return (
    <Head>
      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//i.postimg.cc" />
      <link rel="dns-prefetch" href="//via.placeholder.com" />
      
      {/* Preconnect to critical domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      
      {/* Preload critical fonts */}
      <link 
        rel="preload" 
        href="/fonts/inter-var.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="" 
      />
      
      {/* Preload critical images */}
      {imagesToPreload.map((src, index) => (
        <link
          key={`preload-image-${index}`}
          rel="preload"
          href={src}
          as="image"
          // Add image format hints
          type={src.includes('.webp') ? 'image/webp' : 
                src.includes('.avif') ? 'image/avif' :
                src.includes('.png') ? 'image/png' : 'image/jpeg'}
        />
      ))}
      
      {/* Prefetch likely next pages */}
      {pagesToPrefetch.map((href, index) => (
        <link
          key={`prefetch-page-${index}`}
          rel="prefetch"
          href={href}
        />
      ))}
      
      {/* Critical CSS for font display */}
      <style>{`
        @font-face {
          font-family: 'Inter';
          font-display: swap;
          src: url('/fonts/inter-var.woff2') format('woff2');
        }
        
        /* Reduce layout shift for images */
        img {
          max-width: 100%;
          height: auto;
        }
        
        /* Optimize animation performance */
        .animate-spin,
        .animate-pulse,
        .animate-slide-up {
          will-change: transform;
        }
        
        /* Optimize scroll performance */
        * {
          scroll-behavior: smooth;
        }
        
        /* Reduce paint complexity */
        .rounded-full,
        .rounded-lg,
        .rounded-xl {
          contain: layout style;
        }
      `}</style>
      
      {/* Viewport optimization */}
      <meta 
        name="viewport" 
        content="width=device-width, initial-scale=1, viewport-fit=cover" 
      />
      
      {/* Performance hints */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      
      {/* PWA optimization */}
      <meta name="theme-color" content="#3786b5" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Preload critical CSS chunks */}
      <link rel="preload" href="/_next/static/css/app.css" as="style" />
      
      {/* Module preload for critical JavaScript */}
      <link rel="modulepreload" href="/_next/static/chunks/main.js" />
      <link rel="modulepreload" href="/_next/static/chunks/webpack.js" />
    </Head>
  )
}

// Utility function to dynamically add resource hints
export const addDynamicResourceHint = (
  rel: 'preload' | 'prefetch' | 'preconnect' | 'dns-prefetch',
  href: string,
  options: {
    as?: 'image' | 'script' | 'style' | 'font' | 'document'
    type?: string
    crossOrigin?: '' | 'anonymous' | 'use-credentials'
  } = {}
) => {
  if (typeof document === 'undefined') return

  // Check if hint already exists
  const existing = document.querySelector(`link[rel="${rel}"][href="${href}"]`)
  if (existing) return

  const link = document.createElement('link')
  link.rel = rel
  link.href = href
  
  if (options.as) link.setAttribute('as', options.as)
  if (options.type) link.setAttribute('type', options.type)
  if (options.crossOrigin !== undefined) link.crossOrigin = options.crossOrigin
  
  document.head.appendChild(link)
}