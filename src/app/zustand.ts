import { create } from 'zustand'
import { Viaje, User } from '@/app/page'

interface ApiResponse {
 
  address: string;
  date_of_birth: string;
  department: string;
  district: string;
  full_name: string;
  name: string;
  number: string;
  province: string;
  surname: string;
  ubigeo: string;
  verification_code: null
}

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
  selectSeat: number[] | null,
  setSelectSeat: (selectSeat: number[] | null) => void; 
  emailRegister: string,
  setEmailRegister: (emailRegister: string) => void,
  passwordRegister: string,
  setPasswordRegister: (passwordRegister: string) => void,
  nameRegister: string,
  setNameRegister: (nameRegister: string) => void,
  lastNameRegister: string,
  setLastNameRegister: (lastNameRegister: string) => void,
  daynacimentoRegister: string,
  setDaynacimentoRegister: (daynacimentoRegister: string) => void,
  monthnacimentoRegister: string,
  setMonthnacimentoRegister: (monthnacimentoRegister: string) => void,
  yearnacimentoRegister: string,
  setYearnacimentoRegister: (yearnacimentoRegister: string) => void,
  dniRegister: string,
  setDniRegister: (dniRegister: string) => void,
  user: User | null,
  setUser: (user: User | null) => void,
  counterSeatSelected: number,
  setCounterSeatSelected: (counterSeatSelected: number) => void,
  dataUserApi: ApiResponse | null,
  setDataUserApi: (data: ApiResponse) => void;
  
  selectedSeats: { id: string; numero: number }[]; 
  toggleSeat: (seatId: string, seatNumber: number) => void;

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
    setSelectSeat: (selectSeat) => set({ selectSeat }),
    emailRegister: "",
    setEmailRegister: (emailRegister) => set(() => ({ emailRegister: emailRegister })),
    passwordRegister: "",
    setPasswordRegister: (passwordRegister) => set(() => ({ passwordRegister: passwordRegister })),
    nameRegister: "",
    setNameRegister: (nameRegister) => set(() => ({ nameRegister: nameRegister })),
    lastNameRegister: "",
    setLastNameRegister: (lastNameRegister) => set(() => ({ lastNameRegister: lastNameRegister })),
    daynacimentoRegister: "",
    setDaynacimentoRegister: (daynacimentoRegister) => set(() => ({ daynacimentoRegister: daynacimentoRegister })),
    monthnacimentoRegister: "",
    setMonthnacimentoRegister: (monthnacimentoRegister) => set(() => ({ monthnacimentoRegister: monthnacimentoRegister })),
    yearnacimentoRegister: "",
    setYearnacimentoRegister: (yearnacimentoRegister) => set(() => ({ yearnacimentoRegister: yearnacimentoRegister })),
    dniRegister: "",    
    setDniRegister: (dniRegister) => set(() => ({ dniRegister: dniRegister })),
    user: null,
    setUser: (user) => set(() => ({ user: user })),
    counterSeatSelected: 0,
    setCounterSeatSelected: (counterSeatSelected) => set(() => ({ counterSeatSelected: counterSeatSelected })),
    
  selectedSeats: [], 
  
  toggleSeat: (seatId, seatNumber) =>
    set((state) => {
      const exists = state.selectedSeats.some((seat) => seat.id === seatId);
      
      return {
        selectedSeats: exists
          ? state.selectedSeats.filter((seat) => seat.id !== seatId) 
          : [...state.selectedSeats, { id: seatId, numero: seatNumber }] 
      };
    }),
  
    dataUserApi: null,
    setDataUserApi: (dataUserApi) => set(() => ({ dataUserApi: dataUserApi }))
  }))
  