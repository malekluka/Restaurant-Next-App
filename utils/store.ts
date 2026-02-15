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
                  price: product.price + item.price,
                }
              : product
          );

          set((state) => ({
            products: updatedProducts,
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        } else {
          set((state) => ({
            products: [...state.products, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
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
          totalPrice: state.totalPrice - item.price,
        }));
      },

      // ✅ NEW: Clear cart function
      clearCart: () => {
        set(INITIAL_STATE);
      },
    }),
    {
      name: "cart-storage",
      skipHydration: true,
    }
  )
);