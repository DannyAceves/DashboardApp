import { useState } from "react";

const TablaIngresos = ({ ingresos }) => {
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const totalPages = Math.ceil(ingresos.length / rowsPerPage);
    const startIndex = (page - 1) * rowsPerPage;
    const currentRows = ingresos.slice(startIndex, startIndex + rowsPerPage);

    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Ingresos</h3>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700 text-left text-xs uppercase">
                    <tr>
                        <th className="px-6 py-3">Concepto</th>
                        <th className="px-6 py-3">Monto</th>
                        <th className="px-6 py-3">Fecha</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {currentRows.map(({ id, descripcion, ingresos: monto, fecha }) => (
                        <tr key={id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="px-6 py-4">{descripcion}</td>
                            <td className="px-6 py-4">{monto !== undefined ? `$${Number(monto).toFixed(2)}` : '—'}</td>
                            <td className="px-6 py-4">{fecha ? new Date(fecha).toLocaleDateString() : '—'}</td>
                        </tr>
                    ))}
                </tbody>
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

export default TablaIngresos;
