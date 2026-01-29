"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const UserLinks = ({ scrolled = true }: { scrolled?: boolean }) => {
  const { status } = useSession();
  
  const textColor = scrolled ? 'text-[var(--primary-deep)]' : 'text-white';
  const hoverColor = 'hover:text-[var(--primary-gold)]';
  
  return (
    <div className="flex items-center gap-4">
      {status === "authenticated" ? (
        <>
          <Link
            href="/orders"
            className={`font-medium text-sm ${textColor} ${hoverColor} transition-colors duration-300`}
          >
            Orders
          </Link>
          <button
            onClick={() => signOut()}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              scrolled
                ? 'bg-[var(--primary-deep)] text-white hover:bg-[var(--primary-gold)]'
                : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
            }`}
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          href="/login"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            scrolled
              ? 'bg-[var(--primary-gold)] text-white hover:bg-[var(--primary-deep)]'
              : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
          }`}
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default UserLinks;