import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Input from "../Inputs/Input";

const LoginForm = () => {

    return (

        <form action="">

            <Input label="Correo electrónico" type="email" placeholder="ejemplo@email.com" required></Input>

            <Input label="Contraseña" type="password" placeholder="***************" required></Input>

            <Link to="/auth/contraseña-olvidada" className="helper-text link">¿Contraseña olvidada?</Link>

            <Button type="submit" size="large" width="fullwidth">Iniciar sesión</Button>

        </form>

    )
}

export default LoginForm;