import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
        return (
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow text-sm">
                <p className="font-semibold">{label}</p>
                <p className="text-purple-600">Asistencia promedio: {payload[0].value.toFixed(2)}</p>
            </div>
        );
    }
    return null;
};

const GraficaAsistencias = ({ data }) => (
    <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Asistencia Promedio por Puesto</h3>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="puesto" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="promedio_asistencias" fill="#8b5cf6" />
            </BarChart>
        </ResponsiveContainer>
    </div>
);

export default GraficaAsistencias;
