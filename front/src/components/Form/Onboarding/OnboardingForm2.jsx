import { useState, useEffect } from 'react';

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
            {roles.map((role) => (
                <label key={role}>
                    <input
                        type="checkbox"
                        name={role}
                        value={role}
                        checked={selectedRoles.includes(role)}
                        onChange={() => handleCheckboxChange(role)}
                    />
                    {role}
                </label>
            ))}
        </form>
    );

};

export default OnboardingForm2;