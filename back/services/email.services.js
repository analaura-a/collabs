import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173'
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// Configuración del servicio de correo electrónico
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Enviar el correo de restablecimiento de contraseña
async function sendResetPasswordEmail(email, token) {

  const resetLink = `${CLIENT_ORIGIN}/auth/restablecer-contraseña/${token}`;

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: 'Restablecimiento de contraseña',
    html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
             <a href="${resetLink}">Restablecer contraseña</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    // console.error('Error al enviar el correo:', error);
    throw new Error('No se pudo enviar el correo de restablecimiento.');
  }
}

export {
  sendResetPasswordEmail
};