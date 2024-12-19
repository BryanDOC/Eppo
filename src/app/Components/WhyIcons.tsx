import React from 'react'
import Location from '@/app/assets/svg/location.svg'

export default function WhyIcons() {
  return (
   <div className='flex flex-col gap-3 items-center w-fit'>
    <div className="w-16 h-16 bg-white shadow-md rounded-full p-4 flex items-center justify-center">
  <Location className="w-full h-full text-primaryColor" />
</div>
<div className='flex flex-col gap-[6px] items-center'>
     <p className='font-semibold text-[14px]'>+20 Destinos</p>
    <p className='font-light text-xs'>Nacionales</p>
</div>
   
   </div>


  

        
     
  )
}
