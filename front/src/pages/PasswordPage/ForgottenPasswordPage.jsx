import { Link } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Button/Button";

const ForgottenPasswordPage = () => {

    return (

        <section className="password-page-container">

            <Link to="/">
                <img src='../assets/svg/collabs-logo.svg' alt="Collabs" />
            </Link>

            <div>

                <div className="password-page-container__title">
                    <h1 className="title-40">¿Olvidaste tu contraseña?</h1>
                    <p className="subtitle">No te preocupes, enviaremos un link al correo electrónico con el que te registraste para que puedas reestablecer tu contraseña.</p>
                </div>

                <form action="" className="forgotten-password-form">
                    <Input label="Correo electrónico" type="email" placeholder="ejemplo@email.com" required />
                    <Button type="submit" size="large" width="fullwidth">Enviar link de recuperación</Button>
                </form>

                <Link to="/auth/iniciar-sesion" className="subtitle link">Volver al inicio de sesión</Link>

            </div>

        </section>

    )
}

export default ForgottenPasswordPage;