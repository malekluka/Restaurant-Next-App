"use client";
import React, { useState, useEffect } from 'react';

const Notification = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide notification when scrolled down more than 100px
      setVisible(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-40 h-12 bg-gradient-to-r from-[var(--primary-gold)] to-[var(--accent-terracotta)] text-white px-4 flex items-center justify-center text-center text-sm md:text-base cursor-pointer transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="relative overflow-hidden w-full h-full flex items-center justify-center group">
        <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        <span className="relative z-10 font-medium">
          ✨ Free delivery for all orders over $50. Order your culinary experience now!
        </span>
      </div>
    </div>
  );
};

export default Notification;