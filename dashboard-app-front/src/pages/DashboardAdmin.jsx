import { useEffect, useState } from "react";
import Sidebar from "../components/Navs/SideBarLeft";
import DashboardNavbar from "../components/Navs/DashboardNav";
import Modal from "../components/Modal";
import FormFinanzas from "../components/FormFinanzas";
import StatCard from "../components/Charts/StatCard";
import TablaIngresos from '../components/Charts/Finanzas/TablaIngresos';
import TablaEgresos from '../components/Charts/Finanzas/TablaEgresos';
import GraficaIngresosEgresos from '../components/Charts/Finanzas/GraficaIngresosEgresos';
import PieChartFinanzas from '../components/Charts/Finanzas/PieChartFinanzas';
import GraficaMensual from '../components/Charts/Finanzas/GraficaMensual';
import TablaGananciasMensual from '../components/Charts/Finanzas/TablaGananciaMensual';
import ReportePDFAdmin from "../components/reports/ReportePDFAdmin";

const DashboardAdmin = () => {
    const [finanzas, setFinanzas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalPDF, setShowModalPDF] = useState(false);

    useEffect(() => {
        const fetchFinanzas = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch("http://localhost:4000/api/administracion/reportes", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error("Error al obtener datos financieros");

                const data = await response.json();
                setFinanzas(data);
            } catch (error) {
                console.error("Error al obtener registros financieros:", error);
            }
        };

        fetchFinanzas();
    }, []);

    const handleFinanzaCreada = (nuevaFinanza) => {
        setFinanzas((prev) => [...prev, nuevaFinanza]);
    };


    // Cálculos financieros
    const totalIngresos = finanzas.reduce((acc, f) => acc + Number(f.ingresos || 0), 0);
    const totalEgresos = finanzas.reduce((acc, f) => acc + Number(f.egresos || 0), 0);
    const balance = totalIngresos - totalEgresos;

    const calcularPorcentaje = (valor, total) => {
        if (total === 0) return 0;
        return ((valor / total) * 100).toFixed(1);
    };

    const agruparPorMes = (datos) => {
        const agrupado = {};

        datos.forEach(({ fecha, monto }) => {
            const dateObj = new Date(fecha);
            const year = dateObj.getFullYear();
            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
            const mes = `${year}-${month}`;

            agrupado[mes] = (agrupado[mes] || 0) + Number(monto);
        });

        return Object.entries(agrupado).map(([mes, monto]) => ({ mes, monto }));
    };

    // 👇 Datos originales
    const ingresosOriginales = finanzas.filter(f => f.tipo === "ingreso");
    const egresosOriginales = finanzas.filter(f => f.tipo === "egreso");

    // 👇 Datos agrupados por mes para gráficas
    const ingresosMensuales = agruparPorMes(
        ingresosOriginales.map(i => ({ fecha: i.fecha, monto: i.ingresos }))
    );
    const egresosMensuales = agruparPorMes(
        egresosOriginales.map(e => ({ fecha: e.fecha, monto: e.egresos }))
    );

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Sidebar />
            <DashboardNavbar />
            <div className="flex flex-col flex-1">
                <main className="flex-1 p-6 overflow-y-auto mt-14">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Panel de Finanzas</h2>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                            >
                                + Nuevo Registro
                            </button>
                            <button
                                onClick={() => setShowModalPDF(true)}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                            >
                                Descargar Reporte PDF
                            </button>

                        </div>
                    </div>

                    {/* StatCards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <StatCard
                            title="Total Ingresos"
                            value={`$${totalIngresos.toFixed(2)}`}
                            percentage={calcularPorcentaje(totalIngresos, totalIngresos + totalEgresos)}
                            increase={true}
                        />
                        <StatCard
                            title="Total Egresos"
                            value={`$${totalEgresos.toFixed(2)}`}
                            percentage={calcularPorcentaje(totalEgresos, totalIngresos + totalEgresos)}
                            increase={false}
                        />
                        <StatCard
                            title="Balance Actual"
                            value={`$${balance.toFixed(2)}`}
                            percentage={calcularPorcentaje(balance, totalIngresos)}
                            increase={balance >= 0}
                        />
                    </div>

                    {/* Tablas y gráficas */}
                    <div className="p-6 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TablaIngresos ingresos={ingresosOriginales} />
                            <TablaEgresos egresos={egresosOriginales} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <GraficaIngresosEgresos ingresos={ingresosMensuales} egresos={egresosMensuales} />
                            <PieChartFinanzas ingresos={ingresosMensuales} egresos={egresosMensuales} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <GraficaMensual ingresos={ingresosMensuales} egresos={egresosMensuales} />
                            <TablaGananciasMensual ingresos={ingresosMensuales} egresos={egresosMensuales} />
                        </div>
                    </div>

                    {/* Modales */}
                    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                        <FormFinanzas
                            onRegistroFinancieroCreado={handleFinanzaCreada}
                            onClose={() => setShowModal(false)}
                        />
                    </Modal>
                    <ReportePDFAdmin isOpen={showModalPDF} onClose={() => setShowModalPDF(false)} />
                </main>
            </div>
        </div>
    );
};

export default DashboardAdmin;
