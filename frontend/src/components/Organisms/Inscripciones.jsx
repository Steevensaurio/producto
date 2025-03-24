import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { API_BASE_URL } from "../../utils/constants";
import BtnForm from "../Atoms/BtnForm";
import Cookie from "js-cookie"
import {jwtDecode} from 'jwt-decode'

const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };

const Inscripciones = () => {

    const [estudiante, setEstudiante] = useState();
    const [nombre, setNombre] = useState('');
    const [tutoria, setTutoria] = useState();
    const [tema, setTema] = useState('');
    const [estudianteId, setEstudianteId] = useState(null);
    const [getEstudiantes, setGetEstudiantes] = useState([]);
    const [getTutorias, setGetTutorias] = useState([]);
    const [filteredEstudiantes, setFilteredEstudiantes] = useState([]);
    const [filteredTutorias, setFilteredTutorias] = useState([]);
    const [fullName, setFullName] = useState("")
    const user = jwtDecode(Cookie.get("access_token"));
    const perfil = user.perfil

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const token = Cookie.get("access_token");
                if (!token) {
                    console.error("No se encontró el token de acceso");
                    return;
                }
    
                // Decodificar el token para obtener full_name
                const user = decodeToken(token);
                if (user?.full_name) {
                    setFullName(user.full_name); // Asignamos el full_name
                    if (perfil === 1) {
                        setNombre(user.full_name); // Si es perfil 1, también se asigna a nombre
                    }
                } else {
                    console.warn("full_name no se encontró en el token");
                }
    
                // Llamadas a la API
                const [estudianteResp, estudiantesResp, tutoriasResp] = await Promise.all([
                    axios.get(`${API_BASE_URL}estudiante-id/`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get(`${API_BASE_URL}estudiante/listado/`),
                    axios.get(`${API_BASE_URL}tutoria/listado/`)
                ]);
    
                setEstudianteId(estudianteResp.data.estudiante_id);
                if (perfil === 1) {
                    setEstudiante(estudianteResp.data.estudiante_id);
                    setNombre(estudianteResp.data.estudiante_name); // Asegurar que el nombre del estudiante se setea
                }
    
                setGetEstudiantes(estudiantesResp.data);
                setGetTutorias(tutoriasResp.data);
            } catch (error) {
                console.error("Error obteniendo datos:", error);
            }
        };
    
        obtenerDatos(); // Llamada inicial
    
        const interval = setInterval(obtenerDatos, 10000); // Se ejecuta cada 10 segundos
    
        return () => clearInterval(interval); // Limpia el intervalo cuando se desmonta
    }, [perfil]); 


    const handleEstudiantesChange = (e) => {
        const query = e.target.value;
        setNombre(query);
        console.log(query)

        if (query.length > 0) {
            const filtered = getEstudiantes.filter((student) =>
            student.id_user_FK.full_name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredEstudiantes(filtered);
        } else {
            setFilteredEstudiantes([]);
        }
    };

    const handleStudentSelect = (student) => {
        setNombre(student.id_user_FK.full_name)
        setEstudiante(student.id);
        setFilteredEstudiantes([]);
    };




    const handleTutoriaChange = (e) => {
        const query = e.target.value;
        setTema(query);
        console.log(query)

        if (query.length > 0) {
            const filtered = getTutorias.filter((tutoria) =>
            tutoria.tema.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredTutorias(filtered);
        } else {
            setFilteredTutorias([]);
        }
    };

    const handleTutoriaSelect = (tutoria) => {
        setTema(tutoria.tema)
        setTutoria(tutoria.id);
        setFilteredTutorias([]);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!estudiante || estudiante === '') {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Por favor, complete todos los campos.',
            });
            return;
        }
        const inscripcion = {
            id_estudiante_FK: estudiante,
            id_tutoria_FK: tutoria,
        }

console.log(inscripcion);


        axios.post(`${API_BASE_URL}tutoria/inscripciones/`, inscripcion)
          .then(response => {
            
            setEstudiante()
            setNombre('')
            setTutoria()
            setTema('')
         

            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: response.data.message,
            });
            
          })
          .catch(error => {
            
            const errorMessage = error.response?.data?.message || 'Ocurrió un error inesperado.';

            // Mostrar SweetAlert de error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
            });
          });
    }

    return(
        <div className="w-full mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Inscripciones a Tutoría
            </h1>
            <div className="flex">
                <div className="bg-white shadow-md rounded-lg p-6 mb-1 flex-grow mr-6">
                    <form className="space-y-6">
                        <div className="flex-1 space-y-2 relative">
                            <label className="block text-sm font-medium">Estudiante</label>
                            <input
                                type="text"
                                className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={perfil===1 ? fullName : nombre}
                                onChange={handleEstudiantesChange}
                                placeholder="Escriba el nombre del estudiante"
                                disabled={perfil === 1}
                            />
                            {filteredEstudiantes.length > 0 && (
                            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {filteredEstudiantes.map((student) => (
                                <li
                                    key={student.id}
                                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                    onClick={() => handleStudentSelect(student)}
                                >
                                    {student.id_user_FK.full_name}
                                </li>
                                ))}
                            </ul>
                            )}
                        </div>
                        <div className="flex-1 space-y-2 relative">
                            <label className="block text-sm font-medium">Tutoria</label>
                            <input
                            type="text"
                            className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={tema}
                            onChange={handleTutoriaChange}
                            placeholder="Escriba el tema de la tutoría"
                            />
                            {filteredTutorias.length > 0 && (
                            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {filteredTutorias.map((tutoria) => (
                                <li
                                    key={tutoria.id}
                                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                    onClick={() => handleTutoriaSelect(tutoria)}
                                >
                                    {tutoria.tema}
                                </li>
                                ))}
                            </ul>
                            )}
                        </div>
                        <BtnForm label="Inscribir estudiante" onClick={handleSubmit} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Inscripciones