import { useState, useMemo } from "react";

const TablaProveedores = ({ ordenes }) => {
    const [busqueda, setBusqueda] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const itemsPorPagina = 5;

    const proveedoresFiltrados = useMemo(() => {
        const map = new Map();

        ordenes.forEach(({ proveedor, cantidad }) => {
            const prev = map.get(proveedor) || 0;
            map.set(proveedor, prev + cantidad);
        });

        return [...map.entries()]
            .filter(([nombre]) =>
                nombre.toLowerCase().includes(busqueda.toLowerCase())
            )
            .sort((a, b) => b[1] - a[1]);
    }, [ordenes, busqueda]);

    const totalPaginas = Math.ceil(proveedoresFiltrados.length / itemsPorPagina);

    const proveedoresPaginados = proveedoresFiltrados.slice(
        (paginaActual - 1) * itemsPorPagina,
        paginaActual * itemsPorPagina
    );

    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
            setPaginaActual(nuevaPagina);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Proveedores con más productos</h3>
            <input
                type="text"
                placeholder="Buscar proveedor..."
                value={busqueda}
                onChange={(e) => {
                    setBusqueda(e.target.value);
                    setPaginaActual(1);
                }}
                className="mb-4 px-3 py-2 border rounded w-full dark:bg-gray-700 dark:text-white"
            />
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700 text-left text-xs uppercase">
                    <tr>
                        <th className="px-6 py-3">Proveedor</th>
                        <th className="px-6 py-3">Cantidad total</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {proveedoresPaginados.map(([nombre, cantidad]) => (
                        <tr key={nombre} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="px-6 py-4">{nombre}</td>
                            <td className="px-6 py-4">{cantidad}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Controles de paginación */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => cambiarPagina(paginaActual - 1)}
                    disabled={paginaActual === 1}
                    className="px-4 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
                >
                    Anterior
                </button>
                <span className="text-sm">
                    Página {paginaActual} de {totalPaginas}
                </span>
                <button
                    onClick={() => cambiarPagina(paginaActual + 1)}
                    disabled={paginaActual === totalPaginas}
                    className="px-4 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default TablaProveedores;
