"use client";
import { ProductType } from "@/types/types";
import { useCartStore } from "@/utils/store";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Price = ({ product }: { product: ProductType }) => {
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  const { addToCart } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTotalPrice(
      quantity *
        (product.options?.length
          ? product.price + product.options[selected].additionalPrice
          : product.price)
    );
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
            })
     toast.success("Added to cart!");       
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">${totalPrice}</h2>
      {/* OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {product.options &&
          product.options.map((option, index) => (
            <button
              key={option.title}
              className="min-w-24 p-2 ring-1 ring-red-400 rounded-md"
              style={{
                background:
                  selected === index ? "var(--color-red-400)" : "white",
                color: selected === index ? "white" : "red",
              }}
              onClick={() => setSelected(index)}
            >
              {option.title}
            </button>
          ))}
      </div>
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex justify-between items-center">
        {/* QUANTITY */}
        <div className="flex justify-between w-full p-3 ring-1 ring-red-500 rounded-md">
          <span>Quantity</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {">"}
            </button>
          </div>
        </div>

        {/* CART BUTTON */}
        <button
          className="uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-500"
          onClick={() =>
            handleAddToCart()
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;
