import { Link } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Button/Button";

const ResetPasswordPage = () => {

    return (

        <section className="password-page-container">

            <Link to="/">
                <img src='../assets/svg/collabs-logo.svg' alt="Collabs" />
            </Link>

            <div>

                <div className="password-page-container__title">
                    <h1 className="title-40">Restablecer contraseña</h1>
                </div>

                <form action="" className="reset-password-form">
                    <Input label="Nueva contraseña" type="password" placeholder="***************" helperText="Debe contener mínimo 8 caracteres." required />
                    <Input label="Confirmar nueva contraseña" type="password" placeholder="***************" required />
                    <Button type="submit" size="large" width="fullwidth">Guardar contraseña</Button>
                </form>

            </div>

        </section>

    )
}

export default ResetPasswordPage;