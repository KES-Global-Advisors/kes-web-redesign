// import localFont from 'next/font/local'
import { Metadata } from 'next'
import { SupabaseProvider } from '@/components/admin/SupabaseContext'
import { ContentProvider } from '@/hooks/useContent'
import { InsightsProvider } from '@/hooks/useInsights'
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
import './styles.css'

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
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://i.postimg.cc" />
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <CookiesProviderWrapper>
          <SupabaseProvider>
            <ErrorBoundary>
              <ContentProvider>
                <InsightsProvider>
                  <CookieConsent />
                  <GoogleAnalytics />
                  <WebVitals />
                  <Header />
                  <main>{children}</main>
                  <Footer />
                  <Toaster position="bottom-right" />
                </InsightsProvider>
              </ContentProvider>
            </ErrorBoundary>
          </SupabaseProvider>
        </CookiesProviderWrapper>
      </body>
    </html>
  )
}