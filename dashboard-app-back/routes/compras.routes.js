const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRole } = require('../middlewares/auth.middleware');
const {
    getOrdenesCompra,
    createOrdenCompra,
    generarReporteComprasPDF
} = require('../controllers/compras.controller');


router.get('/ordenes', verifyToken, authorizeRole(['compras']), getOrdenesCompra);
router.post('/ordenes', verifyToken, authorizeRole(['compras']), createOrdenCompra);
router.get('/reportes-pdf', verifyToken, authorizeRole(['compras']), generarReporteComprasPDF);

module.exports = router;
