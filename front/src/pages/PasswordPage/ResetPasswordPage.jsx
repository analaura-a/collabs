import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Button/Button";
import { resetPassword } from "../../services/passwordService";
import { useToast } from "../../context/ToastContext";

const ResetPasswordPage = () => {

  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      addToast({
        type: 'info',
        title: 'Las contraseñas no coinciden',
        message: 'Revisa que ambas contraseñas sean idénticas.'
      });

      return;
    }

    try {
      const response = await resetPassword(token, password);

      navigate('/auth/iniciar-sesion');

      addToast({
        type: 'success',
        title: 'Tu contraseña se restauró con éxito',
        message: 'Inicia sesión para continuar.'
      });

    } catch (error) {
      addToast({
        type: 'error',
        title: 'Error al restablecer la contraseña',
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
          <img src='../../assets/svg/collabs-logo.svg' alt="Collabs" />
        </Link>

        <div>

          <div className="password-page-container__title">
            <h1 className="title-40">Restablecer contraseña</h1>
          </div>

          <form onSubmit={handleSubmit} className="reset-password-form">
            <Input label="Nueva contraseña" type="password" placeholder="***************" helperText="Debe contener mínimo 8 caracteres." value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Input label="Confirmar nueva contraseña" type="password" placeholder="***************" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

            <Button type="submit" size="large" width="fullwidth">Guardar contraseña</Button>
          </form>

        </div>

      </section>

    </main>
  )
}

export default ResetPasswordPage;