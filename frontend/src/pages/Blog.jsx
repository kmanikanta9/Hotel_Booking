import React from 'react'
import Hero from '../components/Hero'
import BlogSection from '../components/BlogSection'

const Blog = () => {
  return (
    <div>
      <Hero title="News and Events" subtitle="Latest updates, happenings and happenings from our hotel" showCTA={false} minHeight="h-60 md:h-72" />
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold mb-3">Our Stories & Insights</h1>
          <p className="text-gray-600">Read about travel tips, hotel updates and curated experiences from our team.</p>
        </div>
      </section>

      
    </div>
  )
}

export default Blog
