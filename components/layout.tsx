import React from 'react'
import Navbar from './navbar'
import { Toaster } from 'sonner'

export default function Layout({children}: {children : React.ReactNode}) {
  return (
    <div className='bg-white h-full'>
    <Navbar />
     <div className="pt-22 bg-main px-10 min-h-screen ">
        <Toaster position='top-right' richColors />
        {children}
    </div>
    
    </div>
  )
}
