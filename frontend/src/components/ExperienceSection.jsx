import React, { useEffect, useRef, useState } from 'react';
import bedroomViewImage from '../assets/images/img_5.jpg'; // Path to your background image

const ExperienceSection = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden">
      {/* Background image as <img> for better object-fit control */}
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[55vh] w-full">
        <img
          src={bedroomViewImage}
          alt="Bedroom view"
          className="absolute inset-0 w-full h-full object-cover object-center md:object-[center_35%]"
        />

        {/* Slight dark overlay for text contrast (no blur) */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Subtle vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.35) 100%)' }} />

        {/* Content container */}
        <div className={`relative z-10 flex items-center justify-center h-full px-4 py-6`}> 
          <div className={`max-w-3xl text-center text-white transition-opacity duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-3">Relax and Enjoy your Holiday</h2>
            <p className="text-sm sm:text-base mb-4 text-gray-100">Experience comfort and luxury — unwind with panoramic views and exceptional service.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;