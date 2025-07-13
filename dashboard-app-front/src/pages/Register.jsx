import { useState } from 'react';
import { register } from '../services/authService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: '',
        email: '',
        password: '',
        rol: 'compras',
    });

    const [isRedirecting, setIsRedirecting] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(form);
            toast.success('Usuario registrado con éxito ✅');
            setForm({
                nombre: '',
                email: '',
                password: '',
                rol: 'compras',
            });
            setIsRedirecting(true);

            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch {
            toast.error('Registro inválido ❌');
        }
    };

    if (isRedirecting) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                <svg
                    className="animate-spin h-10 w-10 text-green-600 mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                </svg>
                <p className="text-lg font-semibold">Redirigiendo al login...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Registro</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="nombre"
                        placeholder="Nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Correo"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Contraseña"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <select
                        name="rol"
                        value={form.rol}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    >
                        <option value="compras">Compras</option>
                        <option value="administracion">Administración</option>
                        <option value="rrhh">Recursos Humanos</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
