import { useState, useEffect } from 'react';
import OnboardingRadioButton from '../../Inputs/OnboardingRadioButton';

const options = [
    'Novato (0 a 3 meses)',
    'Principiante (4 a 6 meses)',
    'Aprendiz (7 a 12 meses)',
    'Competente (de 1 a 2 años)',
    'Eficiente (más de 2 años)',
    'Avanzado (más de 5 años)'
];

const OnboardingForm4 = ({ onChange, onValidate, initialData }) => {

    const [selectedOption, setSelectedOption] = useState(initialData?.option || '');

    useEffect(() => {
        onChange({ experience: selectedOption });
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
                        name="knowledge-options"
                        label={option}
                        isSelected={selectedOption === option}
                        onChange={() => handleRadioChange(option)} />
                ))}
            </div>
        </form>
    );

};

export default OnboardingForm4;