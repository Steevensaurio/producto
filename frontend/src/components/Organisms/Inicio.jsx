import { useContext } from "react";
import { ProviderContext } from "../../context/ContextProvider";

const Inicio = () => {

  const {peliculas} = useContext(ProviderContext)

  return (
    <div className="flex h-full overflow-auto">
      <div className="flex-1 bg-blue-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Contenido Principal</h1>
        <p>Este es el contenido principal en el lado izquierdo.</p>
        {peliculas.map((item)=>(
            <div key={item.titulo} className="min-w-[250px] bg-green-200 rounded-xl p-3 mb-2">
              <h1 className="text-xl font-bold ml-1">{item.titulo}</h1>
              <p className="text-sm ml-1">{item.sinopsis}</p>
            </div>
          ))}
      </div>
      <div className="w-1/4 min-w-[250px] bg-gray-50 p-4">
        <h1 className="text-2xl font-bold mb-4">Panel Lateral</h1>
        <p>Este es el contenido del panel lateral en el lado derecho.</p>
        

          {peliculas.map((item)=>(
            <div key={item.titulo} className="min-w-[250px] bg-green-200 rounded-xl p-3 mb-2">
              <h1 className="text-xl font-bold ml-1">{item.titulo}</h1>
              <p className="text-sm ml-1">{item.sinopsis}</p>
            </div>
          ))}
          
      </div>
    </div>
  );
};

export default Inicio;
