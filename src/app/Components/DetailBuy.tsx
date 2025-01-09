"use client"
import React from 'react'
import { useStore } from '@/app/zustand'
import { IoIosArrowDown } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import Asiento from '@/app/assets/svg/seatBus.svg'

export default function DetailBuy() {

    const { selectViaje, date, selectSeat } = useStore()

    const formattedDate = formatDateToShort(date.toLocaleString() || '');
    
                  
      function formatDateToShort(dateString: string): string {
       
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
          weekday: "short", 
          day: "2-digit", 
          month: "long", 
        };
              
        return date.toLocaleDateString("es-ES", options);
      }

      const obtenerHora = (fechaISO: string): string => {
            const fecha = new Date(fechaISO);
            return format(fecha, "hh:mm");
          };

    const obtenerPeriodo = (fechaISO: string): string => {
      const fecha = new Date(fechaISO);
      return format(fecha, "a");
    };

  return (
    <div className='py-6 px-6 shadow-md mt-8 bg-white mb-8'>
        <div>
             <p className='flex items-center text-primaryColor font-semibold text-base'><span className=' mr-2'><IoCartOutline/></span>Detalle de la compra</p>
        <div className='flex items-center justify-between mt-8'>
            <p className='text-3xl text-neutral-600 flex items-center gap-2'>{selectViaje?.origen}<span className='text-primaryColor'> {'>'} </span>{selectViaje?.destino}</p>
            <IoIosArrowDown className='text-primaryColor h-8 w-8'/>
        </div>
        <p className='flex items-center gap-2 text-textOpaco mt-[10px]'><LuUserRound /> 2 <FaCalendarAlt /> {formattedDate}, {obtenerHora(selectViaje?.fechaSalida?? '')} {obtenerPeriodo(selectViaje?.fechaSalida?? '')} </p>
      <hr className='my-6 border-[1px]'/>
        </div>
       <div>
       <div className='flex items-center justify-between '>
            <p className='text-[20px] text-neutral-600 flex items-center gap-2'>Tus asientos</p>
            <IoIosArrowDown className='text-primaryColor h-8 w-8'/>
        </div>
        <div className='flex items-center justify-between mt-4 text-neutral-600 font-light text-base'>
        <div className='flex gap-4 '>
             <p>Pasajero 1</p>
             <p className='flex gap-2 '><Asiento className='w-5 h-full'/>{selectSeat}</p>
        </div>
        <p className=''>S/ {selectViaje?.precio}.00</p>
        </div>
       
        {/* <div className='flex items-center justify-between mt-2 text-neutral-600 font-light text-base'>
        <div className='flex gap-4 '>
             <p>Pasajero 2</p>
             <p className='flex gap-2 '><Asiento className='w-5 h-full'/>22</p>
        </div>
        <p className=''>S/ {selectViaje?.precio}.00</p>
        </div> */}
        <hr className='my-6 border-[1px]'/>
       </div>
       <div className='flex items-center justify-between'>
        <div>
        <p className='font-bold text-base '>Total:</p>
        <p className='font-light'>Tasas e impuestos incluidos</p>
        </div>
        <p className='font-bold text-xl'>S/ {selectViaje?.precio }.00</p>
       </div>
    </div>
  )
}
