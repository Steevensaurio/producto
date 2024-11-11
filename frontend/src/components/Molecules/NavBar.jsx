import Button from "../Atoms/Button";

const NavBar = () => {
  return (
    <nav className="bg-yellow-500 shadow-md">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end h-[56px] items-center">
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
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
