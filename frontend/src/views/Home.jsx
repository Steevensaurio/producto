import Button from "../components/Atoms/Button";
import Input from "../components/Atoms/Input";
import LoginForm from "../components/Organisms/LoginForm";

const Home = () => {
    return(
        <>
            {/* <Button 
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300" 
                label="Primer Boton"
            />
            <Button 
                className="border-2 border-gray-500 text-gray-700 font-medium py-2 px-4 rounded hover:shadow-lg hover:text-gray-900 transition duration-300" 
                label="Segundo Boton"
            />
            <Input 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email" 
                placeholder="Correo Electrónico"
            />
            <Input 
                className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:border-purple-500"
                type="password" 
                placeholder="Contraseña"
            /> */}
            <LoginForm/>

        </>
    )
}

export default Home