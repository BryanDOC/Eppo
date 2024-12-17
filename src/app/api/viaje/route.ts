import { NextResponse } from "next/server";
import { db } from "@/lib/db"; 

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



// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const {
//       origen,
//       destino,
//       fechaSalida,
//       fechaLlegada,
//       precio,
//       busId,
//     } = body;

//     // Validaciones básicas
//     if (!origen || !destino || !fechaSalida || !precio || !busId || !fechaLlegada) {
//       return NextResponse.json(
//         { error: "Los campos 'origen', 'destino', 'fechaSalida', 'fechaLlegada', 'precio' y 'busId' son obligatorios." },
//         { status: 400 }
//       );
//     }

//     // Verificar si el bus existe
//     const busExiste = await db.bus.findUnique({
//       where: { placa: busId },
//     });

//     if (!busExiste) {
//       return NextResponse.json(
//         { error: "El bus asociado (busId) no existe." },
//         { status: 404 }
//       );
//     }

//     // Ajustar fechas a la zona horaria de Perú (America/Lima)
//     const fechaSalidaLocal = ajustarFechaALocal(fechaSalida);
//     const fechaLlegadaLocal = ajustarFechaALocal(fechaLlegada);

//     // Crear el nuevo viaje
//     const nuevoViaje = await db.viaje.create({
//       data: {
//         origen,
//         destino,
//         fechaSalida: fechaSalidaLocal, // Fecha con hora local
//         fechaLlegada: fechaLlegadaLocal,
//         precio,
//         busId,
//       },
//     });

//     return NextResponse.json(nuevoViaje, { status: 201 });
//   } catch (error) {
//     console.error("Error al crear el viaje:", error);
//     return NextResponse.json(
//       { error: "Error al crear el viaje." },
//       { status: 500 }
//     );
//   }
// }

// // Función para ajustar la fecha a la hora local de Perú
// function ajustarFechaALocal(fechaString: string): Date {
//   const fechaUTC = new Date(fechaString);
//   const fechaLocal = new Date(
//     fechaUTC.getUTCFullYear(),
//     fechaUTC.getUTCMonth(),
//     fechaUTC.getUTCDate(),
//     fechaUTC.getUTCHours(),
//     fechaUTC.getUTCMinutes(),
//     fechaUTC.getUTCSeconds()
//   );

//   return fechaLocal; // Devuelve la fecha ajustada a la hora local
// }
