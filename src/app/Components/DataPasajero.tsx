import React, { useEffect, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import InputDataPasajero from './InputDataPasajero';
import Asiento from '@/app/assets/svg/seatBus.svg'
import axios from 'axios'



interface Seat {
  id: string;
  numero: number;
}

interface SeatFormProps {
  seat: Seat;
  index: number | string;
}

interface FormData {
  tipoDocumento: string;
  numeroDocumento: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  
}

const initialFormData: FormData = {
  tipoDocumento: '',
  numeroDocumento: '',
  nombres: '',
  apellidos: '',
  fechaNacimiento: '',
  
};

export default function DataPasajero({seat, index}: SeatFormProps) {

    const [open, setOpen] = useState(true)
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [fetching, setFetching] = useState(false);
    

  const handleNumeroDocumentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      numeroDocumento: value,
    }));
  };

   useEffect(() => {
      if (formData.numeroDocumento.length >= 8) {
        const fetchData = async () => {
          setFetching(true);
          try {
            const response = await axios.post('https://api.consultasperu.com/api/v1/query', {
              token: '8378baf3d7922e082a645ca156abffa2692af8df27489db9391236045992aaa8',
              type_document: 'dni',
              document_number: formData.numeroDocumento,
            });
           
            setFormData((prev) => ({
              ...prev,
              tipoDocumento: response.data.data.number,
              nombres: response.data.data.name,
              apellidos: response.data.data.surname,
              fechaNacimiento: response.data.data.date_of_birth,
              
            }));
            console.log(response.data.data)
          } catch (error) {
            console.error('Error al obtener datos:', error);
          } finally {
            setFetching(false);
          }
        };
        fetchData();
      }
    }, [formData.numeroDocumento]);


    

  return (
    <div className='w-full bg-white border border-gray-300 rounded-xl h-fit py-4 flex flex-col gap-4 shadow-md'>
      <div className='flex items-center justify-between px-6'>
        <div className='flex items-center gap-2 justify-center '>
        <p className=' text-gray-400 text-[20px] '>Pasajero</p>
        <p className='flex gap-2 text-gray-400 text-[20px] items-center'><Asiento className='w-5 h-full text-gray-400'/>{seat.numero}</p>
        </div>
       
        {    
            open ?
            <IoIosArrowUp className='text-primaryColor cursor-pointer' size={24}
            onClick={() => setOpen(!open)}
            />
            :
            <IoIosArrowDown className='text-primaryColor cursor-pointer' size={24}
            onClick={() => setOpen(!open)}
            />
            }
      </div>
      <hr className='border-[1px] border-gray-300'/>
      {      
        open && 
        <div className='grid grid-cols-2 gap-3 px-4' >
        <InputDataPasajero text='Tipo de Documento' value='DNI' type='text' />
        {fetching && <p className="text-sm text-gray-500">Buscando datos...</p>}
        <InputDataPasajero text='N° de Documento' value={index===0 ? index.toString() : formData.numeroDocumento} editable type='number' handleChange={handleNumeroDocumentoChange}/>
        <InputDataPasajero text='Nombres' value={formData.nombres} type='text' />
        <InputDataPasajero text='Apellidos' value={formData.apellidos}type='text' />
        <InputDataPasajero text='Fecha de Nacimiento' value={formData.fechaNacimiento} placeHolder='DD/MM/AAAA' type='text'  />
        <InputDataPasajero text='Sexo' value='' placeHolder='Proximamente' type='text' />
      </div>
        
        
      }
      
    </div>
  )
}
