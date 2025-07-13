import { useState, useMemo } from "react";

const ProductosRecientes = ({ productos }) => {
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 5;

  const productosFiltrados = useMemo(() => {
    return productos.filter((p) =>
      p.producto.toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [busqueda, productos]);

  const totalPaginas = Math.ceil(productosFiltrados.length / itemsPorPagina);

  const productosPaginados = productosFiltrados.slice(
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
      <h3 className="text-lg font-semibold mb-4">Productos más recientes</h3>
      <input
        type="text"
        placeholder="Buscar producto..."
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
            <th className="px-6 py-3">Producto</th>
            <th className="px-6 py-3">Cantidad</th>
            <th className="px-6 py-3">Fecha</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
          {productosPaginados.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-6 py-4">{p.producto}</td>
              <td className="px-6 py-4">{p.cantidad}</td>
              <td className="px-6 py-4">
                {new Date(p.fecha).toLocaleDateString()}
              </td>
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

export default ProductosRecientes;
