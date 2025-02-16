"use client"

import Image from 'next/image';
import Search from "./Sections/Search";
import { useEffect, useState, useCallback } from "react";
import ContainerCardsPasaje from "./Components/ContainerCardsPasaje";
import axios from 'axios'
import SliderImage from '@/app/assets/Slider.webp'
import Ads2 from '@/app/assets/ads2.webp'
import PagosTicker from "./Sections/PagosTicker";
import Ads from "./Components/Ads";
import ContentWhyIcons from "./Sections/ContentWhyIcons";
import { Button } from "@/components/ui/button";
import AdsBus from "@/app/assets/Ads.webp";
import AdsMancora from "@/app/assets/Mancora.webp";
import AdsAsientos from "@/app/assets/Asientos.webp";
import SearchYouDestination from "./Sections/SearchYouDestination";
// import { useToast } from "@/hooks/use-toast"
import { useStore } from './zustand';

export interface Asiento {
  id: string;
  numero: number;
  busId: string;
}

export interface Bus {
  placa: string;
  capacidad: number;
  asientos: Asiento[];
}

export interface Reserva {
  asientoId: string;
  createdAt: string;
  dni: string;
  id: string;
  usuarioId: string;
  viajeId: string;

}
export interface Viaje {
  id: string;
  origen: string;
  destino: string;
  fechaSalida: string;
  fechaLlegada: string;
  precio: number;
  busId: string;
  reservas: Reserva[];
  asientosLibres: number;
  bus: Bus;
}

export interface User{
  id: string;
  email: string;
  nombre: string;
  dni: number;
}


export default function Home() {


  // const [ubicacion, setUbicacion] = useState<{ lat: number; lon: number } | null>(null);
  // const [ciudad, setCiudad] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viajesHome, setViajesHome] = useState<Viaje[]>([]);
 const {setUser} = useStore()
  //  const { toast } = useToast()
  
  const fetchUser = useCallback(async () => {
    
    try {
      const response = await axios.get<User>("/api/userDatos");
      setUser(response.data)
      
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Error desconocido");
      } else {
        setError("Error desconocido");
        console.log(error);
      }
    } 
  },[setUser, setError, error]);

  useEffect(() => {
   
    // if ("geolocation" in navigator) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       const { latitude, longitude } = position.coords;

         
    //       setUbicacion({ lat: latitude, lon: longitude });
    //       console.log("Ubicación guardada:", ubicacion, { lat: latitude, lon: longitude });

       
    //       obtenerCiudad(latitude, longitude);
    //     },
    //     (err) => {
    //       if(err!=null){
    //         toast({
            
    //         title: `Uh oh!`,
    //         description: "No pudimos determinar tu ubicación exacta.",
         
    //       })
    //       }
    //       console.error("Error al obtener la ubicación:", error);
          
    //   }
    //   );
    // } 
    // else {
    //   fetchUser();
    //   fetchViajesHome();
    //   setError("La geolocalización no es soportada por tu navegador.");
    // }

    // if(ciudad==null){
    //   fetchViajesHome();
    //   fetchUser();
    // }
    fetchViajesHome();
    fetchUser();
  }, [fetchUser]);
  

  // const obtenerCiudad = async (lat: number, lon: number) => {
  //   try {
  //     const response = await fetch(
  //       `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
  //     );

  //     if (!response.ok) throw new Error("Error al obtener los datos de ubicación");

  //     const data = await response.json();

  //     console.log("Respuesta Nominatim:", data);
      
  //     const nombreCiudad = data.address.city || data.address.town || data.address.village;

  //     setCiudad(nombreCiudad);
  //   } catch (error) {
  //     console.error("Error al obtener la ciudad:", error);
  //     setError("No pudimos determinar tu ubicación exacta.");
  //   }
  // };

 

  const fetchViajesHome = async () => {
   
    try {
      const response = await axios.get<Viaje[]>("/api/viajesHome");
      
      setViajesHome(response.data);
      
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Error desconocido");
      } else {
        setError("Error desconocido");
      }
    } 
  };

 

  return (
    <>
    <div className=' xl:relative xl:pb-[150px]'>
      <div className="flex w-full">
    <Image src={SliderImage} width={1920} height={1080} alt="Logo" className="w-full  lg:h-[250px] lg:object-cover 2xl:h-[450px] 2xl:object-cover xl:h-[300px] xl:object-cover]" />
     </div>
     <div className='xl:absolute xl:-bottom-8 xl:left-1/2 xl:transform xl:-translate-x-1/2 xl:w-full xl:px-[80px] 2xl:px-[200px]  '>
       <Search />
     </div>
    
    </div>
    
    
   
    <ContainerCardsPasaje viajesHome={viajesHome}/>
    <PagosTicker />
    <div className='2xl:px-[200px] '>
       <Ads  
      imageSrc={AdsBus}
      title="Nuevo ecosistema digital"
      description="La nueva experiencia digital de EPPO está aquí"
      buttonText="Descubre la nueva experiencia"/>
    </div>
   
    <ContentWhyIcons/>


    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:px-[80px] 2xl:px-[200px]  '>

    <div className="px-4 md:px-12 lg:px-0 w-full  ">
    <div className="flex w-full h-[300px] md:h-[510px] relative shadow-md">
    <Image src={Ads2} width={1920} height={1080} alt="Logo" className="w-full h-full object-cover" />
    <Button className="absolute bottom-4 right-4 bg-white text-primaryColor font-bold">Mas Beneficios</Button>
    </div>
    </div>
        
    <div className="px-4 md:px-12 lg:px-0 flex flex-col gap-4 lg:gap-[10px] mt-4 lg:mt-0 ">
      <Ads  
      imageSrc={AdsMancora}
      title="Nuevo ecosistema digital"
      description="La nueva experiencia digital "
      buttonText="Mas informacion"/>
    <Ads  
      imageSrc={AdsAsientos}
      title="Nuevo ecosistema digital"
      description="EPPO está aquí"
      buttonText="Mas informacion"/>
    </div>
    </div>
    <SearchYouDestination />
    
    </>
  );
}
