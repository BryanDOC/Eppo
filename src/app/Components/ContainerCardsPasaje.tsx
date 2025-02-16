import React from 'react'
import CardPasaje from './CardPasaje'
import { Viaje } from '../page'


export default function ContainerCardsPasaje(Props: { viajesHome: Viaje[] }) {
  const { viajesHome } = Props
  
  return (
    <div className='flex flex-col xl:mt-16 gap-6 px-6 md:px-12 mt-8 lg:mt-12 lg:px-[80px] 2xl:px-[200px] '>
      {
        viajesHome.map((viaje) => (
            
              <CardPasaje key={viaje.id} viaje={viaje} />
            
            
            
             
            
          
        ))
      }
    </div>
  )
}
