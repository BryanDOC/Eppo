"use client"

import Image from 'next/image';
import Search from "./Sections/Search";
import { useEffect, useState } from "react";
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
import { useToast } from "@/hooks/use-toast"


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




export default function Home() {


  const [ubicacion, setUbicacion] = useState<{ lat: number; lon: number } | null>(null);
  const [ciudad, setCiudad] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viajesHome, setViajesHome] = useState<Viaje[]>([]);
  const { toast } = useToast()

  useEffect(() => {
   
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

         
          setUbicacion({ lat: latitude, lon: longitude });
          console.log("Ubicación guardada:", ubicacion, { lat: latitude, lon: longitude });

       
          obtenerCiudad(latitude, longitude);
        },
        (err) => {
          if(err!=null){
            toast({
            
            title: `Uh oh!`,
            description: "No pudimos determinar tu ubicación exacta.",
         
          })
          }
          console.error("Error al obtener la ubicación:", error);
          
      }
      );
    } 
    else {
      fetchViajesHome();
      setError("La geolocalización no es soportada por tu navegador.");
    }

    if(ciudad==null){
      fetchViajesHome();
    }
    
  }, []);
  

  const obtenerCiudad = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
      );

      if (!response.ok) throw new Error("Error al obtener los datos de ubicación");

      const data = await response.json();

      console.log("Respuesta Nominatim:", data);
      
      const nombreCiudad = data.address.city || data.address.town || data.address.village;

      setCiudad(nombreCiudad);
    } catch (error) {
      console.error("Error al obtener la ciudad:", error);
      setError("No pudimos determinar tu ubicación exacta.");
    }
  };

 

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
    
    <div className="flex w-full">
    <Image src={SliderImage} width={1920} height={1080} alt="Logo" className="w-full " />
    </div>
    <Search />
    <ContainerCardsPasaje viajesHome={viajesHome}/>
    <PagosTicker />
    <Ads  
      imageSrc={AdsBus}
      title="Nuevo ecosistema digital"
      description="La nueva experiencia digital de EPPO está aquí"
      buttonText="Descubre la nueva experiencia"/>
    <ContentWhyIcons/>
    <div className=" px-4 w-full">
    <div className="flex w-full h-[300px] relative shadow-md">
    <Image src={Ads2} width={1920} height={1080} alt="Logo" className="w-full h-full object-cover" />
    <Button className="absolute bottom-4 right-4 bg-white text-primaryColor font-bold">Mas Beneficios</Button>
    </div>
    </div>
        
    <div className="px-4 flex flex-col gap-4 mt-4">
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
    <SearchYouDestination />
    
    </>
  );
}
