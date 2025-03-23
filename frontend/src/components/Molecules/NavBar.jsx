import { Link } from "react-router-dom";
import UserMenu from "./userMenu";

const NavBar = () => {
  return (
    <nav className="bg-blue-200 shadow-md">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-black text-gray-800 flex flex-col items-start justify-start py-1 ml-0 m-1">
            <span className="bg-yellow-300 border-4 border-yellow-400 h-9 px-4 w-28 rounded-t-lg transform rotate-3 flex items-center">
              Tuto
            </span>
            <span className="bg-blue-500 border-4 border-blue-600 h-9 text-white px-4 w-32 rounded-b-lg -mt-1 ml-6 transform -rotate-3 flex items-center">
              Educa
            </span>
          </h1>
        </Link>
        <UserMenu />
      </div>
    </nav>
  );
};

export default NavBar;
