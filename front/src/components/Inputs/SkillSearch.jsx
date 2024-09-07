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
            console.error('Error al cargar las skills:', error);
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
                console.error('Error al agregar la skill a la database:', error);
            }
        }

        onSkillAdd(normalizedSkill);
        setSearchTerm('');

    };

    return (
        <div className="skill-search-container">

            <form className="skill-search">

                <input
                    type="search"
                    name="search-skills"
                    value={searchTerm}
                    className="skill-search-input"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Busca tecnologías, habilidades, conocimientos..."
                />

                {filteredSkills.length > 0 && (
                    <ul className="skill-search-options">
                        {filteredSkills.map((skill) => (
                            <li key={skill} onClick={() => handleSkillAdd(skill)}>
                                {skill}
                            </li>
                        ))}
                    </ul>
                )}

                {showAddOption && (
                    <ul className="skill-search-options">
                        <li onClick={() => handleSkillAdd(searchTerm)}>
                            Agregar "{searchTerm.trim().charAt(0).toUpperCase() + searchTerm.trim().slice(1)}"
                        </li>
                    </ul>
                )}

            </form>

            <ul className="skill-search__selected">
                {selectedSkills.map((skill) => (
                    <li key={skill} >
                        {skill}
                        <button type="button" className="skill-search__selected__delete" onClick={() => onSkillRemove(skill)}><img src="../../assets/svg/x.svg" /></button>
                    </li>
                ))}
            </ul>

        </div>
    );

};

export default SkillSearch;