"use client"
import { useState } from "react"
import React from 'react'
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import PagoOpcion from "@/app/Components/PagoOpcion"
import PagoEfectivo from '@/app/assets/Pagoefectivo.webp'
import Banca1 from '@/app/assets/safetypay-banca-online-pe 1.webp'
import Banca2 from '@/app/assets/safetypay-pagopresencial-pe 1.webp'
import Cuotealo from '@/app/assets/cuotealo.png'
import Yape from '@/app/assets/Yape.webp'
// import {useStore} from '@/app/zustand'
// import { useParams } from 'next/navigation'
// import axios from 'axios'
import { Button } from "@/components/ui/button"
export default function Page() {

  const [open, setOpen] = useState(true)
  // const {dataUserApi,selectedSeats, user} = useStore()
  // const params = useParams()
  

  
  
  

  return (
    <div className='px-6 flex flex-col gap-6 mb-9 2xl:px-[200px] lg:px-[80px]'>
     <h2 className='text-2xl text-primaryColor mt-12 mb-4'>Detalles de Pago</h2>
     <div className='bg-white border-2 border-gray-300 shadow-md rounded-md'>
      <p className='text-base text-textOpaco p-4'>Contacto</p>
      <hr className='border-[1px] border-gray-300'/>
      <div className='p-4 flex flex-col gap-4'>
        <p className='bg-red-300 border-[1px] text-xs text-center border-red-500 text-primaryColor  px-4 py-2 rounded-xl'>Sus boletos y el recibo se enviaran a la direccion de correo electronico a continuacion</p>
      <Input 
      
      type="email" placeholder="Email*" className='text-textOpaco'/>
      </div>
      
     </div>


     <div className='bg-white border-2 border-gray-300 shadow-md rounded-md'>
      <p className='text-base text-textOpaco p-4'>Facturacion</p>
      <hr className='border-[1px] border-gray-300'/>
      <div className='p-4 flex flex-col gap-4'>
        <p className='text-xs text-textOpaco font-light'>Elige el tipo de comprobante que desee</p>
        <div className='flex border-[1px]  border-primaryColor rounded-full w-fit'>
          <button className={` ${open?"bg-primaryColor text-white":"text-primaryColor"}  rounded-full px-6 py-[4px] `}
          onClick={() => setOpen(!open)}
          >Boleta</button>
          <button className={`${!open?"bg-primaryColor text-white":"text-primaryColor"} text-primaryColor rounded-full px-6 py-[4px]`}
          onClick={() => setOpen(!open)}
          >Factura</button>
        </div>
      </div>
      
     </div>

     <div className='bg-white border-2 border-gray-300 shadow-md rounded-md'>
      <p className='text-base text-textOpaco p-4'>Metodo de pago</p>
      <hr className='border-[1px] border-gray-300'/>
      <div className='p-4 flex flex-col gap-4'>
       
      <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-[10px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-textOpaco"
      >
        Al hacer clic, confirma y acepta haber leido los: <span className="text-primaryColor">Terminos de uso, Proteccion de datos, Restricciones de tarifa</span> y <span className="text-primaryColor"> Requisitos para viajar</span>
      </label>
    </div>

    <div className="flex items-center space-x-2">
      <Checkbox id="datos" />
      <label
        htmlFor="datos"
        className="text-[10px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-textOpaco"
      >
       Acepto el uso de mis datos para recbir promociones, ofertas y noticias exclusivas de Eppo S.A
      </label>
    </div>

    <div className="flex flex-col items-center 2xl:justify-center gap-6 md:flex-row my-4"> 
      <PagoOpcion image={PagoEfectivo} />
      <PagoOpcion image={Banca1} />
      <PagoOpcion image={Banca2} />
      <PagoOpcion image={Cuotealo} />
      <PagoOpcion image={Yape} />

    </div>

      </div>
      
     </div>
     <Button >Pagar</Button>
    </div>
  )
}
