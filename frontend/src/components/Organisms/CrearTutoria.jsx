import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { API_BASE_URL } from "../../utils/constants";

const CrearTutoria = () => {
    const [tema, setTema] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [modalidad, setModalidad] = useState('');
    const [seccion, setSeccion] = useState('');
    const [fecha, setFecha] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [tipo, setTipo] = useState('');
    const [asignarTutor, setAsignarTutor] = useState();

    const [getTutores, setGetTutores] = useState([]);

    useEffect(()=>{
        const tutores = async () => {
            try{
                const response = await axios.get(`${API_BASE_URL}tutor/listado/`);
                setGetTutores(response.data)
            } catch (error){
                console.log(error);
            }
        }
        tutores();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const fields = [
            tema,
            descripcion,
            modalidad,
            seccion,
            fecha,
            horaInicio,
            horaFin,
            tipo,
            asignarTutor,
        ];
        if (fields.some(field => field.trim() === '')) {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Por favor, complete todos los campos antes de registrar.',
            });
            return;
        }

        const tutoria = { 
            tema,
            descripcion,
            modalidad,
            seccion,
            fecha,
            hora_inicio: horaInicio,
            hora_fin: horaFin,
            tipo,
            id_tutor_FK: asignarTutor,
        };

        console.log(tutoria);
        

        axios.post(`${API_BASE_URL}tutoria/asignar/`, tutoria)
          .then(response => {
            console.log('Curso creado:', response.data);

            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Tutoria creada exitosamente.',
            });

            setTema('')
            setDescripcion('')
            setModalidad('')
            setSeccion('')
            setFecha('')
            setHoraInicio('')
            setHoraFin('')
            setTipo('')
            setAsignarTutor('')
          })
          .catch(error => {
            console.log(error);
            
            Swal.fire({
                icon: 'error', // Icono de error
                title: 'Error al crear la tutoria',
                text: 'No se pudo crear la tutoría. Por favor, inténtalo otra vez.',
                confirmButtonText: 'OK',
            });
          });

    }

    const handleTutorChange = (e) => {
        setAsignarTutor(e.target.value)
    }

    const calcularFechaMinima = () => {
        const hoy = new Date();
        hoy.setDate(hoy.getDate() + 2); // Agregar 2 días a la fecha actual
        return hoy.toISOString().split("T")[0]; // Obtener solo la parte de la fecha
    };

    return(
        <div className="w-full mx-auto p-6">
            <h1 className="text-2xl md:text-2xl font-bold text-gray-800 m-3">
                Crear nueva tutoría
            </h1>
            <div className="flex">
                <div className="bg-white shadow-md rounded-lg p-6 mb-1 flex-grow mr-6">
                    <form  className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Tema</label>
                            <input 
                                type="text" 
                                className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Ingrese el tema de la tutoria"
                                value={tema}
                                onChange={(e) => setTema(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Descripcion</label>
                            <input 
                                type="text" 
                                className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Descripción"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Modalidad</label>
                                <select 
                                    className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={modalidad}
                                    onChange={(e) => setModalidad(e.target.value)}
                                    required
                                >
                                    <option value="" hidden>Seleccione la modalidad</option>
                                    <option value="Presencial">Presencial</option>
                                    <option value="Virtual">Virtual</option>
                                </select>
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Seccion</label>
                                <select 
                                    className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={seccion}
                                    onChange={(e) => setSeccion(e.target.value)}
                                    required
                                >
                                    <option value="" hidden>Seleccione una sección</option>
                                    <option value="Matutina">Matutina</option>
                                    <option value="Vespertina">Vespertina</option>
                                </select>
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Tipo</label>
                                <select 
                                    className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={tipo}
                                    onChange={(e) => setTipo(e.target.value)}
                                    required
                                >
                                    <option value="" hidden>Seleccione una opción</option>
                                    <option value="Grupal">Grupal</option>
                                    <option value="Individual">Individual</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Fecha</label>
                                <input 
                                    type="date" 
                                    className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={fecha}
                                    onChange={
                                        (e) => {
                                            setFecha(e.target.value)
                                            setHoraInicio("")
                                            setHoraFin("")
                                        }
                                    }
                                    min={calcularFechaMinima()}
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Hora Inicio</label>
                                <input 
                                    type="time"
                                    className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={horaInicio}
                                    onChange={(e) => {
                                        setHoraInicio(e.target.value);
                                        if (horaInicio && e.target.value > horaFin) {
                                            setHoraFin('');
                                        }
                                    }}
                                    disabled={!fecha}
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Hora Fin</label>
                                <input 
                                    type="time"
                                    className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={horaFin}
                                    onChange={(e) => {
                                        setHoraFin(e.target.value)
                                        if (horaFin && e.target.value < horaInicio) {
                                            setHoraFin('');
                                        }
                                    }}
                                    disabled={!horaInicio}
                                />
                            </div>
                            
                        </div>
                        
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Tutor</label>
                            <select 
                                className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onChange={handleTutorChange}
                                value={asignarTutor}
                            >
                                <option value="" hidden >Seleccione un tutor</option>
                                {getTutores.map(tutor => (
                                    <option key={tutor.id} value={tutor.id}>
                                        {tutor.nivel_estudios}. {tutor.id_user_FK.full_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col space-y-4 w-full items-end">
                            <button 
                                type="submit"
                                className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
                                    border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                                    active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                                onClick={(e) => handleSubmit(e)}
                            >
                                Crear tutoría
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CrearTutoria