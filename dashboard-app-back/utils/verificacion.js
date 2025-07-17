const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail", // o SMTP personalizado
        
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },

});

const enviarCodigoVerificacion = async (email, codigo) => {
    console.log("Email user:", process.env.EMAIL_USER);
    console.log("Email pass:", process.env.EMAIL_PASS);
    const mailOptions = {
        from: `"Dashboard App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Código de Verificación",
        text: `Tu código de verificación es: ${codigo}`,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = enviarCodigoVerificacion;
