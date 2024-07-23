import { useState, useEffect } from 'react';
import OnboardingCheckbox from '../../Inputs/OnboardingCheckbox';

const roles = [
    'UX/UI Designer',
    'Web Designer',
    'Frontend Developer',
    'Backend Developer',
    'Fullstack Developer',
    'Mobile Developer',
    'No-code Developer',
    'Project Manager',
    'QA Tester'
];

const OnboardingForm2 = ({ onChange, onValidate, initialData }) => {

    const [selectedRoles, setSelectedRoles] = useState(initialData?.roles || []);

    useEffect(() => {
        onChange({ roles: selectedRoles });
        onValidate(selectedRoles.length > 0);
    }, [selectedRoles]);

    const handleCheckboxChange = (role) => {
        setSelectedRoles((prevSelectedRoles) =>
            prevSelectedRoles.includes(role)
                ? prevSelectedRoles.filter((r) => r !== role)
                : [...prevSelectedRoles, role]
        );
    };

    return (
        <form>
            <div className="onboarding-input-container">
                {roles.map((role, index) => (

                    <OnboardingCheckbox
                        key={role}
                        id={`checkbox-${index}`}
                        label={role}
                        isChecked={selectedRoles.includes(role)}
                        onChange={() => handleCheckboxChange(role)}
                    />

                ))}
            </div>
        </form>
    );

};

export default OnboardingForm2;