"use client"
import React from 'react'
import {usePathname} from 'next/navigation';
import Link from 'next/link';


interface ProgressButtonProps {
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    text: string;
    number: number
    link: string
}
export default function ProgressButton({Icon,number, text, link}: ProgressButtonProps) {

  
  const pathname = usePathname();
  
  const isActive = pathname === link;
  const isCompleted = pathname.startsWith(link); 

  return (
    <Link className='flex'
    href={link}>
        <hr className={`mt-4  border-4 ${isCompleted ? 'border-primaryColor':'border-neutral-300'} px-2`}/>
         <div className={`flex gap-2 items-center ${isActive 
          
          ? 'bg-primaryColor'
          : isCompleted 
          ? 'bg-primaryColor'
          :'bg-neutral-300'}  px-3 py-2 rounded-3xl w-fit text-xs text-white`}>
           <Icon className='!w-5 !h-5' />
      <h2>{number}. {text}</h2>
    </div>
    </Link>
   
  )
}
