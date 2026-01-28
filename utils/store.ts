import { ActionTypes, CartType } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<CartType & ActionTypes>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,

      addToCart: (item) => {
        const products = get().products;
        const existingProduct = products.find(
          (product) =>
            product.id === item.id && product.optionTitle === item.optionTitle
        );

        if (existingProduct) {
          const updatedProducts = products.map((product) =>
            product.id === existingProduct.id &&
            product.optionTitle === existingProduct.optionTitle
              ? {
                  ...product,
                  quantity: product.quantity + item.quantity,
                  price: product.price + item.price, // ✅ Add the total prices
                }
              : product
          );

          set((state) => ({
            products: updatedProducts,
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price, // ✅ item.price is already total
          }));
        } else {
          set((state) => ({
            products: [...state.products, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price, // ✅ item.price is already total
          }));
        }
      },

      removeFromCart: (item) => {
        set((state) => ({
          products: state.products.filter(
            (product) =>
              product.id !== item.id || product.optionTitle !== item.optionTitle
          ),
          totalItems: state.totalItems - item.quantity,
          totalPrice: state.totalPrice - item.price, // ✅ Subtract the same way
        }));
      },
    }),
    {
      name: "cart-storage",
      skipHydration: true,
    }
  )
);