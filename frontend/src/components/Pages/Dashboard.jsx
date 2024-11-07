import { useContext } from "react";
import Inicio from "../Organisms/Inicio"
import Historial from "../Organisms/Historial";
import SideMenu from "../Organisms/SideMenu"
import { ProviderContext } from "../../context/ContextProvider";

const Dashboard = () => {

    const {activeItem} = useContext(ProviderContext)

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

    return(
        <div className="flex h-screen bg-gray-100">
            <SideMenu />
            <div className="flex-1 overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    )
}

export default Dashboard