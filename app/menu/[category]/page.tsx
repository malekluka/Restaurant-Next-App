import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ProductType } from "@/types/types";
import { getAuthSession } from "@/utils/auth";

const getData = async (category: string) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products?category=${category}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

type Props = {
  params: { category: string } | Promise<{ category: string }>;
};

const CategoryPage = async ({ params }: Props) => {
  const { category } = await params;
  const products: ProductType[] = await getData(category);
  const session = await getAuthSession();

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <div className="text-center py-16 space-y-4 px-4">
        <p className="text-[var(--primary-gold)] text-sm tracking-widest uppercase font-medium">
          Menu / {category}
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-display text-[var(--primary-deep)] capitalize">
          {category}
        </h1>
        <div className="divider mx-auto"></div>

        {/* Add Product Button (Admin Only) */}
        {session?.user.isAdmin && (
          <Link href={`/add?category=${category}`}>
            <button className="btn-primary mt-6">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Product
              </span>
            </button>
          </Link>
        )}
      </div>

      {/* Products Grid */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-20 xl:px-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item, index) => (
            <Link
              href={`/product/${item.id}`}
              key={item.id}
              className="card-product animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Image */}
              {item.img && (
                <div className="image-zoom-container relative h-64 bg-[var(--neutral-100)]">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="image-zoom object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6 space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-display text-[var(--primary-deep)] group-hover:text-[var(--primary-gold)] transition-colors flex-1">
                    {item.title}
                  </h3>
                  <span className="text-2xl font-bold text-[var(--primary-gold)] ml-4">
                    ${item.price}
                  </span>
                </div>

                <p className="text-[var(--accent-charcoal)] text-sm line-clamp-2">
                  {item.desc}
                </p>

                <button className="w-full py-2 bg-[var(--primary-deep)] text-white rounded-lg font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-[var(--primary-gold)]">
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;