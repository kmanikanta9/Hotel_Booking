import React from "react";
import Hero from "../components/Hero";
import img1 from "../assets/images/person_1.jpg";
import img2 from "../assets/images/person_5.jpg";
import img3 from "../assets/images/person_2.jpg";
import room from "../assets/images/img_4.jpg";
const About = () => {



    
  const teamMembers = [
    {
      id: 1,
      imageSrc: img1,
      name: 'Michelle Aguilar',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum voluptatibus aperiam minima laboriosam sequi voluptates error ex tempore eaque, ipsa eum non quo explicabo nulla recusandae nam expedita in dolores?',
    },
    {
      id: 2,
      imageSrc: img2,
      name: 'Chris Standworth',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum voluptatibus aperiam minima laboriosam sequi voluptates error ex tempore eaque, ipsa eum non quo explicabo nulla recusandae nam expedita in dolores?',
    },
    {
      id: 3,
      imageSrc: img3,
      name: 'Rob McDonald',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum voluptatibus aperiam minima laboriosam sequi voluptates error ex tempore eaque, ipsa eum non quo explicabo nulla recusandae nam expedita in dolores?',
    },
  ];

  return (
    <div>
      <Hero 
  title="About Us"
  subtitle="Our story & values"
  showCTA={false}
  minHeight="h-96 md:h-[500px]"
/>



      <section id="about-page" className="max-w-6xl mx-auto px-6 py-16">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-6">
                Our Journey
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 1990, our hotel has been a beacon of luxury and
                comfort for over three decades. What started as a small boutique
                inn has blossomed into a world-class establishment known for its
                exceptional service and elegant accommodations.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our commitment to excellence is reflected in every aspect of our
                hotel, from our meticulously designed rooms to our gourmet
                dining options. We believe that true luxury lies in the details,
                and we strive to exceed our guests' expectations at every turn.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                As we look to the future, we remain dedicated to providing
                unforgettable experiences for our guests, blending timeless
                elegance with modern amenities.
              </p>
              <button className="border border-[#C58C5D] text-[#C58C5D] px-8 py-3 rounded-sm text-sm font-semibold tracking-wider hover:bg-[#C58C5D] hover:text-white transition duration-300">
                LEARN MORE
              </button>
            </div>
            <div>
              <img
                src={room}
                alt="Hotel Lobby"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>

          
           <section className="py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800">Our Staff</h2>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamMembers.map((member) => (
            <div 
              key={member.id}
              className="flex flex-col items-center text-center max-w-xs mx-auto 
                         bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container with Hover Effect */}
              <div className="w-full overflow-hidden mb-4 rounded-lg transform transition-transform duration-300 hover:scale-105">
                <img className="w-full h-auto object-cover" src={member.imageSrc} alt={member.name} />
              </div>
              
              {/* Name */}
              <h3 className="text-[#C58C5D] text-2xl font-serif mb-2">
                {member.name}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
        </div>
      </section>
    </div>
  );
};

export default About;
