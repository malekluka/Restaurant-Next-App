"use client"

import { useParams } from "next/navigation";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState, useRef } from "react";
import CheckoutForm from "@/components/CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

const PayPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const [clientSecret, setClientSecret] = useState("");
  const hasCalledRef = useRef(false);

  useEffect(() => {
    if (!id) return;
    if (hasCalledRef.current) return;
    hasCalledRef.current = true;

    const makeRequest = async () => {
      try {
        const res = await fetch(`/api/create-intent/${id}`, {
          method: "POST",
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Server error:", text);
          return;
        }

        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Payment request error:", error);
      }
    };

    makeRequest();
  }, [id]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: { theme: "stripe" },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : (
        <div className="flex items-center justify-center min-h-[50vh]">
          Loading payment form...
        </div>
      )}
    </div>
  );
};

export default PayPage;