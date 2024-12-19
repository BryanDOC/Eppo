import { NextResponse } from 'next/server';
import { db } from "@/lib/db";



export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { viajeId, asientoId, dni, usuarioId } = body;

   
    if (!viajeId || !asientoId || !dni) {
      return NextResponse.json(
        { error: "Los campos viajeId, asientoId y dni son obligatorios." },
        { status: 400 }
      );
    }

   
    const reservaExistente = await db.reserva.findFirst({
      where: {
        viajeId: viajeId,
        asientoId: asientoId,
      },
    });

    if (reservaExistente) {
      return NextResponse.json(
        { error: "El asiento ya está reservado para este viaje." },
        { status: 409 }
      );
    }

   
    const nuevaReserva = await db.reserva.create({
      data: {
        viajeId,
        asientoId,
        dni,
        
        ...(usuarioId && { usuarioId }),
      },
    });

    return NextResponse.json(
      { message: "Reserva creada exitosamente.", reserva: nuevaReserva },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    return NextResponse.json(
      { error: "Error al crear la reserva." },
      { status: 500 }
    );
  }
}
