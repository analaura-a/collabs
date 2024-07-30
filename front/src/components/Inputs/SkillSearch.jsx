import { useState, useEffect } from 'react';
import { fetchSkills, addSkill } from '../../services/skillService';

const SkillSearch = ({ selectedSkills, onSkillAdd, onSkillRemove }) => {

    const [skills, setSkills] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [showAddOption, setShowAddOption] = useState(false);

    const loadSkills = async () => {
        try {
            const fetchedSkills = await fetchSkills();
            setSkills(fetchedSkills);
        } catch (error) {
            console.error('Error al cargar las habilidades:', error);
            //Agregar feedback al usuario
        }
    };

    useEffect(() => {
        loadSkills();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const normalizedSearchTerm = searchTerm.trim().toLowerCase();
            const matchedSkills = skills.filter(skill =>
                skill.toLowerCase().includes(normalizedSearchTerm) && !selectedSkills.includes(skill)
            );
            setFilteredSkills(matchedSkills);
            setShowAddOption(matchedSkills.length === 0);
        } else {
            setFilteredSkills([]);
            setShowAddOption(false);
        }
    }, [searchTerm, skills, selectedSkills]);

    const handleSkillAdd = async (skill) => {
        const capitalizeFirstLetter = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };
        const normalizedSkill = capitalizeFirstLetter(skill.trim());

        if (!skills.includes(normalizedSkill)) {
            try {
                await addSkill(normalizedSkill);
                setSkills([...skills, normalizedSkill]);
            } catch (error) {
                console.error('Error al agregar la habilidad:', error);
            }
        }
        onSkillAdd(normalizedSkill);
        setSearchTerm('');
    };

    return (
        <form>

            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscá tecnologías, habilidades, conocimientos..."
            />

            {filteredSkills.length > 0 && (
                <ul >
                    {filteredSkills.map((skill) => (
                        <li key={skill} onClick={() => handleSkillAdd(skill)}>
                            {skill}
                        </li>
                    ))}
                </ul>
            )}

            {showAddOption && (
                <div onClick={() => handleSkillAdd(searchTerm)}>
                    Agregar "{searchTerm.trim().charAt(0).toUpperCase() + searchTerm.trim().slice(1)}"
                </div>
            )}

            <div>
                {selectedSkills.map((skill) => (
                    <div key={skill} >
                        {skill}
                        <button type="button" onClick={() => onSkillRemove(skill)}>X</button>
                    </div>
                ))}
            </div>

        </form>
    );

};


export default SkillSearch;