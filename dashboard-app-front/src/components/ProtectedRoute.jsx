import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

const ProtectedRoute = ({ children, roles = [] }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        // Puedes devolver un spinner o nada mientras carga
        return <Loading />;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    const userRole = user.rol.toLowerCase();

    if (roles.length > 0 && !roles.includes(userRole)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;
