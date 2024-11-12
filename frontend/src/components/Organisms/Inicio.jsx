import { useContext } from "react";
import { ProviderContext } from "../../context/ContextProvider";
import Button from "../Atoms/Button";
import reactlogo from "../../assets/react.svg";
import Imagen from "../Atoms/Imagen";

const Inicio = () => {
  const { peliculas, tutorias } = useContext(ProviderContext);

  return (
    <div className="flex h-full overflow-auto">
      <div className="flex-1 bg-white p-4">
        <h1 className="text-2xl font-bold mb-4">Contenido Principal</h1>
        <p>Este es el contenido principal en el lado izquierdo.</p>

        {tutorias.map((tutoria) => (
          <div
            key={tutoria.titulo}
            className="flex items-center justify-between min-w-[250px] bg-green-200 rounded-xl p-3 mb-2"
          >
            <div className="flex-shrink-0 mr-3">
              <Imagen
                src={reactlogo}
                alt={`Imagen de ${tutoria.titulo}`}
                className="min-h-[120px] min-w-[120px] rounded-lg object-cover p-2"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold ml-1">{tutoria.titulo}</h1>
              <p className="text-sm ml-1">{tutoria.materia}</p>
              <p className="text-sm ml-1">{tutoria.profesor}</p>
              <p className="text-sm ml-1">{tutoria.descripcion}</p>
            </div>
            <Button
              className="flex justify-end bg-purple-600 min-w-auto p-2 mr-1 rounded-xl hover:bg-white"
              label="Ingresar"
            />
          </div>
        ))}
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
