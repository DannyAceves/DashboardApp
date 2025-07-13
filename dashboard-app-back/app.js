const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const rrhhRoutes = require('./routes/rrhh.routes');
const comprasRoutes = require('./routes/compras.routes');
const administracionRoutes = require('./routes/administracion.routes');


require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/rrhh', rrhhRoutes);
app.use('/api/compras', comprasRoutes);
app.use('/api/administracion', administracionRoutes);


module.exports = app;
