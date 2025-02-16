import React from 'react'

export default function Skeleton() {
  return (
    <div className='animate-pulse px-6 flex flex-col gap-4 mt-8 md:px-12 lg:px-[80px] 2xl:px-[200px]'>
      <h1 className='w-full h-3 md:w-[350px] bg-gray-200 py-4 rounded-xl shadow-sm animate-pulse'></h1>
      <div className='md:grid md:grid-cols-2 md:gap-4'>
        <div className='w-full h-screen bg-gray-200 rounded-xl shadow-sm animate-pulse'></div>

        <div className='md:flex hidden md:flex-col md:gap-8 '>
        <div className='w-full h-[370px] bg-gray-200 rounded-xl shadow-sm animate-pulse'> </div>
        <div className='w-full h-[65px] bg-gray-200 rounded-xl shadow-sm animate-pulse'></div>
       
      
        </div>
      </div>
      

    </div>
  )
}
