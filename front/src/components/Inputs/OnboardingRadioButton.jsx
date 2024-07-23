const OnboardingRadioButton = ({ label, isSelected, onChange, id, name }) => {

    const handleClick = () => {
        onChange();
    };

    return (
        <div className={`onboarding-input-box ${isSelected ? 'onboarding-input-checked' : ''}`} onClick={handleClick}>

            <input
                type="radio"
                id={id}
                name={name}
                checked={isSelected}
                onChange={(e) => e.stopPropagation()}
                className="hidden-input"
            />

            <label htmlFor={id} onClick={handleClick}>
                {label}
            </label>

        </div>
    );

}

export default OnboardingRadioButton;