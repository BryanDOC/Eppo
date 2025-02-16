"use client"
import React from 'react'
import { Input } from "@/components/ui/input"
import {useStore} from '@/app/zustand'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
export default function Page() {

  const router = useRouter()
  const {setEmailRegister, setPasswordRegister} = useStore()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmailRegister(value); 
    }
    if (name === 'password') {
    
      setPasswordRegister(value);
    }
  }

 const handleClick = () => {
    router.push('register/datos')
  }
 

  return (
    <div className='flex flex-col gap-4 my-12 md:my-[80px] md:mx-auto md:w-fit  md:min-w-[500px] md:max-w-[850px]'>
      <Input className='border-2 border-gray-300 ' type="email" name="email" placeholder="Email" onChange={handleChange}/>
      <Input className='border-2 border-gray-300 ' type="password" name="password" placeholder="Contraseña" onChange={handleChange}/>
      <Button onClick={handleClick}>Continuar</Button>
    </div>
  )
}
