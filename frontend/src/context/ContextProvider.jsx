import { createContext, useState } from "react";

export const ProviderContext = createContext()

export const ContextProvider = ({children}) =>{

    const [activeItem, setActiveItem] = useState("Inicio")
    const menuItems = [
        {
          name: "Inicio",
          icon: "M10 2.5L2 8.5V17a1 1 0 001 1h4a1 1 0 001-1v-4h4v4a1 1 0 001 1h4a1 1 0 001-1V8.5l-8-6z",
        },
        {
          name: "Historial",
          icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
        },
        {
          name: "Notificaciones",
          icon: "M12 4v16m8-16H8a2 2 0 00-2 2v12a2 2 0 002 2h12V6a2 2 0 00-2-2z",
        },
        {
          name: "Settings",
          icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
        },
      ];

    return(
        <ProviderContext.Provider value={{activeItem, setActiveItem, menuItems}}>
            {children}
        </ProviderContext.Provider>
    )

}
