import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import RoomsSection from '../components/RoomsSection'
import ExperienceSection from '../components/ExperienceSection'
import BlogSection from '../components/BlogSection'


const Home = () => {
  const location = useLocation()

  useEffect(() => {
    // If navigation included a scroll request, scroll to that section on mount
    try {
      const scrollTo = location?.state && location.state.scrollTo
      if (scrollTo) {
        const el = document.getElementById(scrollTo)
        if (el) {
          // delay slightly to allow layout to settle
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
        }
        // Replace history state so repeated back/forward doesn't re-trigger
        if (window.history && window.history.replaceState) {
          const state = { ...window.history.state }
          if (state && state.state) delete state.state.scrollTo
          window.history.replaceState(state, '')
        }
      }
    } catch (err) {
      // ignore any errors
      console.warn('scroll-on-navigation failed', err)
    }
  }, [location])

  return (
    <div>
        <Hero/>
  <AboutSection/>
  <RoomsSection/>
  <ExperienceSection/>
  <BlogSection/>


    </div>
  )
}

export default Home