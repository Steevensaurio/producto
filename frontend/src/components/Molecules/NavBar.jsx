import Button from "../Atoms/Button";

const NavBar = () => {
  return (
    <nav className="bg-yellow-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[56px]">
          <Button className="bg-red-600 hover:bg-white" label="cerrar sesión" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
