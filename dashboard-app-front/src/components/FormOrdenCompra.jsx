import React, { useState } from "react";

const FormOrdenCompra = ({ onOrdenCompraCreada, onClose }) => {
    const [producto, setProducto] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [proveedor, setProveedor] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:4000/api/compras/ordenes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ producto, cantidad, proveedor }),
            });

            const data = await response.json();

            if (response.ok) {
                setMensaje("Orden de compra creada correctamente");
                onOrdenCompraCreada(data);
                onClose();
            } else {
                setMensaje(data.message || "Error al crear la orden");
            }
        } catch (error) {
            console.error("Error:", error);
            setMensaje("Error de red");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Registrar orden de compra</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Producto</label>
                <input
                    type="text"
                    value={producto}
                    onChange={(e) => setProducto(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cantidad</label>
                <input
                    type="number"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Proveedor</label>
                <input
                    type="text"
                    value={proveedor}
                    onChange={(e) => setProveedor(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>

            {mensaje && <p className="text-sm text-green-600">{mensaje}</p>}

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
                Guardar orden
            </button>
        </form>
    );
};

export default FormOrdenCompra;
