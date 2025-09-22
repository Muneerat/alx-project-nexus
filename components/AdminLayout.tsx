import React from 'react'
import AdminNavbar from './adminNav'

export default function AdminLayout({children}: {children : React.ReactNode}) {
  return (
    <div className='bg-white h-full py-20'>
    <AdminNavbar />
    <div>
        {children}
    </div>
    
    </div>
  )
}
