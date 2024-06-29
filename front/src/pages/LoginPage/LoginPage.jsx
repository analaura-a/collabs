import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

const LoginPage = () => {

    return (

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

                        <form action="">

                            <div className="form__label-input">
                                <label htmlFor="email" className="form-label">Correo electrónico<span className="primary-color-text">*</span></label>
                                <input type="email" id="email" placeholder="ejemplo@email.com" ></input>
                            </div>

                            <div className="form__label-input-with-text">
                                <div className="form__label-input">
                                    <label htmlFor="password" className="form-label">Contraseña<span className="primary-color-text">*</span></label>
                                    <input type="password" id="password" aria-describedby="passwordHelpBlock" placeholder="***************" ></input>
                                </div>
                            </div>

                            <Button type="submit" size="large" width="fullwidth">Iniciar sesión</Button>

                        </form>

                    </div>

                </div>

            </div>

            <div className="login-image">
                <img src="../assets/svg/collaborators-in-line-facing-left.svg" alt="Inicia sesión en Collabs" />
            </div>

        </section>

    )
}

export default LoginPage;