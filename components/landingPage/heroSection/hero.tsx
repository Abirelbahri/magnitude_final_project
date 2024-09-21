'use client'
import Image from 'next/image'
import React from 'react'
import { MdArrowOutward } from 'react-icons/md'
import Carousel from './Carousel'

const Hero = () => {
  const slides = ['/assets/heroSection/hero video.mp4', '/assets/heroSection/hero2.mp4', '/assets/heroSection/hero3.mp4'];

  return (
    <div className='relative container h-[50vh] lg:h-[100vh] w-full pt-5'>
      {/* Top section with collection details */}
      <div className="flex justify-between mb-4 px-4 lg:px-10">
        <div className="text-xs lg:text-lg flex flex-col text-[#aaa4a4] w-1/4 lg:w-1/5">
          <div className="flex items-center justify-between text-[#ebe7e2] mb-1">
            <p>Summer 2023 Collections</p>
            <MdArrowOutward className='cursor-pointer hover:scale-105 transition-transform duration-300'/>
          </div>
          <p className="italic text-sm">( 9 Public / 4 Limited editions )</p>
        </div>
        <div className="text-xs lg:text-lg flex flex-col text-[#aaa4a4] w-1/4 lg:w-1/5">
          <div className="flex items-center justify-between text-[#ebe7e2] mb-1">
            <p>Popular Men's Accessories</p>
            <MdArrowOutward className='cursor-pointer hover:scale-105 transition-transform duration-300'/>
          </div>
          <p className="italic text-sm">( 7 Public / 2 Limited editions )</p>
        </div>
      </div>

      {/* Hero Image */}
      <div className="flex justify-center items-center mt-5 lg:mt-10">
        <Image 
          src={'/assets/heroSection/MACHINIST (2).png'} 
          alt='Hero Image' 
          unoptimized={true} 
          width={800} 
          height={600} 
          className='w-[70vw] lg:w-[85vw] object-contain'
        />
      </div>

      {/* Large text and carousel for desktop */}
      <div className='hidden lg:flex justify-between mt-8'>
        <div className="text-white ml-[5%] w-[50%]">
          <p className="text-[3.8rem] lg:text-[4.5rem] leading-none">𝕸EN'S</p>
          <p className="text-[3.8rem] lg:text-[4.5rem] leading-none">CLOTꃅINᎶ</p>
          <p className="text-[3.8rem] lg:text-[4.5rem] leading-none">FᗩSHIꆂN</p>
        </div>
        <div className='rounded-2xl overflow-hidden w-[40%]'>
          <Carousel slides={slides} />
        </div>
      </div>
    </div>
  )
}

export default Hero;
