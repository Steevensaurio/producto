import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import validarCedulaEcuatoriana from "../../utils/validarCedula";
import { API_BASE_URL } from "../../utils/constants";
import BtnForm from "../Atoms/BtnForm";


const RegistroEstudiante = () => {
    
    // CAMPOS USUARIO //
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const estado = "Activo"
    const [cedula, setCedula] = useState('');
    const [genero, setGenero] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [telefono, setTelefono] = useState('');
    const perfil = 1

    //CAMPOS ESTUDIANTE //
    const estadoAcademico = "Activo"
    const [observaciones, setObservaciones]  = useState('');
    const [representante, setRepresentante] = useState();
    
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [getRepresentante, setGetRepresentante] = useState([]);

    useEffect(()=>{
        const representantes = async () => {
            try{
                const response = await axios.get(`${API_BASE_URL}representante/listado/`);
                setGetRepresentante(response.data)
                
                
            } catch (error){
                console.log(error);
            }
        }
        representantes();
        
    }, [])

    
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
            cedula,
            genero,
            fechaNacimiento,
            telefono,
            estadoAcademico,
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
                estado,
                cedula,
                genero,
                fecha_nacimiento: fechaNacimiento,
                telefono,
                id_perfil_FK: perfil,
            };
        
            const estudiante = {
                estado_academico: estadoAcademico,
                observaciones,
                representante
            };

            console.log({ user, estudiante });
            
        
            // Enviar solicitud al backend
            axios.post(`${API_BASE_URL}estudiante/registrar/`, { user, estudiante })
                .then(response => {

                    console.log('Usuario creado:', response.data);

                    Swal.fire({
                        icon: 'success',
                        title: 'Registro exitoso',
                        text: 'Estudiante registrado exitosamente.',
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
                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error en el registro',
                        text: 'Ocurrió un error al registrar al estudiante.',
                    });
                });
        };
    
    

    return(
        <div className="w-full mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Registrar Nuevo Estudiante
            </h1>
            <div className="flex">
                <div className="bg-white border border-gray-300 shadow-md rounded-lg p-6 mb-1 flex-grow mr-6">
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
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Cedula</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        className={`text-sm custom-input w-full px-4 py-1 border rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
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
                            <div className="space-y-2">
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
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Fecha de Nacimiento</label>
                                <input 
                                    type="date" 
                                    className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={fechaNacimiento}
                                    onChange={(e) => setFechaNacimiento(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Telefono</label>
                                <input 
                                    type="text" 
                                    className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={telefono}
                                    placeholder="09XXXXXXXX"
                                    maxLength={10}
                                    onChange={(e) =>{
                                        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                        setTelefono(onlyNums);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            
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
                                            {padre.id_user_FK.full_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex-1 space-y-2">
                            <label className="block text-sm font-medium">Observaciones</label>
                            <input 
                                type="text" 
                                className="text-sm custom-input w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={observaciones}
                                placeholder="Ingrese las observaciones"
                                onChange={(e) => setObservaciones(e.target.value)}
                            />
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
                        <BtnForm label="Registrar estudiante" onClick={handleSubmit} />
                    </form>
                </div>
            </div>
            
            
        </div>
    )
}

export default RegistroEstudiante