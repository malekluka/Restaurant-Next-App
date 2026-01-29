import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--primary-deep)] text-white">
      {/* Main Footer Content */}
      <div className="max-w-[1600px] mx-auto px-4 py-16 lg:px-20 xl:px-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-display text-[var(--primary-gold)]">
              Savoria
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Where every bite tells a story. Experience the finest culinary artistry with our curated selection of dishes.
            </p>
            <div className="flex gap-4 pt-2">
              {/* Social Media Icons */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--primary-gold)] flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--primary-gold)] flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--primary-gold)] flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--primary-gold)] text-display">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/menu"
                  className="text-sm text-gray-300 hover:text-[var(--primary-gold)] transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  Our Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="text-sm text-gray-300 hover:text-[var(--primary-gold)] transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-300 hover:text-[var(--primary-gold)] transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-300 hover:text-[var(--primary-gold)] transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--primary-gold)] text-display">
              Opening Hours
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="text-white">11:00 - 23:00</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-white">10:00 - 00:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-white">10:00 - 22:00</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--primary-gold)] text-display">
              Newsletter
            </h4>
            <p className="text-sm text-gray-300">
              Subscribe to get special offers and updates.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-[var(--primary-gold)] transition-colors duration-300"
              />
              <button className="px-6 py-2 bg-[var(--primary-gold)] text-white rounded-lg font-medium hover:bg-[var(--primary-gold)]/90 transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-4 py-6 lg:px-20 xl:px-40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} Savoria. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link
                href="/"
                className="hover:text-[var(--primary-gold)] transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/"
                className="hover:text-[var(--primary-gold)] transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                href="/"
                className="hover:text-[var(--primary-gold)] transition-colors duration-300"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
