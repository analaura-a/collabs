import Button from "../../components/Button/Button";
import Stepper from "../../components/Stepper/Stepper"

/* 
-Renderiza el formulario del paso actual y maneja la navegación entre los pasos.
-Llama a la función handleSubmit al finalizar el onboarding.
*/
const OnboardingStep = ({ title, subtitle, form, currentStep, totalSteps, nextStep, prevStep, isNextDisabled }) => {

    return (

        <div>

            <Stepper currentStep={currentStep} totalSteps={totalSteps} />

            <div className="onboarding-page-container__title">
                <h1 className="title-40">{title}</h1>
                <p className="subtitle">{subtitle}</p>
            </div>

            {form}

            <div className="onboarding-page-buttons">
                {currentStep > 0 && <Button size="large" color="secondary" width="full-then-fit" onClick={prevStep}>Atrás</Button>}
                {currentStep < totalSteps - 1 && <Button size="large" width="full-then-fit" onClick={nextStep} disabled={isNextDisabled}>Siguiente</Button>}
                {currentStep === totalSteps - 1 && <Button size="large" width="full-then-fit" onClick={nextStep} disabled={isNextDisabled}>Finalizar</Button>}
            </div>

        </div>

    )

}

export default OnboardingStep;