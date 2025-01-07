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

const ListadoCurso = () => {

    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/curso/listado/')
        .then(response => {
            setCursos(response.data);
            console.log(cursos);
            
        })
        .catch(error => {
            console.error('Error al obtener las tutorías:', error);
        });
    }, []);

    
    return(
        <div className="flex flex-col h-screen contenedor">
          <div>
            <h1 className="text-2xl font-bold mt-4 mb-4">Listado de Cursos</h1>
            <div className="flex-1 overflow-y-auto">
              <DataTable
                value={cursos}
                className="custom-table"
                tableStyle={{ minWidth: "60rem" }}
                style={{ width: "100%" }}
              >
                <Column field="curso" header="Curso"></Column>
                <Column field="paralelo" header="Paralelo"></Column>
              </DataTable>
            </div>
          </div>
        </div>
    )
}

export default ListadoCurso