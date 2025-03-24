import NavBar from "../Molecules/NavBar"
import Perfil from "../Organisms/Perfil"

const MiPerfil = () => {
    return (
        <div className="flex flex-col h-screen">
            <NavBar />
            <div className="flex flex-1 overflow-hidden">
                <Perfil/>
            </div>
        </div>
    )
}

export default MiPerfil