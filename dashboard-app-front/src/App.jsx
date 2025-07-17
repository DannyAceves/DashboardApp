import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Verificacion from './pages/Verificacion';
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Navbar from "./components/Navs/Navbar";
import DashboardRRHH from "./pages/DashboardRRHH";
import DashboardCompras from "./pages/DashboardCompras";
import DashboardAdmin from "./pages/DashboardAdmin";
import Unauthorized from './pages/Unauthorized';

function AppContent() {
    const location = useLocation();

    // Definimos las rutas donde NO queremos mostrar el Navbar
    const noNavbarRoutes = [
        '/dashboard-rrhh',
        '/dashboard-compras',
        '/dashboard-admin',
    ];

    // Si la ruta actual está en la lista, no mostramos Navbar
    const showNavbar = !noNavbarRoutes.includes(location.pathname);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
            {showNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />

                <Route 
                    path="/verificar" 
                    element={
                        <Verificacion />
                    } 
                />

                <Route
                    path="/dashboard-rrhh"
                    element={
                        <ProtectedRoute roles={["rrhh"]}>
                            <DashboardRRHH />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard-compras"
                    element={
                        <ProtectedRoute roles={['compras']}>
                            <DashboardCompras />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard-admin"
                    element={
                        <ProtectedRoute roles={["administracion"]}>
                            <DashboardAdmin />
                        </ProtectedRoute>
                    }
                />
                <Route 
                    path="/unauthorized" 
                    element={
                        <Unauthorized />
                    } 
                />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;