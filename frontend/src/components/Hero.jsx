import React from 'react';
import hotelImage from '../assets/images/big_image_1.jpg'; // Path to your background image

const Hero = ({ title = 'Welcome To Our Luxury Rooms', subtitle = "Discover our world's #1 Luxury Room for VIP.", showCTA = true, minHeight = 'h-screen' }) => {
  return (
    <div className={`relative ${minHeight} overflow-hidden`}>
      {/* Background Image with More Clarity and "Light Blackish" Filter */}
      <img
        src={hotelImage}
        alt="Luxury Hotel Room"
        className="absolute inset-0 w-full h-full object-cover filter blur-[1px] grayscale-[20%] brightness-75 contrast-125 transform scale-105"
        style={{ objectPosition: 'center 35%' }}
      />

      {/* Very Subtle Dark Overlay for Text Contrast */}
      <div className="absolute inset-0 bg-black opacity-15" />

      {/* Content for the Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-wider mb-4 animate-fade-in-up">{title}</h1>
        {subtitle && (
          <p className="text-lg sm:text-xl md:text-2xl font-light mb-6 max-w-2xl animate-fade-in-up delay-200">{subtitle}</p>
        )}

        {/* Conditional CTA */}
        {showCTA && (
          <button className="bg-[#C58C5D] text-white px-6 py-2 rounded-sm text-base sm:text-lg font-semibold tracking-wider hover:bg-opacity-80 transition duration-300 animate-fade-in-up delay-400">
            BOOK NOW
          </button>
        )}
      </div>
    </div>
  );
};

export default Hero;
