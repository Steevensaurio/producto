import NavMenu from "../Molecules/NavMenu"

const SideMenu = () => {
    return(
        <aside className="w-64 h-screen bg-white p-3 shadow-xl overflow-y-auto"> 

            <h1>Este es el side menu</h1>

            <NavMenu/>

        </aside>
    )
}

export default SideMenu