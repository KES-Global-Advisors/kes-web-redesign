import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import CookieConsent from './components/CookieConsent';
import GoogleAnalytics from './components/GoogleAnalytics';
import Hero from './components/Hero';
import Header from './components/Header';
import Testimonials from './components/Testimonials';
import Approach from './components/Approach';
import Service from './components/Service';
import About from './components/About';
import Insights from './components/Insights';
import Footer from './components/Footer';
import Contact from './components/Contact';

// Component to handle scrolling to sections with smooth scrolling
function ScrollToSection() {
  const { pathname } = useLocation();

  useEffect(() => {
    const sectionId = pathname.substring(1); // remove leading slash
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          // behavior: 'smooth',
        });
      }
    } else {
      // If no specific section is targeted, scroll to top
      window.scrollTo({
        top: 0,
        // behavior: 'smooth',
      });
    }
  }, [pathname]);

  return null;
}

function App() {
  return (
    <CookiesProvider>
      <CookieConsent />
      <GoogleAnalytics />
      <Router>
        <Header />
        <ScrollToSection />
        <div>
          <Hero/>
          <Testimonials />
          <Approach />
          <Service id="services" />
          <About id="about" />
          <Insights id="insights" />
          <Contact id="contact" />
        </div>
        <Footer />
      </Router>
    </CookiesProvider>
  );
}

export default App;
