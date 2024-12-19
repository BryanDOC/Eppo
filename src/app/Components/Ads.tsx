import React from 'react'
import Image from 'next/image'
import AdsBus from '@/app/assets/Ads.webp'
import { Button } from '@/components/ui/button'

export default function Ads() {
  return (
    
    <div className="h-[150px] w-full relative">
        <div className='bg-[linear-gradient(90deg,_rgba(0,111,183,1)_0%,_rgba(255,255,255,0)_80%)]  w-full h-full z-10 absolute top-0'>
        </div>
      <Image src={AdsBus} alt="ads" width={1000} height={1000} className='w-full h-full object-cover absolute top-0'/>
      <div className='absolute top-1/2 -translate-y-1/2 left-3 z-20'>
           <div className=' flex flex-col gap-4'>
        <h2 className='font-semibold text-xs text-white uppercase'>Nuevo ecosistema digital</h2>
        <p className='font-bold text-base text-white'>La nueva experiencia digital de EPPO esta aqui</p>
      </div>
      <Button className='text-primaryColor bg-white font-bold text-base mt-4'>Descubre la nueva experiencia</Button>
      </div>
    </div>
    

  )
}
