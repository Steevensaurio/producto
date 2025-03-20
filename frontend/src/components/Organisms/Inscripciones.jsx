import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { API_BASE_URL } from "../../utils/constants";

const Inscripciones = () => {

    const [estudiante, setEstudiante] = useState();
    const [nombre, setNombre] = useState('');
    const [curso, setCurso] = useState();
    const [jornada, setJornada] = useState('');
    const [year, setYear] = useState('');
    const [getEstudiantes, setGetEstudiantes] = useState([]);
    const [filteredEstudiantes, setFilteredEstudiantes] = useState([]);

    useEffect(()=>{
        
        const estudiantes = async () => {
            try{
                const response = await axios.get(`${API_BASE_URL}estudiante/listado/`);
                setGetEstudiantes(response.data)
            } catch (error){
                console.log(error);
            }
        }
        estudiantes();

    }, [])


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


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!estudiante || estudiante === '' ||
            !curso || curso === '' ||
            !jornada || jornada === '' ||
            !year || year === '') {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Por favor, complete todos los campos.',
            });
            return;
        }
        const matricula = {
            estudiante,
            curso,
            jornada,
            año_lectivo: year,
        }

        console.log(matricula);
        

        axios.post('http://127.0.0.1:8000/api/v1/matricula/', matricula)
          .then(response => {
            
            setEstudiante()
            setNombre('')
            setCurso()
            setJornada('')
            setYear('')

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
                            value={nombre}
                            onChange={handleEstudiantesChange}
                            placeholder="Escriba el nombre del estudiante"
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
                            value={nombre}
                            onChange={handleEstudiantesChange}
                            placeholder="Escriba el tema de la tutoría"
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
                        <div className="flex flex-col space-y-4 w-full items-end">
                            <button 
                                type="submit"
                                className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
                                    border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                                    active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                                onClick={(e) => handleSubmit(e)}
                            >
                                Inscribir estudiante
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <h1 className="text-6xl font-bold text-red-600 mb-2">PENDIENTE POR TERMINAR</h1>
        </div>
    )
}

export default Inscripciones