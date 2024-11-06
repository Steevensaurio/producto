import Label from "../Atoms/Label"
import Input from "../Atoms/Input"
import Button from "../Atoms/Button"
import Imagen from "../Atoms/Imagen"
import imgLogo from "../../assets/imgLogin.svg"

const LoginForm = () => {

    const handleSubmit = async (e) =>{
        e.preventDefault();
        alert("hiciste click")
    }
    return(
        <form className="flex items-start space-x-0 items-center justify-center m-0" onSubmit={handleSubmit}>

            <Imagen className="w-1/2 max-w-full h-auto p-12 m-0" src={imgLogo} alt="tUTORIA IMG"/>
            
            <div className="flex flex-col space-y-4 w-1/3 p-2 ">
                <Label htmlFor="email" label="Correo Electrónico" className="text-3xl font-bold mb-4 text-center text-gray-900"/>
                <Input id="email" name="email" className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100" type="email" placeholder="Correo Electrónico"/>
                <Label htmlFor="password" label="Contraseña"/>
                <Input id="password" name="password" className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100" type="password" placeholder="Contraseña"/>
                <Button
                    type="submit"
                    className="flex justify-center gap-2 text-blue-800 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-blue-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden rounded-full group"
                    label="Iniciar Sesión"
                >
                </Button>

                
            </div>
        </form>
    )
}


export default LoginForm