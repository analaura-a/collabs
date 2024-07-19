const OnboardingCheckbox = ({ label, isChecked, onChange, id }) => {

    const handleClick = () => {
        onChange();
    };

    return (
        <div className={`onboarding-checkbox ${isChecked ? 'checkbox-checked' : ''}`} onClick={handleClick}>

            <input
                type="checkbox"
                id={id}
                name={label}
                checked={isChecked}
                onChange={(e) => e.stopPropagation()}
                className="hidden-checkbox"
            />

            <label htmlFor={id} onClick={handleClick}>
                {label}
            </label>

            <div className="checkbox-circle"></div>

        </div>
    );

};

export default OnboardingCheckbox;