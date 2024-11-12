import Button from "../Atoms/Button";
import Input from "../Atoms/Input";
import tutologo from "../../assets/tutoeducalogo.png";

const NavBar = () => {
  return (
    <nav className="bg-blue-100 shadow-md">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-black text-gray-800 flex flex-col items-start justify-start py-1 ml-0 m-1">
          <span className="bg-yellow-300 border-4 border-yellow-400 h-9 px-4 w-28 rounded-t-lg transform rotate-3 flex items-center">
            Tuto
          </span>
          <span className="bg-blue-500 border-4 border-blue-600 h-9 text-white px-4 w-32 rounded-b-lg -mt-1 ml-6 transform -rotate-3 flex items-center">
            Educa
          </span>
        </h1>
        <div className="flex justify-end h-[56px] items-center">
          <div className="relative">
            <Input
              placeholder="Search..."
              type="search"
              className="input shadow-lg border-2 border-black px-5 p-2 mr-3 rounded-xl w-56 transition-all focus:w-[500px] outline-none focus:border-black"
            />
            <svg
              className="w-5 h-5 absolute top-2.5 right-5 text-gray-500"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
          </div>

          <Button className="bg-sky-600 min-w-auto p-2 mr-3 rounded-xl hover:bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Button>
          <Button className="bg-sky-600 min-w-auto p-2 mr-1 rounded-xl hover:bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
