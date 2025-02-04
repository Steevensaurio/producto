import { useContext, useState, useEffect} from "react";
import Inicio from "../Organisms/Inicio";
import SideMenu from "../Organisms/SideMenu";
import RegistroEstudiante from "../Organisms/RegistroEstudiante";
import CrearTutoria from "../Organisms/CrearTutoria";
import CrearAsignatura from "../Organisms/CrearAsignatura";
import ListadoTutorias from "../Organisms/ListadoTutorias";
import RegistroRepresentante from "../Organisms/RegistroRepresentante";
import RegistroTutor from "../Organisms/RegistroTutor";
import Matriculas from "../Organisms/Matriculas";
import ListadoMatriculas from "../Organisms/ListadoMatriculas";
import CrearCurso from "../Organisms/CrearCurso";
import ListadoCurso from "../Organisms/ListadoCurso";
import ListadoEstudiantes from "../Organisms/ListadoEstudiantes";
import ListadoRepresentante from "../Organisms/ListadoRepresentante";
import ListadoTutores from "../Organisms/ListadoTutores";
import NavBar from "../Molecules/NavBar";
import { ProviderContext } from "../../context/ContextProvider";
import ListadoAsignaturas from "../Organisms/ListadoAsignaturas";
import Inscripciones from "../Organisms/Inscripciones";
import AsignarCargaHoraria from "../Organisms/AsignarCargaHoraria";


const Dashboard = () => {
  const {itemActive} = useContext(ProviderContext);
  
  const renderContent = () => {
    switch (itemActive) {
      case "Dashboard":
        return <Inicio />;

      //Modulo Matriculas
      case "matriculas1":
        return <Matriculas/>;
      case "matriculas2":
        return <ListadoMatriculas/>;

      //Modulo Tutores
      case "asignatura1":
        return <CrearAsignatura/>;
      case "asignatura2":
        return <ListadoAsignaturas/>

      //Modulo Tutores
      case "tutor1":
        return <RegistroTutor />;
      case "tutor2":
        return <ListadoTutores/>;
      case "tutor3":
        return <AsignarCargaHoraria/>;

      //Modulo Estudiantes
      case "student1":
        return <RegistroEstudiante />;
      case "student2":
        return <ListadoEstudiantes/>;
      case "student3":
        return <div>Estudiante modulo 3</div>;

      //Modulo Tutorías
      case "tutoria1":
        return <CrearTutoria/>
      case "tutoria2":
        return <ListadoTutorias/>
      case "tutoria3":
        return <Inscripciones/>
      
      //Modulo Representantes
      case "padre1":
        return <RegistroRepresentante />;
      case "padre2":
        return <ListadoRepresentante/>;
      case "padre3":
        return <div>representante 3</div>
      
      //Modulo de Cursos  
      case "curso1":
        return <CrearCurso/>
      case "curso2":
        return <ListadoCurso/>
      case "curso3":
        return <div>Configuracion 3</div>

      default:
        return <Inicio />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <SideMenu />
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
