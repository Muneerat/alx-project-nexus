import React from 'react'
import Navbar from './navbar'
import { Toaster } from 'sonner'

export default function UserLayout({children}: {children : React.ReactNode}) {
  return (
    <div className='bg-white h-full py-20'>
    <Navbar />
    <div>
        <Toaster position='top-right' richColors />
        {children}
    </div>
    
    </div>
  )
}
