
import { BoxCardProps } from '@/interface'
import React from 'react'


export default function BoxCard({text,number}: BoxCardProps) {
  return (
    <div className='flex flex-col items-center justify-center bg-white text-main/90 border-2 border-main rounded-lg p-6 gap-4'>
        <p className='text-3xl font-bold capitalize'>{text}</p>
        <p className='text-2xl font-bold'>{number}</p>
    </div>
  )
}
