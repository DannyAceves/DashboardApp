import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#10B981', '#EF4444'];

const PieChartFinanzas = ({ ingresos, egresos }) => {
    const totalIngresos = ingresos.reduce((acc, i) => acc + i.monto, 0);
    const totalEgresos = egresos.reduce((acc, e) => acc + e.monto, 0);

    const data = [
        { name: 'Ingresos', value: totalIngresos },
        { name: 'Egresos', value: totalEgresos },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Ingresos vs Egresos</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={value => `$${value.toFixed(2)}`} />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChartFinanzas;
