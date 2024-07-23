const OnboardingRadioButton = ({ label, isSelected, onChange, id, name }) => {

    const handleClick = () => {
        onChange();
    };

    return (
        <div className={`onboarding-checkbox ${isSelected ? 'checkbox-checked' : ''}`} onClick={handleClick}>

            <input
                type="radio"
                id={id}
                name={name}
                checked={isSelected}
                onChange={(e) => e.stopPropagation()}
                className="hidden-checkbox"
            />

            <label htmlFor={id} onClick={handleClick}>
                {label}
            </label>

        </div>
    );

}

export default OnboardingRadioButton;