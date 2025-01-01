import { create } from 'zustand'

type Store = {
    date: string;
  setDate: (date: string) => void;
  placeOrigin: string;
  setPlaceOrigin: (placeOrigin: string) => void;
  placeDestination: string;
  setPlaceDestination: (placeDestination: string) => void;
  }
 
 export const useStore = create<Store>()((set) => ({
    date: "", 
    setDate: (date) => set(() => ({ date: date })),
    placeOrigin: "",
    setPlaceOrigin: (placeOrigin) => set(() => ({ placeOrigin: placeOrigin })),
    placeDestination: "",
    setPlaceDestination: (placeDestination) => set(() => ({ placeDestination: placeDestination })),

  }))
  