import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const GraficaIngresosEgresos = ({ ingresos, egresos }) => {
    // Suponiendo que ingresos y egresos vienen con formato {mes: 'Enero', monto: number}
    // Para ejemplo simple, combinamos datos para el chart

    // Ejemplo de data combinado:
    const meses = [...new Set([...ingresos, ...egresos].map(i => i.mes))];

    const data = meses.map(mes => {
        const ingresoMes = ingresos.find(i => i.mes === mes)?.monto || 0;
        const egresoMes = egresos.find(e => e.mes === mes)?.monto || 0;
        return { mes, ingreso: ingresoMes, egreso: egresoMes };
    });

    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Ingresos y Egresos Mensuales</h3>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="ingreso" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="egreso" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GraficaIngresosEgresos;
