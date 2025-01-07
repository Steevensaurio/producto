import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';


const RegistroEstudiante = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [cedula, setCedula] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [genero, setGenero] = useState('');
    const [representante, setRepresentante] = useState();
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    
    const [getRepresentante, setGetRepresentante] = useState([]);

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

    useEffect(()=>{
        const representantes = async () => {
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/v1/representante/listado/');
                setGetRepresentante(response.data)
            } catch (error){
                console.log(error);
            }
        }
        representantes();
    }, [])

    const perfil = 1
    const estado = "Activo"
    
    const handleRepresentanteChange = (e) => {
        setRepresentante(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validación de campos vacíos
        const fields = [
            fullName,
            email,
            password,
            password2,
            ciudad,
            fechaNacimiento,
            genero,
            representante,
        ];
        if (fields.some(field => field === undefined || (typeof field === 'string' && field.trim() === ''))) {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Por favor, complete todos los campos antes de registrar.',
            });
            return;
        }
    
        // Validación de la cédula ecuatoriana
        if (!validarCedulaEcuatoriana(cedula)) {
            Swal.fire({
                icon: 'error',
                title: 'Cédula inválida',
                text: 'Por favor, ingrese una cédula ecuatoriana válida.',
            });
            return;
        }
    
        // Validación de contraseñas
            if (!passwordsMatch) {
                Swal.fire({
                    icon: 'error',
                    title: 'Contraseñas no coinciden',
                    text: 'Por favor, asegúrese de que las contraseñas coincidan.',
                });
                return;
            }
        
            // Preparar datos para el envío
            const user = {
                full_name: fullName,
                email,
                password,
                password2,
                perfil,
                estado,
                genero,
            };
        
            const estudiante = {
                cedula,
                estado,
                fecha_nacimiento: fechaNacimiento,
                ciudad,
                representante,
            };
        
            // Enviar solicitud al backend
            axios.post('http://127.0.0.1:8000/api/v1/estudiante/registrar/', { user, estudiante })
                .then(response => {
                    Swal.fire({
                        title: "Éxito",
                        text: response.data.mensaje || "Estudiante registrado exitosamente.",
                        icon: "success",
                        confirmButtonText: "Aceptar",
                    });
        
                    // Limpiar los campos del formulario
                    setFullName('');
                    setEmail('');
                    setPassword('');
                    setPassword2('');
                    setCedula('');
                    setCiudad('');
                    setFechaNacimiento('');
                    setGenero('');
                    setRepresentante();
                })
                .catch(error => {
                    const mensajeError = error.response?.data?.detail || "Ocurrió un error desconocido. Intente nuevamente.";
                    Swal.fire({
                        icon: "error",
                        title: "¡Error!",
                        text: mensajeError,
                    });
                });
        };
    
    

    return(
        <div className="w-full mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Registrar Nuevo Estudiante
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
                                    placeholder="Nombre y Apellido"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Cedula</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        className={`text-xs custom-input w-full px-4 py-1 border rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            cedula && !validarCedulaEcuatoriana(cedula) ? 'border-red-500' : 'border-gray-300'
                                        }`}
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
                        </div>
                        <div className="flex space-x-4">
                            
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Fecha de Nacimiento</label>
                                <input 
                                    type="date" 
                                    className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={fechaNacimiento}
                                    onChange={(e) => setFechaNacimiento(e.target.value)}
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Lugar de Nacimiento</label>
                                <input 
                                    type="text" 
                                    className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={ciudad}
                                    onChange={(e) => setCiudad(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Genero</label>
                                <select 
                                    className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={genero}
                                    onChange={(e) => setGenero(e.target.value)}
                                    required
                                >
                                    <option value="" hidden>Seleccione el genero</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                </select>
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="block text-sm font-medium">Representante</label>
                                <select 
                                    className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onChange={handleRepresentanteChange}
                                    value={representante}
                                >
                                    <option value="" hidden>Seleccione el representante</option>
                                    {getRepresentante.map(padre => (
                                        <option key={padre.id} value={padre.id}>
                                            {padre.nombre}
                                        </option>
                                    ))}
                                </select>
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

export default RegistroEstudiante