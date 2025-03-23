import { useContext} from "react";
import { ProviderContext } from "../../context/ContextProvider";

const NavMenu = () => {
  const {open, setOpen, itemActive,setItemActive, itemsMenu,} = useContext(ProviderContext);

  return (
    <nav className="space-y-1">
        {itemsMenu.map((item) => (
            <div key={item.name} className="w-full max-w-sm mx-auto">
                <button
                    className={`flex font-bold items-center justify-between w-full p-2 rounded-lg transition-all duration-300 ease-in-out ${
                        open[item.name]
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-200 text-blue-800'
                    } ${open[item.name] && item.options ? 'rounded-b-none' : ''} hover:bg-blue-400 hover:text-white`}
                    onClick={() => {
                        setOpen((prevState) => {
                            const isCurrentlyOpen = prevState[item.name];
                            return {
                                [item.name]: !isCurrentlyOpen,
                            };
                        });
                        if (!item.options) {
                            setItemActive(item.name);
                        }
                    }}
                    aria-expanded={open[item.name]}
                    aria-controls={`menu-items-${item.name}`}
                > 
                    <span className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5 h-5 mr-2"
                        >
                            <path d={item.icon} />
                        </svg>
                        {item.name}
                    </span>
                    {item.options && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor" 
                            className={`ml-2 h-5 w-5 transition-transform duration-300 ${
                                open[item.name] 
                                ? 'rotate-180' 
                                : 'rotate-0'
                            }`}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    )}
                </button>

                {item.options && (
                    <div
                        id={`menu-items-${item.name}`}
                        className={`bg-blue-200 w-full transition-all duration-300 ease-in-out ${
                            open[item.name]
                            ? 'max-h-[500px] opacity-100 transform scale-y-100' 
                            : 'max-h-0 opacity-0 transform scale-y-0'
                        } overflow-hidden rounded-b-lg origin-top`}
                    >
                        <div className="p-2 space-y-1">
                            {item.options.map((option) => (
                                <button
                                    key={option.id}
                                    className={`flex font-semibold items-center w-full p-2 rounded-lg transition-colors duration-200 ${
                                        itemActive === option.id
                                          ? 'bg-blue-700 text-white' // Color más azul para el submenú activo
                                          : 'bg-blue-400 text-white hover:bg-blue-500'
                                      }`}
                                    onClick={() => setItemActive(option.id)}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        ))}
    </nav>
  );
};

export default NavMenu;
