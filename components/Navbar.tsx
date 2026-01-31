"use client";

import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import Link from 'next/link';
import CartIcon from './CartIcon';
import Image from 'next/image';
import UserLinks from './UserLinks';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3 md:py-4'
          : 'bg-white/95 backdrop-blur-md shadow-md py-3 md:py-4'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-20 xl:px-40">
        <div className="flex items-center justify-between gap-4">
          {/* LEFT LINKS - Desktop only */}
          <div className="hidden lg:flex gap-6 xl:gap-8 flex-1 items-center">
            <Link
              href="/"
              className="text-[var(--primary-deep)] font-medium text-sm tracking-wide hover:text-[var(--primary-gold)] transition-colors duration-300 relative group whitespace-nowrap"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-gold)] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/menu"
              className="text-[var(--primary-deep)] font-medium text-sm tracking-wide hover:text-[var(--primary-gold)] transition-colors duration-300 relative group whitespace-nowrap"
            >
              Menu
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-gold)] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/"
              className="text-[var(--primary-deep)] font-medium text-sm tracking-wide hover:text-[var(--primary-gold)] transition-colors duration-300 relative group whitespace-nowrap"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-gold)] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* LOGO - Responsive sizing */}
          <div className="flex-1 lg:flex-initial lg:text-center">
            <Link
              href="/"
              className="inline-flex flex-col items-start lg:items-center group"
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-display text-[var(--primary-deep)] tracking-tight transition-all duration-300 group-hover:text-[var(--primary-gold)]">
                Savoria
              </span>
              <span className="hidden sm:inline text-xs text-accent text-[var(--primary-gold)] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Fine Dining
              </span>
            </Link>
          </div>

          {/* RIGHT SECTION - Mobile & Desktop */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 justify-end">
            {/* Phone Number - Hidden on mobile and small tablets */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--primary-gold)]/10 hover:bg-[var(--primary-gold)]/20 transition-colors duration-300 cursor-pointer group">
              <div className="w-4 h-4 relative opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <Image src="/phone.png" alt="phone" fill className="object-contain" />
              </div>
              <span className="text-sm font-medium text-[var(--primary-deep)] whitespace-nowrap">
                +1 234 567 890
              </span>
            </div>

            {/* User Links - Hidden on mobile */}
            <div className="hidden md:block">
              <UserLinks />
            </div>

            {/* Cart - Always visible but responsive sizing */}
            <div className="hidden sm:block">
              <CartIcon />
            </div>

            {/* Mobile Menu - Shows on mobile and tablet */}
            <div className="lg:hidden">
              <Menu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;