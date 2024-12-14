
import NavBar from "./Components/NavBar";
import Image from 'next/image';
import Search from "./Sections/Search";

import ContainerCardsPasaje from "./Components/ContainerCardsPasaje";



export default function Home() {

  

  return (
    <>
    <NavBar />
    <div className="flex w-full">
    <Image src="/Slider.jpg" width={1920} height={1080} alt="Logo"  className="w-full" />
    </div>
    <Search />
    <ContainerCardsPasaje />

    </>
  );
}
