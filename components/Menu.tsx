"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCartStore } from '@/utils/store';

const links = [
  { id: 1, title: "Home", url: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: 2, title: "Menu", url: "/menu", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { id: 3, title: "About", url: "/", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { id: 4, title: "Contact", url: "/", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const { totalItems } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      {/* Hamburger Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none rounded-lg hover:bg-[var(--primary-gold)]/10 transition-colors"
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span
          className={`w-6 h-0.5 bg-[var(--primary-deep)] transition-all duration-300 ${
            open ? 'rotate-45 translate-y-2' : ''
          }`}
        ></span>
        <span
          className={`w-6 h-0.5 bg-[var(--primary-deep)] transition-all duration-300 ${
            open ? 'opacity-0' : ''
          }`}
        ></span>
        <span
          className={`w-6 h-0.5 bg-[var(--primary-deep)] transition-all duration-300 ${
            open ? '-rotate-45 -translate-y-2' : ''
          }`}
        ></span>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Menu Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[85vw] max-w-[400px] bg-white shadow-2xl z-40 transform transition-transform duration-500 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="bg-gradient-to-r from-[var(--primary-deep)] to-[var(--primary-gold)] px-6 py-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-display text-white">
              Savoria
            </h2>
            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-white/80 text-sm">Fine Dining Experience</p>
        </div>

        {/* Scrollable Content */}
        <div className="h-[calc(100vh-140px)] overflow-y-auto">
          {/* User Info - If logged in */}
          {session && (
            <div className="px-6 py-4 bg-[var(--primary-cream)] border-b border-[var(--neutral-200)]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--primary-gold)]/20 flex items-center justify-center">
                  <span className="text-[var(--primary-gold)] font-bold text-lg">
                    {session.user.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[var(--primary-deep)] truncate">
                    {session.user.name || 'Guest'}
                  </p>
                  <p className="text-xs text-[var(--accent-charcoal)] truncate">
                    {session.user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="py-4">
            <div className="px-4 mb-2">
              <p className="text-xs font-semibold text-[var(--accent-charcoal)] uppercase tracking-wider">
                Navigation
              </p>
            </div>
            {links.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 px-6 py-3.5 text-[var(--primary-deep)] hover:bg-[var(--primary-gold)]/10 hover:text-[var(--primary-gold)] transition-all duration-300 group"
              >
                <svg className="w-5 h-5 text-[var(--accent-charcoal)] group-hover:text-[var(--primary-gold)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <span className="font-medium">{item.title}</span>
                <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="border-t border-[var(--neutral-200)] my-2"></div>

          {/* Quick Actions */}
          <div className="py-4">
            <div className="px-4 mb-2">
              <p className="text-xs font-semibold text-[var(--accent-charcoal)] uppercase tracking-wider">
                Quick Actions
              </p>
            </div>

            {/* Cart */}
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-6 py-3.5 hover:bg-[var(--primary-gold)]/10 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <svg className="w-5 h-5 text-[var(--accent-charcoal)] group-hover:text-[var(--primary-gold)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--accent-terracotta)] text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="font-medium text-[var(--primary-deep)] group-hover:text-[var(--primary-gold)] transition-colors">
                  Shopping Cart
                </span>
              </div>
              <svg className="w-4 h-4 text-[var(--accent-charcoal)] group-hover:text-[var(--primary-gold)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Orders - If logged in */}
            {session && (
              <Link
                href="/orders"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-6 py-3.5 hover:bg-[var(--primary-gold)]/10 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-[var(--accent-charcoal)] group-hover:text-[var(--primary-gold)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="font-medium text-[var(--primary-deep)] group-hover:text-[var(--primary-gold)] transition-colors">
                    My Orders
                  </span>
                </div>
                <svg className="w-4 h-4 text-[var(--accent-charcoal)] group-hover:text-[var(--primary-gold)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>

        {/* Bottom Action */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-[var(--neutral-200)] shadow-lg">
          {session ? (
            <button
              onClick={() => {
                signOut();
                setOpen(false);
              }}
              className="w-full flex items-center justify-center gap-3 py-4 bg-[var(--primary-deep)] hover:bg-[var(--primary-gold)] text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="block w-full"
            >
              <button className="w-full flex items-center justify-center gap-3 py-4 bg-[var(--primary-gold)] hover:bg-[var(--primary-deep)] text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-xl">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;