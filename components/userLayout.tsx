import React from 'react'
import Navbar from './navbar'

export default function UserLayout({children}: {children : React.ReactNode}) {
  return (
    <div className='bg-white h-full py-20'>
    <Navbar />
    <div>
        {children}
    </div>
    
    </div>
  )
}
