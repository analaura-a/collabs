import Button from "..//Button/Button";
import Input from "../Inputs/Input";

const SignupForm = () => {

    return (

        <form action="">

            <div className="form__fullname">
                <Input label="Nombre" type="text" placeholder="Nombre" required></Input>
                <Input label="Apellido" type="text" placeholder="Apellido" required></Input>
            </div>

            <Input label="Correo electrónico" type="email" placeholder="ejemplo@email.com" required></Input>

            <Input label="Contraseña" type="password" placeholder="***************" helperText="Debe contener mínimo 8 caracteres." required></Input>

            <Button type="submit" size="large" width="fullwidth">Crear cuenta</Button>

        </form>

    )
}

export default SignupForm;