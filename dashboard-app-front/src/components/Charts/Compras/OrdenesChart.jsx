import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const isDarkMode = document.documentElement.classList.contains("dark");
const colors = [
  "#ef4444", // rojo
  "#f97316", // naranja
  "#facc15", // amarillo
  "#22c55e", // verde
  "#14b8a6", // turquesa
  "#3b82f6", // azul
  "#8b5cf6", // violeta
  "#ec4899", // rosa
];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}
    C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2},${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width
    },${y + height}
    Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const OrdenesChart = ({ data }) => {

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg items-center">
      <h3 className="text-xl font-semibold mb-6 dark:text-white">
        Órdenes por mes
      </h3>
      <div className="w-full max-w-4xl h-72 mt-22">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="2 2" stroke="#6b7280" />
            <XAxis
              dataKey="mes"
              tick={{ fill: "#6b7280", fontWeight: "600" }}
              axisLine={{ stroke: "#cbd5e1" }}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontWeight: "600" }}
              axisLine={{ stroke: "#cbd5e1" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderRadius: "8px",
                border: "none",
                color: "#fff",
                fontWeight: "600",
              }}
              cursor={{ fill: "rgba(59,130,246,0.1)" }}
            />
            <Bar
              dataKey="cantidad"
              shape={<TriangleBar />}
              label={{
                position: "top",
                fill: isDarkMode ? "#6b7280" : "#6b7280",
                fontWeight: "700",
              }}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrdenesChart;