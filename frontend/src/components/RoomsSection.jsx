import React from 'react'
import img1 from '../assets/images/img_1.jpg'
import img2 from '../assets/images/img_2.jpg'
import img3 from '../assets/images/img_3.jpg'
import img5 from '../assets/images/img_5.jpg'

const rooms = [
  { id: 'videos', title: 'Room Videos', img: img1 },
  { id: 'presidential', title: 'Presidential Room', img: img2 },
  { id: 'luxury', title: 'Luxury Room', img: img3 },
  { id: 'deluxe', title: 'Deluxe Room', img: img5 },
]

export default function RoomsSection(){
  return (
    <section id="rooms" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h3 className="text-3xl md:text-4xl font-serif text-gray-800 mb-8 text-center">Our Rooms</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((r) => (
            <article key={r.id} className="relative rounded-lg overflow-hidden shadow-lg group">
              <img src={r.img} alt={r.title} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" />

              {/* Overlay */}
              <div className="absolute inset-0  bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h4 className="text-xl text-black mb-2">{r.title}</h4>
                  <div className="flex flex-col space-y-2">
                    <a href={`#${r.id}`} className="inline-block bg-yellow-500 text-black px-3 py-2 rounded font-medium">View</a>
                    <a href={`#${r.id}`} className="inline-block border border-white text-white px-3 py-2 rounded">Details</a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
