"use client"

import { useState } from "react"
import Swal from "sweetalert2"
import {Link} from "react-router-dom"

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleConfirm = () => {
    // Validación básica
    if (!currentPassword || !newPassword || !confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos son obligatorios",
      })
      return
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas nuevas no coinciden",
      })
      return
    }

    // Mostrar confirmación con SweetAlert2
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas cambiar tu contraseña?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6366f1", // Color morado similar al de la imagen
      cancelButtonColor: "#d1d5db",
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí iría la lógica para cambiar la contraseña
        // Por ahora solo mostramos un mensaje de éxito
        Swal.fire("¡Cambiada!", "Tu contraseña ha sido actualizada correctamente.", "success")

        // Limpiar formulario
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      }
    })
  }

  const handleCancel = () => {
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")

  }

  return (
    <div className="flex justify-center items-start w-full pt-10">
      <div className="w-full max-w-xl bg-white p-8 rounded-md">
        <h2 className="text-xl font-semibold mb-8 text-center">Cambiar Contraseña</h2>

        <div className="space-y-6">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña Actual
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Nueva Contraseña
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar Nueva Contraseña
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-start space-x-4 mt-8">
            <Link
                to="/"
                className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                onClick={handleCancel}
            >
              Cancelar
            </Link>
            <button
              className="px-4 py-2 border border-transparent rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={handleConfirm}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

