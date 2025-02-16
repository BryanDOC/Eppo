
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import SheetMenu from './SheetMenu';
import SheetLogin from './SheetLogin';
import { auth } from '../../../auth';
import CloseSesion from './CloseSesion';





export default async function NavBar() {
  
    const sesion = await auth()
    
    
    return (
    <div className='flex items-center justify-between px-6 md:px-12 lg:px-[80px] py-3 md:py-6 2xl:px-[200px] '>
      <Link href={"/"}>
<Image src="/logo.png" alt="Logo" width={1920} height={1080} className='w-16 md:w-[140px] h-auto'/>
      </Link>
    
    <div className=''>
      <div className='hidden md:flex'>
        <div className='flex text-base gap-8 items-center '>
        <a href="">Cargo</a>
        <a href="">Destinos</a>
        <a href="">Terminales</a>
        <a href="">Nosotros</a>
        {
          sesion 
          ?  <CloseSesion/>
          :  <SheetLogin/>
          
        }
        </div>
      </div>
      <div className='md:hidden flex gap-4  items-center '>
        {
          sesion 
          ?  <CloseSesion/>
          :  <SheetLogin/>
          
        }
    
      <SheetMenu />
      </div>
      
    </div>
    
   
    </div>
  )
}
