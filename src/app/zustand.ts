import { create } from 'zustand'
import { Viaje } from '@/app/page'



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
  selectViaje: Viaje | null,
  setSelectViaje: (viaje: Viaje) => void;
  selectSeat: number | null,
  setSelectSeat: (seat: number) => void
  }
 
 export const useStore = create<Store>()((set) => ({
    date: new Date(), 
    setDate: (date) => set(() => ({ date: date })),
    placeOrigin: "",
    setPlaceOrigin: (placeOrigin) => set(() => ({ placeOrigin: placeOrigin })),
    placeDestination: "",
    setPlaceDestination: (placeDestination) => set(() => ({ placeDestination: placeDestination })),
    opcional: true,
    setOpcional: (opcional) => set(() => ({ opcional: opcional })),
    formatteDate: "",
    setFormattedDate: (formatteDate) => set(() => ({ formatteDate: formatteDate })),
    selectViaje: null,
    setSelectViaje: (viaje) => set({ selectViaje: viaje }),
    selectSeat: null,
    setSelectSeat: (seat) => set({ selectSeat: seat }),
  }))
  