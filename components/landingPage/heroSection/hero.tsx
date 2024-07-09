'use client'
import Image from 'next/image'
import React from 'react'
import { MdArrowOutward } from 'react-icons/md'
import Carousel from './Carousel';


const Hero = () => {
  const slides = ['/assets/heroSection/hero video.mp4', '/assets/heroSection/hero2.mp4', '/assets/heroSection/hero3.mp4'];
  return (
    <div className='relative container h-[40vh] lg:h-[100vh] w-[100vw] pt-5' >
        <div className="flex justify-between mb-[-2%] ">
        <div className="text-xs lg:text-xl flex flex-col text-[#aaa4a4] w-[17%] ml-[3%]">
          <div className="flex items-center justify-between text-[#ebe7e2]">
            <p>Summer 2023 collections </p>
            <MdArrowOutward className='cursor-pointer'/>
          </div>
          <p className="text italic">( 9 Public</p>
          <p className="text italic">/ 4 Limited editions )</p>
        </div>
        <div className=" text-xs lg:text-xl flex flex-col text-[#aaa4a4] mr-7 w-[17%] ml-[3%]">
          <div className="flex items-center justify-between  text-[#ebe7e2]">
            <p>Popular men&#39;s accessories</p>
            <MdArrowOutward className='cursor-pointer'/>
          </div>
          <p className="text italic ">( 7 Public</p>
          <p className="text italic">/ 2 Limited editions )</p>
        </div>
        </div>
        
        <Image src={'/assets/heroSection/MACHINIST (2).png'} alt='k' unoptimized={true} width={80} height={80} className='items-center justify-center w-[70vh] lg:w-[85vw] relative z-60 ml-[4%] mt-[2%] pt-[1%]'/>
        <div className='hidden lg:flex justify-between '>
        <div className=" text-white ml-[3%] mt-[5%] w-[60%]">
          <p className="text-[380%] mb-[-5%]">𝕸EN&#39;S</p>
          <p className="text-[380%] mb-[-5%]">CLOTꃅINᎶ</p>
          <p className="text-[380%] ">FᗩSHIꆂN</p>
        </div>
        <div className=' rounded-[25px] overflow-hidden mt-[-2%] h-[100%] w-[100%]'>
        <Carousel slides={slides}  />
        </div>
        </div>
        <div>
        </div>
      <div>
      </div>
      </div>
    
  )
}

export default Hero



