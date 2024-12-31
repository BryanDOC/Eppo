import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; 

import {endOfDay } from "date-fns";
export async function POST(req: Request) {
  try {
    const body = await req.json();

    
    const {
      origen,
      destino,
      fechaSalida,
      fechaLlegada,
      precio,
      busId,
    } = body;

    // Validaciones básicas
    if (!origen || !destino || !fechaSalida || !precio || !busId || !fechaLlegada) {
      return NextResponse.json(
        { error: "Los campos 'origen', 'destino', 'fechaSalida', 'precio' y 'busId' son obligatorios." },
        { status: 400 }
      );
    }

   
    const busExiste = await db.bus.findUnique({
      where: { placa: busId },
    });

    if (!busExiste) {
      return NextResponse.json(
        { error: "El bus asociado (busId) no existe." },
        { status: 404 }
      );
    }

    // Crear el nuevo viaje
    const nuevoViaje = await db.viaje.create({
      data: {
        origen,
        destino,
        fechaSalida: new Date(fechaSalida),
        fechaLlegada: new Date(fechaLlegada),
        precio,
        busId,
      },
    });

    return NextResponse.json(nuevoViaje, { status: 201 });
  } catch (error) {
    console.error("Error al crear el viaje:", error);
    return NextResponse.json(
      { error: "Error al crear el viaje." },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const placeOrigin = searchParams.get("placeOrigin");
    const placeDestination = searchParams.get("placeDestination");
    const date = searchParams.get("date"); 

    
    if (!placeOrigin || !placeDestination || !date) {
      return NextResponse.json(
        { error: "Faltan parámetros requeridos: placeOrigin, placeDestination o date" },
        { status: 400 }
      );
    }

    const ahoraUTC = new Date();

    const finDia = endOfDay(new Date(date));

    
    const viajes = await db.viaje.findMany({
      where: {
        origen: placeOrigin,
        destino: placeDestination,
        fechaSalida: {
          gte: ahoraUTC, 
          lte: finDia,   
        },
      },
      include: {
        bus: {
          include: {
            asientos: true, 
          },
        },
        reservas: true, 
      },
      orderBy: {
        fechaSalida: "asc",
      },
    });

   
    const viajesConAsientos = viajes.filter((viaje) => {
      const asientosReservadosIds = viaje.reservas.map((reserva) => reserva.asientoId);
      const asientosLibres = viaje.bus.asientos.filter(
        (asiento) => !asientosReservadosIds.includes(asiento.id)
      ).length;
      return asientosLibres > 0; 
    });

    
    return NextResponse.json(viajesConAsientos, { status: 200 });
  } catch (error) {
    console.error("Error al obtener viajes:", error);
    return NextResponse.json(
      { error: "Error al obtener los viajes" },
      { status: 500 }
    );
  }
}



