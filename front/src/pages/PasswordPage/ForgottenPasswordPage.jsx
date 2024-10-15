import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Button/Button";
import { requestPasswordReset } from '../../services/passwordService';
import { useToast } from "../../context/ToastContext";

const ForgottenPasswordPage = () => {

  const [email, setEmail] = useState('');

  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await requestPasswordReset(email);

      addToast({
        type: 'success',
        title: '¡Correo electrónico enviado con éxito!',
        message: 'Revisa tu bandeja de entrada para restablecer la contraseña.'
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Error al enviar el correo electrónico',
        message: error.message
      });
    }
  };

  return (
    <main className='faded-pattern-container'>

      <div className="faded-pattern faded-pattern-top-left"></div>
      <div className="faded-pattern faded-pattern-bottom-right"></div>

      <section className="password-page-container">

        <Link to="/">
          <img src='../assets/svg/collabs-logo.svg' alt="Collabs" />
        </Link>

        <div>

          <div className="password-page-container__title">
            <h1 className="title-40">¿Olvidaste tu contraseña?</h1>
            <p className="subtitle">No te preocupes, enviaremos un link al correo electrónico con el que te registraste para que puedas reestablecer tu contraseña.</p>
          </div>

          <form onSubmit={handleSubmit} className="forgotten-password-form">
            <Input label="Correo electrónico" type="email" placeholder="ejemplo@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Button type="submit" size="large" width="fullwidth">Enviar link de recuperación</Button>
          </form>

          <Link to="/auth/iniciar-sesion" className="subtitle link">Volver al inicio de sesión</Link>

        </div>

      </section>

    </main>
  )
}

export default ForgottenPasswordPage;