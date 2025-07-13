import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login: loginContext } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password });
            loginContext(res.token);

            const user = JSON.parse(atob(res.token.split('.')[1]));
            if (user.rol === 'compras') {
                navigate('/dashboard-compras', { replace: true });
            } else if (user.rol === 'administracion') {
                navigate('/dashboard-admin', { replace: true });
            } else if (user.rol === 'rrhh') {
                navigate('/dashboard-rrhh', { replace: true });
            }
            
        } catch {
            alert('Login inválido');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
