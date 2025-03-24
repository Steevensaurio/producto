import { useState } from "react"
import Swal from "sweetalert2"

const Perfil = () => {

    const [formData, setFormData] = useState({
        full_name: "Steeven Administrador",
        email: "samaila@pucesd.edu.ec",
        username: "samaila",
        cedula: "",
        telefono: "",
        genero: "Masculino",
        fecha_nacimiento: "",
        perfil: 4,
      })
    
      const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
          ...formData,
          [name]: value,
        })
      }
    
      const handleSubmit = (e) => {
        e.preventDefault()
    
        // Mostrar confirmación con SweetAlert2
        Swal.fire({
          title: "¿Estás seguro?",
          text: "¿Deseas actualizar tu información de perfil?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#6366f1",
          cancelButtonColor: "#d1d5db",
          confirmButtonText: "Sí, actualizar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            // Aquí iría la lógica para actualizar el perfil
            // Por ahora solo mostramos un mensaje de éxito
            Swal.fire("¡Actualizado!", "Tu información de perfil ha sido actualizada correctamente.", "success")
          }
        })
      }
    
      const handleCancel = () => {
        // Restablecer los valores originales
        setFormData({
          full_name: "Steeven Administrador",
          email: "samaila@pucesd.edu.ec",
          username: "samaila",
          cedula: "",
          telefono: "",
          genero: "Masculino",
          fecha_nacimiento: "",
          perfil: 4,
        })
      }
    
    return(
        <div className="flex justify-center items-start w-full pt-10">
      <div className="w-full max-w-2xl bg-white p-8 rounded-md">
        <h2 className="text-xl font-semibold mb-8 text-center">Información de Perfil</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de Usuario
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="cedula" className="block text-sm font-medium text-gray-700 mb-2">
                Cédula
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                id="cedula"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                placeholder="Ingrese su número de cédula"
              />
            </div>

            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ingrese su número de teléfono"
              />
            </div>

            <div>
              <label htmlFor="genero" className="block text-sm font-medium text-gray-700 mb-2">
                Género
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                id="genero"
                name="genero"
                value={formData.genero}
                onChange={handleChange}
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div>
              <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                id="fecha_nacimiento"
                name="fecha_nacimiento"
                value={formData.fecha_nacimiento}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="perfil" className="block text-sm font-medium text-gray-700 mb-2">
                Perfil
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                id="perfil"
                name="perfil"
                value={formData.perfil}
                onChange={handleChange}
                min="1"
              />
            </div>
          </div>

          <div className="flex justify-start space-x-4 mt-8">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Perfil