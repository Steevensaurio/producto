import React, { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { addLocale } from 'primereact/api';
        

import '../../styles/styles.css';

import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // Tema PrimeReact
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'; 




const Tabla  = () => {

  const profesores = [
        { id: 1, nombre: "AAA", estado: "ACTIVO" },
        { id: 2, nombre: "BBB", estado: "INACTIVO" },
        { id: 3, nombre: "CCC", estado: "ACTIVO"},
        { id: 4, nombre: "CCC", estado: "ACTIVO"},
        { id: 5, nombre: "CCC", estado: "ACTIVO"},
        { id: 6, nombre: "CCC", estado: "INACTIVO"},
        { id: 7, nombre: "CCC", estado: "ACTIVO"},
    ];

    const getSeverity = (profesor) => {
        switch (profesor.estado) {
            case 'ACTIVO':
                return 'success'; // Verde o estilo positivo
            case 'INACTIVO':
                return 'danger'; // Rojo o estilo negativo
            default:
                return null; // Sin estilo especial
        }
    };
    
    const statusBodyTemplate = (profesor) => {
        return (
            <Tag value={profesor.estado} severity={getSeverity(profesor)} />
        );
    };

    // Función para manejar el clic en el botón
    const handleClick = (profesor) => {
        alert(`Profesor: ${profesor.nombre} - Estado: ${profesor.estado}`);
    };



    return (
      <div className="flex flex-col h-screen contenedor">
      

        <div>
          <h1 className="text-2xl font-bold mt-4 mb-4">Listado profesores</h1>
          <div className="flex-1 overflow-y-auto">
            <DataTable
              value={profesores}
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
                body={(rowData) => (
                  <Button
                    icon="pi pi-check"
                    label="BOTON"
                    onClick={() => handleClick(rowData)}
                  />
                )}
              />
            </DataTable>
          </div>
        </div>
      </div>
    );
}

export default Tabla