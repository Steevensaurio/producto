import NavMenu from "../Molecules/NavMenu";

const SideMenu = () => {
  return (
    <aside className="w-[250px] h-screen bg-blue-100 p-3 border-r-4 border-blue-200 border-opacity-50 shadow-3xl overflow-y-auto">
      <NavMenu />
    </aside>
  );
};

export default SideMenu;
