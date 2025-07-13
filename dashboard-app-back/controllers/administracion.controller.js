const pool = require("../config/db");
const PDFDocument = require("pdfkit");
const { generarYEnviarPDF } = require("../utils/pdfHelpers");
const moment = require("moment");

// Obtener registros financieros
const getFinanzas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM finanzas');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener registros financieros", error });
  }
};

// Crear ingreso o egreso
const createRegistroFinanciero = async (req, res) => {
  const { usuario_id, descripcion, tipo, monto } = req.body;

  try {
    // Generar mes en formato YYYY-MM
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const mes = `${year}-${month}`; // Ej: "2025-07"

    const ingreso = tipo === 'ingreso' ? monto : 0;
    const egreso = tipo === 'egreso' ? monto : 0;

    const result = await pool.query(
      `
      INSERT INTO finanzas (usuario_id, descripcion, mes, ingresos, egresos, tipo)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
      `,
      [usuario_id, descripcion, mes, ingreso, egreso, tipo]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al registrar ingreso/egreso:", error);
    res.status(500).json({ message: "Error al registrar ingreso/egreso", error });
  }
};

// Reporte PDF Administración
const generarReporteAdministracionPDF = async (req, res) => {
  const { inicio, fin } = req.query;
  if (!inicio || !fin)
    return res.status(400).json({ message: "Fechas no proporcionadas" });

  const fechaInicio = new Date(inicio);
  const fechaFin = new Date(fin);

  try {
    const result = await pool.query(
      `SELECT * FROM finanzas WHERE DATE(fecha) BETWEEN $1 AND $2 ORDER BY fecha ASC`,
      [fechaInicio, fechaFin]
    );

    const totalIngresos = result.rows
      .filter((row) => row.tipo === "ingreso")
      .reduce((sum, row) => sum + parseFloat(row.ingresos || 0), 0);

    const totalEgresos = result.rows
      .filter((row) => row.tipo === "egreso")
      .reduce((sum, row) => sum + parseFloat(row.egresos || 0), 0);

    const generarContenidoPDF = (doc) => {
      doc.fontSize(18).text("Reporte de Finanzas", { align: "center" });
      doc.moveDown();

      doc
        .fontSize(12)
        .text(`Desde: ${moment(fechaInicio).format("DD/MM/YYYY")}`);
      doc.text(`Hasta: ${moment(fechaFin).format("DD/MM/YYYY")}`);
      doc.moveDown();

      doc.fontSize(14).text("Resumen:");
      doc.fontSize(12).text(`Total Ingresos: $${totalIngresos.toFixed(2)}`);
      doc.text(`Total Egresos: $${totalEgresos.toFixed(2)}`);
      doc.moveDown();

      doc.fontSize(14).text("Detalle de Transacciones:");
      doc.moveDown();

      const tableTop = doc.y;
      const itemHeight = 20;
      const pageWidth = 550;
      const marginLeft = 50;

      const colWidths = {
        tipo: 80,
        descripcion: 220,
        monto: 100,
        fecha: 100,
      };

      // Encabezado con fondo gris claro
      doc.rect(marginLeft, tableTop, pageWidth, itemHeight).fill("#f0f0f0");
      doc.fillColor("black").font("Helvetica-Bold").fontSize(12);

      doc.text("Tipo", marginLeft + 5, tableTop + 5, {
        width: colWidths.tipo,
        align: "left",
      });
      doc.text("Descripción", marginLeft + colWidths.tipo + 5, tableTop + 5, {
        width: colWidths.descripcion,
        align: "left",
      });
      doc.text("Monto", marginLeft + colWidths.tipo + colWidths.descripcion + 5, tableTop + 5, {
        width: colWidths.monto,
        align: "right",
      });
      doc.text("Fecha", marginLeft + colWidths.tipo + colWidths.descripcion + colWidths.monto + 5, tableTop + 5, {
        width: colWidths.fecha,
        align: "center",
      });

      let y = tableTop + itemHeight;

      doc.font("Helvetica").fontSize(11);

      result.rows.forEach((row, index) => {
        const monto = row.tipo === "ingreso" ? row.ingresos : row.egresos;

        // Línea horizontal separadora
        doc
          .moveTo(marginLeft, y)
          .lineTo(marginLeft + pageWidth, y)
          .strokeColor("#cccccc")
          .stroke();

        // Celdas con datos
        doc.fillColor("black");
        doc.text(row.tipo, marginLeft + 5, y + 5, {
          width: colWidths.tipo,
          align: "left",
        });
        doc.text(row.descripcion, marginLeft + colWidths.tipo + 5, y + 5, {
          width: colWidths.descripcion,
          align: "left",
        });
        doc.text(`$${parseFloat(monto).toFixed(2)}`, marginLeft + colWidths.tipo + colWidths.descripcion + 5, y + 5, {
          width: colWidths.monto,
          align: "right",
        });
        doc.text(moment(row.fecha).format("DD/MM/YYYY"), marginLeft + colWidths.tipo + colWidths.descripcion + colWidths.monto + 5, y + 5, {
          width: colWidths.fecha,
          align: "center",
        });

        y += itemHeight;

        // Salto de página automático
        if (y > 700) {
          doc.addPage();
          y = 50;
        }
      });

      // Línea final que cierra la tabla
      doc
        .moveTo(marginLeft, y)
        .lineTo(marginLeft + pageWidth, y)
        .strokeColor("#000000")
        .stroke();
    };

    await generarYEnviarPDF(res, generarContenidoPDF, "reporte_finanzas.pdf");
  } catch (error) {
    console.error("Error generando reporte Administración:", error);
    res.status(500).json({ message: "Error al generar reporte" });
  }
};


module.exports = {
  getFinanzas,
  createRegistroFinanciero,
  generarReporteAdministracionPDF
};
