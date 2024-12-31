"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSearchParams } from "next/navigation";
import { Viaje } from '@/app/page';
import ContainerCardsPasaje from '@/app/Components/ContainerCardsPasaje';
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import DayNavigator from '@/app/Components/DayNavigator';
import { ToastAction } from "@/components/ui/toast"


export default function Page() {

  const searchParams = useSearchParams();

  const placeOrigin = searchParams.get("placeOrigin");
  const placeDestination = searchParams.get("placeDestination");
  const date = searchParams.get("date");
  // const dateReturn = searchParams.get("dateReturn");
  const [viajesSearch, setViajesSearch] = useState<Viaje[]>([]);
  const [error, setError] = useState<string>("");
  const formattedDate = date ? new Date(date) : "";
  // const formattedDateReturn = dateReturn ? new Date(dateReturn) : null;
  

const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchViajesSearch();
       
  },[])

 
  const fetchViajesSearch= async () => {
    try {
      const response = await axios.get<Viaje[]>(`/api/viaje?placeOrigin=${placeOrigin}&placeDestination=${placeDestination}&date=${formattedDate}`);
      setViajesSearch(response.data);
      
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Error desconocido");
        toast({
          variant: "destructive",
          title: `Uh oh! ${error}`,
          description: "Selecciona un lugar de Origen y Destino.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
        router.push('/')
        
      } else {
        setError("Error desconocido");
      }
    } 
    
  };

  return (
    <div className='mt-6'>
      <h2 className=' text-2xl text-primaryColor px-6'>Selecciona tu <span className='font-bold '>viaje de ida</span></h2>
      <DayNavigator selectedDate={new Date(date!)} />
      <div className='mb-[100px]'>
      <ContainerCardsPasaje viajesHome={viajesSearch} />
      </div>
      
    </div>
   
  )
}
