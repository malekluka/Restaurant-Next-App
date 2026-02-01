"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCartStore } from '@/utils/store';

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const { totalItems } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

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
      {/* Hamburger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative z-[100] w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none rounded-lg hover:bg-[#D4AF37]/10 transition-colors"
        aria-label="Toggle menu"
      >
        <span className={`w-6 h-0.5 bg-[#2C2416] transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`w-6 h-0.5 bg-[#2C2416] transition-all duration-300 ${open ? 'opacity-0' : ''}`}></span>
        <span className={`w-6 h-0.5 bg-[#2C2416] transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-[90]"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Menu Panel - ONE SINGLE CONTAINER */}
      {open && (
        <div className="fixed top-0 right-0 h-screen w-[90vw] max-w-[420px] bg-white z-[95] shadow-2xl border-l-[6px] border-[#D4AF37] flex flex-col">
          
          {/* HEADER */}
          <div className="flex-shrink-0 bg-gradient-to-br from-[#2C2416] via-[#3d3220] to-[#D4AF37] px-6 py-6 border-b-2 border-[#D4AF37]/30">
            <h2 className="text-3xl font-bold text-white text-center" style={{ fontFamily: 'var(--font-display)' }}>
              Savoria
            </h2>
          </div>

          {/* SCROLLABLE CONTENT */}
          <div className="flex-1 overflow-y-auto bg-white">
            
            {/* User Info */}
            {session && (
              <div className="px-6 py-5 bg-gradient-to-br from-[#FAF8F3] to-[#f5f2ea] border-b-2 border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#b8922d] flex items-center justify-center shadow-md flex-shrink-0">
                    <span className="text-white font-bold text-xl">
                      {session.user.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#2C2416] text-base truncate">
                      {session.user.name || 'Guest'}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5 truncate">
                      {session.user.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="py-5 bg-white">
              <div className="px-6 mb-3 flex items-center gap-2">
                <div className="w-1 h-4 bg-[#D4AF37] rounded-full"></div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Navigation</p>
              </div>
              
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-4 px-6 py-4 bg-white text-[#2C2416] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all group">
                <svg className="w-5 h-5 text-gray-500 group-hover:text-[#D4AF37] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="font-semibold text-[15px]">Home</span>
              </Link>

              <Link href="/menu" onClick={() => setOpen(false)} className="flex items-center gap-4 px-6 py-4 bg-white text-[#2C2416] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all group">
                <svg className="w-5 h-5 text-gray-500 group-hover:text-[#D4AF37] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="font-semibold text-[15px]">Menu</span>
              </Link>

              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-4 px-6 py-4 bg-white text-[#2C2416] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all group">
                <svg className="w-5 h-5 text-gray-500 group-hover:text-[#D4AF37] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-[15px]">About</span>
              </Link>

              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-4 px-6 py-4 bg-white text-[#2C2416] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all group">
                <svg className="w-5 h-5 text-gray-500 group-hover:text-[#D4AF37] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-semibold text-[15px]">Contact</span>
              </Link>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-gray-200 mx-6"></div>

            {/* Quick Actions */}
            <div className="py-5 bg-white">
              <div className="px-6 mb-3 flex items-center gap-2">
                <div className="w-1 h-4 bg-[#D4AF37] rounded-full"></div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Quick Actions</p>
              </div>

              <Link href="/cart" onClick={() => setOpen(false)} className="flex items-center justify-between px-6 py-4 bg-white hover:bg-[#D4AF37]/10 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <svg className="w-6 h-6 text-gray-500 group-hover:text-[#D4AF37] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#C97A5F] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                        {totalItems}
                      </span>
                    )}
                  </div>
                  <span className="font-semibold text-[#2C2416] group-hover:text-[#D4AF37] text-[15px]">Shopping Cart</span>
                </div>
                {totalItems > 0 && (
                  <div className="px-3 py-1 bg-[#C97A5F]/10 rounded-full">
                    <span className="text-[#C97A5F] font-bold text-sm">{totalItems}</span>
                  </div>
                )}
              </Link>

              {session && (
                <Link href="/orders" onClick={() => setOpen(false)} className="flex items-center gap-4 px-6 py-4 bg-white hover:bg-[#D4AF37]/10 transition-all group">
                  <svg className="w-6 h-6 text-gray-500 group-hover:text-[#D4AF37] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="font-semibold text-[#2C2416] group-hover:text-[#D4AF37] text-[15px]">My Orders</span>
                </Link>
              )}

              {/* Sign Out Button - Under My Orders */}
              {session && (
                <div className="px-6 pt-4">
                  <button
                    onClick={() => {
                      signOut();
                      setOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-3 py-3.5 bg-[#2C2416] hover:bg-[#D4AF37] text-white font-bold rounded-xl transition-all shadow-md border-2 border-[#2C2416] hover:border-[#D4AF37]"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="text-[15px]">Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Bottom spacing */}
            <div className="h-6"></div>
          </div>

          {/* NO BOTTOM BUTTON SECTION ANYMORE */}

        </div>
      )}
    </div>
  );
};

export default Menu;