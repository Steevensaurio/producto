import { useContext } from "react";
import { ProviderContext } from "../../context/ContextProvider";
import Button from "../Atoms/Button";

const NavMenu = () => {
  const { menuItems, activeItem, setActiveItem, soliActived, setSoliActive } =
    useContext(ProviderContext);
  return (
    <nav>
      {menuItems.map((item) => (
        <a
          key={item.name}
          href="#"
          className={`flex font-bold items-center mb-4 w-full p-2 rounded-lg transition-colors duration-200 ${
            activeItem === item.name
              ? "bg-blue-400 text-white"
              : "text-gray-800 hover:bg-blue-400 hover:text-white"
          }`}
          onClick={() => setActiveItem(item.name)}
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={item.icon}
            />
          </svg>
          <span>{item.name}</span>
          {activeItem === item.name && (
            <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
          )}
        </a>
      ))}
      <Button
        className={
          soliActived === true
            ? "w-full bg-red-600 mb-4 p-2 rounded-lg hover:bg-red-700"
            : "w-full text-white font-semibold bg-blue-600 mb-4 p-2 rounded-lg hover:bg-blue-700"
        }
        label={
          soliActived === true ? "Cancelar Solicitud" : "Solicitar Tutoria"
        }
        onClick={() =>
          soliActived === true ? setSoliActive(false) : setSoliActive(true)
        }
      />
    </nav>
  );
};

export default NavMenu;
