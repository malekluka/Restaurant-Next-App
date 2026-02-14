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
          {/* Premium spinner */}
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-[var(--primary-gold)]/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-[var(--primary-gold)] rounded-full animate-spin"></div>
          </div>
          <p className="text-[var(--accent-charcoal)] text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="min-h-screen bg-[var(--primary-cream)] flex items-center justify-center">
        <div className="text-center">
          {/* Premium spinner */}
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-[var(--primary-gold)]/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-[var(--primary-gold)] rounded-full animate-spin"></div>
          </div>
          <p className="text-[var(--accent-charcoal)] text-lg font-medium">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--primary-cream)] pt-20 pb-12 px-4 flex items-center justify-center">
      {/* Container */}
      <div className="w-full max-w-6xl">
        <div className="card overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2 gap-0">
            {/* IMAGE CONTAINER - Enhanced visibility */}
            <div className="relative hidden md:block h-full min-h-[500px]">
              <Image 
                src="/loginBg.png" 
                alt="Restaurant ambiance" 
                fill 
                className="object-cover"
                priority
              />
              {/* Multi-layer overlay for maximum text visibility */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/80"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/60"></div>
              
              {/* Content with MAXIMUM visibility */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-8 max-w-md">
                  {/* Decorative element */}
                  <div className="mb-6 flex justify-center">
                    <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full shadow-lg"></div>
                  </div>
                  
                  {/* Main heading - BRIGHT WHITE */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-black/50 blur-2xl rounded-lg"></div>
                    <h2 className="relative text-5xl font-bold text-display mb-4 leading-tight text-white" 
                        style={{ 
                          textShadow: '0 0 20px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.9), 0 4px 12px rgba(0,0,0,0.95), 0 2px 4px rgba(0,0,0,1), 0 8px 24px rgba(0,0,0,0.8), 2px 2px 4px rgba(0,0,0,1)',
                          letterSpacing: '0.02em',
                          color: '#FFFFFF'
                        }}>
                      Welcome Back!
                    </h2>
                  </div>
                  
                  {/* Subtitle - BRIGHT WHITE with dark background */}
                  <div className="relative">
                    <p className="text-xl font-semibold leading-relaxed px-5 py-4 bg-black/60 backdrop-blur-md rounded-xl border-2 border-white/20 shadow-2xl text-white"
                       style={{ 
                         textShadow: '0 0 15px rgba(0,0,0,1), 0 2px 8px rgba(0,0,0,1), 0 1px 3px rgba(0,0,0,1), 1px 1px 3px rgba(0,0,0,1)',
                         color: '#FFFFFF'
                       }}>
                      Your favorite meals are just a click away
                    </p>
                  </div>
                  
                  {/* Decorative bottom element */}
                  <div className="mt-8 flex justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--primary-gold)] animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-[var(--primary-gold)] animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-[var(--primary-gold)] animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  
                  {/* Optional: Add a decorative icon */}
                  <div className="mt-8 inline-block p-4 bg-[var(--primary-gold)]/20 backdrop-blur-sm rounded-full border-2 border-[var(--primary-gold)]/40">
                    <svg className="w-8 h-8 text-[var(--primary-gold)]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* FORM CONTAINER */}
            <div className="p-8 sm:p-12 flex flex-col justify-center bg-white">
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
                  className="w-full flex items-center justify-center gap-4 p-4 bg-white border-2 border-[var(--neutral-200)] rounded-xl hover:border-[var(--primary-gold)] hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group active:scale-[0.98]"
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
                  <span className="font-semibold text-[var(--primary-deep)] group-hover:text-[var(--primary-gold)] transition-colors">
                    Continue with Google
                  </span>
                </button>

                {/* Facebook Login */}
                <button 
                  className="w-full flex items-center justify-center gap-4 p-4 bg-white border-2 border-[var(--neutral-200)] rounded-xl opacity-60 cursor-not-allowed"
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
                  <span className="font-medium text-[var(--accent-charcoal)]">
                    Continue with Facebook (Coming Soon)
                  </span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-[var(--neutral-200)]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-[var(--accent-charcoal)] font-medium">
                    Secure Login
                  </span>
                </div>
              </div>

              {/* Security Info */}
              <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-[var(--primary-gold)]/10 to-[var(--primary-gold)]/5 rounded-lg mb-6 border border-[var(--primary-gold)]/20">
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
                <Link href="/" className="text-[var(--primary-gold)] hover:underline font-semibold transition-colors">
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