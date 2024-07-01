import { Link } from "react-router-dom";
import SignupForm from "../../components/Form/SignupForm";

const SignupPage = () => {

    return (

        <section className="signup-container">

            <div className="signup-form">

                <div className="signup-form__content-container">

                    <Link to="/">
                        <img src='../assets/svg/collabs-logo.svg' alt="Collabs" />
                    </Link>

                    <div className="signup-form__content-container__form">

                        <div className="signup-form__content-container__form__title">
                            <h1 className="title-40">Crea tu cuenta</h1>
                            <p className="subtitle">¿Ya tienes una cuenta? <Link to="/auth/iniciar-sesion" className="link">Inicia sesión</Link></p>
                        </div>

                        <SignupForm />

                    </div>

                </div>

            </div >

            <div className="signup-image">
                <img src="../assets/png/collaborators-in-circle-facing-left.png" alt="Crea tu cuenta en Collabs" />
            </div>

        </section >

    )
}

export default SignupPage;