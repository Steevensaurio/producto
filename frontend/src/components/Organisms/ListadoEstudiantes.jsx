import { useState, useEffect } from "react";
import axios from "axios";


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';

import '../../styles/styles.css'

import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // Tema PrimeReact
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'; 

const ListadoEstudiantes = () => {

    const [estudiantes, setEstudiantes] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/estudiante/listado/')
        .then(response => {
            setEstudiantes(response.data);
        })
        .catch(error => {
            console.error('Error al obtener las tutorías:', error);
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
    
    const statusBodyTemplate = (estudiantes) => {
        return (
            <Tag value={estudiantes.estado} severity={getSeverity(estudiantes.estado)} />
        );
    };

    return(
        <div className="flex flex-col h-screen contenedor">
          <div>
            <h1 className="text-2xl font-bold mt-4 mb-4">Listado de Estudiantes</h1>
            <div className="flex-1 overflow-y-auto">
              <DataTable
                value={estudiantes}
                className="custom-table"
                tableStyle={{ minWidth: "60rem" }}
                style={{ width: "100%" }}
              >
                <Column field="nombre" header="Nombre"></Column>
                <Column
                  field="estado"
                  header="Estado"
                  body={statusBodyTemplate}
                ></Column>
  
                <Column
                  header="Opciones"
                  body={() => (
                    <Button
                      icon="pi pi-check"
                      label="BOTON"
                    />
                  )}
                />
              </DataTable>
            </div>
          </div>
        </div>
    )
}

export default ListadoEstudiantes