"use client"

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[var(--primary-cream)] flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mb-4"></div>
          <p className="text-[var(--accent-charcoal)]">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="min-h-screen bg-[var(--primary-cream)] flex items-center justify-center">
        <p className="text-[var(--accent-charcoal)]">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--primary-cream)] pt-20 pb-12 px-4 flex items-center justify-center">
      {/* Container */}
      <div className="w-full max-w-6xl">
        <div className="card overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* IMAGE CONTAINER - Hidden on small screens, shown on md+ */}
            <div className="relative hidden md:block h-full min-h-[500px]">
              <Image 
                src="/loginBg.png" 
                alt="Restaurant ambiance" 
                fill 
                className="object-cover"
                priority
              />
              {/* Overlay with branding */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-deep)]/80 to-[var(--primary-gold)]/60 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <h2 className="text-4xl font-bold text-display mb-4">Welcome Back!</h2>
                  <p className="text-lg opacity-90">Your favorite meals are just a click away</p>
                </div>
              </div>
            </div>

            {/* FORM CONTAINER */}
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              {/* Logo for mobile */}
              <div className="md:hidden text-center mb-8">
                <h1 className="text-4xl font-bold text-display text-[var(--primary-deep)] mb-2">
                  Savoria
                </h1>
                <p className="text-sm text-[var(--accent-charcoal)]">Fine Dining Experience</p>
              </div>

              {/* Welcome Text */}
              <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-display text-[var(--primary-deep)] mb-3">
                  Sign In
                </h1>
                <p className="text-[var(--accent-charcoal)]">
                  Log into your account or create a new one using social buttons
                </p>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-4">
                {/* Google Login */}
                <button 
                  className="w-full flex items-center justify-center gap-4 p-4 bg-white border-2 border-[var(--neutral-200)] rounded-xl hover:border-[var(--primary-gold)] hover:shadow-lg transition-all duration-300 group"
                  onClick={() => signIn('google')}
                >
                  <div className="relative w-6 h-6 flex-shrink-0">
                    <Image 
                      src="/google.png" 
                      alt="Google" 
                      width={24} 
                      height={24} 
                      className="object-contain" 
                    />
                  </div>
                  <span className="font-medium text-[var(--primary-deep)] group-hover:text-[var(--primary-gold)] transition-colors">
                    Continue with Google
                  </span>
                </button>

                {/* Facebook Login */}
                <button 
                  className="w-full flex items-center justify-center gap-4 p-4 bg-white border-2 border-[var(--neutral-200)] rounded-xl hover:border-[#1877F2] hover:shadow-lg transition-all duration-300 group"
                  disabled
                >
                  <div className="relative w-6 h-6 flex-shrink-0">
                    <Image 
                      src="/facebook.png" 
                      alt="Facebook" 
                      width={24} 
                      height={24} 
                      className="object-contain opacity-50" 
                    />
                  </div>
                  <span className="font-medium text-[var(--accent-charcoal)] opacity-50">
                    Continue with Facebook (Coming Soon)
                  </span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[var(--neutral-200)]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-[var(--accent-charcoal)]">
                    Secure Login
                  </span>
                </div>
              </div>

              {/* Security Info */}
              <div className="flex items-start gap-3 p-4 bg-[var(--primary-gold)]/10 rounded-lg mb-6">
                <svg className="w-5 h-5 text-[var(--primary-gold)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div className="text-sm">
                  <p className="font-semibold text-[var(--primary-deep)] mb-1">
                    Your data is safe
                  </p>
                  <p className="text-[var(--accent-charcoal)] text-xs">
                    We use industry-standard encryption to protect your information
                  </p>
                </div>
              </div>

              {/* Help Text */}
              <p className="text-sm text-center text-[var(--accent-charcoal)]">
                Having trouble signing in?{' '}
                <Link href="/" className="text-[var(--primary-gold)] hover:underline font-medium">
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;