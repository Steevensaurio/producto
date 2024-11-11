import { useState } from "react";
import Input from "../Atoms/Input";
import Label from "../Atoms/Label";

const SoliForm = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  return (
    <form action="">
      <Label className="" htmlFor="titulo" label="titulo" />
      <Input
        id="titulo"
        name="titulo"
        className=""
        type="text"
        placeholder="Titulo"
        onChange={(e) => setTitulo(e.target.value)}
      />
      <Label className="" htmlFor="descripcion" label="descripcion" />
      <Input
        id="descripcion"
        name="descripcion"
        className=""
        type="text"
        placeholder="descripcion"
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <h1>{titulo}</h1>
      <h1>{descripcion}</h1>
    </form>
  );
};

export default SoliForm;
