import { useContext, useState } from "react";
import { ProviderContext } from "../../context/ContextProvider";

const NavMenu = () => {
  const { menuItems, activeItem, setActiveItem, subItem, setSubItem} = useContext(ProviderContext);

  const handleClick = (item) => {
    setActiveItem(activeItem === item ? null : item);
  };

  

  return (
    <nav>

      {menuItems.map((item) => (
        <div className="w-full max-w-sm mx-auto mb-2" key={item.name}>
          <button
            href="#"
            className={`flex font-bold items-center  w-full p-2 rounded-lg transition-all duration-300 ease-in-out ${
              activeItem === item.name
                ? 'bg-blue-600 text-white rounded-t-lg rounded-b-none'
                : 'bg-blue-200 text-blue-800 rounded-lg'
            } hover:bg-blue-400 hover:text-white`}

            onClick={(e) => {
              e.preventDefault();
              handleClick(item.name)
            }}
          >
            <svg
              className="w-6 h-6 mr-2"
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
              {item.name === "Configuración" ? <circle cx="12" cy="12" r="3" /> : null}
            </svg>
            <span>{item.name}</span>
            
            {activeItem === item.name && (
              <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
            )}
          </button>

          {activeItem === item.name && (
            <div
              id="menu-items"
              className={`bg-blue-200 transition-all duration-300 ease-in-out p-2 ${
                activeItem === item.name 
                ? 'max-h-96 opacity-100 transform scale-y-100' 
                : 'max-h-0 opacity-0 transform scale-y-0'
              } overflow-hidden rounded-b-lg mb-1 origin-top transform`}
            >
              {(item.options).map((option) =>(
                <button
                  href="#"
                  key={option.id}
                  className="flex font-semibold items-center mt-1 mb-1 w-full p-2 rounded-lg transition-colors duration-200 bg-blue-400 text-white hover:bg-blue-500"
                  onClick={(e) => {
                    e.preventDefault();
                    setSubItem(option.id) 
                  }}
                >
                  
                  {option.label}
                </button>
              ))}
            </div>
          )}
          
        </div>
      ))}
    </nav>
  );
};

export default NavMenu;
