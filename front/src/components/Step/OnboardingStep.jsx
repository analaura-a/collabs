import Input from "../../components/Inputs/Input";
import Button from "../../components/Button/Button";

/* 
-Renderiza el formulario del paso actual y maneja la navegación entre los pasos.
-Llama a la función handleSubmit al finalizar el onboarding.
*/
const OnboardingStep = () => {

    return (

        <div>

            <div className="onboarding-page-container__title">
                <h1 className="title-40">Crea tu nombre de usuario</h1>
                <p className="subtitle">Se verá reflejado en la URL pública de tu perfil. Debe tener máximo 15 caracteres, estar en minúsculas y solo tener letras, números o guiones.</p>
            </div>

            <form className="forgotten-password-form">
                <Input label="Nombre de usuario" placeholder="Nombre de usuario" helperText="collabs.com/nombredeusuario" required />

            </form>

            <div className="onboarding-page-buttons">
                <Button size="large" color="secondary" width="full-then-fit">Atrás</Button>
                <Button size="large" width="full-then-fit">Siguiente</Button>
            </div>

        </div>

    )

}

export default OnboardingStep;