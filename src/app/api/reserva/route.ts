import { NextResponse } from 'next/server';
import { db } from "@/lib/db";



// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { viajeId, asientoId, dni, usuarioId } = body;

   
//     if (!viajeId || !asientoId || !dni) {
//       return NextResponse.json(
//         { error: "Los campos viajeId, asientoId y dni son obligatorios." },
//         { status: 400 }
//       );
//     }

   
//     const reservaExistente = await db.reserva.findFirst({
//       where: {
//         viajeId: viajeId,
//         asientoId: asientoId,
//       },
//     });

//     if (reservaExistente) {
//       return NextResponse.json(
//         { error: "El asiento ya está reservado para este viaje." },
//         { status: 409 }
//       );
//     }

   
//     const nuevaReserva = await db.reserva.create({
//       data: {
//         viajeId,
//         asientoId,
//         dni,
        
//         ...(usuarioId && { usuarioId }),
//       },
//     });

//     return NextResponse.json(
//       { message: "Reserva creada exitosamente.", reserva: nuevaReserva },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error al crear la reserva:", error);
//     return NextResponse.json(
//       { error: "Error al crear la reserva." },
//       { status: 500 }
//     );
//   }
// }



export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { viajeId, selectedSeats, dni, usuarioId } = body;

    // Verificar que los campos obligatorios estén presentes
    if (!viajeId || !dni || !selectedSeats || !Array.isArray(selectedSeats) || selectedSeats.length === 0) {
      return NextResponse.json(
        { error: "Los campos viajeId, selectedSeats y dni son obligatorios." },
        { status: 400 }
      );
    }

    const reservasCreadas = [];
    const asientosOcupados = [];

    for (const seat of selectedSeats) {
      const { id: asientoId, number } = seat; // Extraemos id y número de asiento

      // Validar si el asiento ya está reservado para este viaje
      const reservaExistente = await db.reserva.findFirst({
        where: {
          viajeId: viajeId,
          asientoId: asientoId,
        },
      });

      if (reservaExistente) {
        asientosOcupados.push({ asientoId, number });
        continue; // Si el asiento ya está reservado, lo saltamos
      }

      // Crear la reserva para el asiento disponible
      const nuevaReserva = await db.reserva.create({
        data: {
          viajeId,
          asientoId,
          dni,
          ...(usuarioId && { usuarioId }),
        },
      });

      reservasCreadas.push(nuevaReserva);
    }

    if (asientosOcupados.length > 0) {
      return NextResponse.json(
        {
          message: "Algunas reservas fueron creadas, pero algunos asientos ya estaban ocupados.",
          reservasCreadas,
          asientosOcupados,
        },
        { status: 207 } 
      );
    }

    return NextResponse.json(
      { message: "Reservas creadas exitosamente.", reservas: reservasCreadas },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear las reservas:", error);
    return NextResponse.json(
      { error: "Error al crear las reservas." },
      { status: 500 }
    );
  }
}

