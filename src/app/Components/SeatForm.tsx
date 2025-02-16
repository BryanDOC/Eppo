// import React,{ useState, useEffect} from 'react'



// interface Seat {
//     id: string;
//     numero: number;
//   }
  
//   interface SeatFormProps {
//     seat: Seat;
//     index: number;
//   }
  
//   interface FormData {
//     tipoDocumento: string;
//     numeroDocumento: string;
//     nombres: string;
//     apellidos: string;
//     fechaNacimiento: string;
//     sexo: string;
//   }
  
//   const initialFormData: FormData = {
//     tipoDocumento: '',
//     numeroDocumento: '',
//     nombres: '',
//     apellidos: '',
//     fechaNacimiento: '',
//     sexo: '',
//   };
// export default function SeatForm({seat, index}: SeatFormProps) {

// const [formData, setFormData] = useState<FormData>(initialFormData);
// const [fetching, setFetching] = useState(false);


// function simulateFetch(numeroDocumento: string): Promise<Omit<FormData, 'numeroDocumento'>> {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({
//           tipoDocumento: 'DNI',
//           nombres: 'Juan',
//           apellidos: 'Pérez',
//           fechaNacimiento: '1990-01-01',
//           sexo: 'M',
//         });
//       }, 1000);
//     });
//   }

// const handleNumeroDocumentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setFormData((prev) => ({
//       ...prev,
//       numeroDocumento: value,
//     }));
//   };

//   useEffect(() => {
//     if (formData.numeroDocumento.length >= 8) {
//       const fetchData = async () => {
//         setFetching(true);
//         try {
//           // Se simula un fetch; reemplaza esta función por la llamada a tu API real.
//           const response = await simulateFetch(formData.numeroDocumento);
//           // Actualiza los campos del formulario con la data obtenida.
//           setFormData((prev) => ({
//             ...prev,
//             tipoDocumento: response.tipoDocumento,
//             nombres: response.nombres,
//             apellidos: response.apellidos,
//             fechaNacimiento: response.fechaNacimiento,
//             sexo: response.sexo,
//           }));
//         } catch (error) {
//           console.error('Error al obtener datos:', error);
//         } finally {
//           setFetching(false);
//         }
//       };
//       fetchData();
//     }
//   }, [formData.numeroDocumento]);
//   return (
//     <div className="border rounded p-4">
//       <h3 className="text-xl font-bold mb-4">Formulario para Asiento: {seat.numero}</h3>
//       <form className="grid grid-cols-1 gap-4">
//         <div>
//           <label className="block mb-1">Tipo de Documento</label>
//           <input
//             type="text"
//             value={formData.tipoDocumento}
//             disabled
//             className="border rounded p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">N° de Documento</label>
//           <input
//             type="number"
//             value={formData.numeroDocumento}
//             onChange={handleNumeroDocumentoChange}
//             className="border rounded p-2 w-full"
//           />
//           {fetching && <p className="text-sm text-gray-500">Buscando datos...</p>}
//         </div>
//         <div>
//           <label className="block mb-1">Nombres</label>
//           <input
//             type="text"
//             value={formData.nombres}
//             disabled
//             className="border rounded p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Apellidos</label>
//           <input
//             type="text"
//             value={formData.apellidos}
//             disabled
//             className="border rounded p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Fecha de Nacimiento</label>
//           <input
//             type="text"
//             value={formData.fechaNacimiento}
//             disabled
//             className="border rounded p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Sexo</label>
//           <input
//             type="text"
//             value={formData.sexo}
//             disabled
//             className="border rounded p-2 w-full"
//           />
//         </div>
//       </form>
//     </div>
//   )
// }
