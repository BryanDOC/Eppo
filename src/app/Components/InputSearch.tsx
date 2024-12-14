import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { MapPin } from 'lucide-react';
import { Ciudad } from '../Sections/Search';



interface TypeInput {
    text: string;
    placeHolder: string;
    places: Ciudad[]; 
    value: string;
    onChange: (value: string) => void
  }

export default function InputSearch({text, places, placeHolder, value, onChange}: TypeInput) {
  return (
    
      <div className=''>
        <p className='uppercase text-textOpaco mb-2 font-semibold text-xs'>{text}*</p>
      <Select value={value} onValueChange={onChange}>
  <SelectTrigger className="w-full flex items-center justify-between rounded-xl py-6 border-primaryColor text-primaryColor">
    <div className='flex items-center gap-2 text-textOpaco text-base'>
    <MapPin className='text-primaryColor'/>
    <SelectValue placeholder={placeHolder} className=''/>
    </div>
      </SelectTrigger>
  <SelectContent className=''>
    {places.map((place) => (
      <SelectItem key={place.id} value={place.nombre}>
        {place.nombre}
      </SelectItem>
    ))}
    </SelectContent>
</Select>

      </div>
    
  )
}
