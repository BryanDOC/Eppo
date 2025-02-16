"use client"

import ProgressButton from '@/app/Components/ProgressButton';
import { CalendarIcon } from "lucide-react"
import Seat from '@/app/assets/svg/seat.svg'
import { FaRegCreditCard } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import {Suspense} from 'react';
import { useStore } from '@/app/zustand'
import Skeleton from '@/app/Components/Skeleton';


export default function Layout({ children }: { children: React.ReactNode }) {

    
    const { date, placeOrigin, placeDestination,selectedSeats } = useStore()
    const formattedDate = formatDateToShort(date.toLocaleString() || '');
    
      
            
      function formatDateToShort(dateString: string): string {
       
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
          weekday: "short", 
          day: "2-digit", 
          month: "short", 
        };
              
        return date.toLocaleDateString("es-ES", options);
      }

  return (
   
    <div className='mt-4 '>
      <div className='px-6 md:px-12 lg:px-[80px] 2xl:px-[200px] '>
        <div className='flex justify-between items-center bg-white w-full shadow-md p-3 rounded-md'>
            <div>
        <h2 className='font-semibold text-primaryColor md:text-[20px]'>{placeOrigin} {'>'} {placeDestination}</h2>
        <p className='text-xs md:text-base font-light text-neutral-900'>{formattedDate}</p>
      </div>
      <div className='flex gap-2 items-center justify-center border-l-2 border-primaryColor px-2 py-[2px]'>
      <FaUser />
      <p className='text-[18px]'>{selectedSeats.length}</p>
      </div>
        </div>
      
    </div>
    <div className='flex mt-8 md:mt-12 items-center justify-center  lg:px-[80px] md:px-12 2xl:px-[200px]  '>
    <ProgressButton Icon={CalendarIcon} number={1} text="Destinos" link='/destination'/>
    <ProgressButton Icon={Seat} number={2} text="Asientos" link='/destination/selectseat'/>
    <ProgressButton Icon={FaRegCreditCard} number={3} text="Pago" link='/destination/selectseat/payment'/>
    </div>
    <div>
       <Suspense fallback={<Skeleton />}>
            {children}
        </Suspense>
    </div>
    </div>
     
  )
}