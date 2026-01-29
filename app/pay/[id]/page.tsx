"use client"
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { use, useEffect, useState, useRef } from 'react';
import CheckoutForm from '@/components/CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

const PayPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [clientSecret, setClientSecret] = useState("")
  const { id } = use(params); 
  const hasCalledRef = useRef(false); // ✅ Prevent duplicate calls

  useEffect(() => {
    // ✅ Skip if already called
    if (hasCalledRef.current) return;
    hasCalledRef.current = true;

    const makeRequest = async () => {
      try {
        console.log("🔍 Requesting payment intent for order:", id);
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/create-intent/${id}`, {
          method: 'POST',
        });
        const data = await res.json();
        console.log("✅ Received client secret:", data.clientSecret?.substring(0, 20) + "...");
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('❌ Error making payment request:', error);
      }
    }
    makeRequest();
  }, [id]);
  
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading payment form...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default PayPage