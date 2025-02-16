import React from 'react'




interface InputDataPasajeroProps {
    editable?: boolean; 
    text: string;
    value: string;
    placeHolder?: string
    type: string
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  }

export default function InputDataPasajero({editable, text, value, placeHolder, type, handleChange}: InputDataPasajeroProps) {

       
  return (
    <div className="flex flex-col border-2 border-gray-300 px-3 py-2 rounded-lg">
      <p className="font-bold text-primaryColor uppercase text-xs">{text}</p>
      <input
        type={type}
        className="text-gray-400 outline-none bg-transparent"
        value={value}
        readOnly={!editable}
        maxLength={8}
        onChange={handleChange}
        
        placeholder={placeHolder}
        
      />
    </div>
  )
}
