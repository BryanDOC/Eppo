import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "../../../../auth";

export async function GET() {
  try {
   
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    
    const user = await db.usuario.findUnique({
      where: { id: session.user.id },
      select: { nombre: true, dni: true },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
