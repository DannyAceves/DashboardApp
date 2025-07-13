import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
        return (
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow text-sm">
                <p className="font-semibold">{label}</p>
                <p className="text-green-600">Empleados acumulados: {payload[0].value}</p>
            </div>
        );
    }
    return null;
};

const GraficaCrecimientoEmpleados = ({ data }) => {
    return (
        <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4">Crecimiento Mensual de Empleados</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="acumulado" fill="#10b981" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GraficaCrecimientoEmpleados;
