import React from "react";

import Location from "@/app/assets/svg/location.svg";
import Seat from "@/app/assets/svg/seat.svg";

import Safe from "@/app/assets/svg/safe.svg";
import { FaUsers } from "react-icons/fa";
import WhyIcons from "../Components/WhyIcons";

export default function ContentWhyIcons() {
  return (
    <div className="flex flex-col gap-8 py-4 px-6 mt-8 mb-8">
      <h2 className="text-center text-2xl ">
        ¿Por qué <span className="font-bold">elegirnos?</span>
      </h2>
      <div className="flex  items-center justify-between ">
        <WhyIcons
          Icon={Location}
          mainText="+20 Destinos"
          subText="Nacionales"
        />
        <WhyIcons Icon={FaUsers} mainText="+5 Millones" subText="Usuarios" />
        <WhyIcons Icon={Safe} mainText="Transporte" subText="seguro" />
        <WhyIcons Icon={Seat} mainText="asientos" subText="comodos" />
      </div>
    </div>
  );
}
