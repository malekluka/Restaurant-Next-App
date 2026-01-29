"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const data = [
  {
    id: 1,
    title: "Artistry on Every Plate",
    subtitle: "Where culinary excellence meets refined elegance",
    image: "/slide1.png",
  },
  {
    id: 2,
    title: "Delivered to Your Door",
    subtitle: "Premium dining experience, anywhere in the city",
    image: "/slide2.png",
  },
  {
    id: 3,
    title: "Moments Worth Savoring",
    subtitle: "Create unforgettable memories with every meal",
    image: "/slide3.jpg",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % data.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + data.length) % data.length);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[var(--primary-deep)]">
      {/* Slides */}
      {data.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* IMPROVED: Better contrast overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="max-w-[1600px] mx-auto px-4 lg:px-20 xl:px-40 w-full">
              <div className="max-w-2xl space-y-6 animate-fade-in">
                {/* Subtitle */}
                <p className="text-[var(--primary-gold)] text-sm md:text-base font-medium tracking-widest uppercase animate-slide-up">
                  {slide.subtitle}
                </p>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-display leading-tight animate-slide-up"
                    style={{ animationDelay: '0.2s' }}>
                  {slide.title}
                </h1>

                {/* Divider */}
                <div className="w-24 h-1 bg-[var(--primary-gold)] animate-slide-up"
                     style={{ animationDelay: '0.4s' }}></div>

                {/* IMPROVED: Dual CTA Buttons */}
                <div className="flex gap-4 pt-4 animate-slide-up flex-wrap" style={{ animationDelay: '0.6s' }}>
                  <Link href="/menu">
                    <button className="btn-primary text-lg px-12 py-5 shadow-2xl">
                      Order Now
                    </button>
                  </Link>
                  <Link href="/menu">
                    <button className="btn-outline text-lg px-12 py-5 !text-white !border-white hover:!bg-white hover:!text-[var(--primary-deep)]">
                      View Menu
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-20 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-[var(--primary-gold)] transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6 text-white transform group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-20 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-[var(--primary-gold)] transition-all duration-300 group"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6 text-white transform group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? 'w-12 bg-[var(--primary-gold)]'
                : 'w-8 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/60 text-xs tracking-wider uppercase">Scroll</span>
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default Slider;