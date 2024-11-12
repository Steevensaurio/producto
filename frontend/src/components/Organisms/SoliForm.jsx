import { useState } from "react";
import Input from "../Atoms/Input";
import Label from "../Atoms/Label";

const SoliForm = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  return (
    <div className="flex w-1/2 h-full overflow-auto bg-purple-200 ">
      <form action="" className="flex items-start space-x-0 items-center justify-center m-0">
        <div className="flex flex-col p-2">
          <Label className="" htmlFor="titulo" label="titulo" />
          <Input
            id="titulo"
            name="titulo"
            className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            type="text"
            placeholder="Titulo"
            onChange={(e) => setTitulo(e.target.value)}
          />
          <Label className="" htmlFor="descripcion" label="descripcion" />
          <Input
            id="descripcion"
            name="descripcion"
            className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            type="text"
            placeholder="descripcion"
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <h1>{titulo}</h1>
          <h1>{descripcion}</h1>
        </div>
      </form>
    </div>
  );
};

export default SoliForm;
