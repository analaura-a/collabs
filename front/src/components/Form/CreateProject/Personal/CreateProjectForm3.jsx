import { useState, useEffect } from 'react';
import OpenPositionAccordion from '../../../Accordion/OpenPositionAccordion';
import Select from '../../../Inputs/Select';
import SkillSearchWithLabel from '../../../Inputs/SkillSearchWithLabel';
import Button from '../../../Button/Button';
import AddIcon from '../../../../assets/svg/plus.svg?react';

const profiles = [
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

const CreateProjectForm3 = ({ onChange, onValidate, initialData }) => {

    const [openPositions, setOpenPositions] = useState(initialData?.open_positions || []);

    const validateOpenPositions = (positions) => {
        if (positions.length === 0) return false;
        return positions.every(pos => pos.profile && pos.required_skills.length > 0);
    };

    useEffect(() => {
        const isValid = validateOpenPositions(openPositions);
        onChange({ open_positions: openPositions });
        onValidate(isValid);
    }, [openPositions]);

    // Añadir una nueva posición
    const addOpenPosition = () => {
        setOpenPositions([...openPositions, { profile: '', required_skills: [], desired_skills: [] }]);
    };

    // Eliminar una posición
    const removeOpenPosition = (index) => {
        setOpenPositions(openPositions.filter((_, i) => i !== index));
    };

    // Manejar cambios en cada posición
    const updateOpenPosition = (index, updatedPosition) => {
        const newPositions = openPositions.map((pos, i) => (i === index ? updatedPosition : pos));
        setOpenPositions(newPositions);
    };


    return (
        <div className="create-project__positions">

            {openPositions.map((position, index) => (
                <OpenPositionAccordion
                    key={index}
                    title={`Colaborador N°${index + 1}`}
                    onDelete={() => removeOpenPosition(index)}
                >

                    <Select
                        label="Perfil profesional"
                        name={`profile_${index}`}
                        id={`profile_${index}`}
                        options={profiles}
                        value={position.profile}
                        defaultText="Selecciona el perfil profesional"
                        onChange={(e) =>
                            updateOpenPosition(index, { ...position, profile: e.target.value })
                        }
                        required
                    />

                    <SkillSearchWithLabel
                        label="Skills requeridas"
                        name={`required_skills_${index}`}
                        helperText="Selecciona solo las skills imprescindibles que necesita la persona para trabajar en el proyecto."
                        selectedSkills={position.required_skills}
                        onSkillAdd={(skill) =>
                            updateOpenPosition(index, {
                                ...position,
                                required_skills: [...position.required_skills, skill],
                            })
                        }
                        onSkillRemove={(skill) =>
                            updateOpenPosition(index, {
                                ...position,
                                required_skills: position.required_skills.filter((s) => s !== skill),
                            })
                        }
                        required
                    />

                    <SkillSearchWithLabel
                        label="Skills deseables"
                        name={`desired_skills_${index}`}
                        selectedSkills={position.desired_skills}
                        onSkillAdd={(skill) =>
                            updateOpenPosition(index, {
                                ...position,
                                desired_skills: [...position.desired_skills, skill],
                            })
                        }
                        onSkillRemove={(skill) =>
                            updateOpenPosition(index, {
                                ...position,
                                desired_skills: position.desired_skills.filter((s) => s !== skill),
                            })
                        }
                    />

                </OpenPositionAccordion>
            ))}

            <Button type="button" size="large" width="fullwidth" color="secondary" icon={<AddIcon />} onClick={addOpenPosition}>Agregar colaborador</Button>

        </div>
    );

};

export default CreateProjectForm3;