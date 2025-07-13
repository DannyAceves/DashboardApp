import React, { useState } from "react";

const TablaPosiciones = ({ posiciones }) => {
    const [paginaActual, setPaginaActual] = useState(1);
    const posicionesPorPagina = 5;

    const totalPaginas = Math.ceil(posiciones.length / posicionesPorPagina);
    const inicio = (paginaActual - 1) * posicionesPorPagina;
    const posicionesAMostrar = posiciones.slice(inicio, inicio + posicionesPorPagina);

    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
            setPaginaActual(nuevaPagina);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Posiciones</h3>
            {posiciones.length > 0 ? (
                <>
                    <table className="min-w-full text-sm text-left">
                        <thead className="border-b dark:border-gray-700">
                            <tr>
                                <th className="py-2 px-4">Puesto</th>
                                <th className="py-2 px-4">Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posicionesAMostrar.map((pos, i) => (
                                <tr key={i} className="border-b dark:border-gray-700">
                                    <td className="py-2 px-4">{pos.puesto}</td>
                                    <td className="py-2 px-4">{pos.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Paginación */}
                    <div className="flex justify-end mt-4 space-x-2">
                        <button
                            onClick={() => cambiarPagina(paginaActual - 1)}
                            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
                            disabled={paginaActual === 1}
                        >
                            Anterior
                        </button>
                        <span className="px-3 py-1 text-sm font-medium">
                            Página {paginaActual} de {totalPaginas}
                        </span>
                        <button
                            onClick={() => cambiarPagina(paginaActual + 1)}
                            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
                            disabled={paginaActual === totalPaginas}
                        >
                            Siguiente
                        </button>
                    </div>
                </>
            ) : (
                <p>No hay datos de posiciones.</p>
            )}
        </div>
    );
};

export default TablaPosiciones;
