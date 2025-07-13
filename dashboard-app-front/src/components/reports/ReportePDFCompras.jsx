import { useState } from "react";
import Modal from "../Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModalReportePDF = ({ isOpen, onClose }) => {
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);

    const generarReporte = async () => {
        if (!fechaInicio || !fechaFin) return alert("Selecciona ambas fechas");
    
        try {
            const res = await fetch(
                `http://localhost:4000/api/compras/reportes-pdf?inicio=${fechaInicio.toISOString()}&fin=${fechaFin.toISOString()}`,
                {
                    headers: { 
                        Authorization: `Bearer ${localStorage.getItem("token")}` 
                    },
                }
            );            
    
            if (!res.ok) throw new Error("Error al generar reporte");
    
            const blob = await res.blob();
            const fechaActual = new Date();
            const fechaStr = fechaActual.toLocaleDateString('es-ES').replace(/\//g, '-');
            const horaStr = fechaActual.toLocaleTimeString('es-ES').replace(/:/g, '-');
            const nombreArchivo = `Reporte_Productos_${fechaStr}_${horaStr}.pdf`;
    
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = nombreArchivo;
            document.body.appendChild(link);
            link.click();
            link.remove();
    
            onClose(); // Opcional: cerrar modal tras descarga
        } catch (error) {
            alert("Error al generar reporte");
            console.error(error);
        }
    };
    
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="w-full max-w-3xl px-4">
                <h3 className="text-xl font-semibold mb-6">Generar reporte PDF</h3>

                <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <div className="flex-1">
                        <label className="block mb-2 text-sm font-medium">Fecha inicio</label>
                        <DatePicker
                            selected={fechaInicio}
                            onChange={(date) => setFechaInicio(date)}
                            dateFormat="dd/MM/yyyy"
                            maxDate={new Date()}
                            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-2 text-sm font-medium">Fecha fin</label>
                        <DatePicker
                            selected={fechaFin}
                            onChange={(date) => setFechaFin(date)}
                            dateFormat="dd/MM/yyyy"
                            maxDate={new Date()}
                            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                </div>

                <button
                    onClick={generarReporte}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6"
                >
                    Generar reporte
                </button>
            </div>
        </Modal>

    );
};

export default ModalReportePDF;
