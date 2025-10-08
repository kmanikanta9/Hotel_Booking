import React from "react";
import { NavLink } from "react-router-dom";
import img1 from "../assets/images/img_1.jpg";
import img2 from "../assets/images/img_2.jpg";
import img3 from "../assets/images/img_3.jpg";

const posts = [
  {
    id: 1,
    title: "Top 10 Views to See",
    excerpt:
      "Discover the best vantage points and panoramic views from our hotel and nearby attractions.",
    img: img1,
  },
  {
    id: 2,
    title: "A Guide to Luxury Rooms",
    excerpt:
      "What makes a room truly luxury — amenities, design and bespoke services explained.",
    img: img2,
  },
  {
    id: 3,
    title: "Dining Experiences",
    excerpt:
      "From farm-to-table breakfasts to curated dinners — explore our culinary highlights.",
    img: img3,
  },
];

const BlogSection = () => {
  return (
    <section id="blog" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-semibold text-gray-800">From Our Blog</h3>
          <p className="text-gray-600 mt-3">
            Stories, travel tips, and insights from our luxury hotel.
          </p>
        </div>

        {/* Vertical Blog Cards */}
        <div className="space-y-10">
          {posts.map((p) => (
            <article
              key={p.id}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300"
            >
              <div className="md:flex">
                {/* Image Section */}
                <div className="md:w-1/3 h-56 md:h-auto overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Content Section */}
                <div className="p-6 md:w-2/3 flex flex-col justify-center">
                  <h4 className="text-xl font-semibold mb-2 text-gray-800">
                    {p.title}
                  </h4>
                  <p className="text-gray-600 mb-4">{p.excerpt}</p>
                  <NavLink
                    to="/blog"
                    className="text-yellow-600 font-medium hover:underline text-sm"
                  >
                    Read more →
                  </NavLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
