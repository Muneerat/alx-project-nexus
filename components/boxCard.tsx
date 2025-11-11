
import { BoxCardProps } from '@/interface'
import React from 'react'


export default function BoxCard({text,number}: BoxCardProps) {
  return (
    <div className='flex flex-col items-center justify-center text-[#001124] border-2 border-[#001124] rounded-lg p-4'>
        <p className='text-3xl font-bold capitalize'>{text}</p>
        <p className='text-2xl font-bold'>{number}</p>
    </div>
  )
}
