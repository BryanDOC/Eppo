"use client"
import NavBar from "./Components/NavBar";
import Image from 'next/image';
import Search from "./Sections/Search";
import { useEffect, useState } from "react";
import ContainerCardsPasaje from "./Components/ContainerCardsPasaje";
import axios from 'axios'
import SliderImage from '@/app/assets/Slider.webp'
import PagosTicker from "./Components/PagosTicker";
import Ads from "./Components/Ads";
import WhyIcons from "./Components/WhyIcons";


export interface Viaje {
  id: string;
  origen: string;
  destino: string;
  fechaSalida: string;
  fechaLlegada: string;
  precio: number;
  busId: string;
  reservas:[];
  asientosLibres: number;
  bus:[]
}

export default function Home() {


  const [ubicacion, setUbicacion] = useState<{ lat: number; lon: number } | null>(null);
  const [ciudad, setCiudad] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viajesHome, setViajesHome] = useState<Viaje[]>([]);
  
  useEffect(() => {
    // Obtener la ubicación del cliente
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Guardar la ubicación
          setUbicacion({ lat: latitude, lon: longitude });
          console.log("Ubicación guardada:", { lat: latitude, lon: longitude });

          // Llamar a la función para obtener el nombre del lugar
          obtenerCiudad(latitude, longitude);
        },
        (err) => {
          setError("No pudimos obtener tu ubicación. Mostrando resultados por defecto.");
          console.error(err);
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
      // Extraer la ciudad del JSON
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
      console.log("Viajes obtenidos:", response.data);
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
    <NavBar />
    <div className="flex w-full">
    <Image src={SliderImage} width={1920} height={1080} alt="Logo" className="w-full" />
    </div>
    <Search />
    <ContainerCardsPasaje viajesHome={viajesHome}/>
    <PagosTicker />
    <Ads/>
    <WhyIcons/>
    

    </>
  );
}
