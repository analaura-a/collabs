import Button from '../Button/Button';
import Stepper from '../Stepper/Stepper';

const CreateProjectStep = ({ step, title, subtitle, form, currentStep, totalSteps, nextStep, prevStep, isNextDisabled, handleComplete, sendDisabled }) => {

    return (
        <>
            <Stepper currentStep={currentStep} totalSteps={totalSteps} />

            <div className="create-project__step">
                <div className="create-project__header">
                    <div className="create-project__header__title">
                        <p className="create-project__header__step subtitle primary-color-text medium-text">Paso {step}</p>
                        <h2 className="title-20 medium-text">{title}</h2>
                    </div>

                    <p className="paragraph-18">{subtitle}</p>
                </div>
            </div>

            {form}

            <div className="onboarding-page-buttons">
                {currentStep > 0 && <Button size="large" color="secondary" width="full-then-fit" onClick={prevStep}>Atrás</Button>}
                {currentStep < totalSteps - 1 && <Button size="large" width="full-then-fit" onClick={nextStep} disabled={isNextDisabled}>Siguiente</Button>}
                {currentStep === totalSteps - 1 && <Button size="large" width="full-then-fit" onClick={handleComplete} disabled={sendDisabled}>Publicar</Button>}
            </div>
        </>
    )

}

export default CreateProjectStep;