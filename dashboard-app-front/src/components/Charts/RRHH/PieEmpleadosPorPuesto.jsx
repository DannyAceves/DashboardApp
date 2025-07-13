import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#6366f1", "#fbbf24", "#10b981", "#f87171", "#3b82f6", "#a78bfa"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const { name, value } = payload[0];
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow text-sm">
        <p className="font-semibold">{name}</p>
        <p className="text-indigo-600">Total empleados: {value}</p>
      </div>
    );
  }
  return null;
};

const PieEmpleadosPorPuesto = ({ data }) => (
  <div className="w-full h-80 p-6">
    <h3 className="text-lg font-semibold mb-4 text-center">Empleados por Puesto</h3>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="cantidad"
          nameKey="nombrePuesto"
          cx="30%"
          cy="50%"
          outerRadius={90}
          fill="#6366f1"
          labelLine={true}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          labelPosition="outside"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  </div>
);


export default PieEmpleadosPorPuesto;
