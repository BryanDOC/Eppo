"use client"

import React from 'react'
import { useStore } from '@/app/zustand'
import { FaSquare } from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import Seat from '@/app/Components/Seat';
import DetailBuy from '@/app/Components/DetailBuy';
import { Button } from '@/components/ui/button';

<GiSteeringWheel />
export default function Page() {
      
  const { selectViaje} = useStore()

  const mitad = Math.ceil((selectViaje?.bus.asientos.length ?? 0 )/ 2)
  console.log(selectViaje)
  const primeraColumna = selectViaje?.bus.asientos.slice(0, mitad)
  const segundaColumna = selectViaje?.bus.asientos.slice(mitad)

  return (
    <div className='px-6 mb-[100px]'>
     <h2 className=' text-2xl text-primaryColor py-6'>Selecciona tus asientos</h2>
     <div className='w-full bg-white border border-primaryColor rounded-xl h-full py-8 flex flex-col gap-12 shadow-md'>
     <div className='flex flex-col gap-12 px-6'>
        <div className='flex items-center justify-between gap-2'>
     <div className='flex gap-2 items-center '>
     <FaSquare className='w-5 h-5' />
     <p className='text-xs'>Disponible</p>
     </div>
     <div className='flex gap-2 items-center text-primaryColor '>
     <FaSquare className='w-5 h-5' />
     <p className='text-xs'>Seleccionado</p>
     </div>
     <div className='flex gap-2 items-center text-textOpaco'>
     <FaSquare className='w-5 h-5' />
     <p className='text-xs'>Ocupado</p>
     </div>
     </div>
     <div className='w-full bg-[#F2F2F2] py-4 items-center flex px-6 rounded-t-2xl h-[60px]'>
     <GiSteeringWheel className='w-6 h-6'/>
     </div>
     </div>
     <div className='flex justify-between px-6 '>
        
     <div className='grid grid-cols-2 gap-6 '> 
{/* COLUMNA IZQUIERDA */}
        {primeraColumna?.map((asiento) => <Seat 
        reservado={selectViaje?.reservas.some((reserva) => reserva.asientoId === asiento.id)}  
        key={asiento.id} numero={asiento.numero} />)}
     </div>
       {/* COLUMNA DERECHA */}
       <div className='grid grid-cols-2 gap-6'> 
       {segundaColumna?.map((asiento) => <Seat   
       reservado={selectViaje?.reservas.some((reserva) => reserva.asientoId === asiento.id)}
       key={asiento.id} numero={asiento.numero} />)}
</div>
     </div>
     <div className='px-6'>
      <div className='w-full bg-[#F2F2F2] py-4 items-center flex rounded-b-2xl h-[60px] '>
     
     </div>
     </div>
     
     </div>
     <DetailBuy />
     <Button className='w-full uppercase font-bold text-2xl py-6'>Continuar</Button>
    </div>
  )
}
