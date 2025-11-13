import React from 'react'
import Navbar from './navbar'
import { Toaster } from 'sonner'

export default function Layout({children}: {children : React.ReactNode}) {
  return (
    <div className='bg-white h-full'>
    <Navbar />
     <div className="pt-22 bg-white px-10 min-h-screen bg-gradient-to-br from-[#09111f] via-background to-[#09111f]">
        <Toaster position='top-right' richColors />
        {children}
    </div>
    
    </div>
  )
}
