"use client"
import React,{ useState, useEffect } from 'react'
import { format, subDays, addDays} from 'date-fns';
import { GrPrevious, GrNext } from "react-icons/gr";
import { es } from 'date-fns/locale';
import {useStore} from '@/app/zustand'
import { useRouter } from "next/navigation";


interface DayNavigatorProps {
    selectedDate: Date; 
  }
export default function DayNavigator({selectedDate}: DayNavigatorProps) {




const today = new Date();
  const { setDate, placeDestination, placeOrigin } = useStore();
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const [daysToShow, setDaysToShow] = useState(3); 
  const router = useRouter();

  useEffect(() => {
    const updateDaysToShow = () => {
      const width = window.innerWidth;
      if (width >= 1024) setDaysToShow(7); 
      else if (width >= 768) setDaysToShow(5); 
      else setDaysToShow(3); 
    };

    updateDaysToShow();
    window.addEventListener("resize", updateDaysToShow);
    return () => window.removeEventListener("resize", updateDaysToShow);
  }, []);

  

  const normalizeDate = (date: Date): Date => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
      };

  const isPreviousDisabled = normalizeDate(currentDate) <= normalizeDate(today);


  const handlePrevious = () => {
    if (!isPreviousDisabled) {
      const newDate = subDays(currentDate, 1);
      setCurrentDate(newDate);
      setDate(newDate.toString());
      updateURL(newDate);
    }
  };

  const handleNext = () => {
    const newDate = addDays(currentDate, 1);
    setCurrentDate(newDate);
    setDate(newDate.toString());
    updateURL(newDate);
  };

  const updateURL = (newDate: Date) => {
    const params = new URLSearchParams({
      placeOrigin,
      placeDestination,
      date: newDate.toISOString(),
    });
    router.replace(`/destination?${params.toString()}`);
  };

  return (
    <div className="px-4 md:px-12 lg:px-[80px] mt-6 2xl:px-[200px] ">
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={isPreviousDisabled}
          className="py-3 px-2 rounded-l-md shadow-md"
        >
          <GrPrevious className="text-primaryColor text-xl" />
        </button>

        <div className="flex justify-center items-center shadow-md space-x-2">
          {[...Array(daysToShow)].map((_, index) => {
            const day = addDays(currentDate, index - Math.floor(daysToShow / 2));
            return (
              <button
                key={index}
                className={`px-3 py-2 rounded-md text-xs md:text-base  capitalize  ${
                  format(day, "dd/MM") === format(currentDate, "dd/MM")
                    ? "bg-primaryColor text-white font-bold"
                    : "text-primaryColor font-normal"
                }`}
              >
                {format(day, "EEE", { locale: es }).substring(0, 3)},{" "}
                {format(day, "dd/MM")}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          className="py-3 px-2 rounded-r-md shadow-md"
        >
          <GrNext className="text-primaryColor text-xl" />
        </button>
      </div>
    </div>
  );

}
