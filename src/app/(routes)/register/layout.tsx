"use client"
import {Suspense} from 'react';
import ProgressButtonRegister from '@/app/Components/ProgressButtonRegister';


export default function Layout({ children }: { children: React.ReactNode }) {
 
  
  return (
   
    <div className="mt-4 md:mt-[80px] px-6 md:px-0">
      <h1 className='text-center font-bold text-gray-800 text-2xl my-8'>Regístrate</h1>
    <div className='flex md:mx-auto  mt-8 md:mt-12 lg:px-[80px] w-full items-center justify-between md:w-fit '>
    <ProgressButtonRegister  number={1} text="Registro" link='/register'/>
    <ProgressButtonRegister number={2} text="Datos personales" link='/register/datos'/>
    <ProgressButtonRegister  number={3} text="Cuenta Creada" link='/register/datos/succes'/>
    
    </div>
  
    <div >
       <Suspense fallback={<div>Loading...</div>}>
            {children}
        </Suspense>
    </div>
    </div>
     
  )
}
