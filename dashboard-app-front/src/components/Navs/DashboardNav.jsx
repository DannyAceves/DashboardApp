import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CircleUserRound } from 'lucide-react';

const DashboardNavbar = () => {
    const { user } = useContext(AuthContext);
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    return (
        <header className="fixed top-0 left-64 right-0 h-14 bg-white dark:bg-gray-900 shadow flex items-center justify-between px-4 z-20">
            {/* Buscador pequeño */}
            <input
                type="search"
                placeholder="Buscar..."
                className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
            />

            {/* Info usuario + logout + toggle modo oscuro */}
            <div className="flex items-center gap-6">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                    <CircleUserRound />
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                    {user.nombre} ({user.rol})
                </span>
    
                <label className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input
                            type="checkbox"
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                            className="sr-only"
                        />
                        <div className="w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full shadow-inner transition" />
                        <div
                            className={`absolute top-0 left-0 w-5 h-5 flex items-center justify-center text-xs rounded-full transition-transform transform ${
                                darkMode ? "translate-x-5" : "translate-x-0"
                            }`}
                        >
                            {darkMode ? (
                                <span className="text-yellow-300">🌙</span>
                            ) : (
                                <span className="text-blue-500">🌞</span>
                            )}
                        </div>
                    </div>
                </label>
            </div>
        </header>
    );
};

export default DashboardNavbar;
