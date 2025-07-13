const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRole } = require('../middlewares/auth.middleware');
const { 
    getEmpleados, 
    createEmpleado,
    getEmpleadosNuevosPorSemana,
    getEmpleadosPorPuesto, 
    getAsistenciasPromedioPorPuesto, 
    getCrecimientoMensualEmpleados,
    generarReporteRRHHPDF
} = require('../controllers/rrhh.Controller');

router.get('/reportes', verifyToken, authorizeRole(['rrhh']), getEmpleados);
router.post('/empleados', verifyToken, authorizeRole(['rrhh']), createEmpleado);
router.get('/empleados-nuevos-semana', verifyToken, authorizeRole(['rrhh']), getEmpleadosNuevosPorSemana);
router.get('/empleados-por-puesto', verifyToken, authorizeRole(['rrhh']), getEmpleadosPorPuesto);
router.get('/asistencias-promedio', verifyToken, authorizeRole(['rrhh']), getAsistenciasPromedioPorPuesto);
router.get('/crecimiento-mensual', verifyToken, authorizeRole(['rrhh']), getCrecimientoMensualEmpleados);
router.get('/reportes-pdf', verifyToken, authorizeRole(['rrhh']), generarReporteRRHHPDF);

module.exports = router;
