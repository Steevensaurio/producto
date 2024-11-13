import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";

import imglogo from "../assets/react.svg";
import imgn from "../assets/react.svg";
import LoadingIndicator from "./LoadingIndicator";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await login(email, password);
    if (error) {
      setIsLoading(false);
      alert(error);
    } else {
      navigate("/");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 flex bg-white rounded-3xl shadow-md overflow-hidden ">
        <div className="w-1/2 bg-white flex items-center justify-center p-12">
          <img src={imgn} alt="Imagen de fondo" className="max-w-full h-auto" />
        </div>
        <div className="w-1/2 p-12">
          <div className="mb-8">
            <img src={imglogo} alt="Logo" className="h-16 w-auto mx-auto" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">
              Iniciar sesion
            </h1>
            <div>
              <input
                id="email"
                name="email"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@ejemplo.com"
                required
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*************"
                required
              />
            </div>
            <div>
              <button
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-sky-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <LoadingIndicator /> : "Iniciar Sesión"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
