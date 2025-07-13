import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
    const { user, logout, loading } = useContext(AuthContext);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });

    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (loading) return null;

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex items-center justify-between">
            <Link to="/" className="text-2xl font-semibold text-gray-800 dark:text-white">
                Dashboard App
            </Link>

            <div className="flex items-center gap-6">
                {!user ? (
                    <>
                        <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                            Iniciar sesión
                        </Link>
                        <Link to="/register" className="text-green-600 dark:text-green-400 hover:underline text-sm">
                            Registrarse
                        </Link>
                    </>
                ) : (
                    <>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                            {user.nombre} ({user.rol})
                        </span>
                        <button
                            onClick={handleLogout}
                            className="text-red-600 hover:underline text-sm"
                        >
                            Cerrar sesión
                        </button>
                    </>
                )}
                {/* Toggle con íconos ☀️ 🌙 */}
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
        </nav>
    );
};

export default Navbar;
