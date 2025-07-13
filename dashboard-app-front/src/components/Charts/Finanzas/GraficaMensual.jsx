import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

const GraficaMensual = ({ ingresos, egresos }) => {
    const meses = [...new Set([...ingresos, ...egresos].map(i => i.mes))];

    const data = meses.map(mes => {
        const ingresoMes = ingresos.find(i => i.mes === mes)?.monto || 0;
        const egresoMes = egresos.find(e => e.mes === mes)?.monto || 0;
        return { mes, ingreso: ingresoMes, egreso: egresoMes };
    });

    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Ingresos y Egresos Mensuales (Barras)</h3>
            <ResponsiveContainer width="100%" height={300} >
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ingreso" fill="#10B981" />
                    <Bar dataKey="egreso" fill="#EF4444" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GraficaMensual;
