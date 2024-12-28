import React from 'react'
import Destination from './Destination'

export default function SearchYouDestination() {
  return (
    <div className='flex flex-col gap-4 mt-6 px-4 '>
      <h1 className='font-extralight italic text-center text-2xl'>!Encuentra <span className='font-extrabold text-primaryColor'>tu Destino!</span></h1>
      <div className='flex gap-12 overflow-x-auto scrollbar-hide my-12'>
        <Destination />
        <Destination />
        <Destination />
        <Destination />
        <Destination />
      </div>
    </div>
  )
}
