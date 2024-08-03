import { useState, useEffect } from 'react';
import OnboardingRadioButton from '../../Inputs/OnboardingRadioButton';

const options = [
    'De 1 a 2 horas / día',
    'De 3 a 4 horas / día',
    'De 5 a 6 horas / día',
    '+7 horas / día'
];

const OnboardingForm6 = ({ onChange, onValidate, initialData }) => {

    const [selectedOption, setSelectedOption] = useState(initialData?.option || '');

    useEffect(() => {
        onChange({ availability: selectedOption });
        onValidate(selectedOption !== '');
    }, [selectedOption]);

    const handleRadioChange = (option) => {
        setSelectedOption(option);
    };

    return (
        <form>
            <div className="onboarding-input-container">
                {options.map((option, index) => (
                    <OnboardingRadioButton
                        key={option}
                        id={`radio-${index}`}
                        name="availability-options"
                        label={option}
                        isSelected={selectedOption === option}
                        onChange={() => handleRadioChange(option)} />
                ))}
            </div>
        </form>
    );

};

export default OnboardingForm6;