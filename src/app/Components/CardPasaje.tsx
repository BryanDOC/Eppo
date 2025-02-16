import React from 'react'
import SeatIcon from '@/app/Svg/asientoBusCard.svg'
import { differenceInMinutes } from "date-fns";
import { Viaje } from '../page'
import { format } from "date-fns";
import { Sun } from 'lucide-react';
import { Moon } from 'lucide-react';
import { useRouter } from "next/navigation";
import {useStore} from '@/app/zustand'

export default function CardPasaje(Props: { viaje: Viaje }) {

  const { viaje } = Props
  const router = useRouter();
  const {setSelectViaje, setPlaceDestination, setPlaceOrigin,setDate} = useStore()  

    const obtenerHora = (fechaISO: string): string => {
      const fecha = new Date(fechaISO);
      return format(fecha, "hh:mm");
    };

    const obtenerPeriodo = (fechaISO: string): string => {
      const fecha = new Date(fechaISO);
      return format(fecha, "a");
    };

    const UpdateSelectViaje = () => {
      setSelectViaje(viaje); 
      setPlaceOrigin(viaje.origen);
      setPlaceDestination(viaje.destino);
      setDate(viaje.fechaSalida);
      router.push(`/destination/selectseat/${viaje.id}`); 
    };
  
  const calcularDiferenciaMinutos = (fechaInicio: string | Date, fechaFin: string | Date): number => {
    const inicio = typeof fechaInicio === "string" ? new Date(fechaInicio) : fechaInicio;
    const fin = typeof fechaFin === "string" ? new Date(fechaFin) : fechaFin;
    return differenceInMinutes(fin, inicio);
  };

  const diferenciaMinutos = calcularDiferenciaMinutos(viaje.fechaSalida, viaje.fechaLlegada);

  return (
    <div className="w-full rounded-s-lg py-3 px-4 md:px-6 flex flex-col gap-4 bg-white shadow-lg hover:scale-105" onClick={UpdateSelectViaje} >
  <div className="flex justify-between items-center ">
    
    <div className="flex flex-col items-center ">
      <p className="font-bold text-[20px] md:text-2xl">{obtenerHora(viaje.fechaSalida)}
      </p>
      <p className="text-base text-textOpaco md:text-[20px]">{viaje.origen}</p>
    </div>

   
    <div className="flex flex-col items-center justify-center px-8 w-full ">
     
    {
        obtenerPeriodo(viaje.fechaSalida) === "AM" ? (
          <Sun className="w-6 h-6 md:w-8 md:h-8 mb-[4px] text-primaryColor" />
        ) : (
          <Moon className="w-6 h-6 md:w-8 md:h-8 mb-[4px] text-primaryColor" />
        )
      }
 
     
      <div className="flex items-center w-full  ">
        <div className="flex-1 border-t-[1px] border-dashed border-gray-500 "></div>
        <p className="mx-2 font-semibold uppercase text-textOpaco whitespace-nowrap text-xs md:text-base">Directo</p>
        <div className="flex-1 border-t-[1px] border-dashed border-gray-500 "></div>
      </div>
      <p className="text-xs text-textOpaco mt-2 md:text-base ">{diferenciaMinutos} Min</p>
      
      </div>

      <div className="flex flex-col items-center ">
      <p className="font-bold text-[20px] md:text-2xl">{obtenerHora(viaje.fechaLlegada)}
     
      </p>
      <p className="text-base text-textOpaco md:text-[20px]">{viaje.destino}</p>
    </div>
  </div>
  
  <div className="flex justify-between ">
    <div className="flex items-center gap-2 md:gap-4 ">
      <SeatIcon className="w-6 h-6 md:w-8 md:h-8 text-primaryColor" />
      <p className={`font-bold text-xs md:text-base ${viaje.asientosLibres < 10 ? "text-red-500" : "text-primaryColor"}`}>{viaje.asientosLibres} Disponibles</p>
    </div>
    <div>
      <p className="text-base font-bold text-primaryColor md:text-[20px]">S/. {viaje.precio}</p>
    </div>
  </div>
</div>

  )
}
