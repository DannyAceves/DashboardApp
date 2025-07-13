const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default Modal;
