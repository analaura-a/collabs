import { useState, useEffect } from 'react';
import { fetchSkills, addSkill } from '../../services/skillService';

const SkillSearchWithLabel = ({ label, name, helperText, required, selectedSkills, onSkillAdd, onSkillRemove }) => {

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

            <div className="skill-search">


                <div className="input-group-with-text">

                    <div className="input-group-skillsearch">

                        {label && (
                            <label htmlFor={name} className="form-label">
                                {label}{required && <span className="primary-color-text">*</span>}{!required && <span className="black-light-color-text"> (opcional)</span>}
                            </label>
                        )}

                        <input
                            type="search"
                            name={name}
                            id={name}
                            value={searchTerm}
                            className="skill-search-input"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Busca tecnologías, habilidades, conocimientos..."
                        />

                    </div>

                    {helperText && <p className="helper-text">{helperText}</p>}

                </div>

                {filteredSkills.length > 0 && (
                    <ul className="skill-search-options-2">
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

            </div>

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

export default SkillSearchWithLabel;