"use client";
import { OrderType } from '@/types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'unauthenticated') {
    router.push("/");
  }

  const { isPending, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      fetch(`${process.env.NEXTAUTH_URL}/api/orders`).then((res) =>
        res.json(),
      ),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`${process.env.NEXTAUTH_URL}/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(status),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    }
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string, currentStatus: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const newStatus = input.value.trim();

    // Check if status actually changed
    if (!newStatus) {
      toast.error("Status cannot be empty!");
      return;
    }

    if (newStatus === currentStatus) {
      toast.info("Status unchanged - no update needed");
      return;
    }

    // Only update if status changed
    mutation.mutate({ id, status: newStatus });
    toast.success("Order status updated successfully!");
  };

  if (isPending || status === "loading") {
    return (
      <div className="min-h-screen bg-[var(--primary-cream)] pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mb-4"></div>
          <p className="text-[var(--accent-charcoal)]">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--primary-cream)] pt-24 pb-12">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-20 xl:px-40">
        {/* Page Header */}
        <div className="mb-12">
          <p className="text-[var(--primary-gold)] text-sm tracking-widest uppercase font-medium mb-3">
            Your Orders
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-display text-[var(--primary-deep)]">
            Order History
          </h1>
          <div className="divider mt-4"></div>
        </div>

        {/* Orders List */}
        {!data || data.length === 0 ? (
          <div className="card p-12 text-center">
            <svg className="w-24 h-24 mx-auto mb-6 text-[var(--neutral-300)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-2xl font-bold text-display text-[var(--primary-deep)] mb-3">
              No orders yet
            </h3>
            <p className="text-[var(--accent-charcoal)] mb-6">
              Start ordering delicious food!
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
            {data.map((item: OrderType) => (
              <div
                key={item.id}
                className={`card p-6 transition-all duration-300 ${
                  item.status.toLowerCase().includes('delivered') || item.status.toLowerCase().includes('prepared')
                    ? 'border-l-4 border-[var(--success)]'
                    : 'border-l-4 border-[var(--primary-gold)]'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                  {/* Order ID & Date */}
                  <div>
                    <p className="text-xs text-[var(--accent-charcoal)] mb-1">Order ID</p>
                    <p className="font-mono text-sm font-semibold text-[var(--primary-deep)] mb-2">
                      #{item.id.slice(0, 8)}
                    </p>
                    <p className="text-xs text-[var(--accent-charcoal)] flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(item.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>

                  {/* Products */}
                  <div className="md:col-span-2">
                    <p className="text-xs text-[var(--accent-charcoal)] mb-2">Items</p>
                    <div className="space-y-1">
                      {item.products.slice(0, 2).map((product, index) => (
                        <p key={index} className="text-sm font-medium text-[var(--primary-deep)]">
                          • {product.title} {product.quantity > 1 && `(x${product.quantity})`}
                        </p>
                      ))}
                      {item.products.length > 2 && (
                        <p className="text-xs text-[var(--accent-charcoal)]">
                          +{item.products.length - 2} more items
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <p className="text-xs text-[var(--accent-charcoal)] mb-1">Total</p>
                    <p className="text-2xl font-bold text-[var(--primary-gold)]">
                      ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    {session?.user.isAdmin ? (
                      <form
                        className="flex items-center gap-2"
                        onSubmit={(e) => handleUpdate(e, item.id, item.status)}
                      >
                        <input
                          placeholder={item.status}
                          defaultValue={item.status}
                          className="input-field text-sm py-2 flex-1"
                        />
                        <button
                          type="submit"
                          className="p-2 bg-[var(--primary-gold)] hover:bg-[var(--primary-deep)] text-white rounded-lg transition-colors duration-300"
                          aria-label="Update status"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      </form>
                    ) : (
                      <div>
                        <p className="text-xs text-[var(--accent-charcoal)] mb-1">Status</p>
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                            item.status.toLowerCase().includes('delivered') || item.status.toLowerCase().includes('prepared')
                              ? 'bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20'
                              : item.status.toLowerCase().includes('paid')
                              ? 'bg-[var(--primary-gold)]/10 text-[var(--primary-gold)] border border-[var(--primary-gold)]/20'
                              : 'bg-[var(--neutral-200)] text-[var(--accent-charcoal)] border border-[var(--neutral-300)]'
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full bg-current"></span>
                          {item.status}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;