"use client"
import React,{ useState } from 'react'
import { format, subDays, addDays, isBefore, isSameDay } from 'date-fns';
import { GrPrevious, GrNext } from "react-icons/gr";
import { es } from 'date-fns/locale';

<GrNext />
interface DayNavigatorProps {
    selectedDate: Date  ; 
  }
export default function DayNavigator({selectedDate}: DayNavigatorProps) {

  const today = new Date(); 
  const [currentDate, setCurrentDate] = useState(selectedDate);

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

    const isPreviousDisabled = isBefore(subDays(currentDate, 1), today) || isSameDay(currentDate, today);

    const handlePrevious = () => {
    if (!isPreviousDisabled) {
      setCurrentDate(subDays(currentDate, 1));
    }
    };

    const handleNext = () => {
        setCurrentDate(addDays(currentDate, 1));
      };

  return (
    <div className='px-6 mt-6'>
     <div className='flex justify-between items-center'>
      
      <button onClick={handlePrevious} disabled={isPreviousDisabled} className='p-3  rounded-l-md shadow-md' >
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
      
      <button onClick={handleNext} className='p-3  rounded-r-md  shadow-md '><GrNext className=' text-primaryColor text-xl'/></button>
    </div>
    </div>
  )
}
