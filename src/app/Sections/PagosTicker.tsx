"use client"
import MasterCard from '@/app/assets/Mastercard.webp'
import Visa from '@/app/assets/Visa.webp'
import Yape from '@/app/assets/Yape.webp'
import PagoEfectivo from '@/app/assets/Pagoefectivo.webp'
import Bbva from '@/app/assets/BBVA.webp'
import Plin from '@/app/assets/Plin.webp'
import Image from 'next/image'
import {motion} from 'framer-motion'


export default function PagosTicker() {
  return (
    <div className='py-8 md:py-12 bg-backgroundApp lg:px-[80px] 2xl:px-[200px] '>
      <div className='container'>
        <div className='flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]'>
        <motion.div className='flex gap-10 flex-none pr-10'
        animate ={{
          translateX: "-50%",
          
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
          repeatType: "loop",
        }}
        >

        <Image src={MasterCard} alt="acme"  className='logo-ticker-image  h-14 w-auto' />
        <Image src={Visa} alt="quantum"  className='logo-ticker-image h-14 w-auto' />
        <Image src={Bbva} alt="celestial" className='logo-ticker-image h-14 w-auto'  />
        <Image src={PagoEfectivo} alt="echo" className='logo-ticker-image h-14 w-auto' />
        <Image src={Yape} alt="pulse" className='logo-ticker-image h-14 w-auto'/>
        <Image src={Plin} alt="apex"  className='logo-ticker-image h-14 w-auto' />


        <Image src={MasterCard} alt="acme"  className='logo-ticker-image h-14 w-auto' />
        <Image src={Visa} alt="quantum"  className='logo-ticker-image h-14 w-auto' />
        <Image src={Bbva} alt="celestial" className='logo-ticker-image h-14 w-auto'  />
        <Image src={PagoEfectivo} alt="echo" className='logo-ticker-image h-14 w-auto' />
        <Image src={Yape} alt="pulse" className='logo-ticker-image h-14 w-auto' />
        <Image src={Plin} alt="apex"  className='logo-ticker-image h-14 w-auto' />
        </motion.div>
</div>
      </div>
    </div>
  )
}

