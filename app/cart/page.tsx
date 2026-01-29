"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const handleCheckout = async () => {
    if (!session) {
      router.push('/');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: parseFloat(totalPrice.toFixed(2)),
          products: products,
          status: 'Not Paid!',
          userEmail: session.user?.email,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.message || 'Failed to create order');
      }

      const data = await res.json();

      if (!data.id) {
        throw new Error('Order ID not returned');
      }

      router.push(`/pay/${data.id}`);
    } catch (error) {
      console.error("Checkout error:", error);
      alert('Failed to create order. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--primary-cream)] pt-24 pb-12">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-20 xl:px-40">
        {/* Page Header */}
        <div className="text-center mb-12">
          <p className="text-[var(--primary-gold)] text-sm tracking-widest uppercase font-medium mb-3">
            Your Order
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-display text-[var(--primary-deep)]">
            Shopping Cart
          </h1>
          <div className="divider mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* PRODUCTS CONTAINER */}
          <div className="lg:col-span-2">
            {products.length === 0 ? (
              <div className="card p-12 text-center">
                <svg className="w-24 h-24 mx-auto mb-6 text-[var(--neutral-300)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <h3 className="text-2xl font-bold text-display text-[var(--primary-deep)] mb-3">
                  Your cart is empty
                </h3>
                <p className="text-[var(--accent-charcoal)] mb-6">
                  Add some delicious items to get started!
                </p>
                <button
                  onClick={() => router.push('/menu')}
                  className="btn-primary"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((item) => (
                  <div className="card p-6" key={item.id}>
                    <div className="flex gap-6">
                      {/* Image */}
                      {item.img && (
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.img}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-display text-[var(--primary-deep)] mb-1">
                          {item.title}
                        </h3>
                        {item.optionTitle && (
                          <p className="text-sm text-[var(--accent-charcoal)] mb-2">
                            Size: {item.optionTitle}
                          </p>
                        )}
                        <p className="text-sm text-[var(--accent-charcoal)]">
                          Quantity: <span className="font-semibold">{item.quantity}</span>
                        </p>
                      </div>

                      {/* Price & Remove */}
                      <div className="flex flex-col items-end justify-between">
                        <span className="text-2xl font-bold text-[var(--primary-gold)]">
                          ${item.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item)}
                          className="text-[var(--error)] hover:text-[var(--error)]/80 transition-colors p-2 hover:bg-red-50 rounded-lg"
                          aria-label="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-28">
              <h2 className="text-2xl font-bold text-display text-[var(--primary-deep)] mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[var(--accent-charcoal)]">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[var(--accent-charcoal)]">
                  <span>Service Fee</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--accent-charcoal)]">Delivery</span>
                  <span className="text-[var(--success)] font-semibold">FREE</span>
                </div>

                <div className="border-t border-[var(--neutral-200)] pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-[var(--primary-deep)]">
                      Total
                    </span>
                    <span className="text-3xl font-bold text-[var(--primary-gold)]">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--accent-charcoal)] mt-1">
                    (Including VAT)
                  </p>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={products.length === 0}
                className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Proceed to Checkout
                </span>
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-[var(--neutral-200)]">
                <div className="flex items-center gap-3 text-sm text-[var(--accent-charcoal)] mb-3">
                  <svg className="w-5 h-5 text-[var(--success)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[var(--accent-charcoal)]">
                  <svg className="w-5 h-5 text-[var(--primary-gold)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                  <span>Free delivery over $50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;