import { useContext} from "react";
import Inicio from "../Organisms/Inicio";
import SideMenu from "../Organisms/SideMenu";
import RegistroEstudiante from "../Organisms/RegistroEstudiante";
import CrearTutoria from "../Organisms/CrearTutoria";
import ListadoTutorias from "../Organisms/ListadoTutorias";
import RegistroRepresentante from "../Organisms/RegistroRepresentante";
import RegistroTutor from "../Organisms/RegistroTutor";
import Matriculas from "../Organisms/Matriculas";
import CrearCurso from "../Organisms/CrearCurso";
import ListadoCurso from "../Organisms/ListadoCurso";
import ListadoEstudiantes from "../Organisms/ListadoEstudiantes";
import ListadoRepresentante from "../Organisms/ListadoRepresentante";
import ListadoTutores from "../Organisms/ListadoTutores";
import NavBar from "../Molecules/NavBar";
import { ProviderContext } from "../../context/ContextProvider";

const Dashboard = () => {
  const {itemActive} = useContext(ProviderContext);
  
  const renderContent = () => {
    switch (itemActive) {
      case "Dashboard":
        return <Inicio />;

      case "Matriculas":
        return <Matriculas/>;

      //Modulo Tutores
      case "tutor1":
        return <RegistroTutor />;
      case "tutor2":
        return <ListadoTutores/>;
      case "tutor3":
        return <div>TUTOR 3</div>;

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
        return <div>Tutoria 3</div>
      
      //Modulo Representantes
      case "padre1":
        return <RegistroRepresentante />;
      case "padre2":
        return <ListadoRepresentante/>;
      case "padre3":
        return <div>representante 3</div>
      
      //Modulo de configuración  
      case "confi1":
        return <CrearCurso/>
      case "confi2":
        return <ListadoCurso/>
      case "confi3":
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
