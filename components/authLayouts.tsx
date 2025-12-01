import React from 'react'
import { Toaster } from 'sonner'
import { Vote } from 'lucide-react'

export default function AuthLayouts({children}: { children :React.ReactNode}) {
  return (
    <div className='flex justify-between w-full h-screen my-auto'>
   
        <div className='w-1/2 hidden md:block'>
            <div className="relative z-10  mt-40 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="p-8 rounded-full border-4 border-white bg-primary/10 neon-glow">
            <Vote className="w-24 h-24 text-secondary" />
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold neon-text mb-6 animate-pulse">
          Let&apos;s Vote
        </h1>
        
        <p className="text-2xl md:text-3xl text-foreground mb-4">
          Be a part of decision
        </p>
        
        <p className="text-4xl md:text-5xl font-bold text-secondary mb-12">
          Vote Today
        </p>
        </div>
            {/* <Image src={img} alt="auth img" width="00" height="200" className='w-4/6 flex justify-center items-center' />
            <div className='text-center flex flex-col gap-4'>
            <h1 className='text-white text-3xl  '>Be a part of decision</h1>
            <h1 className='text-[#015dc6] text-8xl'>Vote Today</h1>
        </div> */}
        </div>
        <div className='md:w-1/2 w-full bg-[#001124] flex justify-center m-auto 
        '>
            <Toaster position='top-right' richColors />
            {children}
        </div>
    </div>
  )
}
