import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const Matriculas = () => {

    const [estudiante, setEstudiante] = useState();
    const [curso, setCurso] = useState();
    const [jornada, setJornada] = useState('');
    const [year, setYear] = useState('');
    const currentYear = new Date().getFullYear();

    const [getCursos, setGetCursos] = useState([]);
    const [getEstudiantes, setGetEstudiantes] = useState([]);

    useEffect(()=>{
        const estudiantes = async () => {
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/v1/estudiante/listado/');
                setGetEstudiantes(response.data)
            } catch (error){
                console.log(error);
            }
        }
        const cursos = async () => {
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/v1/curso/listado/');
                setGetCursos(response.data)
            } catch (error){
                console.log(error);
            }
        }
        cursos();
        estudiantes();

    }, [])

    const handleEstudianteChange = (e) => {
        setEstudiante(e.target.value)
    }

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const handleCursoChange = (e) => {
        setCurso(e.target.value)
    }

    const handleJornadaChange = (e) => {
        setJornada(e.target.value);
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

        axios.post('http://127.0.0.1:8000/api/v1/matricula/', matricula)
          .then(response => {
            

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
                Matricular Estudiante
            </h1>
            <div className="flex">
                <div className="bg-white shadow-md rounded-lg p-6 mb-1 flex-grow mr-6">
                    <form className="space-y-6">
                        <div className="flex space-x-4">
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Estudiante</label>
                                <select 
                                    className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onChange={handleEstudianteChange}
                                    value={estudiante}
                                >
                                    <option value="" hidden >Seleccione el estudiante</option>
                                    {getEstudiantes.map(student => (
                                        <option key={student.id} value={student.id}>
                                            {student.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Curso</label>
                                <select 
                                    className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onChange={handleCursoChange}
                                    value={curso}
                                >
                                    <option value="" hidden >Seleccione el curso</option>
                                    {getCursos.map(curso => (
                                        <option key={curso.id} value={curso.id}>
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
                                    className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={jornada}
                                    onChange={handleJornadaChange}
                                    required
                                >
                                    <option value="" hidden>Seleccione una jornada</option>
                                    <option value="Matutina">Matutina</option>
                                    <option value="Vespertina">Vespertina</option>
                                </select>
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Año Lectivo</label>
                                <select 
                                    id="year"
                                    className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={year}
                                    onChange={handleYearChange}
                                    required
                                >
                                    <option value="" hidden>Seleccione el año lectivo</option>
                                    <option value={`${currentYear-1}-${currentYear}`}>{`${currentYear-1}-${currentYear}`}</option>
                                    <option value={`${currentYear}-${currentYear + 1}`}>{`${currentYear}-${currentYear + 1}`}</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col space-y-4 w-[250px]">
                    <button 
                        type="submit"
                        className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
                            border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                            active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Registrar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Matriculas