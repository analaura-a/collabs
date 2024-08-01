const Stepper = ({ currentStep, totalSteps }) => {

    return (
        <div className="stepper">
            {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                    key={index}
                    className={`stepper-line ${index < currentStep ? 'stepper-line-completed' : ''}`}
                ></div>
            ))}
        </div>
    )

}

export default Stepper;