import { useState, useRef, useEffect, useContext} from "react"
import { ChevronDown, User, Lock, LogOut } from "lucide-react"
import { Link } from "react-router-dom";
import { logout } from "../../utils/auth";
import Cookie from "js-cookie"
import {jwtDecode} from 'jwt-decode'

const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)
    const [fullName, setFullName] = useState("")
    

    useEffect(() => {

        function getUsername(){
            const accessToken = Cookie.get("access_token");
            
            if (!accessToken) {
                console.error("No se encontró el token de acceso");
                return;
            }
    
            const user = decodeToken(accessToken);
            if(user?.full_name){
                setFullName(user.full_name);
            }else{
                console.warn("full_name no se encontró en el token")
            }
        }
        getUsername();

        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
    
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }


    }, [])

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-4 py-2 text-left bg-blue-200 border border-blue-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
            >
                <span className="font-medium uppercase">{fullName}</span>
                <span className={`ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                    {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </span>
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {/* <Link
                            to="/perfil"
                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                                console.log("My Account clicked")
                                setIsOpen(false)
                            }}
                        >
                            <User className="mr-2 h-4 w-4" />
                            Mi cuenta
                        </Link>
                        <Link
                            to="/cambiar-contrasenia"
                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                                console.log("Change Password clicked")
                                setIsOpen(false)
                            }}
                        >
                            <Lock className="mr-2 h-4 w-4" />
                            Cambiar contraseña
                        </Link> */}
                        <Link
                            to="/login"
                            className="flex w-full items-center px-4 py-2 text-sm text-red-500 font-semibold hover:bg-gray-100"
                            onClick={() => {
                                logout()
                                setIsOpen(false)
                            }}
                        >
                            <LogOut className="mr-2 h-4 w-4 font-bold" />
                            Cerrar sesión    
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu