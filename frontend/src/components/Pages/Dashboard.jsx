import { useContext } from "react";
import Inicio from "../Organisms/Inicio";
import Historial from "../Organisms/Historial";
import SideMenu from "../Organisms/SideMenu";
import NavBar from "../Molecules/NavBar";
import { ProviderContext } from "../../context/ContextProvider";

const Dashboard = () => {
  const { activeItem } = useContext(ProviderContext);

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
        <div className="flex-1">{renderContent()}</div>
        <div className="w-1/4 overflow-y-auto bg-gray-50">
          <h1 className="text-2xl font-bold p-4">hiola</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
