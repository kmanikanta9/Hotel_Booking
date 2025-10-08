import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import img1 from "../assets/images/img_1.jpg";
import img2 from "../assets/images/img_2.jpg";
import img3 from "../assets/images/img_3.jpg";
import img5 from "../assets/images/img_5.jpg";

const rooms = [
  { id: "most popular", title: "Most Popular", img: img1 },
  { id: "presidential", title: "Presidential Room", img: img2 },
  { id: "luxury", title: "Luxury Room", img: img3 },
  { id: "deluxe", title: "Deluxe Room", img: img5 },
];

export default function RoomsSection() {
  return (
    <section id="rooms" className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-5xl font-playfair font-bold text-gray-800">
            Our Elegant Rooms
          </h3>
          <p className="text-gray-500 mt-3 text-base md:text-lg max-w-2xl mx-auto">
            Discover luxury and comfort in every corner — from deluxe suites to
            presidential elegance.
          </p>
        </motion.div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              <NavLink
                to="/rooms"
                className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Room Image */}
                <motion.img
                  src={room.img}
                  alt={room.title}
                  className="w-full h-60 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  whileHover={{ scale: 1.05 }}
                >
                  <h4 className="text-2xl font-semibold text-white mb-2">
                    {room.title}
                  </h4>
                  <span className="bg-white text-orange-500 px-4 py-2 rounded-md font-semibold hover:bg-orange-100 transition-all">
                    View Details
                  </span>
                </motion.div>
              </NavLink>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
