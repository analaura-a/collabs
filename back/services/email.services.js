import nodemailer from 'nodemailer';

// Configuración del servicio de correos electrónicos
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'arg.collabs@gmail.com', 
      pass: 'vubkuxowuoupgsgn', 
    },
  });
  
  // Función para enviar el correo de restablecimiento de contraseña
  async function sendResetPasswordEmail(email, token) {
    const resetLink = `http://localhost:5173/auth/restablecer-contraseña/${token}`; 
  
    const mailOptions = {
      from: 'arg.collabs@gmail.com',
      to: email,
      subject: 'Restablecimiento de contraseña',
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
             <a href="${resetLink}">Restablecer contraseña</a>`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('Correo enviado correctamente.');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw new Error('No se pudo enviar el correo de restablecimiento.');
    }
  }

  export {
    sendResetPasswordEmail
  };