import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../utils/constants";
import axios from "axios";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import "../../styles/styles.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const ListadoTutorias = () => {
  const [tutorias, setTutorias] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [idTutor, setIdTutor] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Obtener ID del tutor antes de cargar las tutorías
  useEffect(() => {
    const token = Cookie.get("access_token");

    if (!token) {
      console.warn("No se encontró el token en las cookies.");
      setCargando(false);
      return;
    }

    const obtenerDatos = async () => {
      try {
        const usuarioActual = jwtDecode(token);
        setUsuario(usuarioActual);
        console.log("Usuario autenticado:", usuarioActual);

        // Obtener ID del tutor si es perfil 2
        let tutorId = null;
        if (usuarioActual.perfil === 2) {
          const response = await axios.get(`${API_BASE_URL}tutor-id/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          tutorId = response.data.tutor_id;
          setIdTutor(tutorId);
        }

        // Obtener tutorías
        const responseTutorias = await axios.get(`${API_BASE_URL}tutoria/listado/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        let tutoriasFiltradas = responseTutorias.data;
        if (usuarioActual.perfil === 2 && tutorId) {
          tutoriasFiltradas = tutoriasFiltradas.filter(
            (tutoria) => tutoria.id_tutor_FK.id === tutorId
          );
        }

        setTutorias(tutoriasFiltradas);
        console.log("Tutorías cargadas:", tutoriasFiltradas);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, []);

  const tutorBodyTemplate = (rowData) => (
    <div className="flex items-center">
      <span className="text-gray-800 ml-3 font-medium">
        {rowData.id_tutor_FK.id_user_FK.full_name}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col h-screen contenedor">
      <div>
        <h1 className="text-2xl font-bold mt-4 mb-4">Listado de Tutorias</h1>
        {cargando ? (
          <p>Cargando...</p>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <DataTable
              value={tutorias}
              className="custom-table"
              tableStyle={{ minWidth: "60rem" }}
              style={{ width: "100%" }}
            >
              <Column field="tema" header="Tema"></Column>
              <Column field="fecha" header="Fecha"></Column>
              <Column field="hora_inicio" header="Hora Inicio"></Column>
              <Column field="hora_fin" header="Hora Fin"></Column>
              <Column field={tutorBodyTemplate} header="Tutor"></Column>
            </DataTable>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListadoTutorias;
