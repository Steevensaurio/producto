import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../utils/constants";
import axios from "axios";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2"; // 📌 Importar SweetAlert2

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import "../../styles/styles.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const ListadoSolicitud = () => {
    const [idTutor, setIdTutor] = useState(null);
    const [solicitudes, setSolicitudes] = useState([]);
    const [cargando, setCargando] = useState(true);

    const user = jwtDecode(Cookie.get("access_token"));
    const perfil = user.perfil;

    useEffect(() => {
        obtenerIdTutor();
    }, []);

    useEffect(() => {
        if (perfil === 2 && idTutor === null) {
            return; // No ejecutar hasta que idTutor tenga un valor
        }

        axios
            .get(`${API_BASE_URL}tutoria/solicitud/listado/`)
            .then((response) => {
                let data = response.data;

                // Filtrar si el perfil es 2
                if (perfil === 2) {
                    data = data.filter((solicitud) => solicitud.id_tutor_FK.id === idTutor);
                }

                setSolicitudes(data);
                setCargando(false);
            })
            .catch((error) => {
                console.error("Error al obtener los representantes:", error);
                setCargando(false);
            });
    }, [idTutor]); // Se ejecuta cuando idTutor cambia

    const obtenerIdTutor = async () => {
        const token = Cookie.get("access_token");

        if (!token) return;

        try {
            const response = await axios.get(`${API_BASE_URL}tutor-id/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIdTutor(response.data.tutor_id);
        } catch (error) {
            console.error("Error al obtener el ID del tutor:", error.response);
        }
    };

    const actualizarEstado = async (id, nuevoEstado, solicitud) => {
        Swal.fire({
            title: `¿Estás seguro?`,
            text: `Vas a cambiar el estado a "${nuevoEstado}".`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: nuevoEstado === "Aprobada" ? "#28a745" : "#dc3545",
            cancelButtonColor: "#6c757d",
            confirmButtonText: `Sí, ${nuevoEstado.toLowerCase()}`,
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = Cookie.get("access_token");
                    await axios.put(
                        `${API_BASE_URL}solicitud/${id}/actualizar-estado/`,
                        { estado: nuevoEstado },
                        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
                    );
    
                    setSolicitudes((prevSolicitudes) =>
                        prevSolicitudes.map((sol) =>
                            sol.id === id ? { ...sol, estado: nuevoEstado } : sol
                        )
                    );
    
                    Swal.fire({
                        title: "¡Estado actualizado!",
                        text: `La solicitud ha sido ${nuevoEstado.toLowerCase()}.`,
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                    });
    
                    // ✅ Si se aprueba la solicitud, crear la tutoría
                    if (nuevoEstado === "Aprobada") {
                        await crearTutoria(solicitud);
                    }
                } catch (error) {
                    console.error("Error al actualizar el estado:", error);
                }
            }
        });
    };
    
    const crearTutoria = async (solicitud) => {
        try {
            const token = Cookie.get("access_token");
    
            const nuevaTutoria = {
                tema: solicitud.tema,
                descripcion: solicitud.descripcion,
                modalidad: solicitud.modalidad,
                seccion: solicitud.seccion,
                fecha: solicitud.fecha,
                hora_inicio: solicitud.hora_inicio,
                hora_fin: solicitud.hora_fin,
                tipo: solicitud.tipo,
                id_tutor_FK: solicitud.id_tutor_FK.id,
            };
    
            console.log("✅ Enviando datos de tutoría:", nuevaTutoria);
    
            await axios.post(`${API_BASE_URL}tutoria/asignar/`, nuevaTutoria, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            });
    
            Swal.fire({
                title: "¡Tutoría creada!",
                text: "Se ha aprobado la tutoría con éxito.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });
    
            // 🛑 Verificar si la tutoría fue creada antes de inscribir
            const idTutoria = await obtenerIdTutoria(nuevaTutoria);
            if (!idTutoria) {
                console.error("No se encontró la tutoría para inscribir al estudiante.");
                return;
            }
    
            console.log("📌 ID de la tutoría encontrada:", idTutoria);


    
            await crearInscripcion(solicitud.id_user_FK, idTutoria);
            console.log("👀 ID del estudiante:", solicitud.id_user_FK.id);
        } catch (error) {
            console.error("❌ Error al crear la tutoría:", error.response ? error.response.data : error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al crear la tutoría.",
                icon: "error",
            });
        }
    };

    const obtenerIdTutoria = async (datosTutoria) => {
        try {
            const token = Cookie.get("access_token");
    
            // 🛑 Obtener la lista de tutorías
            const response = await axios.get(`${API_BASE_URL}tutoria/listado/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            const tutorias = response.data;
            console.log("📋 Lista de tutorías obtenidas:", tutorias);
            console.log("🔍 Datos de la nueva tutoría:", datosTutoria);
    
            // 🛑 Buscar coincidencias en la lista de tutorías
            const tutoriaEncontrada = tutorias.find(
                (tutoria) =>
                    tutoria.tema === datosTutoria.tema &&
                    tutoria.descripcion === datosTutoria.descripcion &&
                    tutoria.modalidad === datosTutoria.modalidad &&
                    tutoria.seccion === datosTutoria.seccion &&
                    tutoria.fecha === datosTutoria.fecha &&
                    tutoria.hora_inicio === datosTutoria.hora_inicio &&
                    tutoria.hora_fin === datosTutoria.hora_fin &&
                    tutoria.tipo === datosTutoria.tipo &&
                    tutoria.id_tutor_FK.id === datosTutoria.id_tutor_FK
            );
    
            if (!tutoriaEncontrada) {
                console.warn("⚠️ No se encontró una tutoría con estos datos.");
                return null;
            }
    
            console.log("✅ Tutoría encontrada:", tutoriaEncontrada);
            return tutoriaEncontrada.id;
        } catch (error) {
            console.error("❌ Error al obtener la tutoría:", error.response ? error.response.data : error);
            return null;
        }
    };

    const crearInscripcion = async (idEstudiante, idTutoria) => {
        if (!idEstudiante || !idTutoria) {
            console.error("❌ Error: idEstudiante o idTutoria están vacíos.");
            return;
        }
    
        const datosInscripcion = {
            id_estudiante_FK: idEstudiante,
            id_tutoria_FK: idTutoria,
        };
    
        try {
            const token = Cookie.get("access_token");
    
            console.log("📤 Enviando inscripción:", datosInscripcion);
    
            const response = await axios.post(
                `${API_BASE_URL}tutoria/inscripciones/`,
                datosInscripcion,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
    
            console.log("✅ Inscripción creada con éxito:", response.data);
        } catch (error) {
            console.error("❌ Error al crear la inscripción:", error.response ? error.response.data : error);
        }
    };

    const estadoBodyTemplate = (rowData) => (
        <div className="flex gap-2">
            <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded shadow"
                onClick={() => actualizarEstado(rowData.id, "Aprobada", rowData)}
                disabled={rowData.estado !== "Pendiente"} // Deshabilita si el estado ya cambió
                hidden={rowData.estado === "Rechazada"} // Deshabilita si el estado ya cambió
            >
                {rowData.estado !== "Pendiente"? "Aprobada" : "Aprobar"}
            </button>
            <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded shadow"
                onClick={() => actualizarEstado(rowData.id, "Rechazada", rowData)}
                disabled={rowData.estado !== "Pendiente"}
                hidden={rowData.estado === "Aprobada"} 
            >
                {rowData.estado !== "Pendiente"? "Rechazada" : "Rechazar"}
            </button>
        </div>
    );

    const userBodyTemplate = (rowData) => (
        <div className="flex items-center">
            <span className="text-gray-800 ml-3 font-medium">
                {rowData.id_user_FK.full_name}
            </span>
        </div>
    );

    const estadoColorTemplate = (rowData) => {
        let color = "";
        if (rowData.estado === "Aprobada") {
            color = "bg-green-500 text-white"; 
        } else if (rowData.estado === "Rechazada") {
            color = "bg-red-500 text-white"; 
        } else {
            color = "bg-gray-300 text-gray-800"; 
        }
    
        return <span className={`px-2 py-1 rounded ${color}`}>{rowData.estado}</span>;
    };

    return (
        <div className="flex flex-col h-screen contenedor">
            <h1 className="text-2xl font-bold mt-4 mb-4">Listado de Solicitudes</h1>
            {cargando ? (
                <p>Cargando...</p>
            ) : (
                <div className="flex-1 overflow-y-auto">
                    <DataTable
                        value={solicitudes}
                        className="custom-table"
                        tableStyle={{ minWidth: "60rem" }}
                        style={{ width: "100%" }}
                    >
                        <Column field="tema" header="Tema"></Column>
                        <Column field="fecha" header="Fecha"></Column>
                        <Column field="hora_inicio" header="Hora Inicio"></Column>
                        <Column field="hora_fin" header="Hora Fin"></Column>
                        <Column body={userBodyTemplate} header="Solicitado por:"></Column>
                        {perfil === 1 && <Column body={estadoColorTemplate} header="Estado" />}
                        {perfil !== 1 && <Column body={estadoBodyTemplate} header="Estado" />}
                    </DataTable>
                </div>
            )}
        </div>
    );
};

export default ListadoSolicitud;
