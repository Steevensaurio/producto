import { useContext, useEffect, useState } from "react";
import Inicio from "../Organisms/Inicio";
import Historial from "../Organisms/Historial";
import SideMenu from "../Organisms/SideMenu";
import NavBar from "../Molecules/NavBar";
import { ProviderContext } from "../../context/ContextProvider";


const Dashboard = () => {
  const { activeItem, subItem } = useContext(ProviderContext);

  const renderContent = () => {
    switch (activeItem) {
      case "Dashboard":
        return <Inicio />;
      case "Tutores":
        switch(subItem){
          case "tutor1":
            return <Historial />;
        }
        
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
