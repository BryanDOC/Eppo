import { create } from 'zustand'

type Store = {
  date: Date | string;
  setDate: (date: string) => void;
  placeOrigin: string;
  setPlaceOrigin: (placeOrigin: string) => void;
  placeDestination: string;
  setPlaceDestination: (placeDestination: string) => void;
  opcional: boolean,
  setOpcional: (opcional: boolean) => void,
  formatteDate: Date | string,
  setFormattedDate: (formattedDate: Date | string) => void
  
  }
 
 export const useStore = create<Store>()((set) => ({
    date: "", 
    setDate: (date) => set(() => ({ date: date })),
    placeOrigin: "",
    setPlaceOrigin: (placeOrigin) => set(() => ({ placeOrigin: placeOrigin })),
    placeDestination: "",
    setPlaceDestination: (placeDestination) => set(() => ({ placeDestination: placeDestination })),
    opcional: true,
    setOpcional: (opcional) => set(() => ({ opcional: opcional })),
    formatteDate: "",
    setFormattedDate: (formatteDate) => set(() => ({ formatteDate: formatteDate }))
    
  }))
  