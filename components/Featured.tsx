import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductType } from '@/types/types';

const getData = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const Featured = async () => {
  const featuredProducts: ProductType[] = await getData();

  return (
    <section className="section-container bg-white">
      {/* Section Header */}
      <div className="text-center mb-16 space-y-4">
        <p className="text-[var(--primary-gold)] text-sm tracking-widest uppercase font-medium">
          Chef&apos;s Selection
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-display text-[var(--primary-deep)]">
          Featured Dishes
        </h2>
        <div className="divider mx-auto"></div>
        <p className="text-[var(--accent-charcoal)] max-w-2xl mx-auto">
          Discover our handpicked selection of culinary masterpieces, crafted with passion and served with excellence.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProducts.map((item, index) => (
          <Link
            href={`/product/${item.id}`}
            key={item.id}
            className="card-product animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Image Container */}
            {item.img && (
              <div className="image-zoom-container relative h-72 bg-[var(--neutral-100)]">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="image-zoom object-cover"
                />
                {/* Overlay Badge */}
                <div className="absolute top-4 right-4 badge badge-gold backdrop-blur-sm">
                  Featured
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-bold text-display text-[var(--primary-deep)] group-hover:text-[var(--primary-gold)] transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-[var(--accent-charcoal)] text-sm line-clamp-2 leading-relaxed">
                {item.desc}
              </p>
              
              {/* Price and CTA */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-2xl font-bold text-[var(--primary-gold)]">
                  ${item.price}
                </span>
                <button className="px-6 py-2 bg-[var(--primary-deep)] text-white rounded-full font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-[var(--primary-gold)]">
                  Order Now
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Featured;