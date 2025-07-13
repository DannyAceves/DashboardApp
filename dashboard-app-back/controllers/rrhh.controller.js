const pool = require("../config/db");
const PDFDocument = require('pdfkit');
const moment = require('moment');

// Función para enviar PDF en respuesta
const generarYEnviarPDF = (res, generadorCallback, nombreArchivo) => {
  const doc = new PDFDocument({ margin: 50 });
  res.setHeader('Content-Disposition', `attachment; filename=${nombreArchivo}`);
  res.setHeader('Content-Type', 'application/pdf');
  generadorCallback(doc);
  doc.pipe(res);
  doc.end();
};

// Función para crear el contenido del PDF RRHH
const generarPDFRRHH = (doc, datos, fechaInicio, fechaFin) => {
  doc.fontSize(20).text('Reporte Recursos Humanos', { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(12).text(`Rango de fechas: ${moment(fechaInicio).format('DD/MM/YYYY')} - ${moment(fechaFin).format('DD/MM/YYYY')}`, { align: 'center' });
  doc.moveDown();

  // Resumen general
  doc.fontSize(14).text('Resumen:', { underline: true });
  doc.fontSize(12)
    .text(`Total de empleados: ${datos.totalEmpleados}`)
    .text(`Promedio de asistencias: ${datos.promedioAsistencias.toFixed(2)}`);
  doc.moveDown();

  // Empleados por puesto
  doc.fontSize(14).text('Empleados por puesto:', { underline: true });
  datos.empleadosPorPuesto.forEach(p => {
    doc.fontSize(12).text(`${p.puesto}: ${p.cantidad}`);
  });
  doc.moveDown();

  // Nuevos ingresos por semana
  doc.fontSize(14).text('Nuevos ingresos por semana:', { underline: true });
  datos.nuevosIngresosSemana.forEach(n => {
    doc.fontSize(12).text(`Semana ${n.semana}: ${n.cantidad} empleados`);
  });
  doc.moveDown();

  // Gráfica barras simples - empleados por puesto
  doc.fontSize(14).text('Gráfica: Empleados por puesto', { underline: true });
  const startX = 50;
  const baseY = doc.y + 100;
  const barWidth = 30;
  const maxCantidad = Math.max(...datos.empleadosPorPuesto.map(p => p.cantidad));
  const scale = maxCantidad > 0 ? 100 / maxCantidad : 1;

  datos.empleadosPorPuesto.forEach((p, i) => {
    const barHeight = p.cantidad * scale;
    const x = startX + i * (barWidth + 15);
    const y = baseY;
    doc.rect(x, y - barHeight, barWidth, barHeight).fill('#3b82f6'); // azul
    doc.fillColor('black').fontSize(10).text(p.puesto, x, y + 5, { width: barWidth, align: 'center' });
    doc.text(p.cantidad.toString(), x, y - barHeight - 15, { width: barWidth, align: 'center' });
  });
  doc.moveDown(6);
};

// CONTROLADORES CRUD

const getEmpleados = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.id, e.nombre, e.email, e.puesto, e.fecha_creacion, e.asistencias
      FROM empleados e
      JOIN usuarios u ON e.usuario_id = u.id
      WHERE u.rol = 'rrhh'
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener empleados", error });
  }
};

const createEmpleado = async (req, res) => {
  const { usuario_id, nombre, puesto, email, asistencias } = req.body;

  try {
    const userCheck = await pool.query(
      "SELECT * FROM usuarios WHERE id = $1 AND rol = $2",
      [usuario_id, "rrhh"]
    );
    if (userCheck.rows.length === 0) {
      return res.status(400).json({ message: "Usuario no válido para RRHH" });
    }

    const result = await pool.query(
      "INSERT INTO empleados (usuario_id, nombre, puesto, email, asistencias) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [usuario_id, nombre, puesto, email, asistencias || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error en createEmpleado:", error);
    res.status(500).json({ message: "Error al crear empleado", error });
  }
};

const getEmpleadosNuevosPorSemana = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        DATE_TRUNC('week', fecha_creacion) AS semana,
        COUNT(*) AS nuevos
      FROM empleados
      GROUP BY semana
      ORDER BY semana ASC;
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener empleados nuevos por semana", error });
  }
};

const getEmpleadosPorPuesto = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT puesto, COUNT(*) AS total
      FROM empleados
      GROUP BY puesto;
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener empleados por puesto", error });
  }
};

const getAsistenciasPromedioPorPuesto = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT puesto, AVG(asistencias) AS promedio_asistencias
      FROM empleados
      GROUP BY puesto;
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener asistencias promedio por puesto", error });
  }
};

const getCrecimientoMensualEmpleados = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        DATE_TRUNC('month', fecha_creacion) AS mes,
        COUNT(*) OVER (ORDER BY DATE_TRUNC('month', fecha_creacion)) AS acumulado
      FROM empleados
      GROUP BY mes
      ORDER BY mes;
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener crecimiento mensual", error });
  }
};

// REPORTE PDF RRHH

const generarReporteRRHHPDF = async (req, res) => {
  const { inicio, fin } = req.query;
  if (!inicio || !fin) return res.status(400).json({ message: "Fechas no proporcionadas" });

  try {
    const totalEmpleadosResult = await pool.query(
      `SELECT COUNT(*) AS total FROM empleados WHERE fecha_creacion BETWEEN $1 AND $2`,
      [inicio, fin]
    );
    const totalEmpleados = parseInt(totalEmpleadosResult.rows[0].total, 10);

    const promedioAsistenciasResult = await pool.query(
      `SELECT AVG(asistencias) AS promedio FROM empleados WHERE fecha_creacion BETWEEN $1 AND $2`,
      [inicio, fin]
    );
    const promedioAsistencias = parseFloat(promedioAsistenciasResult.rows[0].promedio) || 0;

    const empleadosPorPuestoResult = await pool.query(
      `SELECT puesto, COUNT(*) AS cantidad FROM empleados WHERE fecha_creacion BETWEEN $1 AND $2 GROUP BY puesto`,
      [inicio, fin]
    );

    const nuevosIngresosSemanaResult = await pool.query(
      `SELECT DATE_TRUNC('week', fecha_creacion) AS semana, COUNT(*) AS cantidad
      FROM empleados WHERE fecha_creacion BETWEEN $1 AND $2
      GROUP BY semana ORDER BY semana`,
      [inicio, fin]
    );

    const datos = {
      totalEmpleados,
      promedioAsistencias,
      empleadosPorPuesto: empleadosPorPuestoResult.rows.map(r => ({
        puesto: r.puesto,
        cantidad: parseInt(r.cantidad, 10),
      })),
      nuevosIngresosSemana: nuevosIngresosSemanaResult.rows.map(r => ({
        semana: moment(r.semana).format('DD/MM/YYYY'),
        cantidad: parseInt(r.cantidad, 10),
      })),
    };

    await generarYEnviarPDF(res, (doc) => {
      generarPDFRRHH(doc, datos, inicio, fin);
    }, "reporte_rrhh.pdf");

  } catch (error) {
    console.error("Error generando reporte RRHH:", error);
    res.status(500).json({ message: "Error al generar reporte" });
  }
};

module.exports = { 
  getEmpleados, 
  createEmpleado, 
  getEmpleadosNuevosPorSemana, 
  getEmpleadosPorPuesto, 
  getAsistenciasPromedioPorPuesto, 
  getCrecimientoMensualEmpleados, 
  generarReporteRRHHPDF 
};
