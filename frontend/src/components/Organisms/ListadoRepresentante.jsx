import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL} from "../../utils/constants";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import '../../styles/styles.css'

import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // Tema PrimeReact
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'; 

const ListadoRepresentante = () => {

    const [representante, setRepresentante] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}representante/listado/`)
        .then(response => {
            setRepresentante(response.data);
        })
        .catch(error => {
            console.error('Error al obtener los representantes:', error);
        });
    }, []);

    const getSeverity = (estado) => {
        switch (estado) {
            case 'Activo':
                return 'success'; // Verde o estilo positivo
            case 'Inactivo':
                return 'danger'; // Rojo o estilo negativo
            default:
                return null; // Sin estilo especial
        }
    };
    
    const statusBodyTemplate = (representante) => {
        return (
            <Tag value={representante.id_user_FK.estado} severity={getSeverity(representante.id_user_FK.estado)} />
        );
    };

    const fullNameBodyTemplate = (rowData) => {
        return rowData.id_user_FK ? <span className="text-gray-800 font-medium">{rowData.id_user_FK.full_name}</span> : "No disponible";
    };

    const correoBodyTemplate = (rowData) => {
      return rowData.id_user_FK ? (
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 193" className="mr-2">
            <path fill="#4285f4" d="M58.182 192.05V93.14L27.507 65.077L0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455z"/>
            <path fill="#34a853" d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837l-27.026 25.798z"/>
            <path fill="#ea4335" d="m58.182 93.14l-4.174-38.647l4.174-36.989L128 69.868l69.818-52.364l4.669 34.992l-4.669 40.644L128 145.504z"/>
            <path fill="#fbbc04" d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945z"/>
            <path fill="#c5221f" d="m0 49.504l26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.23z"/>
          </svg>
          <span className="text-gray-800 font-medium">{rowData.id_user_FK.email}</span>
        </div>
      ) : "No disponible";
    };

    const telefonoBodyTemplate = (rowData) => {
      return rowData.id_user_FK ? (
          <div className="flex items-center">
              <i className="pi pi-whatsapp text-green-500 text-lg mr-1"></i>
              
              <a
                  href={`https://wa.me/${rowData.id_user_FK.telefono}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1"
              >
                <span className="text-gray-800 font-medium">{rowData.id_user_FK.telefono}</span>
              </a>
          </div>
      ) : (
          "No disponible"
      );
     };

     const cedulaBodyTemplate = (rowData) => {
      return (
        <div className="flex items-center">
          {/* Ícono SVG colorido representando una cédula */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 32 24"
            fill="none"
            className="flex-shrink-0"
            aria-hidden="true"
          >
            <rect width="32" height="24" rx="2" fill="#4A90E2" />
            <rect x="2" y="2" width="28" height="20" rx="1" fill="#FFFFFF" />
            <rect x="4" y="4" width="10" height="12" fill="#E0E0E0" />
            <circle cx="9" cy="8" r="2" fill="#4A90E2" />
            <rect x="16" y="5" width="12" height="2" rx="1" fill="#4A90E2" />
            <rect x="16" y="9" width="12" height="2" rx="1" fill="#4A90E2" />
            <rect x="16" y="13" width="8" height="2" rx="1" fill="#4A90E2" />
            <rect x="4" y="18" width="24" height="2" rx="1" fill="#E0E0E0" />
          </svg>
          {/* Número de cédula */}
          <span className="ml-2 text-gray-800 font-medium">{rowData.id_user_FK.cedula}</span>
        </div>
      );
    };

    const generoBodyTemplate = (rowData) => {
      const gender = rowData.id_user_FK?.genero;
      return (
          <div className="flex items-center">
              {gender === 'Masculino' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#2196F3">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
              ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#EC407A">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
              )}
              <span className="ml-1 text-gray-800 font-medium">{gender === 'Masculino' ? 'Masculino' : 'Femenino'}</span>
          </div>
      );
    };

    const editBodyTemplate = (rowData) => {
      return (
        <button
          onClick={() => handleEdit(rowData)}
          className="cursor-pointer transition-all bg-blue-500 text-white p-2 rounded-lg
                     border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                     active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
          aria-label={`Editar ${rowData.id_user_FK.full_name}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
      );
    };


    return(
        <div className="flex flex-col h-screen contenedor">
          <div>
            <h1 className="text-2xl font-bold mt-4 mb-4">Listado de Representantes</h1>
            <div className="flex-1 overflow-y-auto">
              <DataTable
                value={representante}
                className="custom-table"
                tableStyle={{ minWidth: "60rem" }}
                style={{ width: "100%" }}
              >
                <Column header="Nombre" body={fullNameBodyTemplate} />
                <Column header="Cédula" body={cedulaBodyTemplate} />
                <Column header="Estado" body={statusBodyTemplate} />
                <Column header="Teléfono" body={telefonoBodyTemplate} />
                <Column header="Genero" body={generoBodyTemplate} />
                <Column header="Correo" body={correoBodyTemplate} />
                <Column header="Editar" body={editBodyTemplate} style={{ width: '4rem' }} />

              </DataTable>
            </div>
          </div>
        </div>
    )
}

export default ListadoRepresentante