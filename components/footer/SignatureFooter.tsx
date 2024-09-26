import React from "react";
import Link from "next/link";
import {
  BiLogoInstagramAlt,
  BiLogoTwitter,
  BiLogoYoutube,
} from "react-icons/bi";

const icons = [
  {
    name: "Instagram",
    icon: BiLogoInstagramAlt,
  },
  {
    name: "Twitter",
    icon: BiLogoTwitter,
  },
  {
    name: "Youtube",
    icon: BiLogoYoutube,
  },
];

const SignatureFooter = () => {
  return (
    <>
      <div className="w-full  mt-auto">
      <div className="flex justify-center bottom-0 items-center w-full mr-[8px]">
        <div className="flex w-[80%] bg-[#434343] h-14 items-start justify-start rounded-tr-3xl">
          <h1 className="py-3 pl-3 font-bold mt-1 text-md text-white">MACHINISTE</h1>
        </div>
        <div className="bg-[#434343] w-[20%] items-center justify-center flex h-14 rounded-tl-3xl ml-[2px]">
          {icons.map((x, index) => {
            return (
              <x.icon
                key={index}
                color="black"
                className="mr-[20px] p-[2px] w-[25px] h-[25px] bg-white rounded-full relative cursor-pointer"
              />
            );
          })}
        </div>
      </div>
      </div>
    </>
  );
};

export default SignatureFooter;
