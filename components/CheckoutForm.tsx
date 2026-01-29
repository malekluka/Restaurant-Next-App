"use client";

import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import AddressForm from "./AddressForm";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXTAUTH_URL}/success`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "Something went wrong!");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[var(--primary-cream)] pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[var(--primary-gold)] text-sm tracking-widest uppercase font-medium mb-3">
            Secure Checkout
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-display text-[var(--primary-deep)]">
            Complete Your Order
          </h1>
          <div className="divider mx-auto mt-4"></div>
        </div>

        {/* Form Card */}
        <div className="card p-8">
          <form id="payment-form" onSubmit={handleSubmit} className="space-y-8">
            {/* Email */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--primary-deep)] mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--primary-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Information
              </h3>
              <LinkAuthenticationElement id="link-authentication-element" />
            </div>

            {/* Payment Details */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--primary-deep)] mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--primary-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Payment Details
              </h3>
              <PaymentElement
                id="payment-element"
                options={{
                  layout: "tabs",
                }}
              />
            </div>

            {/* Address */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--primary-deep)] mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--primary-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Delivery Address
              </h3>
              <AddressForm />
            </div>

            {/* Trust Badges */}
            <div className="bg-[var(--primary-cream)] rounded-lg p-6 border border-[var(--neutral-200)]">
              <div className="flex items-start gap-3 mb-3">
                <svg className="w-6 h-6 text-[var(--success)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold text-[var(--primary-deep)] mb-1">
                    Secure Payment
                  </p>
                  <p className="text-sm text-[var(--accent-charcoal)]">
                    Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={isLoading || !stripe || !elements}
              id="submit"
              className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="spinner"></div>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Complete Payment
                </span>
              )}
            </button>

            {/* Error Message */}
            {message && (
              <div className={`p-4 rounded-lg ${
                message.includes('succeeded') 
                  ? 'bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20' 
                  : 'bg-[var(--error)]/10 text-[var(--error)] border border-[var(--error)]/20'
              }`}>
                <div className="flex items-center gap-2">
                  {message.includes('succeeded') ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className="font-medium">{message}</span>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-[var(--accent-charcoal)]">
          <p>
            By completing this purchase, you agree to our{' '}
            <a href="#" className="text-[var(--primary-gold)] hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-[var(--primary-gold)] hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;