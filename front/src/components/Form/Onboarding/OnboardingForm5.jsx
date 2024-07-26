import { useState, useEffect } from 'react';
import OnboardingCheckboxWithDescription from '../../Inputs/OnboardingCheckboxWithDescription';

const preferences = [
    {
        id: 'preference1',
        svg: '../../assets/svg/personal-project.svg',
        title: 'Personal',
        description: 'Los proyectos personales (“cerrados”) son aquellos en los que solo el equipo de personas trabajando en él puede acceder y colaborar activamente en su realización.'
    },
    {
        id: 'preference2',
        svg: '../../assets/svg/open-source-project.svg',
        title: 'Open-source',
        description: 'Los proyectos open-source son aquellos en los que su diseño y desarrollo son compartidos públicamente, por lo que cualquier persona puede unirse a contribuir en cualquier momento.'
    }
];

const OnboardingForm5 = ({ onChange, onValidate, initialData }) => {

    const [selectedPreferences, setSelectedPreferences] = useState(initialData?.preferences || []);

    useEffect(() => {
        onChange({ preferences: selectedPreferences });
        onValidate(selectedPreferences.length > 0);
    }, [selectedPreferences]);

    const handleCheckboxChange = (id) => {
        setSelectedPreferences((prevSelectedPreferences) =>
            prevSelectedPreferences.includes(id)
                ? prevSelectedPreferences.filter((pref) => pref !== id)
                : [...prevSelectedPreferences, id]
        );
    };

    return (
        <form>
            <div className="onboarding-input-container">
                {preferences.map((preference) => (
                    <OnboardingCheckboxWithDescription
                        key={preference.id}
                        id={preference.id}
                        svg={preference.svg}
                        title={preference.title}
                        description={preference.description}
                        isChecked={selectedPreferences.includes(preference.id)}
                        onChange={() => handleCheckboxChange(preference.id)}
                    />
                ))}
            </div>
        </form>
    );

}

export default OnboardingForm5;