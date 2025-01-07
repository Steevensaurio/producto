import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const CrearTutoria = () => {
    const [tema, setTema] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [modalidad, setModalidad] = useState('');
    const [seccion, setSeccion] = useState('');
    const [fecha, setFecha] = useState('');
    const [curso, setCurso] = useState();
    const [asignarTutor, setAsignarTutor] = useState();

    const [getCursos, setGetCursos] = useState([]);
    const [getTutores, setGetTutores] = useState([]);

    useEffect(()=>{
        const cursos = async () => {
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/v1/curso/listado/');
                setGetCursos(response.data)
            } catch (error){
                console.log(error);
            }
        }
        cursos();
    }, [])

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const fields = [
            tema,
            descripcion,
            modalidad,
            seccion,
            fecha,
            curso,
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
            tutor: asignarTutor,
            curso 
        };

        axios.post('http://127.0.0.1:8000/api/v1/tutoria/asignar/', tutoria)
          .then(response => {
            console.log('Curso creado:', response.data);


            setTema('')
            setDescripcion('')
            setModalidad('')
            setSeccion('')
            setFecha('')
            setCurso('')
            setAsignarTutor('')
            
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Tutoria creada exitosamente.',
            });
            
          })
          .catch(error => {
            Swal.fire({
                icon: 'error', // Icono de error
                title: 'Error al crear la tutoria',
                text: 'No se pudo crear la tutoría. Por favor, inténtalo otra vez.',
                confirmButtonText: 'OK',
            });
          });

    }

    const handleCursoChange = (e) => {
        setCurso(e.target.value)
    }
    const handleTutorChange = (e) => {
        setAsignarTutor(e.target.value)
    }

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
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Fecha</label>
                                <input 
                                    type="date" 
                                    className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={fecha}
                                    onChange={(e) => setFecha(e.target.value)}
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Curso</label>
                                <select 
                                    className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onChange={handleCursoChange}
                                    value={curso}
                                >
                                    <option value="" hidden>Seleccione el curso</option>
                                    {getCursos.map(course => (
                                        <option key={course.id} value={course.id}>
                                            {course.curso} "{course.paralelo}"
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

export default CrearTutoria