import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const CrearCurso = () => {

    const [curso, setCurso] = useState('');
    const [paralelo, setParalelo] = useState('');
    const [asignarTutor, setAsignarTutor] = useState();

    const [getTutores, setGetTutores] = useState([]);
    const [getCursos, setGetCursos] = useState([]);
    const [getParalelos, setGetParalelos] = useState([]);

    useEffect(()=>{
        const tutores = async () => {
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/v1/tutor/listado/');
                setGetTutores(response.data)
            } catch (error){
                console.log(error);
            }
        }
        tutores();
    }, [])
    
    useEffect(()=>{
        const cursos = async () => {
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/v1/cursos/');
                setGetCursos(response.data)
            } catch (error){
                console.log(error);
            }
        }
        cursos();
    }, [])

    useEffect(()=>{
        const paralelos = async () => {
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/v1/paralelos/');
                setGetParalelos(response.data)
            } catch (error){
                console.log(error);
            }
        }
        paralelos();
    }, [])

    const handleTutorChange = (e) => {
        setAsignarTutor(e.target.value)
    }

    const handleCursoChange = (e) => {
        setCurso(e.target.value)
    }
    const handleParaleloChange = (e) => {
        setParalelo(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const fields = [curso, paralelo, asignarTutor,];
        if (fields.some(field => field.trim() === '')) {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Por favor, complete todos los campos antes de registrar.',
            });
            return;
        }

        const cursos = { curso, paralelo, tutor: asignarTutor };

        // Aquí haces la llamada a la API para crear el curso usando Axios
        axios.post('http://127.0.0.1:8000/api/v1/curso/crear/', cursos)
          .then(response => {
            console.log('Curso creado:', response.data);


            setCurso(''); // Limpiar el campo curso
            setParalelo(''); // Limpiar el campo paralelo
            
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Curso creado exitosamente.',
            });
            
          })
          .catch(error => {
            Swal.fire({
                icon: 'error', // Icono de error
                title: 'Error al crear el curso',
                text: 'No se pudo crear el curso. Verifique si el curso que intenta crear ya existe.',
                confirmButtonText: 'OK',
            });
          });
      };

    return(
        <div className="w-full mx-auto p-6">
            <h1 className="text-2xl md:text-2xl font-bold text-gray-800 m-3">
                Crear nuevo curso
            </h1>
            <div className="flex">
                <div className="bg-blue-100 shadow-md rounded-lg p-6 mb-1 flex-grow mr-6">
                    <form className="space-y-6">
                        <div className="flex space-x-4">
                            <div className="flex-1 space-y-2">
                                <label className="text-lg font-bold ml-2 mb-1 text-gray-900">Curso: </label>
                                <select 
                                    className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onChange={handleCursoChange}
                                    value={curso}
                                >
                                    <option value="" hidden >Seleccione un curso</option>
                                    {getCursos.map(curso => (
                                        <option key={curso.cursos} value={curso.cursos}>
                                            {curso.cursos}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="text-lg font-bold ml-2 mb-1 text-gray-900">Paralelo</label>
                                <select 
                                    className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onChange={handleParaleloChange}
                                    value={paralelo}
                                >
                                    <option value="" hidden >Seleccione un paralelo</option>
                                    {getParalelos.map(paralelo => (
                                        <option key={paralelo.paralelos} value={paralelo.paralelos}>
                                            {paralelo.paralelos}
                                        </option>
                                    ))}
                                </select>
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
                                        {tutor.titulo}. {tutor.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col space-y-4 w-[350px]">
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

export default CrearCurso