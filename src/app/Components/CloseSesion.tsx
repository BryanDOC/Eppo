"use client"
import React, { useState } from 'react'

import {signOut }from 'next-auth/react'
import { FaUserCircle } from "react-icons/fa";


export default function CloseSesion() {
 
  const [isOpen, setIsOpen] = useState(false);
 
  return (
    <div className="relative inline-block z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 py-2  text-white rounded-lg "
      >
        <div className='flex  items-center justify-center gap-2'>
          <FaUserCircle size={32} className='text-primaryColor'/>
          
        </div>
       
       
      </button>

      {isOpen && (
        <div className="absolute mt-2 bg-white text-gray-800 rounded-lg shadow-lg px-2 w-[100px] -left-8">
          <button
            onClick={() => signOut()}
            className="block w-full text-left px-2  py-2  rounded-lg text-xs"
          >
            Cerrar sesión
          </button>
          <button
            
            className="block w-full text-left px-2  py-2  rounded-lg text-xs"
          >
            Mis Viajes
          </button>
        </div>
      )}
    </div>
  );
 
}
