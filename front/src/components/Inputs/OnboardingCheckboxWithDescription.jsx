const OnboardingCheckboxWithDescription = ({ id, svg, title, description, isChecked, onChange }) => {

    const handleClick = () => {
        onChange();
    };

    return (
        <div className={`onboarding-input-box-with-description ${isChecked ? 'onboarding-input-box-with-description-checked' : ''}`} onClick={handleClick}>

            <input
                type="checkbox"
                id={id}
                name={title}
                value={title}
                checked={isChecked}
                onChange={(e) => e.stopPropagation()}
                className="hidden-input"
            />

            <img src={svg} alt={title} />

            <div className="onboarding-input-box__text-container">
                <label htmlFor={id} onClick={handleClick}>
                    {title}
                </label>

                <p>{description}</p>
            </div>

            <div className="checkbox-circle"></div>

        </div>
    );

};

export default OnboardingCheckboxWithDescription;