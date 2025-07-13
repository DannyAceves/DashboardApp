import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (user) {
                const rol = user.rol.toLowerCase();
                if (rol === "rrhh") navigate("/dashboard-rrhh");
                else if (rol === "compras") navigate("/dashboard-compras");
                else if (rol === "administracion") navigate("/dashboard-admin");
                else navigate("/unauthorized");
            } else {
                navigate("/login");
            }
        }
    }, [user, loading, navigate]);

    return null;
};

export default HomePage;
