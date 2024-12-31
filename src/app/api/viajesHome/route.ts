import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toZonedTime, format } from "date-fns-tz";


export async function GET() {
  try {
    const ahoraUTC = new Date();
    
    
    const viajes = await db.viaje.findMany({
      where: {
        fechaSalida: {
          gte: ahoraUTC, 
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

    const viajesUnicos = [];
    const destinosProcesados = new Set();
    const zonaHorariaPeru = "America/Lima";

    for (const viaje of viajes) {
      if (!destinosProcesados.has(viaje.destino)) {
        destinosProcesados.add(viaje.destino);

        
        const asientosReservadosIds = viaje.reservas.map((reserva) => reserva.asientoId);
        const asientosLibres = viaje.bus.asientos.filter(
          (asiento) => !asientosReservadosIds.includes(asiento.id) 
        ).length;
        
        const fechaSalidaLocal = toZonedTime(viaje.fechaSalida, zonaHorariaPeru);
        const fechaLlegadaLocal = toZonedTime(viaje.fechaLlegada, zonaHorariaPeru);

        
        viajesUnicos.push({
          ...viaje,
          fechaSalida: format(fechaSalidaLocal, "yyyy-MM-dd'T'HH:mm:ss", { timeZone: zonaHorariaPeru }),
          fechaLlegada: format(fechaLlegadaLocal, "yyyy-MM-dd'T'HH:mm:ss", { timeZone: zonaHorariaPeru }),
          asientosLibres, 
        });
      }
    }

    return NextResponse.json(viajesUnicos, { status: 200 });
  } catch (error) {
    console.error("Error al obtener viajes:", error);
    return NextResponse.json(
      { error: "Error al obtener los viajes" },
      { status: 500 }
    );
  }
}

