const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRole } = require('../middlewares/auth.middleware');
const {
    getFinanzas,
    createRegistroFinanciero,
    generarReporteAdministracionPDF
} = require('../controllers/administracion.controller');

router.get('/reportes', verifyToken, authorizeRole(['administracion']), getFinanzas);
router.post('/registro', verifyToken, authorizeRole(['administracion']), createRegistroFinanciero);
router.get('/reportes-pdf', verifyToken, authorizeRole(['administracion']), generarReporteAdministracionPDF);

module.exports = router;
