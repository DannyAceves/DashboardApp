import { TrendingUp, TrendingDown } from "lucide-react";

const StatCard = ({ title, value, percentage, increase = true }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm flex flex-col gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">{title}</span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h2>
            <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                {increase ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {percentage}%
            </div>
        </div>
    );
};

export default StatCard;
