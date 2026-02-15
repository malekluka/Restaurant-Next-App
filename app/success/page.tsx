"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

// Separate component that uses useSearchParams
const SuccessContent = () => {
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const makeRequest = async () => {
      if (!payment_intent) {
        console.error("❌ No payment_intent in URL");
        setError("No payment intent found");
        setIsLoading(false);
        return;
      }

      try {
        // ✅ FIXED: Use relative URL instead of hardcoded localhost
        const response = await fetch(`/api/confirm/${payment_intent}`, {
          method: "PUT",
        });

        const data = await response.json();

        if (response.ok) {
          // ✅ Clear cart on successful payment
          const { useCartStore } = await import("@/utils/store");
          const clearCart = useCartStore.getState().clearCart;
          if (clearCart) clearCart();
          
          setIsLoading(false);
          // Wait 2 seconds to show success message, then redirect
          setTimeout(() => {
            router.push("/orders");
          }, 2000);
        } else {
          console.error("❌ Failed to confirm:", data);
          setError(data.error || "Failed to confirm payment");
          setIsLoading(false);
        }
      } catch (err) {
        console.error("❌ Error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
        setIsLoading(false);
      }
    };

    makeRequest();
  }, [payment_intent, router]);

  // ✅ Prevent back navigation to payment page
  useEffect(() => {
    // Replace history state so back button goes to orders, not payment
    window.history.replaceState(null, '', '/success');
    
    // Optional: Warn user if they try to leave
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isLoading) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isLoading]);

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--primary-cream)] pt-24 flex items-center justify-center p-4">
        <div className="card max-w-md w-full p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 rounded-full bg-[var(--error)]/10 flex items-center justify-center mx-auto">
              <svg className="w-10 h-10 text-[var(--error)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-display text-[var(--primary-deep)] mb-3">
            Payment Error
          </h1>
          <p className="text-[var(--accent-charcoal)] mb-6">{error}</p>
          <button
            onClick={() => router.push("/orders")}
            className="btn-primary w-full"
          >
            Go to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--primary-cream)] pt-24 flex items-center justify-center p-4">
      <div className="card max-w-md w-full p-8 text-center">
        {isLoading ? (
          <>
            <div className="mb-6">
              <div className="spinner mx-auto"></div>
            </div>
            <h1 className="text-2xl font-bold text-display text-[var(--primary-deep)] mb-3">
              Processing Payment...
            </h1>
            <p className="text-[var(--accent-charcoal)]">
              Please wait while we confirm your order.
            </p>
          </>
        ) : (
          <>
            <div className="mb-6">
              <div className="w-20 h-20 rounded-full bg-[var(--success)]/10 flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-[var(--success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-display text-[var(--primary-deep)] mb-4">
              Payment Successful!
            </h1>
            <p className="text-[var(--accent-charcoal)] mb-2">
              Thank you for your purchase.
            </p>
            <p className="text-sm text-[var(--accent-charcoal)]">
              Redirecting to your orders...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// Main component wrapped in Suspense
const SuccessPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--primary-cream)] pt-24 flex items-center justify-center p-4">
          <div className="card max-w-md w-full p-8 text-center">
            <div className="mb-6">
              <div className="spinner mx-auto"></div>
            </div>
            <h1 className="text-2xl font-bold text-display text-[var(--primary-deep)] mb-3">
              Loading...
            </h1>
            <p className="text-[var(--accent-charcoal)]">
              Please wait
            </p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
};

export default SuccessPage;