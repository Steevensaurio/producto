import { useContext } from "react";
import Inicio from "../Organisms/Inicio";
import Historial from "../Organisms/Historial";
import SideMenu from "../Organisms/SideMenu";
import NavBar from "../Molecules/NavBar";
import SoliForm from "../Organisms/SoliForm";
import { ProviderContext } from "../../context/ContextProvider";

const Dashboard = () => {
  const { activeItem, soliActived } = useContext(ProviderContext);

  const renderContent = () => {
    switch (activeItem) {
      case "Inicio":
        return <Inicio />;
      case "Historial":
        return <Historial />;
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
          {soliActived === true ? <SoliForm /> : renderContent()}
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
