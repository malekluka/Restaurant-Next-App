"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();
  const {data:session} = useSession()
  const router = useRouter()

   useEffect(() => {
      useCartStore.persist.rehydrate();
    }, []);

  const handleCheckout = async() => {
  if(!session){
    router.push('/');
    return;
  }
  
  try {
    const res = await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        price: parseFloat(totalPrice.toFixed(2)), // ✅ Ensure it's a proper number
        products: products, // ✅ This should work if products is an array
        status: 'Not Paid!',
        userEmail: session.user?.email, // ✅ Changed from 'email'
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('API Error:', errorData);
      throw new Error(errorData.message || 'Failed to create order');
    }

    const data = await res.json();
    
    console.log('Order created:', data);
    
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
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      {/* PRODUCTS CONTAINER */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        {/* SINGLE ITEM CONTAONER */}
        {products.map((item) => (
          <div className="flex justify-between items-center mb-4" key={item.id}>
            {item.img && (
              <Image src={item.img} alt="" width={100} height={100} />
            )}
            <div className="ml-4">
              <h1 className="uppercase text-xl font-bold">{item.title} x {item.quantity}</h1>
              <span className="">{item.optionTitle}</span>
            </div>
            <h2 className="font-bold">{item.price}</h2>
            <span className="cursor-pointer" onClick={() => removeFromCart(item)}>X</span>
          </div>
        ))}
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col justify-center gap-4 lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="">Subtotal ({totalItems} items)</span>
          <span className="">{totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost</span>
          <span className="">$0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="">TOTAL(INCL. VAT)</span>
          <span className="font-bold">{totalPrice}</span>
        </div>
        <button className="bg-red-500 text-white p-3 rounded-md w-1/2 self-end" onClick={handleCheckout}>
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartPage;
