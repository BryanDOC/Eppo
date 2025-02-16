"use client"
import React from 'react'
import {usePathname} from 'next/navigation';
import Link from 'next/link';



interface ProgressButtonProps {
    text: string;
    number: number;
    link: string;
    
}
export default function ProgressButtonRegister({number, text, link}: ProgressButtonProps) {
  
    const pathname = usePathname();
  
    const isActive = pathname === link;
    const isCompleted = pathname !== link && pathname.startsWith(link);
  
    return (
    
    <div className='flex flex-col gap-2 h-[70px] relative md:w-full md:pl-2'>
   <Link className='flex md:w-full items-center gap-2 '
        href={link}>
            
             <div className={`flex gap-1 items-center md:justify-center
              ${isActive 
              ? 'border-2 border-primaryColor text-primaryColor'
              : isCompleted 
              ? 'bg-primaryColor border-2'
              :'bg-neutral-300 border-2'}  px-3 py-2 rounded-3xl md:rounded-full md:w-14 md:h-14 w-fit text-xs text-backgroundApp`}>
              
          <h2 className={`font-bold text-[14px] md:text-[20px] ${isActive ? 'text-primaryColor':'text-backgroundApp'}`}>
            {
                isCompleted ? '✓' : number
            }
            
            
            </h2>
        </div>
        {
          number !== 3 && (
            <hr className={`  rounded-full border-[1px] ${isCompleted ? 'border-primaryColor':'border-neutral-300'} px-12 xs:px-14`}/>
          )
        }
        
        </Link>
        <h2 className='
        absolute -left-[14px] -bottom-1 md:-left-[24px] md:-bottom-6
        h-8 
        text-xs md:text-base w-[60px] md:w-[120px] text-center flex items-top justify-center '>{text}</h2>
        
        </div>
    )
}
