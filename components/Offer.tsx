import React from 'react';
import Image from 'next/image';
import CountDown from './CountDown';

const Offer = () => {
  return (
    <section className="relative h-[600px] md:h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/offerBg.png"
          alt="Special Offer"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative h-full max-w-[1600px] mx-auto px-4 lg:px-20 xl:px-40">
        <div className="h-full flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <span className="inline-block px-4 py-2 bg-[var(--primary-gold)]/20 backdrop-blur-sm border border-[var(--primary-gold)] rounded-full text-[var(--primary-gold)] text-sm font-medium">
              Limited Time Offer
            </span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-display leading-tight">
              Delicious Burger
              <br />
              <span className="text-[var(--primary-gold)]">& French Fries</span>
            </h2>
            
            <p className="text-gray-300 text-lg max-w-xl">
              Indulge in our chef&apos;s special combo featuring a premium burger with perfectly golden french fries. A taste sensation you won&apos;t forget.
            </p>
            
            {/* Countdown */}
            <div className="py-4">
              <p className="text-white/80 text-sm uppercase tracking-wider mb-3">
                Offer Ends In
              </p>
              <CountDown />
            </div>
            
            <button className="btn-primary text-lg px-10 py-4 shadow-2xl">
              Order Now
            </button>
          </div>

          {/* Product Image */}
          <div className="flex-1 relative h-full hidden md:block">
            <div className="absolute bottom-0 right-0 w-full h-[400px]">
              <Image
                src="/offerProduct.png"
                alt="Burger and Fries"
                fill
                className="object-contain drop-shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Offer;