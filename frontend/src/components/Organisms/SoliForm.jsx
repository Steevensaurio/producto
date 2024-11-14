import { useState, useContext, useEffect } from "react";
import { ProviderContext } from "../../context/ContextProvider";
import Cookie from "js-cookie";
import Input from "../Atoms/Input";
import Label from "../Atoms/Label";
import Button from "../Atoms/Button";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const SoliForm = () => {
  const { peliculas, setSoliActive, cargarTutorias } =
    useContext(ProviderContext);

  const [formData, setFormData] = useState({
    tema: "",
    descripcion: "",
    curso: "",
    modalidad: "",
    seccion: "",
    fecha: "",
    comentario: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = Cookie.get("access_token");

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/user/solicitud/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 201) {
        setFormData({
          nombre: "",
          correo: "",
          asunto: "",
          mensaje: "",
        });
      }
      setSoliActive(false);
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      alert("Hubo un problema al enviar la solicitud");
    }
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
              htmlFor="tema"
              label="Tema"
            />
            <Input
              id="tema"
              name="tema"
              className="text-sm custom-input w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
              type="text"
              placeholder="Ingrese el tema de la tutoría"
              value={formData.nombre}
              onChange={handleChange}
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
              ovalue={formData.descripcion}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label
                className="text-xl font-bold ml-3 mb-1 text-gray-900"
                htmlFor="curso"
                label="Curso"
              />
              <select
                name="curso"
                id="curso"
                className="text-sm custom-input w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                value={formData.curso}
                onChange={handleChange}
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
                htmlFor="modalidad"
                label="Modalidad"
              />
              <select
                name="modalidad"
                id="modalidad"
                className="text-sm custom-input w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                value={formData.modalidad}
                onChange={handleChange}
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
                htmlFor="seccion"
                label="Sección"
              />
              <select
                name="seccion"
                id="seccion"
                className="text-sm custom-input w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                value={formData.seccion}
                onChange={handleChange}
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
                htmlFor="fecha"
                label="Fecha"
              />
              <Input
                id="fecha"
                name="fecha"
                type="date"
                className="text-sm custom-input w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                value={formData.fecha}
                onChange={handleChange}
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
              value={formData.comentario}
              onChange={handleChange}
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

          {cargarTutorias.map((item) => (
            <div
              key={item.id}
              className="min-w-[250px] bg-green-200 rounded-xl p-3 mb-2"
            >
              <h1 className="text-xl font-bold ml-1">{item.tema}</h1>
              <p className="text-sm ml-1">{item.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SoliForm;
