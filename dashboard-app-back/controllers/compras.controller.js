const pool = require("../config/db");
const PDFDocument = require("pdfkit");
const { generarYEnviarPDF } = require("../utils/pdfHelpers");
const moment = require("moment");

// Obtener órdenes de compra
const getOrdenesCompra = async (req, res) => {
  try {
    const result = await pool.query(`
            SELECT o.id, o.producto, o.cantidad, o.proveedor, o.fecha, u.nombre AS usuario
            FROM ordenes_compra o
            LEFT JOIN usuarios u ON o.usuario_id = u.id
        `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener órdenes de compra", error });
  }
};

// Crear orden
const createOrdenCompra = async (req, res) => {
  const { producto, cantidad, proveedor } = req.body;
  const usuarioId = req.user.id;

  try {
    const result = await pool.query(
      `INSERT INTO ordenes_compra (usuario_id, producto, cantidad, proveedor, fecha)
      VALUES ($1, $2, $3, $4, CURRENT_DATE)
      RETURNING *`,
      [usuarioId, producto, cantidad, proveedor]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al crear orden:", error);
    res.status(500).json({ message: "Error al crear orden de compra", error });
  }
};

// Reporte PDF de Compras
const generarReporteComprasPDF = async (req, res) => {
  const { inicio, fin } = req.query;
  if (!inicio || !fin)
    return res.status(400).json({ message: "Fechas no proporcionadas" });

  const fechaInicio = new Date(inicio);
  const fechaFin = new Date(fin);

  try {
    const result = await pool.query(
      `SELECT * FROM ordenes_compra WHERE DATE(fecha) BETWEEN $1 AND $2 ORDER BY fecha ASC`,
      [fechaInicio, fechaFin]
    );

    const totalOrdenes = result.rows.length;

    const generarContenidoPDF = (doc) => {
      doc.fontSize(18).text("Reporte de Compras", { align: "center" });
      doc.moveDown();
      doc
        .fontSize(12)
        .text(`Desde: ${moment(fechaInicio).format("DD/MM/YYYY")}`);
      doc.text(`Hasta: ${moment(fechaFin).format("DD/MM/YYYY")}`);
      doc.moveDown();

      doc.fontSize(14).text("Resumen:");
      doc.fontSize(12).text(`Total de Órdenes: ${totalOrdenes}`);
      doc.moveDown();

      doc.fontSize(14).text("Detalle de Órdenes:");
      doc.moveDown();

      const tableTop = doc.y;
      const itemHeight = 20;
      const pageWidth = 550;
      const marginLeft = 50;

      const colWidths = {
        producto: 220,
        cantidad: 120,
        proveedor: 210,
      };

      // Encabezados
      doc.rect(marginLeft, tableTop, pageWidth, itemHeight).fill("#f0f0f0");
      doc.fillColor("black").font("Helvetica-Bold").fontSize(12);

      doc.text("Producto", marginLeft + 5, tableTop + 5, {
        width: colWidths.producto,
        align: "left",
      });
      doc.text("Cantidad", marginLeft + colWidths.producto + 5, tableTop + 5, {
        width: colWidths.cantidad,
        align: "center",
      });
      doc.text("Proveedor", marginLeft + colWidths.producto + colWidths.cantidad + 5, tableTop + 5, {
        width: colWidths.proveedor,
        align: "left",
      });

      let y = tableTop + itemHeight;

      doc.font("Helvetica").fontSize(11);

      result.rows.forEach((row) => {
        // Línea separadora
        doc
          .moveTo(marginLeft, y)
          .lineTo(marginLeft + pageWidth, y)
          .strokeColor("#cccccc")
          .stroke();

        // Celdas de datos
        doc.fillColor("black");
        doc.text(row.producto, marginLeft + 5, y + 5, {
          width: colWidths.producto,
          align: "left",
        });
        doc.text(`${row.cantidad}`, marginLeft + colWidths.producto + 5, y + 5, {
          width: colWidths.cantidad,
          align: "center",
        });
        doc.text(row.proveedor, marginLeft + colWidths.producto + colWidths.cantidad + 5, y + 5, {
          width: colWidths.proveedor,
          align: "left",
        });

        y += itemHeight;

        // Salto de página automático
        if (y > 700) {
          doc.addPage();
          y = 50;

          // Repetir encabezados
          doc.rect(marginLeft, y, pageWidth, itemHeight).fill("#f0f0f0");
          doc.fillColor("black").font("Helvetica-Bold").fontSize(12);

          doc.text("Producto", marginLeft + 5, y + 5, {
            width: colWidths.producto,
            align: "left",
          });
          doc.text("Cantidad", marginLeft + colWidths.producto + 5, y + 5, {
            width: colWidths.cantidad,
            align: "center",
          });
          doc.text("Proveedor", marginLeft + colWidths.producto + colWidths.cantidad + 5, y + 5, {
            width: colWidths.proveedor,
            align: "left",
          });

          y += itemHeight;
        }
      });

      // Línea final
      doc
        .moveTo(marginLeft, y)
        .lineTo(marginLeft + pageWidth, y)
        .strokeColor("#000000")
        .stroke();
    };

    await generarYEnviarPDF(res, generarContenidoPDF, "reporte_compras.pdf");
  } catch (error) {
    console.error("Error generando reporte Compras:", error);
    res.status(500).json({ message: "Error al generar reporte" });
  }
};

module.exports = {
  getOrdenesCompra,
  createOrdenCompra,
  generarReporteComprasPDF
};
