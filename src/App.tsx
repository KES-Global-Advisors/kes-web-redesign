import { CookiesProvider } from 'react-cookie';
import CookieConsent from './components/CookieConsent';
import GoogleAnalytics from './components/GoogleAnalytics';
import Hero from './components/Hero'
import Header from './components/Header'
import Testimonials from './components/Testimonials'
import Approach from './components/Approach'
import Work from './components/Work'
import About from './components/About'
import WhitePapers from './components/WhitePapers'
import Footer from './components/Footer'
import Contact from './components/Contact'

function App() {

  return (
    <CookiesProvider>
      <CookieConsent />
      <GoogleAnalytics />
      <Header />
      <Hero />
      <Testimonials />
      <Approach />
      <Work />
      <About />
      <WhitePapers />
      <Contact />
      <Footer />
    </CookiesProvider>
  )
}

export default App
