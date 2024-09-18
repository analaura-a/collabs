import { useState, useEffect } from 'react';
import Select from '../../../Inputs/Select';

const roles = [
    { value: 'UX/UI Designer', label: 'UX/UI Designer' },
    { value: 'Web Designer', label: 'Web Designer' },
    { value: 'Frontend Developer', label: 'Frontend Developer' },
    { value: 'Backend Developer', label: 'Backend Developer' },
    { value: 'Fullstack Developer', label: 'Fullstack Developer' },
    { value: 'Mobile Developer', label: 'Mobile Developer' },
    { value: 'No-code Developer', label: 'No-code Developer' },
    { value: 'Project Manager', label: 'Project Manager' },
    { value: 'QA Tester', label: 'QA Tester' },
];

const CreateProjectForm2 = ({ onChange, onValidate, initialData }) => {

    const [role, setRole] = useState(initialData?.founder_role || '');

    useEffect(() => {
        onChange({
            founder_role: role,
        });

        const isValid = role.trim().length > 0;
        onValidate(isValid);
    }, [role]);

    return (
        <form className="create-project__form-with-inputs">
            <Select
                label="Perfil profesional"
                name="founder_role"
                id="founder_role"
                value={role}
                defaultText="Selecciona el perfil profesional"
                options={roles}
                onChange={(e) => setRole(e.target.value)}
                required />
        </form>
    );

};

export default CreateProjectForm2;