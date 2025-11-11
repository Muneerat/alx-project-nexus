import React from 'react'
import AdminNavbar from './adminNav'
import { Toaster } from 'sonner'

export default function AdminLayout({children}: {children : React.ReactNode}) {
  return (
    <div className='bg-white h-[100vh] py-20'>
    <AdminNavbar />

    <div>
       <Toaster position='top-right' richColors />
        {children}
    </div>
    
    </div>
  )
}
