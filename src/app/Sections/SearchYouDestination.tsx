import React from "react";
import Destination from "../Components/Destination";
import ElAlto from "@/app/assets/El alto.webp";
import Mancora from "@/app/assets/Mancora.webp";
import Talara from "@/app/assets/Talara.webp";
import Sullana from "@/app/assets/Sullana.webp";
import Piura from "@/app/assets/Piura.webp";

export default function SearchYouDestination() {
  return (
    <div className="flex flex-col gap-4 mt-8 px-4 py-8">
      <h1 className="font-extralight italic text-center text-2xl">
        !Encuentra
        <span className="font-extrabold text-primaryColor">tu Destino!</span>
      </h1>
      <div className="flex gap-10 overflow-x-auto scrollbar-hide my-6">
        <Destination imageSrc={Sullana} city="Sullana" />
        <Destination imageSrc={Piura} city="Piura" />
        <Destination imageSrc={Talara} city="Talara" />
        <Destination imageSrc={ElAlto} city="El Alto" />
        <Destination imageSrc={Mancora} city="Mancora" />
      </div>
    </div>
  );
}
