"use client"

import { useState } from "react"
import Swal from "sweetalert2"

const Predicciones = () => {
  const [file, setFile] = useState(null)

  const handleFileChange = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setFile(null)
      return
    }

    const selectedFile = event.target.files[0]
    const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase()

    // Validate file is Excel format
    if (!["xlsx", "xls", "csv"].includes(fileExtension || "")) {
      Swal.fire({
        title: "Error!",
        text: "Solo se permiten archivos Excel (.xlsx, .xls, .csv)",
        icon: "error",
        confirmButtonText: "Entendido",
      })
      setFile(null)
      event.target.value = "" // Reset input
      return
    }

    setFile(selectedFile)
    Swal.fire({
      title: "¡Archivo cargado!",
      text: `${selectedFile.name} ha sido cargado correctamente`,
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    })
  }

  const handleRemoveFile = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres eliminar este archivo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setFile(null)
        // Reset the file input
        const fileInput = document.querySelector('input[type="file"]')
        if (fileInput) fileInput.value = ""

        Swal.fire("¡Eliminado!", "El archivo ha sido eliminado.", "success")
      }
    })
  }

  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Predicciones</h1>
      <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
        <div className="md:flex">
          <div className="w-full p-3">
            {!file ? (
              <div className="relative h-48 rounded-lg border-2 border-blue-200 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <div className="absolute flex flex-col items-center">
                  <svg className="mb-3" xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 32 32">
                    <defs>
                      <linearGradient
                        id="vscodeIconsFileTypeExcel0"
                        x1="4.494"
                        x2="13.832"
                        y1="-2092.086"
                        y2="-2075.914"
                        gradientTransform="translate(0 2100)"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stopColor="#18884f" />
                        <stop offset=".5" stopColor="#117e43" />
                        <stop offset="1" stopColor="#0b6631" />
                      </linearGradient>
                    </defs>
                    <path
                      fill="#185c37"
                      d="M19.581 15.35L8.512 13.4v14.409A1.19 1.19 0 0 0 9.705 29h19.1A1.19 1.19 0 0 0 30 27.809V22.5Z"
                    />
                    <path
                      fill="#21a366"
                      d="M19.581 3H9.705a1.19 1.19 0 0 0-1.193 1.191V9.5L19.581 16l5.861 1.95L30 16V9.5Z"
                    />
                    <path fill="#107c41" d="M8.512 9.5h11.069V16H8.512Z" />
                    <path
                      d="M16.434 8.2H8.512v16.25h7.922a1.2 1.2 0 0 0 1.194-1.191V9.391A1.2 1.2 0 0 0 16.434 8.2"
                      opacity="0.1"
                    />
                    <path
                      d="M15.783 8.85H8.512V25.1h7.271a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191"
                      opacity="0.2"
                    />
                    <path
                      d="M15.783 8.85H8.512V23.8h7.271a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191"
                      opacity="0.2"
                    />
                    <path
                      d="M15.132 8.85h-6.62V23.8h6.62a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191"
                      opacity="0.2"
                    />
                    <path
                      fill="url(#vscodeIconsFileTypeExcel0)"
                      d="M3.194 8.85h11.938a1.193 1.193 0 0 1 1.194 1.191v11.918a1.193 1.193 0 0 1-1.194 1.191H3.194A1.19 1.19 0 0 1 2 21.959V10.041A1.19 1.19 0 0 1 3.194 8.85"
                    />
                    <path
                      fill="#fff"
                      d="m5.7 19.873l2.511-3.884l-2.3-3.862h1.847L9.013 14.6c.116.234.2.408.238.524h.017q.123-.281.26-.546l1.342-2.447h1.7l-2.359 3.84l2.419 3.905h-1.809l-1.45-2.711A2.4 2.4 0 0 1 9.2 16.8h-.024a1.7 1.7 0 0 1-.168.351l-1.493 2.722Z"
                    />
                    <path fill="#33c481" d="M28.806 3h-9.225v6.5H30V4.191A1.19 1.19 0 0 0 28.806 3" />
                    <path fill="#107c41" d="M19.581 16H30v6.5H19.581Z" />
                  </svg>
                  <span className="block text-gray-500 font-semibold">Drag &amp; drop your files here</span>
                  <span className="block text-gray-400 font-normal mt-1">or click to upload</span>
                  <span className="block text-gray-400 font-normal mt-1 text-xs">
                    Solo archivos Excel (.xlsx, .xls, .csv)
                  </span>
                </div>

                <input
                  className="h-full w-full opacity-0 cursor-pointer"
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <div className="relative h-48 rounded-lg border-2 border-green-200 bg-green-50 flex justify-center items-center shadow-lg">
                <div className="absolute flex flex-col items-center">
                  <div className="text-5xl mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><defs><linearGradient id="vscodeIconsFileTypeExcel0" x1="4.494" x2="13.832" y1="-2092.086" y2="-2075.914" gradientTransform="translate(0 2100)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#18884f"/><stop offset=".5" stop-color="#117e43"/><stop offset="1" stop-color="#0b6631"/></linearGradient></defs><path fill="#185c37" d="M19.581 15.35L8.512 13.4v14.409A1.19 1.19 0 0 0 9.705 29h19.1A1.19 1.19 0 0 0 30 27.809V22.5Z"/><path fill="#21a366" d="M19.581 3H9.705a1.19 1.19 0 0 0-1.193 1.191V9.5L19.581 16l5.861 1.95L30 16V9.5Z"/><path fill="#107c41" d="M8.512 9.5h11.069V16H8.512Z"/><path d="M16.434 8.2H8.512v16.25h7.922a1.2 1.2 0 0 0 1.194-1.191V9.391A1.2 1.2 0 0 0 16.434 8.2" opacity="0.1"/><path d="M15.783 8.85H8.512V25.1h7.271a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191" opacity="0.2"/><path d="M15.783 8.85H8.512V23.8h7.271a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191" opacity="0.2"/><path d="M15.132 8.85h-6.62V23.8h6.62a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191" opacity="0.2"/><path fill="url(#vscodeIconsFileTypeExcel0)" d="M3.194 8.85h11.938a1.193 1.193 0 0 1 1.194 1.191v11.918a1.193 1.193 0 0 1-1.194 1.191H3.194A1.19 1.19 0 0 1 2 21.959V10.041A1.19 1.19 0 0 1 3.194 8.85"/><path fill="#fff" d="m5.7 19.873l2.511-3.884l-2.3-3.862h1.847L9.013 14.6c.116.234.2.408.238.524h.017q.123-.281.26-.546l1.342-2.447h1.7l-2.359 3.84l2.419 3.905h-1.809l-1.45-2.711A2.4 2.4 0 0 1 9.2 16.8h-.024a1.7 1.7 0 0 1-.168.351l-1.493 2.722Z"/><path fill="#33c481" d="M28.806 3h-9.225v6.5H30V4.191A1.19 1.19 0 0 0 28.806 3"/><path fill="#107c41" d="M19.581 16H30v6.5H19.581Z"/></svg>
                  </div>
                  <span className="block text-gray-700 font-semibold">{file.name}</span>
                  <span className="block text-gray-500 font-normal mt-1">{(file.size / 1024).toFixed(2)} KB</span>
                  <div className="flex flex-row gap-4 mt-4">
                    <button
                      onClick={handleRemoveFile}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      Eliminar archivo
                    </button>
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                    >
                      Analizar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Predicciones

