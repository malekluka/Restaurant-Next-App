"use client"
import React, {useState } from 'react'
import Image from 'next/image'

const data = [
  {
    id: 1,
    title: "always fresh & always crispy & always hot",
    image: "/slide1.png",
  },
  {
    id: 2,
    title: "we deliver your order wherever you are in NY",
    image: "/slide2.png",
  },
  {
    id: 3,
    title: "the best pizza to share with your family",
    image: "/slide3.jpg",
  },
];
const Slider = () => {
  const [currentSlide] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentSlide((prevSlide) => (prevSlide + 1) % data.length);
  //   }, 2000); 
  //   return () => clearInterval(interval);
  // }, []);

  
  return (
    <div className='flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50'>
      {/* TEXT CONTAINER */}
      <div className='flex-1 flex flex-col justify-center items-center gap-8 text-red-500 font-bold pb-6'>
        <h1 className='text-3xl text-center uppercase md:p-10 p-4 md:text-5xl xl:text-7xl'>
          {data[currentSlide].title}</h1>
        <button className='bg-red-500 text-white py-4 px-8'>Order Now</button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className='flex-1 w-full relative'>
        <Image src={data[currentSlide].image} alt='' fill className='object-cover'/>  
      </div>  
    </div>
  )
}

export default Slider