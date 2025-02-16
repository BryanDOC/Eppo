import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import {getUserByEmail} from '@/lib/user'

export async function POST(request: Request) {

    const { email,  password, dni, nombre } = await request.json()
    console.log({email}, {password})
    try{
        const hashedPassword = await bcrypt.hash(password, 10)
        const existingUser = await getUserByEmail(email)
        if(existingUser) {
            return new NextResponse("El Email Ya existe", { status: 400 })
        }
       
        const  userCreated = await db.usuario.create({
            data: {
                email,
                password: hashedPassword,
                dni: parseInt(dni,10),
                nombre
            },
        })
        return NextResponse.json(userCreated)

    } catch(error) {
        console.log(error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}