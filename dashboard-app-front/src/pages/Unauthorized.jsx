const Unauthorized = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Acceso no autorizado</h2>
            <p className="text-gray-700 dark:text-gray-300">
                No tienes permiso para ver esta sección.
            </p>
        </div>
    </div>
);

export default Unauthorized;
