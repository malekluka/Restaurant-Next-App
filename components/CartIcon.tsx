"use client";
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useCartStore } from '@/utils/store';

const CartIcon = ({ scrolled = true }: { scrolled?: boolean }) => {
  const { totalItems } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <Link
      href="/cart"
      className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 group ${
        scrolled
          ? 'bg-[var(--primary-gold)]/10 hover:bg-[var(--primary-gold)] hover:text-white'
          : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white'
      }`}
    >
      <div className="relative">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--accent-terracotta)] text-white text-xs rounded-full flex items-center justify-center font-bold">
            {totalItems}
          </span>
        )}
      </div>
      <span className="font-medium hidden md:inline">Cart</span>
    </Link>
  );
};

export default CartIcon;