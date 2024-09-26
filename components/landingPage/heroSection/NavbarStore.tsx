'use client'
import { useSession , signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { BiLogoInstagramAlt, BiLogoTwitter, BiLogoYoutube } from 'react-icons/bi'
import { FaRegHeart } from 'react-icons/fa6'
import { RiShoppingBag2Line } from 'react-icons/ri'
import { GiEntryDoor } from 'react-icons/gi'

interface NavbarProps {
  onCartClick: () => void;
}

const Navbar2: React.FC<NavbarProps> = ({ onCartClick }) => {
    const { data: session } = useSession();

  return (
    <div className="  flex justify-between items-center container text-white pt-4 pb-4">
    <div className="flex-1 flex container">
        <div className="dropdown ">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-white ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-15 w-15" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a className='text-black' >Homepage</a></li>
            <li><a className='text-black' >Portfolio</a></li>
            <li><a className='text-black' >About</a></li>
        </ul>
        </div>
    </div>
    <div className="flex flex-[3] justify-center">
    <div className="flex flex-[3] justify-center font-bold text-xl">
    MACHINISTE
    </div>
    </div>
    {session ? (
        <div className="w-1/5 h-25 flex justify-between gap-2  items-center border border-gray-600 rounded-full">
          <div className="ml-[10px] mr-[10px] cursor-pointer"><button onClick={()=>signOut() }><GiEntryDoor className='w-7 h-7'/></button></div>
          <div className="ml-[10px] mr-[10px] cursor-pointer"><FaRegHeart className='w-5 h-5'/></div>
          <div className="ml-[10px] mr-[10px] cursor-pointer"><RiShoppingBag2Line className='w-6 h-6'/></div>
        </div>
      ) : (
        <div className="w-1/5 h-15 flex justify-between gap-2  items-center border border-gray-600 rounded-full">
          <div className="w-[65%]"><p className="text-black text-lg bg-white rounded-full  cursor-pointer text-center"><Link href='/login' className='text-sm font-semibold align-middle'>Member Login</Link></p></div>
          <div className="ml-[10px] mr-[10px] cursor-pointer"><FaRegHeart/></div>
          <div className="ml-[10px] mr-[10px] cursor-pointer" onClick={onCartClick}><RiShoppingBag2Line/></div>
        </div>
      )}
    </div>
  )
}

export default Navbar2
