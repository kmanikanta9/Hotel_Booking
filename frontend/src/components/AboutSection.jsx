import React from "react";
import { motion } from "framer-motion";
import roomImage from "../assets/images/f_img_1.png"; // bottom image
import img4 from "../assets/images/img_4.jpg"; // tall image
import img2 from '../assets/images/img_2.jpg'
import { useNavigate } from "react-router-dom";
const AboutSection = () => {
  const navigate = useNavigate()
  return (
    <section className="bg-white py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* Left Column - Text */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="uppercase text-xs tracking-widest text-gray-500 font-sans mb-2">
            Experience Ultimate Luxury
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-6">
            Stay and Enjoy Every Moment
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
            Indulge in the perfect blend of luxury and comfort. Our rooms are
            designed to provide you with a serene environment, breathtaking
            views, and top-tier amenities. Every stay promises an unforgettable
            experience.
          </p>
          <button onClick={()=>navigate('/about')} className="border cursor-pointer border-[#C58C5D] text-[#C58C5D] px-8 py-3 rounded-sm text-sm font-semibold tracking-wider hover:bg-[#C58C5D] hover:text-white transition duration-300">
            MORE ABOUT US
          </button>
        </motion.div>

        {/* Right Column - Images */}
        <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-4">
          {/* Tall Image */}
          <motion.div
            className="md:w-1/2 h-96 md:h-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src={img4}
              alt="Pool view"
              className="w-full h-full object-cover rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
            />
          </motion.div>

          {/* Bottom Image */}
          <motion.div
            className="md:w-1/2 flex flex-col gap-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src={roomImage}
              alt="Room interior"
              className="w-full h-44 sm:h-52 md:h-1/2 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
            {/* Add a second image if needed */}
            <img
              src={img2}
              alt="Room detail"
              className="w-full h-44 sm:h-52 md:h-1/2 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
