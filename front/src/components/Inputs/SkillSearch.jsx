import { useState, useEffect } from 'react';
import { fetchSkills, addSkill } from '../../services/skillService';
import { useToast } from '../../context/ToastContext';

const SkillSearch = ({ selectedSkills, onSkillAdd, onSkillRemove }) => {

    const { addToast } = useToast();

    const [skills, setSkills] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [showAddOption, setShowAddOption] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loadSkills = async () => {
        try {
            const fetchedSkills = await fetchSkills();
            setSkills(fetchedSkills);
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al cargar las skills disponibles',
                message: 'Ocurrió un error desconocido al intentar cargar las skills. Inténtalo de nuevo más tarde.'
            });
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
                setIsSubmitting(true);
                await addSkill(normalizedSkill);
                setSkills([...skills, normalizedSkill]);
                setIsSubmitting(false);
            } catch (error) {
                addToast({
                    type: 'error',
                    title: 'Error al agregar la skill',
                    message: 'Ocurrió un error desconocido al intentar agregar la skill. Inténtalo de nuevo más tarde.'
                });
            }
        }

        onSkillAdd(normalizedSkill);
        setSearchTerm('');

    };

    return (
        <div className="skill-search-container">

            <form className="skill-search" onSubmit={(e) => { e.preventDefault(); }}>

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
                        <li onClick={() => { if (isSubmitting) { return } else { handleSkillAdd(searchTerm) } }}>
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