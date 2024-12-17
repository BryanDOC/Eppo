import { NextResponse } from "next/server";
import { db } from "@/lib/db"; 

export async function POST(req: Request) {
  try {
    
    const body = await req.json();
    const { placa, capacidad } = body;

 
    if (!placa || !capacidad) {
      return NextResponse.json(
        { error: "Los campos placa y capacidad son obligatorios" },
        { status: 400 }
      );
    }

    
    const nuevoBus = await db.bus.create({
      data: {
        placa,
        capacidad: Number(capacidad), 
      },
    });

    
    return NextResponse.json(nuevoBus, { status: 201 });
  } catch (error) {
    console.error("Error al crear el bus:", error);

   
    return NextResponse.json(
      { error: "Error al crear el bus" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bus = await db.bus.findMany();
    return NextResponse.json(bus);
  } catch (error) {
    console.error("Error fetching ciudades:", error);
    return NextResponse.json({ error: "Error fetching ciudades" }, { status: 500 });
  }
}

