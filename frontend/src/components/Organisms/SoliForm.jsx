import { useState, useContext } from "react";
import { ProviderContext } from "../../context/ContextProvider";
import Input from "../Atoms/Input";
import Label from "../Atoms/Label";
import Button from "../Atoms/Button";

const SoliForm = () => {
  const { peliculas } = useContext(ProviderContext);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [curso, setCurso] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [seccion, setSeccion] = useState("");
  const [fecha, setFecha] = useState("");
  const [comentario, setComentario] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("hiciste click");
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-purple-200 overflow-hidden">
      <div className="w-full md:w-1/2 flex flex-col h-full ">
        <div className="flex items-center bg-yellow-200 h-14 shrink-0">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 m-3">
            Nueva Solicitud de Tutoría
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-4 space-y-4 h-screen overflow-y-auto flex-grow"
        >
          <div className="space-y-2">
            <Label
              className="text-2xl font-bold ml-3 mb-1 text-gray-900"
              htmlFor="titulo"
              label="Tema"
            />
            <Input
              id="titulo"
              name="titulo"
              className="text-sm custom-input w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
              type="text"
              placeholder="Ingrese el tema de la tutoría"
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label
              className="text-xl font-bold ml-3 mb-1 text-gray-900"
              htmlFor="descripcion"
              label="Descripcion"
            />
            <Input
              id="descripcion"
              name="descripcion"
              className="text-sm custom-input w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
              type="text"
              placeholder="descripcion"
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label
                className="text-xl font-bold ml-3 mb-1 text-gray-900"
                htmlFor="descripcion"
                label="Curso"
              />
              <select
                name=""
                id=""
                className="text-sm custom-input w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
              >
                <option value="" className="text-gray-400" disabled selected>
                  Selecciona una opción
                </option>
                <option value="octavo">Octavo</option>
                <option value="noveno">Noveno</option>
                <option value="decimo">Decimo</option>
                <option value="primero">Primero BGU</option>
                <option value="segundo">Segundo BGU</option>
                <option value="tercero">Tercero BGU</option>
              </select>
            </div>
            <div className="flex-1 space-y-2">
              <Label
                className="text-xl font-bold ml-3 mb-1 text-gray-900"
                htmlFor="descripcion"
                label="Modalidad"
              />
              <select
                name=""
                id=""
                className="text-sm custom-input w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
              >
                <option value="" className="text-gray-400" disabled selected>
                  Selecciona una opción
                </option>
                <option value="Presencial">Presencial</option>
                <option value="Virtual">Virtual</option>
              </select>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label
                className="text-xl font-bold ml-3 mb-1 text-gray-900"
                htmlFor="descripcion"
                label="Sección"
              />
              <select
                name=""
                id=""
                className="text-sm custom-input w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
              >
                <option value="" className="text-gray-400" disabled selected>
                  Selecciona una opción
                </option>
                <option value="matutina">Matutina</option>
                <option value="vespertina">Vespertina</option>
              </select>
            </div>
            <div className="flex-1 space-y-2">
              <Label
                className="text-xl font-bold ml-3 mb-1 text-gray-900"
                htmlFor="descripcion"
                label="Fecha"
              />
              <Input
                type="date"
                className="text-sm custom-input w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              className="text-xl font-bold ml-3 mb-1 text-gray-900"
              htmlFor="comentario"
              label="Comentario"
            />

            <textarea
              name="comentario"
              id="comentario"
              className="text-sm custom-input w-full h-[120px] px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="text-gray-800 rounded-2xl w-full items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-green-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden rounded-full group"
              label="Enviar Solicitud"
            />
          </div>
        </form>
      </div>
      <div className="w-full md:w-1/2 bg-gray-50 p-4 overflow-y-auto h-full">
        <div className="w-full min-w-[250px] bg-gray-50 p-4">
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
    </div>
  );
};

export default SoliForm;
