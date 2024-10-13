import {useState} from "react";
import { Link , useParams , useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Button/Button";
import { resetPassword } from "../../services/passwordService";

const ResetPasswordPage = () => {
 // Extraemos el token desde la URL
  const { token } = useParams(); 
  const navigate = useNavigate(); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Resetear el error si las contraseñas coinciden
    setError('');

    try {
      const response = await resetPassword(token, password);
      setMessage(response.message); 

      // Redirigimos al usuario (opcional, podrías redirigir a la página de login)
      setTimeout(() => {
        navigate('/auth/iniciar-sesion'); 
      }, 3000);
    } catch (error) {
      setError(error.message); // Mostramos mensaje de error
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
                        <Input label="Nueva contraseña" type="password" placeholder="***************" helperText="Debe contener mínimo 8 caracteres." value={password}  onChange={(e) => setPassword(e.target.value)} required />
                        <Input label="Confirmar nueva contraseña" type="password" placeholder="***************" value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)} required />
                         {error && <p style={{ color: 'red' }}>{error}</p>} 
                         {message && <p style={{ color: 'green' }}>{message}</p>}
                        <Button type="submit" size="large" width="fullwidth">Guardar contraseña</Button>
                    </form>

                </div>

            </section>

        </main>
    )
}

export default ResetPasswordPage;