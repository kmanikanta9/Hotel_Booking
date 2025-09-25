import React from 'react';
import img1 from '../assets/images/img_1.jpg';
import img2 from '../assets/images/img_2.jpg';
import img3 from '../assets/images/img_3.jpg';

const posts = [
  { id: 1, title: 'Top 10 Views to See', excerpt: 'Discover the best vantage points and panoramic views from our hotel and nearby attractions.', img: img1, href: '#blog-1' },
  { id: 2, title: 'A Guide to Luxury Rooms', excerpt: 'What makes a room truly luxury — amenities, design and bespoke services explained.', img: img2, href: '#blog-2' },
  { id: 3, title: 'Dining Experiences', excerpt: 'From farm-to-table breakfasts to curated dinners — explore our culinary highlights.', img: img3, href: '#blog-3' },
];

const BlogSection = () => {
  return (
    <section id="blog" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-semibold">From our Blog</h3>
          <p className="text-gray-600 mt-2">Stories, tips and highlights from our hotel and the surrounding area.</p>
        </div>

        <div className="space-y-6">
          {posts.map((p, idx) => (
            <article key={p.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <a href={p.href} className="group block md:flex">
                <div className="h-56 md:h-36 md:w-1/3 flex-shrink-0 overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4 md:p-6 md:w-2/3">
                  <h4 className="text-lg font-medium mb-2">{p.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{p.excerpt}</p>
                  <span className="text-sm text-yellow-600 font-medium">Read more →</span>
                </div>
              </a>
              {idx < posts.length - 1 && <div className="border-t border-gray-100" />}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
