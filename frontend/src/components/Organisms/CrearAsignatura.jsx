import { useState } from "react"
import Swal from "sweetalert2"
import axios from "axios"
import { API_BASE_URL } from "../../utils/constants"

const CrearAsignatura = () => {

    const [asignatura, setAsignatura] = useState('')
    const [codigo, setCodigo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const estado = "Activo"
   

    const handleSubmit = (e) => {
        e.preventDefault();

        const fields = [asignatura, codigo, descripcion];
        
        if (fields.some(field => field.trim() === '')) {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Por favor, complete todos los campos antes de registrar.',
            });
            return;
        }

        if (codigo.length !== 6) {
            Swal.fire({
                icon: 'error',
                title: 'Código inválido',
                text: 'El código debe tener exactamente 6 caracteres (3 letras y 3 números).',
            });
            return;
        }

        const asignaturas = { asignatura, codigo, descripcion,  estado,};

        // Aquí haces la llamada a la API para crear el curso usando Axios
        axios.post(`${API_BASE_URL}asignatura/crear/`, asignaturas)
          .then(response => {
            console.log('Asignatura creada:', response.data);

            setAsignatura('')
            setCodigo('')
            setDescripcion('')
            
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Asignatura creado exitosamente.',
            });
            
          })
          .catch(() => {
            Swal.fire({
                icon: 'error', // Icono de error
                title: 'Error',
                text: 'No se pudo crear la asignatura. Verifique si la asignatura que intenta crear ya existe.',
                confirmButtonText: 'OK',
            });
        });
    };


    return(
        <div className="w-full mx-auto p-6">
            <h1 className="text-2xl md:text-2xl font-bold text-gray-800 m-3">
                Crear nueva asignatura
            </h1>
            <div className="flex ">
                <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 mb-1 flex-grow mr-6">
                    <form className="space-y-6">
                        <div className="flex space-x-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Código de la asignatura </label>
                                <input 
                                    type="text" 
                                    className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onChange={(e) => {
                                        let  valor = e.target.value.toUpperCase(); // Convierte a mayúsculas
                                        valor = valor.replace(/[^A-Z0-9]/g, ''); // Elimina signos y permite solo letras y números
                                        const letras = valor.slice(0, 3).replace(/[^A-Z]/g, ''); // Solo letras en los primeros 3 caracteres
                                        const numeros = valor.slice(3).replace(/[^0-9]/g, ''); // Solo números en los últimos 3 caracteres
                                        setCodigo(letras + numeros); 
                                    }}
                                    maxLength={6}
                                    value={codigo}
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Nombre de la asignatura </label>
                                <input 
                                    type="text" 
                                    className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onChange={(e) => {
                                        const valor = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''); // Permite letras, tildes, ñ y espacios
                                        setAsignatura(valor);
                                    }}
                                    value={asignatura}
                                    maxLength={30}
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Descripción </label>
                            <input 
                                type="text" 
                                className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onChange={(e) => setDescripcion(e.target.value)}
                                value={descripcion}
                            />
                        </div>
                        <div className="flex flex-col space-y-4 w-full items-end">
                            <button 
                                type="submit"
                                className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
                                    border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                                    active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                                onClick={(e) => handleSubmit(e)}
                            >
                                Crear asignatura
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CrearAsignatura