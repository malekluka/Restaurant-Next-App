"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCartStore } from '@/utils/store';
import { useEffect } from 'react';

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },
  { id: 3, title: "About", url: "/" },
  { id: 4, title: "Contact", url: "/" },
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
        className="relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white shadow-2xl z-40 transform transition-transform duration-500 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-20 sm:pt-24 px-6">
          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {links.map((item, index) => (
              <Link
                key={item.id}
                href={item.url}
                onClick={() => setOpen(false)}
                className="block py-3 px-4 text-base font-medium text-[var(--primary-deep)] hover:bg-[var(--primary-gold)]/10 hover:text-[var(--primary-gold)] rounded-lg transition-all duration-300 animate-slide-down"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="space-y-3 pb-6 sm:pb-8 border-t border-gray-200 pt-6">
            {/* Cart - Shown in mobile menu */}
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between w-full py-3 px-4 bg-[var(--primary-gold)]/10 hover:bg-[var(--primary-gold)]/20 text-[var(--primary-deep)] font-medium rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Shopping Cart</span>
              </div>
              {totalItems > 0 && (
                <span className="w-6 h-6 bg-[var(--accent-terracotta)] text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Actions */}
            {session ? (
              <>
                <Link
                  href="/orders"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 w-full py-3 px-4 text-[var(--primary-deep)] hover:bg-[var(--primary-gold)]/10 rounded-lg transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  My Orders
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 w-full py-3 px-4 bg-[var(--primary-deep)] text-white font-medium rounded-lg hover:bg-[var(--primary-gold)] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-[var(--primary-gold)] text-white font-medium rounded-lg hover:bg-[var(--primary-deep)] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;