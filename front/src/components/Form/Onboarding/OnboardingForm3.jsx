import { useState, useEffect } from 'react';
import SkillSearch from '../../Inputs/SkillSearch';

const OnboardingForm3 = ({ onChange, onValidate, initialData }) => {

    const [selectedSkills, setSelectedSkills] = useState(initialData?.skills || []);

    useEffect(() => {
        onChange({ skills: selectedSkills });
        onValidate(selectedSkills.length > 2);
    }, [selectedSkills]);

    const handleSkillAdd = (skill) => {
        setSelectedSkills((prevSelectedSkills) => [...prevSelectedSkills, skill]);
    };

    const handleSkillRemove = (skill) => {
        setSelectedSkills((prevSelectedSkills) => prevSelectedSkills.filter((s) => s !== skill));
    };

    return (
        <SkillSearch
            selectedSkills={selectedSkills}
            onSkillAdd={handleSkillAdd}
            onSkillRemove={handleSkillRemove}
        />
    );
}

export default OnboardingForm3;