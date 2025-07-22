import { Metadata } from 'next'
import { SupabaseProvider } from '@/components/admin/SupabaseContext'
import ReactQueryProvider from '@/components/providers/ReactQueryProvider'
import CookiesProviderWrapper from '@/components/CookiesProviderWrapper'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import CookieConsent from '@/components/ui/CookieConsent'
import GoogleAnalytics from '@/components/ui/GoogleAnalytics'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { OrganizationSchema, WebsiteSchema } from '@/components/StructuredData'
import { WebVitals } from '@/components/WebVitals'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kesglobaladvisors.com'),
  title: {
    default: 'KES Global Advisors LLC | Business Strategy and Corporate Advisory',
    template: '%s | KES Global Advisors'
  },
  description: 'KES Global Advisors, your trusted partner in maximizing organization\'s potential. Contact us today for consulting, business strategy, and corporate advisory services.',
  keywords: 'consulting, business strategy, corporate advisory, Oil and Gas Consulting, Petrochemical Consulting, Business Improvement Consulting, Leadership Coaching, Strategy Development, Employee-led strategy development, Employee Development, Refining training',
  authors: [{ name: 'KES Global Advisors' }],
  creator: 'KES Global Advisors',
  publisher: 'KES Global Advisors',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: 'index, follow',
  openGraph: {
    title: 'KES Global Advisors LLC | Business Strategy and Corporate Advisory',
    description: 'KES Global Advisors, your trusted partner in maximizing organization\'s potential',
    url: 'https://www.kesglobaladvisors.com',
    siteName: 'KES Global Advisors',
    images: [
      {
        url: '/assets/KES-Logo-print.png',
        width: 1200,
        height: 630,
        alt: 'KES Global Advisors Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KES Global Advisors LLC',
    description: 'Your trusted partner in maximizing organization\'s potential',
    images: ['/assets/KES-Logo-print.png'],
  },
  verification: {
    google: '3t5BqJFt5zKeYCJNOhlT7nRSbcBj3mciaTeofCewaaU',
  },
  alternates: {
    canonical: 'https://www.kesglobaladvisors.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="font-sans">
      <head>
        <OrganizationSchema />
        <WebsiteSchema />
        
        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for performance - Prevent CLS */
            body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
            .hero-container { min-height: 100vh; }
            .header-fixed { position: fixed; top: 0; width: 100%; z-index: 50; background: white; }
            .hero-image-container { width: 50%; height: 600px; background: #f9fafb; }
            .loading-skeleton { background: #e5e7eb; border-radius: 4px; }
            .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
            @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
            
            /* Preload critical fonts */
            @font-face {
              font-family: 'Inter';
              font-display: swap;
              src: url('/fonts/inter-var.woff2') format('woff2');
              font-weight: 100 900;
            }
          `
        }} />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://i.postimg.cc" />
        
        {/* Preload critical resources */}
        <link 
          rel="preload" 
          href="https://i.postimg.cc/tTPMrGpV/KES-Banner-5.webp" 
          as="image" 
          type="image/webp"
        />
        <link 
          rel="preload" 
          href="/assets/KES-Logo-print.png" 
          as="image" 
          type="image/png"
        />
        
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Performance optimizations */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        
        {/* Viewport optimization */}
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1, viewport-fit=cover" 
        />
        
        {/* PWA optimization */}
        <meta name="theme-color" content="#3786b5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <CookiesProviderWrapper>
          <ReactQueryProvider>
            <SupabaseProvider>
              <ErrorBoundary>
                {/* Removed ContentProvider and InsightsProvider - now using React Query */}
                <CookieConsent />
                <GoogleAnalytics />
                <WebVitals />
                <Header />
                <main>{children}</main>
                <Footer />
                <Toaster position="bottom-right" />
              </ErrorBoundary>
            </SupabaseProvider>
          </ReactQueryProvider>
        </CookiesProviderWrapper>
      </body>
    </html>
  )
}