import React from 'react'
import Image from 'next/image'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

import { FaLinkedinIn } from "react-icons/fa";


export default function Footer() {
  return (
    <div className=' lg:px-[80px] 2xl:px-[200px]  px-6 py-16 2xl:flex 2xl:gap-16 2xl:justify-between 2xl:items-center bg-primaryColor gap-4'>
      <div className=' flex flex-col items-center justify-center'>
        <Image src="/logo.png" alt="Logo" width={1920} height={1080} className='w-auto h-14 '/>
      <div className='flex flex-col gap-4 items-center justify-center' >
        <h2 className='font-bold text-2xl text-white'>Encuentranos en:</h2>
        <div className='flex gap-4 '>
        <div className="w-12 h-12 bg-white shadow-md rounded-full p-4 flex items-center justify-center">
        <FaFacebookF className="text-primaryColor h-10 w-10"  />
      </div>
      <div className="w-12 h-12 bg-white shadow-md rounded-full p-4 flex items-center justify-center">
        <FaLinkedinIn  className="text-primaryColor h-10 w-10"  />
      </div>
      <div className="w-12 h-12 bg-white shadow-md rounded-full p-4 flex items-center justify-center">
        <FaInstagram   className="text-primaryColor h-10 w-10"  />
      </div>
        </div>
      </div>
      </div>
        <div className='lg:grid lg:grid-cols-2 lg:place-items-start lg:mt-12  2xl:ml-[130px]'>
          <div className='flex flex-col gap-2 mt-14 lg:mt-0  items-center justify-center text-white'>
            <h2 className='font-bold text-2xl'>Avisos imporantes</h2>
            <div className='flex flex-col mt-4 gap-1'>
                <p className='text-base font-light text-center'>
            Le informamos, en cumplimiento con la Ley N°29733 
            <br /> - <br /> 
            Ley de Protección de Datos Personales.
            </p>
            <p className='text-base font-light text-center'>Hoja informativa sobre el tratamiento de datos 
            personales - banco de datos - Video Vigilancia.</p>
            <p className='text-base font-light text-center'>Hoja informativa sobre el tratamiento de datos 
            personales - banco de datos - clientes.</p>
            <p className='text-base font-light text-center'>Hoja informativa - Quejas y Reclamos</p>
            </div>
            
        </div>
        <div className='flex flex-col gap-2  lg:w-full mt-10 lg:mt-0 lg:items-end items-center  text-white'>
            <h2 className='font-bold text-2xl  lg:mx-12'>Terminos del servicio</h2>
            <div className='flex flex-col mt-4 gap-1 '>
                <p className='text-base font-light text-center'>
                Condiciones de viaje
            </p>
            <p className='text-base font-light text-center'>Condiciones de pasarela de Pago</p>
            <p className='text-base font-light text-center'>Formulario para el ejercicio de los derechos Aeco</p>
            <p className='text-base font-light text-center'>Protocolos Obligatorios</p>
            <p className='text-base font-light text-center'>Disposiciones Obligatorias</p>
            </div>
            
        </div>
        </div>
        
      
    </div>
  )
}
