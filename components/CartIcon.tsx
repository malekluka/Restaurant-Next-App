"use client";
import Link from 'next/link'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useCartStore } from '@/utils/store';

const CartIcon = () => {
    const {totalItems } = useCartStore();

    useEffect(() => {
        useCartStore.persist.rehydrate();
      }, []);
  
  return (
    <Link href= "/cart" className='flex items-center gap-2'>
        <div className='w-8 h-8 relative md:w-5 md:h-5'>
            <Image src="/cart.png" alt="cart" fill/>
        </div>
        <span>Cart ({totalItems})</span>
    </Link>
  )
}

export default CartIcon