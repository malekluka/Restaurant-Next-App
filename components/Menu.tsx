"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import CartIcon from './CartIcon';
import { useSession, signOut } from 'next-auth/react';

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },
  { id: 3, title: "About", url: "/" },
  { id: 4, title: "Contact", url: "/" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="md:hidden">
      {/* Hamburger Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
        aria-label="Toggle menu"
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
        ></div>
      )}

      {/* Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-40 transform transition-transform duration-500 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-6">
          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {links.map((item, index) => (
              <Link
                key={item.id}
                href={item.url}
                onClick={() => setOpen(false)}
                className="block py-3 px-4 text-lg font-medium text-[var(--primary-deep)] hover:bg-[var(--primary-gold)]/10 hover:text-[var(--primary-gold)] rounded-lg transition-all duration-300 animate-slide-down"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="space-y-3 pb-8 border-t border-gray-200 pt-6">
            {session ? (
              <>
                <Link
                  href="/orders"
                  onClick={() => setOpen(false)}
                  className="block w-full py-3 px-4 text-center bg-[var(--primary-gold)]/10 text-[var(--primary-gold)] font-medium rounded-lg hover:bg-[var(--primary-gold)]/20 transition-colors"
                >
                  My Orders
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setOpen(false);
                  }}
                  className="block w-full py-3 px-4 text-center bg-[var(--primary-deep)] text-white font-medium rounded-lg hover:bg-[var(--primary-gold)] transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block w-full py-3 px-4 text-center bg-[var(--primary-gold)] text-white font-medium rounded-lg hover:bg-[var(--primary-deep)] transition-colors"
              >
                Login
              </Link>
            )}

            {/* Cart */}
            <div onClick={() => setOpen(false)}>
              <CartIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
