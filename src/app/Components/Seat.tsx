import React, { useState } from 'react'
import Asiento from '@/app/assets/svg/seatBus.svg'
import { useStore } from '@/app/zustand'

interface SeatProps {
  id: string
  numero: number
  reservado: boolean | undefined
}
export default function Seat({ numero, reservado , id}: SeatProps) {

 const [select, setSelect] = useState(false)
 const {toggleSeat } = useStore()



  const handleClick = (id: string, seatNumber: number) => {
    setSelect(!select);
    toggleSeat(id, seatNumber);
    };
  
  

  return (
    <button className={`relative w-fit flex items-center justify-center ${reservado ? "text-textOpaco" : ""}`} 
    onClick={() => handleClick(id, numero)}
    disabled={reservado}>
      <Asiento className={`w-9 h-full ${select ? 'text-primaryColor' : ''}`}/>
      <p className={`absolute text-base text-black top-[5px] ${select ? 'text-primaryColor' : ''}`}>{numero}</p>
    </button>
  )
}
