import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

const PieChartProductos = ({ productos }) => {
  const total = productos.reduce((acc, p) => acc + p.cantidad, 0);

  const data = productos.map((p) => ({
    name: p.producto,
    value: p.cantidad,
    porcentaje: ((p.cantidad / total) * 100).toFixed(1),
  }));

  return (
    <div className="w-full h-full">
      <h3 className="text-xl font-semibold mb-6 dark:text-white mt-4">
        Ordenes por mes
      </h3>
      <ResponsiveContainer width="100%" height="75%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            labelLine={false}
            label={({ name, porcentaje }) => `${name} (${porcentaje}%)`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} productos`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartProductos;
