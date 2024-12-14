import React from 'react'
import CardPasaje from './CardPasaje'

export default function ContainerCardsPasaje() {
  return (
    <div className='flex flex-col gap-6 px-6 mt-8'>
      <CardPasaje />
      <CardPasaje />
      <CardPasaje />

    </div>
  )
}
