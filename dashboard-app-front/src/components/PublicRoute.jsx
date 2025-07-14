import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return null;

    if (user) {
        const rol = user.rol.toLowerCase();
        if (rol === 'rrhh') return <Navigate to="/dashboard-rrhh" />;
        if (rol === 'compras') return <Navigate to="/dashboard-compras" />;
        if (rol === 'administracion') return <Navigate to="/dashboard-admin" />;
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default PublicRoute;
