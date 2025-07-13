import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LogOut, LayoutDashboard, ShoppingCart, Users } from "lucide-react";

const SideBarLeft = () => {
    const { logout, user } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <aside className="w-64 h-screen bg-white dark:bg-gray-900 border-r dark:border-gray-700 p-5 flex flex-col justify-between">
            <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-8">
                    Dashboard App
                </h1>
                <nav className="flex flex-col gap-4">
                    <Link to="/dashboard-admin" className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600">
                        <LayoutDashboard size={18} /> Panel Admin
                    </Link>
                    <Link to="/dashboard-rrhh" className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600">
                        <Users size={18} /> Recursos Humanos
                    </Link>
                    <Link to="/dashboard-compras" className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600">
                        <ShoppingCart size={18} /> Compras
                    </Link>
                </nav>
            </div>
            <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-red-600 hover:underline"
            >
                <LogOut size={18} /> Cerrar sesión
            </button>
        </aside>
    );
};

export default SideBarLeft;