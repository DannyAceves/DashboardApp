import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";


const FormEmpleado = ({ onEmpleadoCreado, onClose }) => {
    const [nombre, setNombre] = useState("");
    const [puesto, setPuesto] = useState("");
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const usuario_id = decoded.id;

        try {
            const response = await fetch("http://localhost:4000/api/rrhh/empleados", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ usuario_id, nombre,puesto, email, asistencias: 0 }), // No envíes nombre ni email aquí, el usuario ya existe
            });

            if (!response.ok) {
                const errorData = await response.json();
                setMensaje(errorData.message || "Error al crear el empleado");
                return;
            }

            const data = await response.json();
            setMensaje("Empleado creado correctamente");
            onEmpleadoCreado(data);
            onClose();
        } catch (error) {
            console.error("Error en la red:", error);
            setMensaje("Error de red. Intenta nuevamente.");
        }
    };



    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Registrar nuevo empleado</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Puesto</label>
                <input
                    type="text"
                    value={puesto}
                    onChange={(e) => setPuesto(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>

            {mensaje && <p className="text-sm text-green-600">{mensaje}</p>}

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
                Guardar empleado
            </button>
        </form>
    );
};

export default FormEmpleado;
