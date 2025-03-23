import NavBar from "../Molecules/NavBar"
import ChangePassword from "../Organisms/ChangePassword"

const ChangePasswordPage = () => {
    return (
        <div className="flex flex-col h-screen">
            <NavBar />
            <div className="flex flex-1 overflow-hidden">
                <ChangePassword />
            </div>
        </div>
    )
}

export default ChangePasswordPage