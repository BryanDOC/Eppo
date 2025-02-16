"use client"

import React, {  } from 'react'
import { useStore } from '@/app/zustand'
import { FaSquare } from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import Seat from '@/app/Components/Seat';
import { Button } from '@/components/ui/button';

import DetailBuy from '@/app/Components/DetailBuy';
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { toast} from "@/hooks/use-toast"

import DataPasajero from '@/app/Components/DataPasajero';



export default function Page({}) {
      
const { selectViaje,selectedSeats, user,dataUserApi} = useStore()
const dniUser = user?.dni.toString() || ""


  const mitad = Math.ceil((selectViaje?.bus.asientos.length ?? 0 )/ 2)
  const primeraColumna = selectViaje?.bus.asientos.slice(0, mitad)
  const segundaColumna = selectViaje?.bus.asientos.slice(mitad)
  const params = useParams()
  

  const router = useRouter()
   const handleClick = () => {
     if (selectedSeats.length===0) {
      toast({
        title: "Selecciona al menos un asiento",
      })
       }
       else if(dataUserApi===null){
        toast({
          title: "Ingresa tu DNI",
        })
       }
       else{
      router.push(`/destination/selectseat/${params.id}/payment`)
     }
   }
   
  return (
    <div className='px-6 md:px-12 mb-[100px] lg:px-[80px] 2xl:px-[200px] '>
     <h2 className=' text-2xl text-primaryColor py-6 md:py-12'>Selecciona tus asientos</h2>
     <div className='flex flex-col gap-8  md:grid md:grid-cols-2 2xl:grid 2xl:grid-cols-2 '>
    
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
        key={asiento.id} numero={asiento.numero} id={asiento.id}/>)}
     </div>
       {/* COLUMNA DERECHA */}
       <div className='grid grid-cols-2 gap-6'> 
       {segundaColumna?.map((asiento) => <Seat   
       reservado={selectViaje?.reservas.some((reserva) => reserva.asientoId === asiento.id)}
       key={asiento.id} numero={asiento.numero} id={asiento.id} />)}
</div>
     </div>
     <div className='px-6'>
      <div className='w-full bg-[#F2F2F2] py-4 items-center flex rounded-b-2xl h-[60px] '>
     
     </div>
     </div>
     
     </div>
    
     <div className='flex flex-col gap-4'>
     
     {selectedSeats.map((seat, index) => (
       
        <DataPasajero key={seat.id} seat={seat} index={index===0 ? dniUser : index} />
      ))}
      <DetailBuy />

     <Button className='w-full uppercase font-bold text-2xl py-6 md:py-8'
    onClick={handleClick}
    >Continuar</Button>
     </div>
     
     
     </div>
     
    </div>
  )
}
