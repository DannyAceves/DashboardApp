import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
        return (
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow text-sm">
                <p className="font-semibold">{label}</p>
                <p className="text-blue-500">Nuevos empleados: {payload[0].value}</p>
            </div>
        );
    }
    return null;
};

const GraficaEmpleadosPorSemana = ({ data }) => {
    return (
        <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4">Empleados Nuevos por Semana</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semana" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="nuevos" fill="#3b82f6" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GraficaEmpleadosPorSemana;
