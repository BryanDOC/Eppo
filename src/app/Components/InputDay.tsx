"use client"


import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react"
import { IoIosArrowUp } from "react-icons/io";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {useStore} from '@/app/zustand'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"



interface TypeInputDay {
    text: string;
    placeHolder: string;
    value: Date | undefined; 
    opcional?: boolean
    onChange: (date: Date | undefined) => void; 
     
  }

export default function InputDay({text, placeHolder, value, opcional, onChange}: TypeInputDay) {

   
   const {setOpcional} = useStore()
   const [open, setOpen] = useState<boolean>(false)

   const handleShowInput = () => {
    setOpen(!open)
    setOpcional(!opcional)
   }

  return (
    <div className="">
      <div className="flex gap-4">
        <p className='uppercase text-textOpaco mb-2 font-semibold text-xs'>{text}*</p>
        {opcional ? 
        <IoIosArrowDown onClick={handleShowInput} className='text-primaryColor cursor-pointer'/> 
        :
        <IoIosArrowUp onClick={handleShowInput} className={`${opcional!=null ? "text-primaryColor cursor-pointer" : "hidden"}`}/>
       }
      </div>
        
        <Popover >
      <PopoverTrigger asChild className={`${opcional ? "hidden" : "flex"}`}>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal rounded-xl py-6 border-primaryColor",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="text-primaryColor !w-5 !h-5" />
          {value ? format(value, "PPP") : <span className="text-base">{placeHolder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
          
        />
      </PopoverContent>
    </Popover>
    </div>
    
  )
}
