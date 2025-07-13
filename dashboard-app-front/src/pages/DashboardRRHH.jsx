import { useEffect, useState, useContext } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { AuthContext } from "../context/AuthContext";
import Modal from "../components/Modal";
import Sidebar from "../components/Navs/SideBarLeft";
import DashboardNavbar from "../components/Navs/DashboardNav";
import StatCard from "../components/Charts/StatCard";
import TablaEmpleados from "../components/Charts/RRHH/TablaEmpleados";
import TablaPosiciones from "../components/Charts/RRHH/TablaPosiciones";
import GraficaEmpleadosSemana from "../components/Charts/RRHH/GraficaEmpleadosPorSemana";
import PieEmpleadosPorPuesto from "../components/Charts/RRHH/PieEmpleadosPorPuesto";
import GraficaCrecimientoEmpleados from "../components/Charts/RRHH/GraficaCrecimientoEmpleados";
// import GraficaAsistencias from "../components/Charts/RRHH/GraficaAsistencias"; // Futuro
import FormEmpleado from "../components/FormEmpleados";
import ReportePDFRRHH from "../components/reports/ReportePDFRRHH";

const DashboardRRHH = () => {
    const { token } = useContext(AuthContext);

    // 📦 Estados
    const [empleados, setEmpleados] = useState([]);
    const [posiciones, setPosiciones] = useState([]);
    const [empleadosNuevosSemana, setEmpleadosNuevosSemana] = useState([]);
    const [asistenciasTop, setAsistenciasTop] = useState([]);
    const [empleadosPorPuesto, setEmpleadosPorPuesto] = useState([]);
    const [crecimientoMensual, setCrecimientoMensual] = useState([]);
    const [filtroPuesto, setFiltroPuesto] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showModalRRHH, setShowModalRRHH] = useState(false);

    //Datos filtrados
    const empleadosFiltrados = filtroPuesto
        ? empleados.filter(emp => emp.puesto?.toLowerCase().includes(filtroPuesto.toLowerCase()))
        : empleados;

    const totalEmpleados = empleados.length;
    const totalPosiciones = posiciones.length;
    const ingresos2025 = empleados.filter(emp => {
        if (!emp.fecha_creacion) return false;
        const anio = new Date(emp.fecha_creacion).getFullYear();
        return anio === 2025;
    }).length;

    const pieData = posiciones.map((pos) => ({
        nombrePuesto: pos.puesto,
        cantidad: parseInt(pos.total, 10),
    }));

    //Nuevo empleado
    const handleEmpleadoCreado = (nuevoEmpleado) => {
        setEmpleados((prev) => [...prev, nuevoEmpleado]);
    };

    //Fetch de datos
    const fetchData = async () => {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const [resEmpleados, resPosiciones, resSemana, resAsistencias, resCrecimiento] = await Promise.all([
                fetch("http://localhost:4000/api/rrhh/reportes", { headers }),
                fetch("http://localhost:4000/api/rrhh/empleados-por-puesto", { headers }),
                fetch("http://localhost:4000/api/rrhh/empleados-nuevos-semana", { headers }),
                fetch("http://localhost:4000/api/rrhh/asistencias-promedio", { headers }),
                fetch("http://localhost:4000/api/rrhh/crecimiento-mensual", { headers }),
            ]);

            const empleadosData = resEmpleados.ok ? await resEmpleados.json() : [];
            const posicionesData = resPosiciones.ok ? await resPosiciones.json() : [];
            const semanaData = resSemana.ok ? await resSemana.json() : [];
            const asistenciasData = resAsistencias.ok ? await resAsistencias.json() : [];
            const crecimientoData = resCrecimiento.ok ? await resCrecimiento.json() : [];

            //Agrupar para gráfica circular
            const agrupado = empleadosData.reduce((acc, emp) => {
                const key = emp.puesto || "Sin puesto";
                acc[key] = (acc[key] || 0) + 1;
                return acc;
            }, {});
            const dataGrafica = Object.entries(agrupado).map(([nombrePuesto, cantidad]) => ({
                nombrePuesto,
                cantidad,
            }));

            const semanaFormateada = semanaData.map(item => ({
                semana: format(new Date(item.semana), "'Semana del' d MMM", { locale: es }),
                nuevos: parseInt(item.nuevos, 10)
            }));

            const crecimientoFormateado = crecimientoData.map(item => ({
                mes: format(new Date(item.mes), 'MMMM yyyy', { locale: es }),
                acumulado: parseInt(item.acumulado, 10)
            }));

            // Estados
            setEmpleados(empleadosData);
            setEmpleadosPorPuesto(dataGrafica);
            setPosiciones(posicionesData);
            setAsistenciasTop(asistenciasData);
            setEmpleadosNuevosSemana(semanaFormateada);
            setCrecimientoMensual(crecimientoFormateado);
        } catch (err) {
            console.error("Error en fetchData:", err.message);
        }
    };

    useEffect(() => {
        if (token) fetchData();
    }, [token]);

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Sidebar />
            <DashboardNavbar />
            <div className="flex flex-col flex-1">
                <main className="flex-1 p-6 overflow-y-auto mt-14">
                    {/* Encabezado */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Panel de Recursos Humanos</h2>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                            >
                                + Nuevo Empleado
                            </button>
                            <button
                                onClick={() => setShowModalRRHH(true)}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                            >
                                Descargar Reporte PDF
                            </button>
                        </div>
                    </div>

                    {/* Tarjetas resumen */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <StatCard title="Empleados" value={totalEmpleados} percentage={5} increase />
                        <StatCard title="Posiciones" value={totalPosiciones} percentage={2} increase />
                        <StatCard title="Ingresos 2025" value={ingresos2025} percentage={10} increase />
                    </div>

                    {/* Filtro de búsqueda */}
                    <div className="mb-4 max-w-sm">
                        <input
                            type="text"
                            placeholder="Buscar empleados por puesto..."
                            value={filtroPuesto}
                            onChange={(e) => setFiltroPuesto(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Tablas */}
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                            <TablaEmpleados empleados={empleadosFiltrados} />
                        </div>
                        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                            <TablaPosiciones posiciones={posiciones} />
                        </div>
                    </div>

                    {/* Gráficos */}
                    <div className="flex flex-col md:flex-row gap-6 mt-8">
                        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                            <GraficaEmpleadosSemana data={empleadosNuevosSemana} />
                        </div>
                        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                            <PieEmpleadosPorPuesto data={pieData} />
                        </div>
                    </div>

                    {/* Otros gráficos */}
                    <div className="mt-8">
                        <GraficaCrecimientoEmpleados data={crecimientoMensual} />
                        {/* Futuro: <GraficaAsistencias data={asistenciasTop} /> */}
                    </div>

                    {/* Modales */}
                    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                        <FormEmpleado
                            onEmpleadoCreado={handleEmpleadoCreado}
                            onClose={() => setShowModal(false)}
                        />
                    </Modal>
                    <ReportePDFRRHH
                        isOpen={showModalRRHH}
                        onClose={() => setShowModalRRHH(false)}
                    />
                </main>
            </div>
        </div>
    );
};

export default DashboardRRHH;
