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

    const cursoBodyTemplate =(rowData)=>{
      return (

        <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 128 128"><path fill="#c62828" d="m70.24 100.79l48.55 4.62c4.57.44 5.74-2.11 5.74-4.27l-.05-2.62l-59.71-8.42c0 2.99 2.43 10.69 5.47 10.69"/><path fill="#f44336" d="m72.01 98.51l7.64.67l40.91 3.95c2.2 0 3.97-1.75 3.97-3.91l-2.17-66.26c0-2.16-1.78-3.91-3.97-3.91l-46.38-4.38c-3.04 0-5.51 2.43-5.51 5.42v63c0 2.99 2.46 5.42 5.51 5.42"/><path fill="#c62828" d="m57.76 100.79l-48.55 4.62c-4.57.44-5.74-2.11-5.74-4.27l.05-2.62l59.71-8.43c0 3-2.43 10.7-5.47 10.7"/><path fill="#f44336" d="m55.99 98.51l-7.58.67l-40.97 3.96c-2.2 0-3.97-1.75-3.97-3.91l2.17-66.26c0-2.16 1.78-3.91 3.97-3.91l46.38-4.38c3.04 0 5.51 2.43 5.51 5.42v63c0 2.98-2.46 5.41-5.51 5.41"/><path fill="#424242" d="M78.75 83.68H49.27l-.9 15.53l9.2.86s1.97 4.92 6.43 4.92s6.43-4.92 6.43-4.92l9.2-.86z"/><path fill="none" stroke="#616161" stroke-miterlimit="10" stroke-width="2.5" d="m79.54 100.43l-8.57-.74m-22.51.74l8.57-.74"/><path fill="#94c6d6" d="m119.65 32.82l-4-5.5L64 86.02l-51.65-58.7l-4 5.5l-.56 65.35s10.62 1.33 24.81-.11c12.36-1.25 18.18-4.45 22.31-3.62c4.96 1 5.86 4.05 6.02 4.57c.45 1.44 1.34 2.56 3.07 2.56s2.5-.6 3.03-2.38c.16-.52 1.1-3.74 6.06-4.74c4.13-.83 9.95 2.37 22.31 3.62c14.19 1.44 24.81.11 24.81.11z"/><linearGradient id="notoOpenBook0" x1="50.885" x2="50.638" y1="88.201" y2="70.898" gradientTransform="matrix(-1 0 0 1 168.128 0)" gradientUnits="userSpaceOnUse"><stop offset=".267" stop-color="#82aec0"/><stop offset="1" stop-color="#82aec0" stop-opacity="0"/></linearGradient><path fill="url(#notoOpenBook0)" d="m114.3 91.87l.16-26.39h5.47l.28 32.69s-4.35-1.69-5.91-6.3"/><linearGradient id="notoOpenBook1" x1="98.211" x2="55.4" y1="84.601" y2="84.601" gradientTransform="matrix(-1 0 0 1 168.128 0)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2f7889"/><stop offset="1" stop-color="#82aec0"/></linearGradient><path fill="url(#notoOpenBook1)" d="m114.55 76.49l-.25 15.39s-11.96-.62-31.01-3.92C70.83 85.8 64 92.72 64 92.72l-.11-16.23z"/><linearGradient id="notoOpenBook2" x1="57.979" x2="15.263" y1="84.601" y2="84.601" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2f7889"/><stop offset="1" stop-color="#82aec0"/></linearGradient><path fill="url(#notoOpenBook2)" d="m13.45 76.49l.25 15.39s11.96-.62 31.01-3.92C57.17 85.8 64 92.72 64 92.72l-.11-16.23z"/><linearGradient id="notoOpenBook3" x1="10.753" x2="10.505" y1="88.201" y2="70.898" gradientUnits="userSpaceOnUse"><stop offset=".267" stop-color="#82aec0"/><stop offset="1" stop-color="#82aec0" stop-opacity="0"/></linearGradient><path fill="url(#notoOpenBook3)" d="m13.7 91.87l-.16-26.39H8.06l-.27 32.69s4.34-1.69 5.91-6.3"/><path fill="#f5f5f5" d="M115.65 27.32s-26.54-4.99-38.19-5.64c-10.96-.61-13.21 4.97-13.43 5.64h-.04c-.23-.67-2.48-6.24-13.44-5.64c-11.65.65-38.19 5.64-38.19 5.64l-1.18 64.4s31.6-6.62 39.25-5.76S64 92.72 64 92.72v-.01v.01s5.93-5.9 13.58-6.76s39.25 5.76 39.25 5.76z"/><path fill="#94c6d6" d="m53.62 21.69l-5.4 64.2c.85-.02 1.6 0 2.2.07c7.64.85 13.58 6.76 13.58 6.76l-.17-65.4s-1.3-5.12-10.21-5.63" opacity="0.26"/><path fill="#757575" d="M25.31 30.18c-2.7.47-4.91.87-6.17 1.09c0 .62 0 1.3-.01 2.03c1.11-.2 3.37-.61 6.18-1.1zm24.34-3.22v1.99c5.33-.01 8.28 1.33 9.25 1.87c0-.83.01-1.57.01-2.22c-1.65-.74-4.67-1.65-9.26-1.64m-4.34.25c-4.33.44-10.36 1.36-15.66 2.24v2.03c5.26-.87 11.3-1.8 15.66-2.26zm-10.65 8.63c-6.46 1-12.94 2.16-15.54 2.63v2.03c2.26-.41 8.89-1.61 15.54-2.64zm12.03-1.56c-2.11.17-4.8.51-7.69.91v2.02c2.95-.42 5.71-.76 7.85-.94c7.18-.59 10.97 1.17 12.03 1.77v-2.23c-1.96-.87-5.89-2.05-12.19-1.53M26.38 44.39c-3.16.54-5.8 1.01-7.26 1.28v2.03c1.31-.24 3.99-.72 7.26-1.28zm32.5-1.35c-1.95-.88-5.89-2.08-12.25-1.55c-4.07.33-10.3 1.26-15.91 2.18v2.03c5.66-.93 11.98-1.87 16.08-2.21c7.3-.6 11.1 1.23 12.08 1.8zm.01 7.23c-1.93-.88-5.89-2.11-12.3-1.58c-.65.05-1.35.12-2.09.2v2.01c.81-.09 1.56-.16 2.26-.22c7.44-.61 11.24 1.3 12.14 1.84c-.01-.75-.01-1.5-.01-2.25m-18.74-.84c-7.82 1.07-17.56 2.8-21.02 3.43v2.03c3.05-.56 13.02-2.35 21.02-3.45zm-11.9 9.04c-3.93.66-7.33 1.27-9.12 1.59v2.03c1.62-.3 5.07-.92 9.12-1.6zm30.65-.96c-1.91-.88-5.89-2.14-12.36-1.61c-3.6.3-8.88 1.05-13.94 1.86v2.02c5.11-.82 10.48-1.59 14.1-1.89c7.63-.63 11.44 1.41 12.2 1.87zm.02 14.47c-1.82-.87-5.76-2.18-12.26-1.69v2.01c8.29-.67 12.05 1.81 12.26 1.96zm-32.54 1.2c-3.08.53-5.7.99-7.23 1.27v2.03c1.41-.26 4.05-.73 7.23-1.28zm4.34-.72v2.03c3.88-.63 8.05-1.27 11.6-1.72v-2.02c-3.53.44-7.7 1.07-11.6 1.71m6.95 6.12c-7.16 1.04-15.21 2.47-18.51 3.07v2.03c2.99-.55 11.19-2.01 18.51-3.08zm21.26.64c-1.81-.88-5.84-2.25-12.56-1.7c-1.27.1-2.75.27-4.36.47V80c1.67-.21 3.21-.38 4.52-.49c8.56-.71 12.32 1.95 12.36 1.97l.05-.06c0-.69 0-1.42-.01-2.2M36.18 64.4c-6.82 1.02-14.05 2.31-17.04 2.86v2.03c2.68-.49 10.05-1.81 17.04-2.87zm22.73.34c-1.88-.88-5.87-2.18-12.43-1.64c-1.68.14-3.73.38-5.95.68v2.02c2.29-.31 4.4-.56 6.12-.7c7.88-.65 11.69 1.54 12.27 1.91c-.01-.74-.01-1.5-.01-2.27m29.5-35.03c8.28 1.1 19.1 3.06 22.04 3.59c0-.74 0-1.41-.01-2.03c-3.44-.63-13.97-2.51-22.04-3.58v2.02zm-4.35-2.52c-.43-.04-.84-.08-1.23-.11c-6.27-.52-10.19.65-12.16 1.52c0 .65.01 1.4.01 2.22c1.12-.62 4.91-2.33 11.99-1.75c.44.04.91.08 1.39.13zm18.3 11.89a673 673 0 0 1 8.1 1.43v-2.03c-1.57-.29-4.55-.82-8.1-1.42zm-4.34-2.75c-5.41-.87-11.25-1.73-15.13-2.05c-6.3-.52-10.23.66-12.2 1.53v2.23c1.06-.6 4.85-2.36 12.03-1.77c3.91.32 9.84 1.2 15.29 2.08v-2.02zm-.84 7.06v2.02c5.81.93 11.22 1.91 13.28 2.29v-2.03c-2.33-.42-7.64-1.37-13.28-2.28M88.4 49.3c-2.01-.26-3.87-.48-5.41-.6c-6.41-.53-10.37.7-12.3 1.58v2.25c.9-.53 4.71-2.45 12.14-1.84c1.58.13 3.5.35 5.57.63zm4.35.61v2.02c7.25 1.08 15.06 2.49 17.7 2.97v-2.03c-2.98-.55-10.63-1.91-17.7-2.96m.88 7.33c-3.95-.6-7.78-1.11-10.58-1.34c-6.48-.53-10.46.73-12.36 1.61v2.26c.76-.47 4.57-2.5 12.2-1.87c2.83.23 6.74.76 10.75 1.37v-2.03zm4.34.68v2.03c5.44.88 10.42 1.78 12.47 2.15v-2.03c-2.28-.42-7.18-1.3-12.47-2.15m7.07 8.38v2.03c2.36.41 4.29.76 5.39.96v-2.03c-1.2-.22-3.1-.56-5.39-.96m-15.75 4.71c-2.29-.31-4.41-.56-6.13-.7c-6.64-.55-10.65.79-12.49 1.67v2.28c.21-.15 3.99-2.65 12.34-1.96c1.76.14 3.94.4 6.3.72v-2.01zm4.34.62v2.02c6.88 1.04 14.1 2.34 16.8 2.83v-2.03c-3-.54-10.08-1.8-16.8-2.82m3.55 7.75c-5.07-.81-10.37-1.57-13.97-1.87c-6.73-.55-10.75.83-12.56 1.7v2.2l.05.06c.03-.02 3.79-2.68 12.36-1.97c3.63.3 9.02 1.08 14.14 1.9v-2.02zm4.35.72v2.03c3.89.65 7.21 1.25 8.89 1.56v-2.03c-1.83-.34-5.11-.93-8.89-1.56m-18.6-17.01c-6.46-.51-10.4.78-12.26 1.65v2.27c.58-.37 4.38-2.56 12.26-1.91zm4.35.46v2.01c4.12.52 9.07 1.3 13.42 2.02v-2.03c-4.38-.72-9.33-1.49-13.42-2m-7.56-22.18c-4.48.03-7.43.95-9.02 1.67v2.24c.84-.48 3.71-1.87 9.02-1.92zm4.34.22v2.01c2.49.25 5.58.67 8.77 1.14v-2.02c-3.2-.48-6.28-.89-8.77-1.13" opacity="0.5"/><path fill="#616161" d="M71.16 98.45c-1.12-.1-2.15.59-2.51 1.66c-.54 1.63-1.8 3.76-4.65 3.76c-2.88 0-4.15-2.14-4.7-3.77a2.415 2.415 0 0 0-2.48-1.64l-.39.03l.01.32a7.55 7.55 0 0 0 7.55 7.55a7.55 7.55 0 0 0 7.55-7.55c0-.1-.01-.33-.01-.33z"/></svg>
        <span className="text-gray-800 ml-3 font-medium">{rowData.curso} "{rowData.paralelo}"</span>
      </div>
      

      )
    }


    
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
                <Column field={cursoBodyTemplate} header="Cursos"></Column>
              </DataTable>
            </div>
          </div>
        </div>
    )
}

export default ListadoCurso