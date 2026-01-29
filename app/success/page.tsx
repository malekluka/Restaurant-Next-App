"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const SuccessPage = () => {
  const searchParams = useSearchParams()
  const payment_intent = searchParams.get("payment_intent")
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => { 
    const makeRequest = async () => {
      if (!payment_intent) {
        console.error("❌ No payment_intent in URL");
        setError("No payment intent found");
        setIsLoading(false);
        return;
      }

      try {
        
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/confirm/${payment_intent}`, {
          method: "PUT",
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setIsLoading(false);
          // Wait 1 second to show success message, then redirect
          setTimeout(() => {
            router.push("/orders");
          }, 1000);
        } else {
          console.error("❌ Failed to confirm:", data);
          setError(data.error || "Failed to confirm payment");
          setIsLoading(false);
        }
      }
      catch(err) {
        console.error("❌ Error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
        setIsLoading(false);
      }
    }
    
    makeRequest();
  }, [payment_intent, router])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
          <div className="mb-4">
            <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push("/orders")}
            className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition"
          >
            Go to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        {isLoading ? (
          <>
            <div className="mb-4">
              <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment...</h1>
            <p className="text-gray-600">Please wait while we confirm your order.</p>
          </>
        ) : (
          <>
            <div className="mb-4">
              <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
            <p className="text-gray-600 mb-4">Thank you for your purchase.</p>
            <p className="text-sm text-gray-500">Redirecting to your orders...</p>
          </>
        )}
      </div>
    </div>
  )
}

export default SuccessPage