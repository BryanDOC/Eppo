"use client"

import React, { useCallback, useEffect, useState, useMemo} from 'react'
import axios from 'axios'
import { Viaje } from '@/app/page';
import ContainerCardsPasaje from '@/app/Components/ContainerCardsPasaje';
import {useStore} from '@/app/zustand'
import { useRouter } from 'next/navigation'
import DayNavigator from '@/app/Components/DayNavigator';
import { useToast } from "@/hooks/use-toast"


export default function Page() {

  
  const [viajesSearch, setViajesSearch] = useState<Viaje[]>([]);
  const [error, setError] = useState<string>("");
  
  const {date, placeDestination, placeOrigin} = useStore()
  const formattedDate = useMemo(() => (date ? new Date(date).toISOString() : ""), [date]);
  
  
  const { toast } = useToast()
  const router = useRouter()

   const fetchViajesSearch = useCallback(async () => {
    console.log("Estoy cambiando");
    try {
      const response = await axios.get<Viaje[]>(
        `/api/viaje?placeOrigin=${placeOrigin}&placeDestination=${placeDestination}&date=${formattedDate}`
      );
      setViajesSearch(response.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Error desconocido");
        toast({
          
          title: `Uh oh! ${error}`,
          description: "Selecciona un lugar de Origen y Destino.",
          
        })
        router.push('/')
      } else {
        setError("Error desconocido");
      }
    }
  }, [placeOrigin, placeDestination, formattedDate, setViajesSearch, setError]);


    
  useEffect(() => {
    if (formattedDate) {
      fetchViajesSearch();
    }
  }, [fetchViajesSearch, date]);

  return (
  
    <div className='mt-6'>
      <h2 className=' text-2xl text-primaryColor px-6 py-6'>Selecciona tu <span className='font-bold '>viaje de ida</span></h2>
      <DayNavigator selectedDate={new Date(date!)} />
      <div className='mb-[100px]'>
      <ContainerCardsPasaje viajesHome={viajesSearch} />
      </div>
      
    </div>
  
   
  )
}