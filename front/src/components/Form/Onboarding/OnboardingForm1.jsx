import Input from "../../Inputs/Input";

/*
Manejan los cambios en los datos del formulario y los pasan al componente OnboardingPage.
*/
const OnboardingForm1 = () => {

    return (

        <form className="onboarding-form-1">
            <Input label="Nombre de usuario" id="username" name="username" placeholder="Nombre de usuario" helperText="collabs.com/nombredeusuario" required />
        </form>

    );

};

export default OnboardingForm1;