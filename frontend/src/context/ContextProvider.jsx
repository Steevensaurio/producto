import { createContext, useState } from "react";

export const ProviderContext = createContext();

export const ContextProvider = ({ children }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [subItem, setSubItem] = useState("");
  const [soliActived, setSoliActive] = useState(false);
  //vALIDOS
  const [open, setOpen] = useState({})
  const [itemActive, setItemActive] = useState("")
  const itemsMenu = [
      {
        name: "Dashboard",
        icon: "M10 2.5L2 8.5V17a1 1 0 001 1h4a1 1 0 001-1v-4h4v4a1 1 0 001 1h4a1 1 0 001-1V8.5l-8-6z",
      },
      {
        name: "Matriculas",
        icon: "M12 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zM6 18.5v-1.75c0-1.25.75-2.34 1.88-2.84a9.964 9.964 0 0 1 8.24 0A2.987 2.987 0 0 1 18 16.75v1.75M3 21h18M12 12v6",
      },
      {
        name: "Asignaturas",
        icon: "M12 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zM6 18.5v-1.75c0-1.25.75-2.34 1.88-2.84a9.964 9.964 0 0 1 8.24 0A2.987 2.987 0 0 1 18 16.75v1.75M3 21h18M12 12v6",
      },
      {
        name: "Tutores",
        icon: "M12 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zM6 18.5v-1.75c0-1.25.75-2.34 1.88-2.84a9.964 9.964 0 0 1 8.24 0A2.987 2.987 0 0 1 18 16.75v1.75M3 21h18M12 12v6",
        options: [
          { id: "tutor1", label: "Registrar tutor" },
          { id: "tutor2", label: "Listado" },
        ],
      },
      {
        name: "Estudiantes",
        icon: "M9 2h6a2 2 0 0 1 2 2v2H7V4a2 2 0 0 1 2-2zM6 8h12v10a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V8zM8 13h8M8 17h8M10 5v4M14 5v4",
        options: [
          { id: "student1", label: "Registrar estudiante" },
          { id: "student2", label: "Listado" },
        ],
      },
      {
        name: "Tutorías",
        icon: "M12 4v16m8-16H8a2 2 0 00-2 2v12a2 2 0 002 2h12V6a2 2 0 00-2-2z",
        options: [
          { id: "tutoria1", label: "Asignar tutoría" },
          { id: "tutoria2", label: "Listado de tutorías" },
        ],
      },
      {
        name: "Representantes",
        icon: "M12 2c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zM10 9c0-1.1-.9-2-2-2s-2 .9-2 2v8H6v2h4v2h4v-2h4v-2h-2v-8c0-1.1-.9-2-2-2s-2 .9-2 2v8h-4v-8z",
        options: [
          { id: "padre1", label: "Registrar representante" },
          { id: "padre2", label: "Listado" },
        ],
      },
      {
        name: "Cursos",
        icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
        options: [
          { id: "confi1", label: "Crear curso" },
          { id: "confi2", label: "Listado de cursos" },
        ],
      },
  ];

  return (
    <ProviderContext.Provider
      value={{
        activeItem,
        setActiveItem,
        
        
        soliActived,
        setSoliActive,
        subItem,
        setSubItem,
        //Validos
        open, 
        setOpen,
        itemActive, 
        setItemActive,
        itemsMenu,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};
