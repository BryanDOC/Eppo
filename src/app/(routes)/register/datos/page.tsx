"use client"
import React from 'react'
import { Input } from "@/components/ui/input"
import {useStore} from '@/app/zustand'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
export default function Page() {
  const router = useRouter()
    const {setNameRegister,setLastNameRegister,  setDaynacimentoRegister, setMonthnacimentoRegister, setYearnacimentoRegister, setDniRegister, emailRegister, passwordRegister, nameRegister,  dniRegister } = useStore()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
  
      if (name === 'name') {
        setNameRegister(value);
      }
      if (name === 'lastname') {
      
        setLastNameRegister(value);
      }
      if (name === 'day') {
        
        setDaynacimentoRegister(value);
    }
    if (name === 'month') {
      
        setMonthnacimentoRegister(value);
    }
    if (name === 'year') {
      
        setYearnacimentoRegister(value);
    }
    if (name === 'dni') {
      
        setDniRegister(value);
    }
    }

  
   const handleClick = async () => {
    
    const payload = {
      email: emailRegister,
      password: passwordRegister,
      nombre: nameRegister,
      dni: dniRegister
    }
    
    try{
      
      await axios.post("/api/register", payload) 
      toast({
        title: "Cuenta creada",
        variant: "success",
      })
      router.push('/succes')
     }
     catch(error){
      console.log(error)
      toast({
        title: "Error al crear cuenta",
        variant: "destructive",
      })
     }
     
    }
   
  return (
   <div className='flex flex-col gap-4 my-12 md:my-[80px]  md:mx-auto md:w-fit '>
         <Input className='border-2 border-gray-300 ' type="text" name="name" placeholder="Nombre" onChange={handleChange}/>
         <Input className='border-2 border-gray-300 ' type="text" name="lastname" placeholder="Apellido" onChange={handleChange}/>
         <div className='flex gap-4 '>
         <Input className='border-2 border-gray-300 ' type="number" name="day" placeholder="Dia" onChange={handleChange}/>
         <Input className='border-2 border-gray-300 ' type="number" name="month" placeholder="Mes" onChange={handleChange}/>
         <Input className='border-2 border-gray-300 ' type="number" name="year" placeholder="Año" onChange={handleChange}/>
         </div>
         <Input className='border-2 border-gray-300 ' type="number" name="dni" placeholder="DNI" onChange={handleChange}/>
         <Button onClick={handleClick}>Continuar</Button>
       </div>
  )
}
