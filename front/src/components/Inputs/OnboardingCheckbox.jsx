const OnboardingCheckbox = ({ label, isChecked, onChange, id }) => {

    const handleClick = () => {
        onChange();
    };

    return (
        <div className={`onboarding-input-box ${isChecked ? 'onboarding-input-checked' : ''}`} onClick={handleClick}>

            <input
                type="checkbox"
                id={id}
                name={label}
                value={label}
                checked={isChecked}
                onChange={(e) => e.stopPropagation()}
                className="hidden-input"
            />

            <label htmlFor={id} onClick={handleClick}>
                {label}
            </label>

            <div className="checkbox-circle"></div>

        </div>
    );

};

export default OnboardingCheckbox;