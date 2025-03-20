import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../utils/constants";
import axios from "axios";
import Swal from 'sweetalert2';

const Matriculas = () => {

    const [estudiante, setEstudiante] = useState();
    const [nombre, setNombre] = useState('');
    const [curso, setCurso] = useState();
    const [jornada, setJornada] = useState('');
    const [year, setYear] = useState('');
    const currentYear = new Date().getFullYear();

    const [getCursos, setGetCursos] = useState([]);
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
        const cursos = async () => {
            try{
                const response = await axios.get(`${API_BASE_URL}curso/listado/`);
                setGetCursos(response.data)
            } catch (error){
                console.log(error);
            }
        }
        cursos();
        estudiantes();

    }, [])

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const handleCursoChange = (e) => {
        setCurso(e.target.value)
    }

    const handleJornadaChange = (e) => {
        setJornada(e.target.value);
    };

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

        axios.post(`${API_BASE_URL}matricula/`, matricula)
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
                Matricular estudiante
            </h1>
            <div className="flex">
                <div className="bg-white shadow-md rounded-lg p-6 mb-1 flex-grow mr-6">
                    <form className="space-y-6">
                        <div className="flex space-x-4 ">
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
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Curso</label>
                                <select 
                                    className={`text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        curso === undefined || curso === ""? "text-gray-400" : "text-black"
                                    }`}
                                    onChange={handleCursoChange}
                                    value={curso}
                                >
                                    <option value="" hidden selected >Seleccione el curso</option>
                                    {getCursos.map(curso => (
                                        <option key={curso.id} value={curso.id} className="text-black">
                                            {curso.curso} "{curso.paralelo}"
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Jornada</label>
                                <select 
                                    className={`text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${jornada === "" ? "text-gray-400" : "text-black"}`}
                                    value={jornada}
                                    onChange={handleJornadaChange}
                                    required
                                >
                                    <option value="" hidden>Seleccione una jornada</option>
                                    <option value="Matutina" className="text-black">Matutina</option>
                                    <option value="Vespertina" className="text-black">Vespertina</option>
                                </select>
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Año Lectivo</label>
                                <select 
                                    id="year"
                                    className={`text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${year === "" ? "text-gray-400" : "text-black"}`}
                                    value={year}
                                    onChange={handleYearChange}
                                    required
                                >
                                    <option value="" hidden>Seleccione el año lectivo</option>
                                    <option value={`${currentYear-1}-${currentYear}`}  className="text-black">{`${currentYear-1}-${currentYear}`}</option>
                                    <option value={`${currentYear}-${currentYear + 1}`} className="text-black">{`${currentYear}-${currentYear + 1}`}</option>
                                    <option value={`${currentYear + 1}-${currentYear + 2}`} className="text-black">{`${currentYear + 1}-${currentYear + 2}`}</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4 w-full items-end">
                            <button 
                                type="submit"
                                className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
                                    border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                                    active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                                onClick={(e) => handleSubmit(e)}
                            >
                                Matricular estudiante
                            </button>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    )
}

export default Matriculas