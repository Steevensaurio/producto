import { useState, useEffect } from "react";
import axios from "axios";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import '../../styles/styles.css'

import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // Tema PrimeReact
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'; 

const ListadoTutorias = () => {
    const [tutorias, setTutorias] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/tutoria/listado/')
        .then(response => {
            setTutorias(response.data);
            console.log(response.data);
            
        })
        .catch(error => {
            console.error('Error al obtener las tutorías:', error);
        });
    }, []);


  const tutorBodyTemplate = (rowData) => {
      return (
          <div className="flex items-center">
              <span className="text-gray-800 ml-3 font-medium">{rowData.id_tutor_FK.id_user_FK.full_name}</span>
          </div>
      )
  }

    return(
        <div className="flex flex-col h-screen contenedor">
          <div>
            <h1 className="text-2xl font-bold mt-4 mb-4">Listado de Tutorias</h1>
            <div className="flex-1 overflow-y-auto">
              <DataTable
                value={tutorias}
                className="custom-table"
                tableStyle={{ minWidth: "60rem" }}
                style={{ width: "100%" }}
              >
                <Column field="tema" header="Tema"></Column>
                <Column field="fecha" header="Fecha"></Column>
                <Column field="hora_inicio" header="Fecha"></Column>
                <Column field="hora_fin" header="Fecha"></Column>
                <Column field={tutorBodyTemplate} header="Tutor"></Column>
              </DataTable>
            </div>
          </div>
        </div>
    )
}

export default ListadoTutorias