import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Cookie from "js-cookie"
import {jwtDecode} from 'jwt-decode'

import "../../styles/styles.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const ListadoInscripciones = () => {
    const [inscripciones, setInscripciones] = useState([]);
    const [inscripcionesFiltradas, setInscripcionesFiltradas] = useState([]);
    const user = jwtDecode(Cookie.get("access_token"));
    const [idEstudiante, setIdEstudiante] = useState(null);
    const perfil = user.perfil;

  useEffect(() => {
    // Fetch all inscriptions
    axios
      .get(`${API_BASE_URL}tutoria/inscripciones/listado/`)
      .then((response) => {
        const data = response.data.map((inscripcion) => ({
          id: inscripcion.id,
          estudiante: inscripcion.id_estudiante_FK?.id_user_FK?.full_name || "Desconocido",
          tutoria: inscripcion.id_tutoria_FK?.tema || "Sin tema",
          fecha: inscripcion.id_tutoria_FK?.fecha || "No definida",
          hora_inicio: inscripcion.id_tutoria_FK?.hora_inicio || "No definida",
          id_estudiante_FK: inscripcion.id_estudiante_FK?.id // Save the student ID for filtering
        }));

        setInscripciones(data);
        
        // If we already have the student ID, filter the inscriptions
        if (perfil === 1 && idEstudiante) {
          const filtradas = data.filter(inscripcion => 
            inscripcion.id_estudiante_FK === idEstudiante
          );
          setInscripcionesFiltradas(filtradas);
        } else {
          setInscripcionesFiltradas(data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener las inscripciones:", error);
      });

    obtenerIdEstudiante();
  }, [idEstudiante, perfil]);

  // Effect to filter inscriptions when idEstudiante changes
  useEffect(() => {
    if (perfil === 1 && idEstudiante && inscripciones.length > 0) {
      const filtradas = inscripciones.filter(inscripcion => 
        inscripcion.id_estudiante_FK === idEstudiante
      );
      setInscripcionesFiltradas(filtradas);
    } else {
      setInscripcionesFiltradas(inscripciones);
    }
  }, [idEstudiante, inscripciones, perfil]);

  const obtenerIdEstudiante = async () => {
    const token = Cookie.get("access_token");

    if (!token) {
        return;
    }

    try {
        const response = await axios.get(`${API_BASE_URL}estudiante-id/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setIdEstudiante(response.data.estudiante_id);
    } catch (error) {
        console.error("Error al obtener el ID del tutor:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen contenedor">
      <div>
        <h1 className="text-2xl font-bold mt-4 mb-4">
          {perfil === 1 ? "Mis Inscripciones" : "Listado de Inscripciones"}
        </h1>
        <div className="flex-1 overflow-y-auto">
          <DataTable 
            value={inscripcionesFiltradas} 
            className="custom-table" 
            tableStyle={{ minWidth: "60rem" }} 
            style={{ width: "100%" }}
            emptyMessage="No hay inscripciones disponibles"
          >
            <Column field="estudiante" header="Estudiante"></Column>
            <Column field="tutoria" header="Tutoría"></Column>
            <Column field="fecha" header="Fecha"></Column>
            <Column field="hora_inicio" header="Hora de Inicio"></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default ListadoInscripciones;