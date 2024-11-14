import { useContext } from "react";
import { ProviderContext } from "../../context/ContextProvider";

const Historial = () => {
  const { peliculas } = useContext(ProviderContext);

  return (
    <div className="flex-1 bg-white p-4">
      <h1 className="text-2xl font-bold mb-4">Historial</h1>
      <p>Este es el contenido principal en el lado izquierdo.</p>
      {peliculas.map((item) => (
        <div
          key={item.titulo}
          className="min-w-[250px] bg-purple-200 rounded-xl p-3 mb-2"
        >
          <h1 className="text-xl font-bold ml-1">{item.titulo}</h1>
          <p className="text-sm ml-1">{item.sinopsis}</p>
        </div>
      ))}
    </div>
  );
};

export default Historial;
