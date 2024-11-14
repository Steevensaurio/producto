import { useContext, useEffect, useState } from "react";
import Inicio from "../Organisms/Inicio";
import Historial from "../Organisms/Historial";
import SideMenu from "../Organisms/SideMenu";
import NavBar from "../Molecules/NavBar";
import SoliForm from "../Organisms/SoliForm";
import { ProviderContext } from "../../context/ContextProvider";
import Cookie from "js-cookie";
import axios from "axios";

const Dashboard = () => {
  const { activeItem, soliActived, cargarTutorias, setCargarTutorias } =
    useContext(ProviderContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutorias = async () => {
      const accessToken = Cookie.get("access_token");

      if (!accessToken) {
        console.log("No se encontró el token de acceso.");
        return;
      }

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/tutorias/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("Datos recibidos:", response.data);
        setCargarTutorias(response.data);

        setLoading(false);
      } catch (error) {
        console.error("Error al obtener tutorías:", error);
        setLoading(false);
      }
    };

    fetchTutorias();
  });

  if (loading) {
    return <div>Cargando tutorías...</div>;
  }

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
