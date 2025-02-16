"use client"
import React, { useState } from 'react'
import { toast } from '@/hooks/use-toast';
import {
  Sheet,
  SheetHeader,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
} from "@/components/ui/sheet"

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
   FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import {z} from 'zod'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { login } from '../../../actions/login'

export default  function SheetLogin() {

  const [error, setError] = useState<string | undefined>("")
    const router = useRouter()

    const formSchema = z.object({
      email: z.string().min(2,{
          message: "Email is too short",
      }),
  
      password: z.string().min(2,{
          message: "Password is too short",
      }),
    }) 


    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });
    
  
    const onSubmitRegister = () =>{
    router.push('/register')
  }
 
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    
    try {
      const data = await login(values); 
      setError(data?.error);
      if(error?.length ?? 0 >0){
        toast ({
        title: "Error al iniciar sesión",
      })
       
      
      }
      if (data?.success) {
        
        toast({
          variant: "success",
          title: "Sesión iniciada",
        });
        
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      
      
    }
  };
  return (
    <div>
      
  <Sheet>
    
      <SheetTrigger asChild>
        <Button className='text-xs rounded-full md:text-base'>Iniciar sesión</Button>
      </SheetTrigger>

      
      <SheetContent className="w-full h-screen flex flex-col justify-center" side="right">
        <SheetHeader>
          <SheetTitle className="text-3xl font-bold my-2">Inicia sesión</SheetTitle>
          <SheetDescription>
            
          </SheetDescription>
        </SheetHeader>

        
        <div className="grid gap-4 py-2">
          <hr />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full gap-4 flex flex-col mt-4">
             
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Correo electrónico"
                        {...field}
                        className="h-14"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
           
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Contraseña"
                        {...field}
                        className="h-14"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            
              <Button
                className="w-full uppercase text-base font-bold py-6 bg-gray-200 hover:text-primaryColor"
                type="submit"
              >
                Iniciar sesión
              </Button>
            </form>
          </Form>
        </div>

       
        <SheetFooter>
          <SheetClose asChild>
            <Button
              onClick={onSubmitRegister}
              className="w-full uppercase text-base font-bold py-6 bg-primaryColor  hover:text-primaryColor"
            >
              Crear cuenta
            </Button>
          </SheetClose>
        </SheetFooter>

       
        <p className="text-left my-8">
          ¿No puedes acceder?{" "}
          <span className="text-primaryColor cursor-pointer">Recupera tu contraseña</span>
        </p>
      </SheetContent>
    </Sheet>
    </div>
  )
}

