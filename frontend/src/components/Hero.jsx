import React from "react";
import hotelImage from "../assets/images/big_image_1.jpg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // 👈 Import Framer Motion

const Hero = ({
  title = "Welcome To Our Luxury Rooms",
  subtitle = "Discover our world's #1 Luxury Room for VIP.",
  showCTA = true,
  minHeight = "h-screen",
}) => {
  const navigate = useNavigate();

  return (
    <div className={`relative ${minHeight} overflow-hidden`}>
      {/* Background Image with Smooth Motion */}
      <motion.img
        src={hotelImage}
        alt="Luxury Hotel Room"
        className="absolute inset-0 w-full h-full object-cover filter blur-[1px] grayscale-[20%] brightness-75 contrast-125"
        style={{ objectPosition: "center 35%" }}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Subtle Overlay */}
      <div className="absolute inset-0  bg-opacity-25" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
        {/* Title Animation */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-wider mb-4"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {title}
        </motion.h1>

        {/* Subtitle Animation */}
        {subtitle && (
          <motion.p
            className="text-lg sm:text-xl md:text-2xl font-light mb-6 max-w-2xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* CTA Button Animation */}
        {showCTA && (
          <motion.button
            onClick={() => navigate("/rooms")}
            className="bg-[#C58C5D] cursor-pointer text-white px-6 py-2 rounded-sm text-base sm:text-lg font-semibold tracking-wider hover:bg-opacity-80 transition duration-300"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            BOOK NOW
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Hero;
