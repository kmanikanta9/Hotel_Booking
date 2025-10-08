import React from "react";
import Hero from "../components/Hero";
import img1 from "../assets/images/img_1.jpg";
import img2 from "../assets/images/img_2.jpg";
import img3 from "../assets/images/img_3.jpg";

const posts = [
  {
    id: 1,
    title: "Top 10 Views to See Around Our Hotel",
    img: img1,
    content: `Our hotel offers breathtaking views from every corner — whether it’s the sunrise over the mountains or the calm serenity of the nearby lake. 
    Here are some of our guests’ favorite viewpoints:
    - The Rooftop Lounge: Perfect for sunset cocktails.
    - Crystal Bay Point: Just a 10-minute walk away, ideal for morning jogs.
    - Sky Deck: Offers a panoramic view of the city lights at night.
    Don’t forget to bring your camera — every moment here is picture-perfect!`,
  },
  {
    id: 2,
    title: "A Guide to Luxury Rooms & Comfort",
    img: img2,
    content: `Luxury isn’t just about comfort — it’s about thoughtful design and a personalized experience. 
    Each of our rooms is designed with a mix of elegance and functionality:
    - Premium king-size beds with Egyptian cotton sheets.
    - Smart temperature and lighting controls.
    - Private balconies with stunning views.
    - 24/7 room service with curated dining options.
    Every detail is crafted to make you feel relaxed, inspired, and cared for.`,
  },
  {
    id: 3,
    title: "Dining Experiences That Delight",
    img: img3,
    content: `Food is at the heart of every unforgettable stay. 
    Our in-house restaurant and open-air terrace offer a mix of international cuisines and local flavors:
    - Start your day with our organic breakfast buffet.
    - Enjoy handcrafted cocktails and tapas at the Sunset Bar.
    - Don’t miss the Chef’s Table — a private dining experience led by our head chef.
    Whether you’re a foodie or simply love good food, our dining experiences will make your stay memorable.`,
  },
];

const Blog = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="News & Events"
        subtitle="Latest updates, travel stories, and unique experiences from our hotel"
        showCTA={false}
        minHeight="h-60 md:h-72"
      />

      {/* Blog Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-semibold mb-3 text-gray-800">
              Our Stories & Insights
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the stories behind our hospitality — from beautiful
              destinations and culinary journeys to design inspirations that
              define our hotel’s charm.
            </p>
          </div>

          {/* Blog Cards */}
          <div className="space-y-12">
            {posts.map((p) => (
              <article
                key={p.id}
                className="bg-gray-50 rounded-lg overflow-hidden shadow hover:shadow-md transition"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-6 md:p-8">
                  <h4 className="text-2xl font-semibold mb-3 text-gray-800">
                    {p.title}
                  </h4>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {p.content}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
