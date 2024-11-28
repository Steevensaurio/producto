import { useContext, useEffect, useState } from "react";
import Cookie from "js-cookie"
import {jwtDecode} from 'jwt-decode'
import { ProviderContext } from "../../context/ContextProvider";

const Inicio = () => {
  const { peliculas, subItem} = useContext(ProviderContext);
 const [fullName, setFullName] =  useState("")

  useEffect(() => {
    const fetchTutorias = async () => {
        const accessToken = Cookie.get("access_token");

        if (!accessToken) {
            console.error("No se encontró el token de acceso");
            return;
        }

        const user = jwtDecode(accessToken);
        setFullName(user.full_name)
        
    };

    fetchTutorias();
}, []);

  return (
    <div className="flex h-full overflow-auto">
      <div className="flex-1 bg-white p-4">
        <h1 className="text-2xl font-bold mb-4">Bienvenido {fullName} </h1>

        <h1>{subItem}</h1>

      </div>
      <div className="w-1/4 min-w-[250px] bg-gray-50 p-4">
        <h1 className="text-2xl font-bold mb-4">Panel Lateral</h1>
        <p>Este es el contenido del panel lateral en el lado derecho.</p>

        {peliculas.map((item) => (
          <div
            key={item.titulo}
            className="min-w-[250px] bg-green-200 rounded-xl p-3 mb-2"
          >
            <h1 className="text-xl font-bold ml-1">{item.titulo}</h1>
            <p className="text-sm ml-1">{item.sinopsis}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inicio;
