import { useEffect, useState } from "react";
import Cookie from "js-cookie"
import {jwtDecode} from 'jwt-decode'
import inicio from '../../assets/inicio.jpg'

const Inicio = () => {
 const [fullName, setFullName] =  useState("")

  useEffect(() => {
    const getUsername = async () => {
        const accessToken = Cookie.get("access_token");

        if (!accessToken) {
            console.error("No se encontró el token de acceso");
            return;
        }

        const user = jwtDecode(accessToken);
        const firstName = user.full_name.split(' ')[0];
        setFullName(firstName)
        
    };

    getUsername();
}, []);

  return (
    <div className="flex h-full overflow-auto">
      <div className="relative flex-1">
        <img src={inicio} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-white text-center shadow-lg">
            Bienvenido {fullName}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
