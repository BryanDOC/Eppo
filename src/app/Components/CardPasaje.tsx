import React from 'react'
import SeatIcon from '@/app/Svg/asientoBusCard.svg'
import BusIcon from "@/app/Svg/Bus.svg";


export default function CardPasaje() {
  return (
    <div className="w-full rounded-s-lg py-3 px-4 flex flex-col gap-4 bg-white shadow-lg">
  <div className="flex justify-between items-center">
    
    <div className="flex flex-col items-center">
      <p className="font-bold text-[20px]">02:00</p>
      <p className="text-base text-textOpaco">Piura</p>
    </div>

   
    <div className="flex flex-col items-center justify-center w-full max-w-[180px]">
     
      <BusIcon className="w-14 h-6 text-primaryColor mb-2" />
 
     
      <div className="flex items-center w-full">
        <div className="flex-1 border-t-[1px] border-dashed border-gray-500"></div>
        <p className="mx-2 font-semibold uppercase text-textOpaco whitespace-nowrap text-xs">Directo</p>
        <div className="flex-1 border-t-[1px] border-dashed border-gray-500"></div>
      </div>

      
      <p className="text-xs text-textOpaco mt-2">45 Min</p>
    </div>

   
    <div className="flex flex-col items-center">
      <p className="font-bold text-[20px]">02:45</p>
      <p className="text-base text-textOpaco">Sullana</p>
    </div>
  </div>

  
  <div className="flex justify-between">
    <div className="flex items-center gap-2">
      <SeatIcon className="w-6 h-6 text-primaryColor" />
      <p className="font-bold text-xs text-primaryColor">40 Disponibles</p>
    </div>
    <div>
      <p className="text-base font-bold text-primaryColor">S/.5</p>
    </div>
  </div>
</div>

  )
}
