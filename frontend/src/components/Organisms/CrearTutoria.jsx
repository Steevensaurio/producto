import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { API_BASE_URL } from "../../utils/constants";
import BtnForm from "../Atoms/BtnForm";
import Cookie from "js-cookie"
import {jwtDecode} from 'jwt-decode'

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
    const [idTutor, setIdTutor] = useState();

    const [getTutores, setGetTutores] = useState([]);

    const user = jwtDecode(Cookie.get("access_token"));
    const perfil = user.perfil

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
        obtenerIdTutor();
    }, []) 
    
    useEffect(() => {
        setAsignarTutor(idTutor !== null || undefined ? String(idTutor) : asignarTutor);
    });

    const obtenerIdTutor = async () => {
        const token = Cookie.get("access_token");
    
        if (!token) {
            return;
        }
    
        try {
            const response = await axios.get(`${API_BASE_URL}tutor-id/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setIdTutor(response.data.tutor_id);
            
            // console.log("✅ Respuesta del backend:", response.data);
        } catch (error) {
            // console.error("❌ Error al obtener el ID del tutor:", error.response);
        }
    };

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
        console.log(fields);
        if (fields.some(field => typeof field !== 'string' || field.trim() === '')) {
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

        const token = Cookie.get("access_token");
        const endpoint = perfil === 1 
            ? `${API_BASE_URL}tutoria/solicitud/`  // Si perfil es 1
            : `${API_BASE_URL}tutoria/asignar/`;

            axios.post(endpoint, tutoria, {
                headers: {
                    Authorization: `Bearer ${token}`  // Envía el token en los headers
                }
            })
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: perfil === 1 ? 'Solicitud enviada' : 'Tutoría creada',
                    text: perfil === 1 
                        ? 'Tu solicitud de tutoría ha sido enviada correctamente. Espera la confirmación de un tutor.'
                        : 'La tutoría ha sido creada y asignada con éxito.',
                });
        
                // Limpiar formulario
                setTema('');
                setDescripcion('');
                setModalidad('');
                setSeccion('');
                setFecha('');
                setHoraInicio('');
                setHoraFin('');
                setTipo('');
                setAsignarTutor('');
            })
            .catch(error => {
                console.log(error);
        
                Swal.fire({
                    icon: 'error',
                    title: perfil === 1 ? 'Error en la solicitud' : 'Error al crear la tutoría',
                    text: perfil === 1 
                        ? 'No se pudo enviar la solicitud. Inténtalo nuevamente más tarde.'
                        : 'Hubo un problema al crear la tutoría. Verifica los datos e inténtalo otra vez.',
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
                {perfil === 1 ? 'Solicitar tutoría' : 'Crear nueva tutoría'}
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

                        {
                            perfil !== 2 && (
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
                            )
                        }
                        
                        <BtnForm label="Crear tutoría" onClick={handleSubmit} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CrearTutoria