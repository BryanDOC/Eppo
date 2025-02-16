import React from 'react'
import Image, { StaticImageData } from 'next/image'

interface PagoOpcionProps {
    image: StaticImageData 
  
}
 
export default function PagoOpcion({ image }: PagoOpcionProps) {
  return (
    <div className='bg-white hover:scale-105  shadow-md rounded-md w-[180px] h-[70px] px-8 py-2'>
      <Image src={image} alt="Logo" width={1920} height={1080} className='w-full h-full object-contain '/>
    </div>
  )
}
