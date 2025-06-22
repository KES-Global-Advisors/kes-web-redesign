import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import AdminPanel from './components/admin/AdminPanel';
import AdminLogin from './components/admin/AdminLogin';
import { SupabaseProvider } from './components/admin/SupabaseContext';

// Main website component
const MainWebsite: React.FC = () => {
  return (
    <>
      <Header />
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
    </>
  );
};

// Component to handle scrolling to sections with smooth scrolling
const ScrollToSection: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only handle scrolling for main website routes, not admin routes
    if (!pathname.startsWith('/admin')) {
      const sectionId = pathname.substring(1); // remove leading slash
      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          window.scrollTo({
            top: element.offsetTop,
          });
        }
      } else {
        // If no specific section is targeted, scroll to top
        window.scrollTo({
          top: 0,
        });
      }
    }
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <CookiesProvider>
      <SupabaseProvider>
        <CookieConsent />
        <GoogleAnalytics />
        <Router>
          <ScrollToSection />
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminPanel />} />
            
            {/* Main Website Route */}
            <Route path="*" element={<MainWebsite />} />
          </Routes>
        </Router>
      </SupabaseProvider>
    </CookiesProvider>
  );
}

export default App;