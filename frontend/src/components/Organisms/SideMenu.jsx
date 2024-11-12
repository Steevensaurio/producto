import NavMenu from "../Molecules/NavMenu";

const SideMenu = () => {
  return (
    <aside className="w-[200px] h-screen bg-blue-100 p-3 shadow-3xl overflow-y-auto">
      <NavMenu />
    </aside>
  );
};

export default SideMenu;
