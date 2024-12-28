import React from 'react'
import Image from 'next/image'
import Piura from '@/app/assets/Piura.webp'
export default function Destination() {
  return (
    <div className='h-[243px] w-[190px] relative shadow-md flex-shrink-0'>
        <div className='bg-gradient-to-t from-black w-full h-full z-10 absolute top-0'>
        </div>
        <Image src={Piura} alt="Logo" width={1920} height={1080} className='w-full h-full object-cover'/>
        <div className='absolute bottom-4 left-4 z-20'>
           <div className=' flex flex-col gap-2'>
        <h2 className=' text-xs text-white '>Viaja a</h2>
        <p className='font-bold text-base text-white'>Mancora</p>
      </div>
      
      </div>
        </div>
  )
}
