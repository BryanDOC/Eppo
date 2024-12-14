import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ciudades = await db.ciudades.findMany();
    return NextResponse.json(ciudades);
  } catch (error) {
    console.error("Error fetching ciudades:", error);
    return NextResponse.json({ error: "Error fetching ciudades" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Obtener datos enviados en el cuerpo de la solicitud
    const { nombre } = body;

    if (!nombre) {
      return NextResponse.json(
        { error: "El nombre de la ciudad es obligatorio" },
        { status: 400 }
      );
    }

    const nuevaCiudad = await db.ciudades.create({
      data: { nombre },
    });

    return NextResponse.json(nuevaCiudad, { status: 201 });
  } catch (error) {
    console.error("Error al crear la ciudad:", error);
    return NextResponse.json(
      { error: "Error al crear la ciudad" },
      { status: 500 }
    );
  }
}
