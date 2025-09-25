import React from "react";
import Hero from "../components/Hero";
const ContactSection = () => {
  return (
    <>  
      <Hero 
  title="Contact Us"
  subtitle="Get in touch with us"
  showCTA={false}
  minHeight="h-96 md:h-[500px]"
/>

    <section className="relative bg-gradient-to-b from-white to-gray-50 py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16 mt-10">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 relative inline-block">
            Get In Touch
            <span className="absolute left-1/2 -bottom-2 w-16 h-1 bg-[#C58C5D] transform -translate-x-1/2 rounded-full"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Contact Details */}
          <div className="flex flex-col space-y-8">
            {[
              {
                title: "Our Location",
                text: "123 Luxury Lane, Hotel City, HT 45678",
                icon: (
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                ),
              },
              {
                title: "Phone Number",
                text: "+1 (234) 567-8900",
                icon: (
                  <path d="M20 15.5c-1.25 0-2.45-.22-3.57-.65-.1-.04-.2-.05-.3-.05-.26 0-.5.1-.7.2l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.2c.2-.2.31-.44.31-.7 0-.1 0-.2-.05-.3-.43-1.12-.65-2.32-.65-3.57 0-.28-.22-.5-.5-.5H3.5c-.28 0-.5.22-.5.5C3 13.11 8.89 19 16.5 19c.28 0 .5-.22.5-.5V16c0-.28-.22-.5-.5-.5z" />
                ),
              },
              {
                title: "Email Address",
                text: "info@luxuryhotel.com",
                icon: (
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                ),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex-shrink-0 bg-[#C58C5D]/10 text-[#C58C5D] p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    {item.icon}
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-serif text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.text}</p>
                </div>
              </div>
            ))}

            {/* Social Media */}
            <div className="flex space-x-6 mt-8">
              {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-gray-500 hover:text-[#C58C5D] transition transform hover:scale-110"
                >
                  <i className={`ri-${social}-fill text-2xl`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100">
            <form className="space-y-6">
              {["name", "email", "subject"].map((field, idx) => (
                <div key={idx} className="relative z-0 w-full group">
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    id={field}
                    className="block w-full px-4 pt-5 pb-2 text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 focus:outline-none focus:border-[#C58C5D] focus:ring-1 focus:ring-[#C58C5D] peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor={field}
                    className="absolute text-sm text-gray-500 left-4 top-2 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#C58C5D]"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                </div>
              ))}

              {/* Message */}
              <div className="relative z-0 w-full group">
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  className="block w-full px-4 pt-5 pb-2 text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 focus:outline-none focus:border-[#C58C5D] focus:ring-1 focus:ring-[#C58C5D] peer"
                  placeholder=" "
                ></textarea>
                <label
                  htmlFor="message"
                  className="absolute text-sm text-gray-500 left-4 top-2 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#C58C5D]"
                >
                  Message
                </label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#C58C5D] to-[#a87450] text-white px-8 py-3 rounded-md text-sm font-semibold tracking-wide hover:shadow-lg hover:scale-105 transition transform"
                >
                  SEND MESSAGE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ContactSection;
