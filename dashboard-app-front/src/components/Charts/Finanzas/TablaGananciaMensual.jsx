import { useState } from "react";

const TablaGananciaMensual = ({ ingresos, egresos }) => {
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const meses = [...new Set([...ingresos, ...egresos].map(i => i.mes))];
    const data = meses.map(mes => {
        const ingresoMes = ingresos.find(i => i.mes === mes)?.monto || 0;
        const egresoMes = egresos.find(e => e.mes === mes)?.monto || 0;
        const ganancia = ingresoMes - egresoMes;
        return { mes, ingresoMes, egresoMes, ganancia };
    });

    const totalPages = Math.ceil(data.length / rowsPerPage);
    const startIndex = (page - 1) * rowsPerPage;
    const currentRows = data.slice(startIndex, startIndex + rowsPerPage);

    // Totales totales (para todo data, no solo página)
    const totalIngreso = data.reduce((acc, d) => acc + d.ingresoMes, 0);
    const totalEgreso = data.reduce((acc, d) => acc + d.egresoMes, 0);
    const totalGanancia = data.reduce((acc, d) => acc + d.ganancia, 0);

    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Ganancias Mensuales</h3>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700 text-left text-xs uppercase">
                    <tr>
                        <th className="px-6 py-3">Mes</th>
                        <th className="px-6 py-3">Ingresos</th>
                        <th className="px-6 py-3">Egresos</th>
                        <th className="px-6 py-3">Ganancia</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {currentRows.map(({ mes, ingresoMes, egresoMes, ganancia }) => (
                        <tr
                            key={mes}
                            className={`hover:bg-gray-50 dark:hover:bg-gray-800 ${ganancia >= 0
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-600 dark:text-red-400"
                                }`}
                        >
                            <td className="px-6 py-4">{mes}</td>
                            <td className="px-6 py-4">${ingresoMes.toFixed(2)}</td>
                            <td className="px-6 py-4">${egresoMes.toFixed(2)}</td>
                            <td className="px-6 py-4">${ganancia.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
                {/* Fila total */}
                <tfoot className="bg-gray-100 dark:bg-gray-700 font-semibold">
                    <tr>
                        <td className="px-6 py-3">Total</td>
                        <td className="px-6 py-3">${totalIngreso.toFixed(2)}</td>
                        <td className="px-6 py-3">${totalEgreso.toFixed(2)}</td>
                        <td
                            className={`px-6 py-3 ${totalGanancia >= 0
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-600 dark:text-red-400"
                                }`}
                        >
                            ${totalGanancia.toFixed(2)}
                        </td>
                    </tr>
                </tfoot>
            </table>

            {/* Paginación */}
            <div className="flex justify-end gap-2 mt-2">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
                >
                    Anterior
                </button>
                <span className="px-3 py-1">
                    {page} / {totalPages}
                </span>
                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default TablaGananciaMensual;
