import { Link } from "react-router-dom";
import LoginForm from "../../components/Form/LoginForm";

const LoginPage = () => {

    return (
        <main>

            <section className="login-container">

                <div className="signup-form">

                    <div className="signup-form__content-container">

                        <Link to="/">
                            <img src='../assets/svg/collabs-logo.svg' alt="Collabs" />
                        </Link>

                        <div className="signup-form__content-container__form">

                            <div className="signup-form__content-container__form__title">
                                <h1 className="title-40">Iniciar sesión</h1>
                                <p className="subtitle">¿Aún no tienes una cuenta? <Link to="/auth/crear-cuenta" className="link">Regístrate</Link></p>
                            </div>

                            <LoginForm />

                        </div>

                    </div>

                </div>

                <div className="login-image">
                    <img src="../assets/svg/collaborators-in-line-facing-left.svg" alt="Inicia sesión en Collabs" />
                </div>

            </section>

        </main>

    )
}

export default LoginPage;