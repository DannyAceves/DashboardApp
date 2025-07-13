const PDFDocument = require("pdfkit");

function generarYEnviarPDF(res, generarContenidoPDF, nombreArchivo = "reporte.pdf") {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 50 });
            let buffers = [];

            doc.on("data", buffers.push.bind(buffers));
            doc.on("end", () => {
                const pdfData = Buffer.concat(buffers);
                res.writeHead(200, {
                    "Content-Type": "application/pdf",
                    "Content-Disposition": `attachment; filename="${nombreArchivo}"`,
                    "Content-Length": pdfData.length,
                });
                res.end(pdfData);
                resolve();
            });

            generarContenidoPDF(doc);
            doc.end();
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { generarYEnviarPDF };
