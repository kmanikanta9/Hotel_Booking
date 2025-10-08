import React from "react";
import { motion } from "framer-motion";
import bedroomViewImage from "../assets/images/img_5.jpg";

const ExperienceSection = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image with smooth zoom motion */}
      <motion.div
        className="relative h-[40vh] md:h-[50vh] lg:h-[55vh] w-full"
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Image */}
        <img
          src={bedroomViewImage}
          alt="Bedroom view"
          className="absolute inset-0 w-full h-full object-cover object-center md:object-[center_35%]"
        />

        {/* Subtle overlay & vignette */}
        <div className="absolute inset-0 bg-black/30" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.35) 100%)",
          }}
        />

        {/* Text content with motion */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 py-6">
          <motion.div
            className="max-w-3xl text-center text-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-3">
              Relax and Enjoy your Holiday
            </h2>
            <p className="text-sm sm:text-base mb-4 text-gray-100">
              Experience comfort and luxury — unwind with panoramic views and
              exceptional service.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;
