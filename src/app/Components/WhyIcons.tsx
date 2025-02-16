import React from 'react';

interface WhyIconsProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  mainText: string;
  subText: string;
}
 
export default function WhyIcons({ Icon, mainText, subText }: WhyIconsProps) {
  return (
    <div className="flex flex-col gap-3 items-center w-fit">
      <div className="w-14 h-14 md:w-[72px] md:h-[72px] bg-white shadow-md rounded-full p-4 flex items-center justify-center">
        <Icon className="text-primaryColor h-10 w-10 md:h-14 md:w-14"  />
      </div>
      <div className="flex flex-col gap-[2px] items-center">
        <p className="font-semibold text-[14px] md:text-2xl capitalize">{mainText}</p>
        <p className="font-light text-xs md:text-base capitalize ">{subText}</p>
      </div>
    </div>
  );
}
