"use client"
import React,{ useState } from 'react'
import { format, subDays, addDays, isBefore} from 'date-fns';
import { GrPrevious, GrNext } from "react-icons/gr";
import { es } from 'date-fns/locale';
import {useStore} from '@/app/zustand'
import { useRouter } from "next/navigation";


interface DayNavigatorProps {
    selectedDate: Date; 
  }
export default function DayNavigator({selectedDate}: DayNavigatorProps) {

  const today = new Date();
  const {setDate, date, placeDestination, placeOrigin} = useStore()
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const router = useRouter();
  
function formatDate(date: Date): string {
    
    const formatter = new Intl.DateTimeFormat("es-ES", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
    });
  
    const parts = formatter.formatToParts(date);
    const weekday = parts.find((p) => p.type === "weekday")?.value || "";
    const day = parts.find((p) => p.type === "day")?.value || "";
    const month = parts.find((p) => p.type === "month")?.value || "";
  
    const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  
    return `${capitalizedWeekday}, ${day}/${month}`;
  }

    
  const normalizeDate = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

    const isPreviousDisabled = isBefore(
      normalizeDate(subDays(currentDate, 1)),
      normalizeDate(today)
    );
    const handlePrevious = () => {
    if (!isPreviousDisabled) {
      setCurrentDate(subDays(currentDate, 1));
      setDate(subDays(currentDate, 1).toString());
      const params = new URLSearchParams({
        placeOrigin,
        placeDestination,
        date: new Date(date).toISOString(),
      });
      router.replace(`/destination?${params.toString()}`);
    }
    };

    const handleNext = () => {
        setCurrentDate(addDays(currentDate, 1));
        setDate(addDays(currentDate, 1).toString());
        const params = new URLSearchParams({
          placeOrigin,
          placeDestination,
          date: new Date(date).toISOString(),
        });
        router.replace(`/destination?${params.toString()}`); 
      };

  return (
    <div className='min-[427px]:px-6 max-[375px]:px-2 mt-6'>
     <div className='flex justify-between items-center'>
      
      <button onClick={handlePrevious} disabled={isPreviousDisabled} className='py-3 px-2   rounded-l-md shadow-md' >
      <GrPrevious className=' text-primaryColor text-xl'/>
      </button>
        <div className='flex justify-center items-center shadow-md '>
        <button className="px-2 py-3 text-xs text-primaryColor ">
  <span className="font-bold capitalize">{format(subDays(currentDate, 1), "EEEE", { locale: es }).substring(0, 3)}</span>,{" "}
  <span className="text-sm font-light">{format(subDays(currentDate, 1), "dd/MM")}</span>
</button>


      <button className=' px-4 py-3 text-[14px] font-bold text-white bg-primaryColor rounded-md'>
        {formatDate(currentDate)}
      </button>

      
      <button className="px-2 py-3 text-xs text-primaryColor">
  <span className="font-bold capitalize">{format(addDays(currentDate, 1), "EEEE", { locale: es }).substring(0, 3)}</span>,{" "}
  <span className="text-sm  font-light">{format(addDays(currentDate, 1), "dd/MM")}</span>
</button>

        </div>
      
      <button onClick={handleNext} className='py-3 px-2   rounded-r-md  shadow-md '><GrNext className=' text-primaryColor text-xl'/></button>
    </div>
    </div>
  )
}
