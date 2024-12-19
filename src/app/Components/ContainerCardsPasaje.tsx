import React from 'react'
import CardPasaje from './CardPasaje'
import { Viaje } from '../page'

export default function ContainerCardsPasaje(Props: { viajesHome: Viaje[] }) {
  const { viajesHome } = Props
  return (
    <div className='flex flex-col gap-6 px-6 mt-8'>
      {
        viajesHome.map((viaje) => (
          <CardPasaje key={viaje.id} viaje={viaje} />
        ))
      }
    </div>
  )
}
