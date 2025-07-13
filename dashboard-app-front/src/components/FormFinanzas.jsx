import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";

const FormFinanzas = ({ onRegistroFinancieroCreado, onClose }) => {
    const [descripcion, setDescripcion] = useState("");
    const [monto, setMonto] = useState("");
    const [tipo, setTipo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");
        setError(false);

        // Validación simple
        if (!tipo || !monto || Number(monto) <= 0) {
            setMensaje("Por favor selecciona un tipo y un monto válido");
            setError(true);
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setMensaje("No autenticado");
            setError(true);
            return;
        }

        let usuario_id;
        try {
            const decoded = jwtDecode(token);
            usuario_id = decoded.id;
        } catch {
            setMensaje("Token inválido");
            setError(true);
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/api/administracion/registro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    descripcion,
                    monto: Number(monto),
                    tipo,
                    usuario_id,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMensaje("Registro financiero creado correctamente");
                setError(false);
                onRegistroFinancieroCreado(data); // Avisar al padre
                onClose(); // Cerrar modal

                // Opcional: reset form
                setDescripcion("");
                setMonto("");
                setTipo("");
            } else {
                setMensaje(data.message || "Error al registrar");
                setError(true);
            }
        } catch (error) {
            console.error("Error:", error);
            setMensaje("Error de red");
            setError(true);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Registrar movimiento financiero
            </h2>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Descripción
                </label>
                <input
                    type="text"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Descripción opcional"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Monto
                </label>
                <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tipo
                </label>
                <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                    required
                >
                    <option value="">Selecciona</option>
                    <option value="ingreso">Ingreso</option>
                    <option value="egreso">Egreso</option>
                </select>
            </div>

            {mensaje && (
                <p className={`text-sm ${error ? "text-red-600" : "text-green-600"}`}>
                    {mensaje}
                </p>
            )}

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
                Guardar registro
            </button>
        </form>
    );
};

export default FormFinanzas;
