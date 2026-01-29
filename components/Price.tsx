"use client";
import { ProductType } from "@/types/types";
import { useCartStore } from "@/utils/store";
import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";

const Price = ({ product }: { product: ProductType }) => {
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  const { addToCart } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  // Calculate total price using useMemo instead of useEffect
  const totalPrice = useMemo(() => {
    return quantity *
      (product.options?.length
        ? product.price + product.options[selected].additionalPrice
        : product.price);
  }, [selected, quantity, product]);
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id.toString(),
      title: product.title,
      img: product.img,
      price: totalPrice,
      ...(product.options?.length && {
        optionTitle: product.options[selected]?.title,
      }),
      quantity: quantity,
    });
    toast.success("Added to cart!");       
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Price Display */}
      <div className="flex items-baseline gap-3">
        <h2 className="text-4xl font-bold text-[var(--primary-gold)] text-display">
          ${totalPrice.toFixed(2)}
        </h2>
        {product.options?.length && selected !== undefined && (
          <span className="text-sm text-[var(--accent-charcoal)]">
            Base: ${product.price.toFixed(2)} + ${product.options[selected]?.additionalPrice.toFixed(2)}
          </span>
        )}
      </div>

      {/* OPTIONS CONTAINER */}
      {product.options && product.options.length > 0 && (
        <div className="space-y-3">
          <label className="text-sm font-semibold text-[var(--primary-deep)] uppercase tracking-wide">
            Select Size
          </label>
          <div className="flex gap-3 flex-wrap">
            {product.options.map((option, index) => (
              <button
                key={option.title}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selected === index
                    ? 'bg-[var(--primary-gold)] text-white shadow-lg scale-105'
                    : 'bg-white text-[var(--primary-deep)] border-2 border-[var(--neutral-200)] hover:border-[var(--primary-gold)] hover:scale-105'
                }`}
                onClick={() => setSelected(index)}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="font-bold">{option.title}</span>
                  {option.additionalPrice > 0 && (
                    <span className="text-xs opacity-80">
                      +${option.additionalPrice}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* QUANTITY SELECTOR */}
        <div className="flex items-center gap-4 bg-white border-2 border-[var(--neutral-200)] rounded-lg px-6 py-3 flex-1">
          <span className="text-sm font-semibold text-[var(--primary-deep)] uppercase tracking-wide">
            Quantity
          </span>
          <div className="flex items-center gap-4 ml-auto">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
              className="w-8 h-8 rounded-full bg-[var(--neutral-100)] hover:bg-[var(--primary-gold)] hover:text-white text-[var(--primary-deep)] font-bold transition-all duration-300 flex items-center justify-center"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="text-xl font-bold text-[var(--primary-deep)] min-w-[2rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
              className="w-8 h-8 rounded-full bg-[var(--neutral-100)] hover:bg-[var(--primary-gold)] hover:text-white text-[var(--primary-deep)] font-bold transition-all duration-300 flex items-center justify-center"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {/* ADD TO CART BUTTON */}
        <button
          className="btn-primary sm:w-auto w-full px-10 py-4 text-lg font-semibold shadow-xl relative group"
          onClick={handleAddToCart}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Add to Cart
          </span>
        </button>
      </div>

      {/* Product Info */}
      <div className="flex items-center gap-4 text-sm text-[var(--accent-charcoal)] pt-2 border-t border-[var(--neutral-200)]">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-[var(--success)]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>In Stock</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-[var(--primary-gold)]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
          </svg>
          <span>Free Delivery over $50</span>
        </div>
      </div>
    </div>
  );
};

export default Price;