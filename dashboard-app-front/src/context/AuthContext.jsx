import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

let logoutTimeoutId = null;

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!token;

    // Inicializar autenticación desde localStorage
    const initializeAuth = () => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            setLoading(false);
            return;
        }

        try {
            const decoded = jwtDecode(storedToken);
            const currentTime = Date.now() / 1000;

            if (decoded.exp && decoded.exp < currentTime) {
                console.log("Token expirado");
                logout();
            } else {
                setToken(storedToken);
                setUser(decoded);
                scheduleAutoLogout(decoded.exp);
            }
        } catch (err) {
            console.error("Token inválido o corrupto:", err);
            logout();
        } finally {
            setLoading(false);
        }
    };

    // Programar logout automático
    const scheduleAutoLogout = (exp) => {
        const expirationTime = exp * 1000 - Date.now();

        if (expirationTime <= 0) {
            logout();
            return;
        }

        if (logoutTimeoutId) clearTimeout(logoutTimeoutId); // limpiar si ya había uno

        logoutTimeoutId = setTimeout(() => {
            console.log("Sesión expirada automáticamente");
            logout();
        }, expirationTime);
    };

    // Iniciar sesión y guardar token
    const login = (newToken) => {
        try {
            const decoded = jwtDecode(newToken);
            localStorage.setItem("token", newToken);
            setToken(newToken);
            setUser(decoded);
            scheduleAutoLogout(decoded.exp);
        } catch (err) {
            console.error("Error al decodificar token:", err);
        }
    };

    // Cerrar sesión y limpiar estado
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        if (logoutTimeoutId) clearTimeout(logoutTimeoutId);
    };

    // Detectar cambios en el token entre pestañas
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === "token" && !e.newValue) {
                logout();
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    useEffect(() => {
        initializeAuth();
        return () => {
            if (logoutTimeoutId) clearTimeout(logoutTimeoutId);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ token, user, login, logout, loading, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};