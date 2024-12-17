"use client"
import NavBar from "./Components/NavBar";
import Image from 'next/image';
import Search from "./Sections/Search";
import { useEffect, useState } from "react";
import ContainerCardsPasaje from "./Components/ContainerCardsPasaje";
import axios from 'axios'

export interface Viaje {
  id: string;
  origen: string;
  destino: string;
  fechaSalida: Date;
  fechaLlegada: Date;
  precio: number;
  busId: string;
}

export default function Home() {

  const ahoraUTC = new Date();
  const horaPeru = new Date(ahoraUTC.toLocaleString("en-US", { timeZone: "America/Lima" }));

  console.log("Hora Peru:", horaPeru);

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
          fetchViajesHome();
          setError("No pudimos obtener tu ubicación. Mostrando resultados por defecto.");
          console.error(err);
          
          
      
         
          
        }
      );
    } else {
      setError("La geolocalización no es soportada por tu navegador.");
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
    <Image src="/Slider.jpg" width={1920} height={1080} alt="Logo"  className="w-full" />
    </div>
    <Search />
    <ContainerCardsPasaje />
    <div>
      <h1>Bienvenido</h1>
      {ciudad ? (
        <p>Estás en: <strong>{ciudad}</strong></p>
      ) : ubicacion ? (
        <p>Obteniendo tu ciudad...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Obteniendo tu ubicación...</p>
      )}
    </div>

    </>
  );
}
