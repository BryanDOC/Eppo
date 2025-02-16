import React from 'react'
import {  Menu } from 'lucide-react';
import {
    Sheet,
    SheetHeader,
    SheetTrigger,
    SheetContent,
    SheetDescription,
    
  } from "@/components/ui/sheet"
  import { DialogTitle } from '@radix-ui/react-dialog';
  import Image from 'next/image'

export default function SheetMenu() {
  return (
    <div className='flex items-center'>
       <Sheet>
  <SheetTrigger> 
    <Menu className='text-primaryColor' size={32}/>
    </SheetTrigger>
  <SheetContent className='w-full' side={"right"}>
    <SheetHeader>
      <DialogTitle></DialogTitle>
      <Image src="/logo.png" alt="Logo" width={100} height={24} />
      <SheetDescription className='flex flex-col font-bold text-xl gap-8 pt-10 text-primaryColor'>
        <a href="">Cargo</a>
        <a href="">Destinos</a>
        <a href="">Terminales</a>
        <a href="">Nosotros</a>
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
    </div>
  )
}

