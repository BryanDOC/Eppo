"use client"
import React, { useEffect } from 'react'
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

  const [ciudades, setCiudades] = useState<Ciudad[]>([]);
  const [error, setError] = useState<string | null>(null);

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
    console.log({values})
  }

 
  return (
   
    <div className='mt-8 px-6'>
      <h1 className='text-3xl font-bold text-center text-primaryColor'>Busca tu destino</h1>
      <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-8">
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
            onChange={field.onChange}
            />
            </FormControl>
          <FormMessage />
          </FormItem>
        )}
      />

      <Button className='w-full uppercase text-2xl font-bold py-6 hover:text-primaryColor ' type="submit">Buscar</Button>
    </form>
  </Form>
    </div>
    

    
  )
}
