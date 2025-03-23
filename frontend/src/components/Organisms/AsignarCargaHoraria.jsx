import axios from "axios"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { API_BASE_URL } from "../../utils/constants"

const AsignarCargaHoraria = () => {
  const [nombre, setNombre] = useState("")
  const [tutor, setTutor] = useState()
  const [asignatura, setAsignatura] = useState("")
  const [periodo, setPeriodo] = useState("")
  const [horas, setHoras] = useState("")
  const [filteredTutores, setFilteredTutores] = useState([])
  const [getTutores, setGetTutores] = useState([])
  const [getAsignaturas, setGetAsignaturas] = useState([])
  const [asignaciones, setAsignaciones] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const currentYear = new Date().getFullYear();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const tutoresResponse = await axios.get(`${API_BASE_URL}tutor/listado/`)
        setGetTutores(tutoresResponse.data)
        const asignaturasResponse = await axios.get(`${API_BASE_URL}asignatura/listado/`)
        setGetAsignaturas(asignaturasResponse.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  const handleAsignaturaChange = (e) => {
    setAsignatura(e.target.value)
    setErrorMessage("") // Limpiar el mensaje de error
  }

  const handleTutoresChange = (e) => {
    const query = e.target.value
    setNombre(query)
    console.log(query)

    if (query.length > 0) {
      const filtered = getTutores.filter((tutor) =>
        tutor.id_user_FK.full_name.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredTutores(filtered)
    } else {
      setFilteredTutores([])
    }
  }

  const handleTutorSelect = (tutor) => {
    setNombre(tutor.id_user_FK.full_name)
    setTutor(tutor.id)
    setFilteredTutores([])
    setErrorMessage("") // Limpiar el mensaje de error
  }

  const handleAñadir = (e) => {
    e.preventDefault()

    if (tutor && asignatura && periodo && horas) {
      const isDuplicate = asignaciones.some((asign) => asign.tutor_id === tutor && asign.asignatura_id === asignatura)
      if (isDuplicate) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se puede repetir el mismo tutor y la misma materia.",
        })
        return
      }
      const nuevaAsignacion = {
        id_tutor_FK: tutor,
        tutor_nombre: nombre,
        id_asignatura_FK: asignatura,
        asignatura_nombre: getAsignaturas.find((a) => a.id === Number.parseInt(asignatura))?.asignatura,
        periodo: periodo,
        horas: horas,
      }
      setAsignaciones((prevAsignaciones) => [...prevAsignaciones, nuevaAsignacion])
      setAsignatura("") // Limpiar la selección de asignatura
      setPeriodo("") // Limpiar la selección de periodo
      setHoras("") // Limpiar las horas

      console.log("Nueva asignación añadida:", nuevaAsignacion)
      console.log("Asignaciones actualizadas:", [...asignaciones, nuevaAsignacion])
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, complete todos los campos antes de añadir una asignación.",
      })
    }
  }

  const handlePeriodoChange = (e) => {
    setPeriodo(e.target.value)
  }

  const handleEliminar = (index) => {
    const updatedAsignaciones = [...asignaciones]
    updatedAsignaciones.splice(index, 1)
    setAsignaciones(updatedAsignaciones)
  }

  const quitarCamposDeAsignaciones = () => {
    setAsignaciones((prevAsignaciones) =>
      prevAsignaciones.map((asignacion) => {
        const { tutor_nombre, asignatura_nombre, ...resto } = asignacion;
        return resto;
      })
    );
  };

  

  const handleGuardar = async () => {
    try {
      // Aquí iría la lógica para guardar las asignaciones en el backend
      console.log("Guardando asignaciones:", asignaciones)
      // Ejemplo de cómo podría ser la llamada al backend:
      // await axios.post('http://127.0.0.1:8000/api/v1/asignar-carga/', { asignaciones });
      alert("Asignaciones guardadas con éxito")
    } catch (error) {
      console.error("Error al guardar las asignaciones:", error)
      alert("Error al guardar las asignaciones")
    }
  }

  
  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Asignar Carga Horaria</h1>
      <div className="flex flex-col">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 mb-4">
          <form className="space-y-6">
            <div className="flex space-x-4">
              <div className="flex-1 space-y-2 relative">
                <label htmlFor="tutor" className="block text-sm font-medium">
                  Nombre del Tutor
                </label>
                <input
                  id="tutor"
                  type="text"
                  className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={nombre}
                  onChange={handleTutoresChange}
                  placeholder="Escriba el nombre del tutor"
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
                <label htmlFor="asignatura" className="block text-sm font-medium">
                  Asignatura
                </label>
                <select
                  id="asignatura"
                  value={asignatura}
                  onChange={handleAsignaturaChange}
                  className={`text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${asignatura === "" ? "text-gray-400" : "text-black"}`}
                >
                <option value="" hidden>Seleccione la asignatura</option>
                {getAsignaturas.map((asignatura) => (
                  <option key={asignatura.id} value={asignatura.id} className="text-black">
                    {asignatura.asignatura}
                  </option>
                ))}
                </select>
              </div>
              <div className="basis-1/9 space-y-2">
                <label htmlFor="periodo" className="block text-sm font-medium">
                  Periodo
                </label>
                <select 
                  className={`text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${periodo === "" ? "text-gray-400" : "text-black"}`}
                  value={periodo}
                  onChange={handlePeriodoChange}
                  required
                >
                  <option value="" hidden >Seleccione el año lectivo</option>
                  <option value={`${currentYear-1}-${currentYear}`}  className="text-black">{`${currentYear-1}-${currentYear}`}</option>
                  <option value={`${currentYear}-${currentYear + 1}`} className="text-black">{`${currentYear}-${currentYear + 1}`}</option>
                  <option value={`${currentYear + 1}-${currentYear + 2}`} className="text-black">{`${currentYear + 1}-${currentYear + 2}`}</option>
                </select>
              </div>
              <div className="basis-1/9 space-y-2">
                <label htmlFor="horas" className="block text-sm font-medium">
                  Horas
                </label>
                <input
                  type="text"
                  id="horas"
                  maxLength={2}
                  value={horas}
                  onChange={(e) => {
                      const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                      setHoras(onlyNums)
                  }}
                  className="text-sm w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Horas"
                />
              </div>
              <div className="flex space-y-2 justify-end items-end">
                          <button
                              type="button"
                              onClick={handleAñadir}
                              //disabled={!tutor || !asignatura}
                              className="px-4 py-2 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                              Añadir
                          </button>
                      </div>
            </div>
          </form>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Asignaciones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {asignaciones.length === 0 ? "Aun no hay asignaciones": ""}
            {asignaciones.map((asignacion, index) => (
              <div key={index} className="border rounded-lg shadow-sm overflow-hidden">
                <div className="p-4">
                  <h3 className="font-semibold">{asignacion.tutor_nombre}</h3>
                  <p>Asignatura: {asignacion.asignatura_nombre}</p>
                  <p>Periodo: {asignacion.periodo}</p>
                  <p>Horas: {asignacion.horas}</p>
                </div>
                <div className="bg-gray-50 px-4 py-3 flex justify-end">
                  <button
                    onClick={() => handleEliminar(index)}
                    className="text-red-600 hover:text-red-800 focus:outline-none"
                    aria-label="Eliminar asignación"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {asignaciones.length > 0 && (
            <button
              onClick={quitarCamposDeAsignaciones}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Guardar Asignaciones
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AsignarCargaHoraria

