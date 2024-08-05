// import Hero from './components/Hero'
// import Header from './components/Header'
// import Work from './components/Work'
import SlideGrid from './components/SlideGrid'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import Contact from './components/Contact'
import HeaderSection from './components/HeaderSection'
import HeroSection from './components/HeroSection'
import ApproachSection from './components/ApproachSection'

function App() {

  return (
    <>
      {/* <Header /> */}
      {/* <Hero /> */}
      <HeaderSection />
      <HeroSection />
      <ApproachSection />
      <SlideGrid />
      {/* <Work /> */}
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}

export default App
