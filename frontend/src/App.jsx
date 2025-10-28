
import './App.css'

import Features from './components/Features'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ShowcaseSection from './components/ShowcaseSection'
import TestimonialsSection from "./components/TestimonialsSection";
import CallToAction from './components/CallToAction'
import ContactSection from './components/ContactSection'
import FaqSection from './components/FaqSection'
import Footer from './components/Footer'

function App() {
  

  return (
    <>
   <Navbar/>
   <Hero/>
   <Features/>
   <ShowcaseSection/>
    <TestimonialsSection />
     <CallToAction/>
      <ContactSection/>
       <FaqSection/>
       <Footer/>
    </>
  )
}

export default App
