import React from 'react'
import img from "@/public/assets/mainimg.svg"
import Image from 'next/image'

export default function AuthLayouts({children}: { children :React.ReactNode}) {
  return (
    <div className='flex justify-between w-full h-screen my-auto'>
        <div className='w-1/2 hidden md:block'>
            <Image src={img} alt="auth img" width="00" height="200" className='w-4/6 flex justify-center items-center' />
            <div className='text-center flex flex-col gap-4'>
            <h1 className='text-white text-3xl  '>Be a part of decision</h1>
            <h1 className='text-[#015FC7] text-8xl'>Vote Today</h1>
        </div>
        </div>
        <div className='md:w-1/2 w-full bg-[#001124] flex justify-center m-auto 
        '>
            {children}
        </div>
    </div>
  )
}
