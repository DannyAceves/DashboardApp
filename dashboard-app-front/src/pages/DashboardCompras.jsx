import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import moment from "moment";
import Modal from "../components/Modal";
import FormOrdenCompra from "../components/FormOrdenCompra";
import Sidebar from "../components/Navs/SideBarLeft";
import DashboardNavbar from "../components/Navs/DashboardNav";
import StatCard from "../components/Charts/StatCard";
import OrdenesChart from "../components/Charts/Compras/OrdenesChart";
import PieChartProductos from "../components/Charts/Compras/PieChartProductos";
import TablaProductosRecientes from "../components/Charts/Compras/ProductosRecientes";
import TopProveedores from "../components/Charts/Compras/TopProveedores";
import ReportePDF from "../components/reports/ReportePDFCompras";

const DashboardCompras = () => {
    const { token, user } = useContext(AuthContext);
    const [ordenes, setOrdenes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalReporte, setShowModalReporte] = useState(false);

    useEffect(() => {
        const fetchOrdenes = async () => {
            try {
                const res = await fetch("http://localhost:4000/api/compras/ordenes", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error("Error al cargar órdenes");
                const data = await res.json();
                setOrdenes(data);
            } catch (error) {
                console.error(error);
            }
        };
        if (token) fetchOrdenes();
    }, [token]);

    const handleOrdenCreada = (nuevaOrden) => {
        setOrdenes((prev) => [...prev, nuevaOrden]);
    };

    // Datos para PieChart
    const productosAgrupados = ordenes.reduce((acc, orden) => {
        const prod = acc.find((p) => p.producto === orden.producto);
        if (prod) prod.cantidad += orden.cantidad;
        else acc.push({ producto: orden.producto, cantidad: orden.cantidad });
        return acc;
    }, []);

    // Ultimos 6 meses para el gráfico de barras
    const ultimos6Meses = [...Array(6).keys()].map(i =>
        moment().subtract(i, "months").format("MMM")
    );

    const ordenesPorMes = ultimos6Meses.reverse().map(mes => {
        const cantidadMes = ordenes
            .filter(o => moment(o.fecha).format("MMM") === mes)
            .reduce((sum, o) => sum + o.cantidad, 0);
        return { mes, cantidad: cantidadMes };
    });


    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Sidebar />
            <DashboardNavbar />
            <div className="flex flex-col flex-1">
                <main className="flex-1 p-6 overflow-y-auto mt-14">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Panel de Compras</h2>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                            >
                                + Nueva Orden
                            </button>
                            <button
                                onClick={() => setShowModalReporte(true)}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                            >
                                Descargar Reporte PDF
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <StatCard title="Total Órdenes" value={ordenes.length} percentage={12.5} increase />
                        <StatCard
                            title="Proveedores Únicos"
                            value={[...new Set(ordenes.map((o) => o.proveedor))].length}
                            percentage={4.2}
                            increase={false}
                        />
                        <StatCard
                            title="Productos Distintos"
                            value={[...new Set(ordenes.map((o) => o.producto))].length}
                            percentage={9.8}
                            increase
                        />
                    </div>

                    {/* Grid 1: Tabla productos + PieChart */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                            <TablaProductosRecientes productos={ordenes} />
                        </div>
                        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex items-center justify-center">
                            <PieChartProductos productos={productosAgrupados} />
                        </div>
                    </div>

                    {/* Grid 2: OrdenesChart + TopProveedores */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4  items-center justify-center">
                            <OrdenesChart data={ordenesPorMes} />
                        </div>
                        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                            <TopProveedores ordenes={ordenes} />
                        </div>
                    </div>

                    {/* Modales */}
                    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <FormOrdenCompra
                        token={token}
                        onOrdenCompraCreada={(orden) => {
                            handleOrdenCreada(orden);
                            setShowModal(false);
                        }}
                        onClose={() => setShowModal(false)}
                    />

                    </Modal>

                    <ReportePDF
                        isOpen={showModalReporte}
                        onClose={() => setShowModalReporte(false)}
                    />
                </main>
            </div>
        </div>
    );
};

export default DashboardCompras;
