import { menu } from "@/data";
import Link from "next/link";
import React from "react";

const MenuPage = () => {
  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <div className="text-center py-16 space-y-4 px-4">
        <p className="text-[var(--primary-gold)] text-sm tracking-widest uppercase font-medium">
          Explore Our Menu
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-display text-[var(--primary-deep)]">
          Culinary Categories
        </h1>
        <div className="divider mx-auto"></div>
        <p className="text-[var(--accent-charcoal)] max-w-2xl mx-auto">
          Discover our diverse selection of carefully curated dishes, each category offering unique flavors and experiences.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-20 xl:px-40 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menu.map((category, index) => (
            <Link
              href={`/menu/${category.slug}`}
              key={category.id}
              className="group relative h-[400px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-in"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                backgroundImage: `url(${category.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-black/95 transition-all duration-500"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="inline-block px-3 py-1 bg-[var(--primary-gold)] text-white text-xs font-medium rounded-full mb-4">
                  {category.slug}
                </span>
                <h3 className="text-3xl font-bold text-white text-display mb-3">
                  {category.title}
                </h3>
                <p className="text-gray-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {category.desc}
                </p>
                <div className="flex items-center text-[var(--primary-gold)] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  <span>Explore Menu</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;