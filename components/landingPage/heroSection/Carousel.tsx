import Image from "next/image";
import { useState, useEffect } from "react";

export default function Carousel({
  autoSlide = true,
  autoSlideInterval = 20000,
  slides,
}: {
  autoSlide?: boolean;
  autoSlideInterval?: number;
  slides: string[];
}) {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div>
      <div className=" relative ml-[14%] h-[45vh]    w-[64%] rounded-[25px] mt-[-3%] flex justify-center overflow-hidden" >
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((video) => (
            <video src={video} className='flex  h-[308px] rounded-lg' key={video} autoPlay muted loop />
        ))}
      </div>
      <div className="absolute bottom-[1%]  right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div key={i}
              className={`
              transition-all w-[20%] h-[2px] bg-white 
              ${curr === i && "bg-opacity-50"}
            `}
            />
          ))}
        </div>
      </div>
    </div>
{/*     <div className="absolute ml-[35%] lg:w-[58%] inset-0 flex items-center justify-between md:mt-[7%] lg:mt-[6%] z-50">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow  text-white hover:text-white/90"
        >
        <Image src={'/assets/heroSection/leftArrow.png'} alt='k' unoptimized={true} width={100} height={100} className=' z-60  pt-[1%]'/>
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow  text-white hover:text-white/90"
        >
        <Image src={'/assets/heroSection/circleB.png'} alt='k' unoptimized={true} width={110} height={110} className=' z-60  pt-[1%]'/>
        </button>
      </div> */}
    </div>
  );
}