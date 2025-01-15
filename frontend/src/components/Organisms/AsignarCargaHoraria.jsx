import axios from "axios";
import { useEffect, useState } from "react";

const AsignarCargaHoraria = () => {

    const [nombre, setNombre] = useState("");
    const [tutor, setTutor] = useState();
    const [asignatura, setAsignatura] = useState("");
    const [filteredTutores, setFilteredTutores] = useState([]);
    const [getTutores, setGetTutores] = useState([]);
    const [getAsignaturas, setGetAsignaturas] = useState([]);
    

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const tutoresResponse = await axios.get('http://127.0.0.1:8000/api/v1/tutor/listado/');
                setGetTutores(tutoresResponse.data);
                const asignaturasResponse = await axios.get('http://127.0.0.1:8000/api/v1/asignatura/listado/');
                setGetAsignaturas(asignaturasResponse.data);
            } catch (error){
                console.log(error);
            }
        }
        
        fetchData();
    }, [])

    const handleAsignaturaChange = (e) => {
        setAsignatura(e.target.value);
    };

    const handleTutoresChange = (e) => {
        const query = e.target.value;
        setNombre(query);
        console.log(query)

        if (query.length > 0) {
            const filtered = getTutores.filter((tutor) =>
            tutor.id_user_FK.full_name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredTutores(filtered);
        } else {
            setFilteredTutores([]);
        }
    };

    const handleTutorSelect = (tutor) => {
        setNombre(tutor.id_user_FK.full_name)
        setTutor(tutor.id);
        setFilteredTutores([]);
    };

    return(
        <div className="w-full mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Asignar Carga Horaria
            </h1>
            <div className="flex">
                <div className="bg-white shadow-md rounded-lg p-6 mb-1 flex-grow mr-6">
                    <form className="space-y-6">
                        <div className="flex space-x-4 ">
                            <div className="flex-1 space-y-2 relative">
                                <label className="block text-sm font-medium">Nombre del Tutor</label>
                                <input
                                    type="text"
                                    className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={nombre}
                                    onChange={handleTutoresChange}
                                    placeholder="Escriba el nombre del estudiante"
                                />
                                {filteredTutores.length > 0 && (
                                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                    {filteredTutores.map((tutor) => (
                                    <li
                                        key={tutor.id}
                                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                        onClick={() => handleTutorSelect(tutor)}
                                    >
                                        {tutor.id_user_FK.full_name}
                                    </li>
                                    ))}
                                </ul>
                                )}
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Asignatura</label>
                                <select 
                                    className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="" hidden >Seleccione la asignatura</option>
                                    {getAsignaturas.map(asignatura => (
                                        <option key={asignatura.id} value={asignatura.id}>
                                            {asignatura.asignatura}
                                        </option>
                                        
                                    ))}
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AsignarCargaHoraria