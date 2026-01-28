import React from 'react'
import Image from 'next/image'
import { ProductType } from '@/types/types';

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const Featured = async () => {
  const featuredProducts: ProductType[] = await getData();

  return (
    <div className='w-screen overflow-x-scroll text-red-500' >
      {/* WRAPPER */}
      <div className='w-max flex'>
        {/* SINGLE ITEM */}
        {
          featuredProducts.map((item) => (
            <div key={item.id} className='w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]'>
              {/* IMAGE CONTAINER */}
              {
                item.img &&
                <div className='relative flex-1 w-full flex items-center justify-center'>
                  <div className='relative w-52 h-52 md:w-64 md:h-64 transform transition-transform duration-500 hover:rotate-60 active:rotate-60'>
                    <Image src={item.img} alt={item.title} fill className='object-contain' />
                  </div>
                </div>}
              {/* TEXT CONTAINER */}
              <div className='flex-1 flex flex-col text-center items-center gap-4 w-full'>
                <div className='flex flex-col gap-4'>
                  <h1 className='text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl'>{item.title}</h1>
                  <p className='p-4 2xl:p-8 h-32 md:h-40 xl:h-48 overflow-hidden'>{item.desc}</p>
                  <span className='text-xl font-bold'>${item.price}</span>
                </div>
                <button className='bg-red-500 text-white p-2 rounded-md'>Add to cart</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Featured