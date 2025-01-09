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
        icon: "M11.022 6.787v13M11 19.5c-.222 0-.677-.242-1.585-.726c-.923-.492-2.198-.982-3.832-1.29c-1.834-.344-2.75-.516-3.167-1.025C2 15.949 2 15.135 2 13.504V7.097c0-1.783 0-2.675.649-3.224c.648-.549 1.41-.406 2.933-.12c3.008.566 4.8 1.749 5.418 2.428c.618-.679 2.41-1.862 5.418-2.427c1.523-.287 2.285-.43 2.933.119c.649.549.649 1.44.649 3.224V10m.864 2.94l.695.692a1.496 1.496 0 0 1 0 2.12l-3.642 3.696a2 2 0 0 1-1.051.552l-2.257.488a.5.5 0 0 1-.598-.593l.48-2.235c.075-.397.268-.762.555-1.047l3.688-3.674a1.51 1.51 0 0 1 2.13 0",
        options: [
          { id: "matriculas1", label: "Matricular Estudiante" },
          { id: "matriculas2", label: "Listado de Matriculas"},
        ],
      },
      {
        name: "Asignaturas",
        icon: "m5.684 13.143l6.842 3.463L22 11.66v2.793c0 .72-.415 1.381-1.083 1.73l-6.356 3.32a4.45 4.45 0 0 1-4.074.008l-5.712-2.953C3.063 15.672 2 13.98 2 12.145m0 0c0-2.042 2.286-3.37 4.228-2.457l6.298 2.96L22 7.701l-6.28-3.126a5.56 5.56 0 0 0-5.233.166L4.23 8.382C2.843 9.19 2 10.612 2 12.145",
        options: [
          { id: "asignatura1", label: "Crear Asignatura" },
          { id: "asignatura2", label: "Listado de Asignaturas"},
        ],
      },
      {
        name: "Tutores",
        icon: "M21 16H4.89c-.487 0-.849.172-1.133.451c-.469.46-.637 1.14-.711 1.792c-.086.755-.055 1.446.155 2.195c.236.835.82 1.562 1.685 1.562H21m-1.594 0c-1.539-1.412-2.17-3.858 0-6m-7.588-9.5C11.818 4 9.109 3 9.109 3m2.709 3.921S5.859 3.856 5.859 8.908C5.86 13.961 8.57 16 9.651 16c.862 0 1.37-1.009 2.167-1.009S12.9 16 13.984 16c1.08 0 3.792-2.04 3.792-7.092s-5.958-1.987-5.958-1.987M12.359 6c0-3.99 1.951-3 2.927-4c.975 2.5-.33 3.003-2.927 4",
        options: [
          { id: "tutor1", label: "Registrar tutor" },
          { id: "tutor2", label: "Listado de Tutores" },
          { id: "tutor3", label: "Carga Horaria" },
        ],
      },
      {
        name: "Estudiantes",
        icon: "m19 5l-7-3l-7 3l3.5 1.5v2S9.667 8 12 8s3.5.5 3.5.5v-2zm0 0v4m-3.5-.5v1a3.5 3.5 0 1 1-7 0v-1m-.717 8.203c-1.1.685-3.986 2.082-2.229 3.831C6.413 21.39 7.37 22 8.571 22h6.858c1.202 0 2.158-.611 3.017-1.466c1.757-1.749-1.128-3.146-2.229-3.83a7.99 7.99 0 0 0-8.434 0",
        options: [
          { id: "student1", label: "Registrar estudiante" },
          { id: "student2", label: "Listado de Estudiantes" },
        ],
      },
      {
        name: "Tutorías",
        icon: "m15.214 5.982l1.402-1.401a1.982 1.982 0 0 1 2.803 2.803l-1.401 1.402m-2.804-2.804L6.98 14.216c-1.045 1.046-1.568 1.568-1.924 2.205S4.342 18.561 4 20c1.438-.342 2.942-.7 3.579-1.056s1.16-.879 2.205-1.924l8.234-8.234m-2.804-2.804l2.804 2.804M11 20h6",
        options: [
          { id: "tutoria1", label: "Crear tutoría" },
          { id: "tutoria2", label: "Listado de Tutorías" },
          { id: "tutoria3", label: "Inscripciones" },
        ],
      },
      {
        name: "Representantes",
        icon: "M6.578 15.482c-1.415.842-5.125 2.562-2.865 4.715C4.816 21.248 6.045 22 7.59 22h8.818c1.546 0 2.775-.752 3.878-1.803c2.26-2.153-1.45-3.873-2.865-4.715a10.66 10.66 0 0 0-10.844 0M16.5 6.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0",
        options: [
          { id: "padre1", label: "Registrar representante" },
          { id: "padre2", label: "Listado  Representantes" },
        ],
      },
      {
        name: "Cursos",
        icon: "M3.789 9.037c-.708.383-2.562 1.165-1.433 2.143c.552.478 1.167.82 1.94.82h4.409c.772 0 1.387-.342 1.939-.82c1.13-.978-.725-1.76-1.433-2.143c-1.659-.898-3.763-.898-5.422 0M8.75 4.273A2.26 2.26 0 0 1 6.5 6.545a2.26 2.26 0 0 1-2.25-2.272A2.26 2.26 0 0 1 6.5 2a2.26 2.26 0 0 1 2.25 2.273M4 15c0 3.317 2.683 6 6 6l-.857-1.714M20 9c0-3.317-2.683-6-6-6l.857 1.714m-.068 14.323c-.708.383-2.562 1.165-1.433 2.143c.552.478 1.167.82 1.94.82h4.409c.772 0 1.387-.342 1.939-.82c1.13-.978-.725-1.76-1.433-2.143c-1.659-.898-3.763-.898-5.422 0m4.961-4.764a2.26 2.26 0 0 1-2.25 2.273a2.26 2.26 0 0 1-2.25-2.273A2.26 2.26 0 0 1 17.5 12a2.26 2.26 0 0 1 2.25 2.273",
        options: [
          { id: "curso1", label: "Crear curso" },
          { id: "curso2", label: "Listado de Cursos" },
          { id: "curso3", label: "Asignar Plan de Estudios" },

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
