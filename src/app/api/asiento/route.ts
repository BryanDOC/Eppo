import { NextResponse } from "next/server";
import { db } from "@/lib/db"; 



// export async function POST(req: Request) {
//   try {
   
//     const body = await req.json();
//     const { numero, busId } = body;

    
//     if (!numero || typeof numero !== "number") {
//       return NextResponse.json(
//         { error: "El campo 'numero' es obligatorio y debe ser un número entero" },
//         { status: 400 }
//       );
//     }

//     if (!busId || typeof busId !== "string") {
//       return NextResponse.json(
//         { error: "El campo 'busId' es obligatorio y debe ser un string" },
//         { status: 400 }
//       );
//     }

   
//     const busExistente = await db.bus.findUnique({
//       where: { placa: busId },
//     });

//     if (!busExistente) {
//       return NextResponse.json(
//         { error: "El bus con el ID proporcionado no existe" },
//         { status: 404 }
//       );
//     }

//     // Crear un nuevo asiento
//     const nuevoAsiento = await db.asiento.create({
//       data: {
//         numero,
//         busId,
//       },
//     });

//     // Responder con el asiento creado
//     return NextResponse.json(nuevoAsiento, { status: 201 });
//   } catch (error) {
//     console.error("Error al crear el asiento:", error);

//     // Manejo de errores
//     return NextResponse.json(
//       { error: "Ocurrió un error al crear el asiento" },
//       { status: 500 }
//     );
//   }
// }

export async function GET() {
  try {
    const asiento = await db.asiento.findMany();
    return NextResponse.json(asiento);
  } catch (error) {
    console.error("Error fetching ciudades:", error);
    return NextResponse.json({ error: "Error fetching ciudades" }, { status: 500 });
  }
}




export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validar que el body sea un array
    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: "Se espera un array de asientos." },
        { status: 400 }
      );
    }

    // Validación de cada asiento en el array
    const asientos = body.map((asiento) => {
      const { numero, busId } = asiento;

      if (!numero || typeof numero !== "number") {
        throw new Error("Cada asiento debe tener un 'numero' válido (número entero).");
      }

      if (!busId || typeof busId !== "string") {
        throw new Error("Cada asiento debe tener un 'busId' válido (string).");
      }

      return { numero, busId }; // Retornar los campos validados
    });

    // Crear múltiples asientos en la base de datos
    const nuevosAsientos = await db.asiento.createMany({
      data: asientos,
      skipDuplicates: true, // Evita duplicados si existen asientos con el mismo número y busId
    });

    return NextResponse.json(
      { message: "Asientos creados exitosamente", cantidad: nuevosAsientos.count },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear los asientos:", error);
    return NextResponse.json(
      
      { status: 500 }
    );
  }
}
