import React from 'react'

export default function Page() {
  return (
    <div className='flex flex-col gap-4 items-center my-[100px] md:px-12 lg:px-[80px] py-16 2xl:px-[200px]'>
      <h2 className='text-3xl text-white bg-green-500 rounded-full w-14 h-14 flex items-center justify-center'>✓</h2>
      <p className='font-bold text-3xl '>Cuenta Creada</p>
      <p className='mt-8 '>Bienvenid@ a la familia de <span className='text-primaryColor font-bold'>Eppo</span></p>
      <hr className='border-[1px] border-gray-300 w-full '/>
    </div>
  )
}
