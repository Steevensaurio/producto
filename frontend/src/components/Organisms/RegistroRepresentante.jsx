import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const RegistroRepresentante = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [cedula, setCedula] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [genero, setGenero] = useState('');
    const [telefono, setTelefono] = useState('');
    const [parentesco, setParentesco] = useState('');

    const [passwordsMatch, setPasswordsMatch] = useState(false);

    const perfil = 3
    const estado = "Activo"

    const validarCedulaEcuatoriana = (cedula) => {
        if (!/^\d{10}$/.test(cedula)) return false;

        const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        const verificador = parseInt(cedula.charAt(9));

        let suma = 0;
        for (let i = 0; i < 9; i++) {
            let valor = parseInt(cedula.charAt(i)) * coeficientes[i];
            suma += valor > 9 ? valor - 9 : valor;
        }

        const digitoVerificador = suma % 10 ? 10 - (suma % 10) : 0;

        return digitoVerificador === verificador;
    };
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const fields = [
            fullName,
            email,
            password,
            password2,
            cedula,
            ciudad,
            genero,
            telefono,
            parentesco,
        ];
        if (fields.some(field => field.trim() === '')) {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Por favor, complete todos los campos antes de registrar.',
            });
            return;
        }

        if (!validarCedulaEcuatoriana(cedula)) {
            Swal.fire({
              icon: 'error',
              title: 'Cédula inválida',
              text: 'Por favor, ingrese una cédula ecuatoriana válida.',
            });
            return;
        }

        if (!passwordsMatch) {
            Swal.fire({
                icon: 'error',
                title: 'Contraseñas no coinciden',
                text: 'Por favor, asegúrese de que las contraseñas coincidan.',
            });
            return;
        }

        const user = {
            full_name: fullName,
            email,
            password,
            password2,
            perfil,
            estado,
            genero,
        };

        const representante = {
            parentesco,
            cedula,
            estado,
            ciudad,
            telefono,
        }
    
        axios.post('http://127.0.0.1:8000/api/v1/representante/registrar/', {user, representante})
          .then(response => {
            console.log('Usuario creado:', response.data);
            
            setFullName('')
            setEmail('')
            setPassword('')
            setPassword2('')
            setCedula('')
            setCiudad('')
            setGenero('')
            setTelefono('')
            setParentesco('')

            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Representante registrado exitosamente.',
            });
            
          })
          .catch(error => {
            console.error('Error:', error);
            alert(error.response.data)
          });
    };
    

    return(
        <div className="w-full mx-auto p-6">
            <h1 className="text-2xl md:text-2xl font-bold text-gray-800 m-3">
                Registrar nuevo representante
            </h1>
            <div className="flex">
                <div className="bg-white shadow-md rounded-lg p-6 mb-1 flex-grow mr-6">
                    <form  className="space-y-6">
                        <div className="flex space-x-4">
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Nombre Completo</label>
                                <input 
                                    type="text" 
                                    className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Ingrese nombre completo"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Parentesco</label>
                                <input 
                                    type="text" 
                                    className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="(Padre, Madre, etc.)"
                                    value={parentesco}
                                    onChange={(e) => setParentesco(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Cedula</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        className={`text-sm custom-input w-full px-4 py-1 border rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            cedula && !validarCedulaEcuatoriana(cedula) ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Ingrese el número de cédula"
                                        value={cedula}
                                        maxLength={10}
                                        onChange={(e) => {
                                            const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                            setCedula(onlyNums);
                                        }}
                                    />
                                    {cedula && validarCedulaEcuatoriana(cedula) && (
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    )}
                                </div>
                                {cedula && !validarCedulaEcuatoriana(cedula) && (
                                    <p className="text-red-500 text-xs mt-1">Cédula inválida</p>
                                )}
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Genero</label>
                                <select 
                                    className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={genero}
                                    onChange={(e) => setGenero(e.target.value)}
                                    required
                                >
                                    <option value="" hidden>Seleccione una jornada</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Ciudad</label>
                                <input 
                                    type="text" 
                                    className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={ciudad}
                                    placeholder="Ingrese la ciudad natal"
                                    onChange={(e) => setCiudad(e.target.value)}
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Telefono / Celular</label>
                                <input 
                                    type="text" 
                                    className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={telefono}
                                    placeholder="Ingrese el numero de telefono"
                                    maxLength={10}
                                    onChange={(e) =>{
                                        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                        setTelefono(onlyNums);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Correo Electronico</label>
                            <input 
                                type="email" 
                                className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Correo Electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Contraseña</label>
                                <div className="relative">
                                    <input 
                                        type="password" 
                                        className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Contraseña"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setPasswordsMatch(e.target.value === password2);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Confirmar Contraseña</label>
                                <div className="relative">
                                    <input 
                                        type="password" 
                                        className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Confirmar Contraseña"
                                        value={password2}
                                        onChange={(e) => {
                                            setPassword2(e.target.value);
                                            setPasswordsMatch(password === e.target.value);
                                        }}
                                    />
                                    {password && password2 && (
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            {passwordsMatch ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col space-y-4 w-[250px]">
                    <button 
                        type="submit"
                        className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
                            border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                            active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Registrar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RegistroRepresentante