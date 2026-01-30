import React from "react";
import Image from "next/image";
import Link from "next/link";
import Price from "@/components/Price";
import { ProductType } from "@/types/types";
import DeleteButton from "@/components/DeleteButton";

const getData = async (id:string) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const SingleProductPage = async({params} : {params: Promise<{id:string}>}) => {
  const { id } = await params;
  const singleProduct: ProductType = await getData(id);
  
  return (
    <div className="min-h-screen bg-[var(--primary-cream)] pt-24 pb-12">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-[var(--accent-charcoal)]">
          <Link href="/" className="hover:text-[var(--primary-gold)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/menu" className="hover:text-[var(--primary-gold)] transition-colors">Menu</Link>
          <span>/</span>
          <span className="text-[var(--primary-deep)] font-medium">{singleProduct.title}</span>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative">
          {/* Delete Button */}
          <DeleteButton id={String(singleProduct.id)} />

          {/* IMAGE CONTAINER */}
          {singleProduct.img && (
            <div className="relative">
              <div className="aspect-square relative rounded-2xl overflow-hidden bg-white shadow-xl">
                <Image
                  src={singleProduct.img}
                  alt={singleProduct.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Featured Badge */}
              <div className="absolute top-4 left-4 badge badge-gold backdrop-blur-sm">
                Premium Quality
              </div>
            </div>
          )}

          {/* TEXT CONTAINER */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Category Tag */}
            <span className="text-[var(--primary-gold)] text-sm tracking-widest uppercase font-medium">
              Signature Dish
            </span>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-display text-[var(--primary-deep)] leading-tight">
              {singleProduct.title}
            </h1>

            {/* Divider */}
            <div className="divider"></div>

            {/* Description */}
            <p className="text-[var(--accent-charcoal)] text-base sm:text-lg leading-relaxed">
              {singleProduct.desc}
            </p>

            {/* Price Component */}
            <div className="pt-4">
              <Price product={singleProduct} />
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[var(--neutral-200)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--success)]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--success)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[var(--accent-charcoal)]">Preparation</p>
                  <p className="font-semibold text-[var(--primary-deep)]">15-20 min</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--primary-gold)]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--primary-gold)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[var(--accent-charcoal)]">Rating</p>
                  <p className="font-semibold text-[var(--primary-deep)]">4.9/5.0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;