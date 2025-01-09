import { useState, useEffect } from "react";
import axios from "axios";

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

const ListadoAsignaturas = () => {

    const [asignaturas, setAsignaturas] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/asignatura/listado/')
        .then(response => {
            setAsignaturas(response.data)
        })
        .catch(error => {
            console.error('Error al obtener las asignaturas:', error);
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

    const statusBodyTemplate = (asignaturas) => {
        return (
            <Tag value={asignaturas.estado} severity={getSeverity(asignaturas.estado)} />
        );
    };

    const codigoBodyTemplate = (rowData) => {
        return (
            <div className="flex items-center">
                <i className="pi pi-key text-yellow-500 mr-2"></i> {/* Ícono de llave dorada */}
                <span className="ml-2 text-sm text-gray-800 font-medium">{rowData.codigo}</span>
            </div>
        );
    };

    const asignaturaBodyTemplate = (rowData) => {
        return (
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" className="mr-2">
                    <path fill="#0096d1" d="M427.932 4.041H134.917a75 75 0 0 0-5.829-.25c-40.814 0-73.901 33.086-73.901 73.9q.002 2.979.234 5.898h-.234v387.997c0 19.558 15.855 35.414 35.414 35.414h40.633v-81.18a37.2 37.2 0 0 0 10.918 1.631h297.662c20.544 0 37.199-16.654 37.199-37.199V53.121c0-27.106-21.974-49.08-49.081-49.08"/>
                    <path fill="#dce2e2" d="M455.931 67.945c0-21.992-20.75-39.972-46.96-41.336v-.093H129.088c-20.407 0-36.95 12.668-36.95 28.294s16.543 28.294 36.95 28.294v.485H331.89v390.972l73.882 8.673c28.693 0 50.159-56.776 50.159-84.813V69.915h-.06c.037-.653.06-1.309.06-1.97"/>
                    <path fill="#59cafc" d="M390.578 83.59H131.234V507h259.344c20.252 0 36.669-16.417 36.669-36.669V120.259c0-20.252-16.417-36.669-36.669-36.669"/>
                    <path fill="#2b3b47" d="M333.49 240.399H200.546c-7.953 0-14.4-6.447-14.4-14.4v-50.115c0-7.953 6.447-14.4 14.4-14.4H333.49c7.953 0 14.4 6.447 14.4 14.4v50.115c0 7.953-6.447 14.4-14.4 14.4"/>
                </svg>
                <span className="ml-2 text-sm text-gray-800 font-medium">{rowData.asignatura}</span>
            </div>
        );
    };

    
    return(
        <div className="flex flex-col h-screen contenedor">
          <div>
            <h1 className="text-2xl font-bold mt-4 mb-4">Listado de Asignaturas</h1>
            <div className="flex-1 overflow-y-auto">
              <DataTable
                value={asignaturas}
                className="custom-table"
                tableStyle={{ minWidth: "60rem" }}
                style={{ width: "100%" }}
              >
                <Column field={codigoBodyTemplate} header="Código"></Column>
                <Column field={asignaturaBodyTemplate} header="Asignatura"></Column>
                <Column field="descripcion" header="Descripción"></Column>
                <Column field={statusBodyTemplate} header="Estado"></Column>
              </DataTable>
            </div>
          </div>
        </div>
    )
}

export default ListadoAsignaturas