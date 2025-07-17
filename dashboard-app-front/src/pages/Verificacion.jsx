import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Verificacion = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';

    const [codigo, setCodigo] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!codigo) return toast.error('Ingresa el código de verificación');

        try {
            setLoading(true);
            const res = await axios.post('http://localhost:4000/api/auth/verificar', {
                email,
                codigo,
            });

            toast.success(res.data.message || 'Cuenta verificada ✅');
            navigate('/login');
        } catch (err) {
            toast.error(
                err.response?.data?.message || 'Error al verificar el código'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
                    Verificar Cuenta
                </h2>
                <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-4">
                    Ingresa el código que fue enviado a tu correo: <br />
                    <strong>{email}</strong>
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Código de verificación"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Verificando...' : 'Verificar'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Verificacion;
