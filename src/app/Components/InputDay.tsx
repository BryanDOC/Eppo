"use client"


import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


interface TypeInputDay {
    text: string;
    placeHolder: string;
    value: Date | undefined; 
    onChange: (date: Date | undefined) => void; 
     
  }

export default function InputDay({text, placeHolder, value, onChange}: TypeInputDay) {

   
    

  return (
    <div className="">
         <p className='uppercase text-textOpaco mb-2 font-semibold text-xs'>{text}*</p>
        <Popover >
      <PopoverTrigger asChild className="">
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
