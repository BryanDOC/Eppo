import React from 'react'
import SeatIcon from '@/app/Svg/asientoBusCard.svg'
import { differenceInMinutes } from "date-fns";
import { Viaje } from '../page'
import { format } from "date-fns";
import { Sun } from 'lucide-react';
import { Moon } from 'lucide-react';


export default function CardPasaje(Props: { viaje: Viaje }) {

  const { viaje } = Props

    const obtenerHora = (fechaISO: string): string => {
      const fecha = new Date(fechaISO);
      return format(fecha, "hh:mm");
    };

    const obtenerPeriodo = (fechaISO: string): string => {
      const fecha = new Date(fechaISO);
      return format(fecha, "a");
    };

    console.log(obtenerPeriodo("2025-01-04T06:14:00"))
  
  const calcularDiferenciaMinutos = (fechaInicio: string | Date, fechaFin: string | Date): number => {
    const inicio = typeof fechaInicio === "string" ? new Date(fechaInicio) : fechaInicio;
    const fin = typeof fechaFin === "string" ? new Date(fechaFin) : fechaFin;
    return differenceInMinutes(fin, inicio);
  };

  const diferenciaMinutos = calcularDiferenciaMinutos(viaje.fechaSalida, viaje.fechaLlegada);

  return (
    <div className="w-full rounded-s-lg py-3 px-4 flex flex-col gap-4 bg-white shadow-lg hover:scale-105">
  <div className="flex justify-between items-center">
    
    <div className="flex flex-col items-center">
      <p className="font-bold text-[20px]">{obtenerHora(viaje.fechaSalida)}
      </p>
      <p className="text-base text-textOpaco">{viaje.origen}</p>
    </div>

   
    <div className="flex flex-col items-center justify-center w-full max-w-[180px]">
     
    {
        obtenerPeriodo(viaje.fechaSalida) === "AM" ? (
          <Sun className="w-6 h-6 mb-[4px] text-primaryColor" />
        ) : (
          <Moon className="w-6 h-6 mb-[4px] text-primaryColor" />
        )
      }
 
     
      <div className="flex items-center w-full ">
        <div className="flex-1 border-t-[1px] border-dashed border-gray-500"></div>
        <p className="mx-2 font-semibold uppercase text-textOpaco whitespace-nowrap text-xs">Directo</p>
        <div className="flex-1 border-t-[1px] border-dashed border-gray-500"></div>
      </div>
      <p className="text-xs text-textOpaco mt-2 ">{diferenciaMinutos} Min</p>
      
      </div>

      <div className="flex flex-col items-center">
      <p className="font-bold text-[20px]">{obtenerHora(viaje.fechaLlegada)}
     
      </p>
      <p className="text-base text-textOpaco">{viaje.destino}</p>
    </div>
  </div>
  
  <div className="flex justify-between">
    <div className="flex items-center gap-2">
      <SeatIcon className="w-6 h-6 text-primaryColor" />
      <p className={`font-bold text-xs ${viaje.asientosLibres < 10 ? "text-red-500" : "text-primaryColor"}`}>{viaje.asientosLibres} Disponibles</p>
    </div>
    <div>
      <p className="text-base font-bold text-primaryColor">S/. {viaje.precio}</p>
    </div>
  </div>
</div>

  )
}
