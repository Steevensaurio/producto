import { useEffect, useState } from "react";
import Cookie from "js-cookie"
import {jwtDecode} from 'jwt-decode'
import inicio from '../../assets/inicio.jpg'

const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

const Inicio = () => {
  
  const [fullName, setFullName] =  useState("")

  useEffect(() => {

    const getUsername = () => {
        const accessToken = Cookie.get("access_token");

        if (!accessToken) {
            console.error("No se encontró el token de acceso");
            return;
        }

        const user = decodeToken(accessToken);
        if(user?.full_name){
          const [firstName] = user.full_name.split(" ");
          setFullName(firstName);
        }else{
          console.warn("full_name no se encontró en el token")
        }
    };

    getUsername();
}, []);

  return (
    <div className="flex h-full overflow-auto">
      <div className="relative flex-1">
        <img src={inicio} alt="Imagen de inicio" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-white text-center shadow-lg">
            {fullName ? `Bienvenido ${fullName}` : "Bienvenido"}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
