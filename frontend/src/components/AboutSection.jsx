import React from "react";
import roomImage from "../assets/images/f_img_1.png"; // bottom image
import person1 from "../assets/images/person_1.jpg";
import img4 from "../assets/images/img_4.jpg";

const AboutSection = () => {
  return (
    <section className="bg-white py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* Left Column - Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="uppercase text-xs tracking-widest text-gray-500 font-sans mb-2">
            Stay with our luxury rooms
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-6">
            Stay and Enjoy
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus illo
            similique natus, a recusandae? Dolorum, unde a quibusdam est?
            Corporis deleniti obcaecati quibusdam inventore fuga eveniet! Qui
            delectus tempore amet!
          </p>
          <button className="border border-[#C58C5D] text-[#C58C5D] px-8 py-3 rounded-sm text-sm font-semibold tracking-wider hover:bg-[#C58C5D] hover:text-white transition duration-300">
            MORE ABOUT US
          </button>
        </div>

        {/* Right Column - Images (using CSS Grid to match layout) */}
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-4 auto-rows-[minmax(0,_1fr)]">
          {/* Top-left image */}
          <div className="col-span-1">
            <img
              src={person1}
              alt="Guest"
              className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Top-right image (taller) */}
          <div className="col-span-1 row-span-2">
            <img
              src={img4}
              alt="Pool"
              className="w-full h-full object-cover rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Bottom-left image */}
          <div className="col-span-1">
            <img
              src={roomImage}
              alt="Room detail"
              className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default AboutSection;
