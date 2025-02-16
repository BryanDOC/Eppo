"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import InputSearch from '../Components/InputSearch'
import InputDay from '../Components/InputDay'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from 'react'
import axios from 'axios'
import { useStore } from '@/app/zustand'


const formSchema = z.object({
  placeOrigin: z.string(),
  date: z.date(),
  dateReturn: z.date(),
  placeDestination: z.string(),
})

export interface Ciudad {
  id: string;
  nombre: string;
}

export default function Search() {

  const {setDate,setPlaceDestination,setPlaceOrigin, opcional} = useStore()
  const [ciudades, setCiudades] = useState<Ciudad[]>([]);
  const [error, setError] = useState<string | null>(null);
  

  const router = useRouter();
  useEffect(() => {
    const fetchCiudades = async () => {
      try {
        const response = await axios.get<Ciudad[]>("/api/ciudades");
        setCiudades(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.error || "Error desconocido");
        } else {
          setError("Error desconocido");
        }
      } 
    };
    
    fetchCiudades();
    
  }, []);
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      placeOrigin: "",
      date: new Date(),
      dateReturn: new Date(),
      placeDestination: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    
    

   const queryString = new URLSearchParams({
    placeOrigin: values.placeOrigin,
    placeDestination: values.placeDestination,
    date: values.date.toISOString(),
    dateReturn: values.dateReturn.toISOString(),
  }).toString();


  router.push(`/destination?${queryString}`);
    setDate(values.date.toISOString())
    setPlaceOrigin(values.placeOrigin)
    setPlaceDestination(values.placeDestination)
    
  }

 
  return (
   
    <div className='mt-3 lg:mt-8 md:my-8 px-6 xl:pb-6 md:px-12 lg:px-[80px] xl:px-[38px] xl:bg-white xl:rounded-3xl'>
      {error && <p className="text-red-500">{error}</p>}
      
      <h1 className='text-2xl md:text-[32px] lg:text-5xl font-bold text-center md:py-6 lg:pb-8 text-primaryColor xl:text-left'>Busca tu destino</h1>
      <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-4 lg:mt-4 lg:flex-row  lg:gap-4 lg:items-center xl:flex">
      <div className='flex flex-col lg:flex-row md:flex-col gap-4  '>
      
      <div className='flex flex-col md:flex-row w-full gap-4 '>
        <div className='w-full xl:min-w-[200px] 2xl:min-w-[250px]'>
          <FormField
        
        control={form.control}
        name="placeOrigin"
        render={({ field }) => (
          <FormItem>
            <FormControl>
            <InputSearch 
            text='Origen' 
            places={ciudades} 
            value={field.value} 
            onChange={field.onChange} 
            placeHolder='Selecciona salida'/>
            </FormControl>
          <FormMessage />
          </FormItem>
        )}
      />
        </div>
         
<div className='w-full xl:min-w-[200px] 2xl:min-w-[250px]'>
  <FormField
        control={form.control}
        name="placeDestination"
        render={({ field }) => (
          <FormItem>
            <FormControl>
            <InputSearch 
            text='Destino' 
            places={ciudades} 
            value={field.value} 
            onChange={field.onChange} 
            placeHolder='Selecciona destino'/>
            </FormControl>
          <FormMessage />
          </FormItem>
        )}
      />
</div>

      </div>
     
<div className='flex flex-col md:flex-row gap-4 w-full'>

<div className='w-full xl:min-w-[200px] 2xl:min-w-[250px]'>
  <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem>
            <FormControl>

        <InputDay 
            text='Salida' 
            placeHolder='Fecha Salida'
            value={field.value}
            onChange={field.onChange}
            />
            </FormControl>
          <FormMessage />
          </FormItem>
        )}
      />
</div>

<div className='w-full xl:min-w-[200px] 2xl:min-w-[250px]'>
  <FormField
        control={form.control}
        name="dateReturn"
        render={({ field }) => (
          <FormItem>
            <FormControl>

        <InputDay 
            text='Retorno (Opcional)' 
            placeHolder='Fecha Regreso'
            value={field.value} 
            opcional = {opcional} 
            onChange={field.onChange}
            />
            </FormControl>
          <FormMessage />
          </FormItem>
        )}
      />
</div>

</div>
  
</div>

      <Button className='w-full uppercase text-2xl font-bold py-6 hover:text-primaryColor ' type="submit">Buscar</Button>
    </form>
  </Form>
    </div>
    

    
  )
}
