import { useState, useEffect } from 'react';
import SkillSearch from './SkillSearch';

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

const availabilities = [
    'De 1 a 2 horas / día',
    'De 3 a 4 horas / día',
    'De 5 a 6 horas / día',
    '+7 horas / día'
];

const experienceLevels = [
    'Novato (0 a 3 meses)',
    'Principiante (4 a 6 meses)',
    'Aprendiz (7 a 12 meses)',
    'Competente (de 1 a 2 años)',
    'Eficiente (más de 2 años)',
    'Avanzado (más de 5 años)'
];

const SearchAndFilters = ({ placeholder, onSearch, onFilterChange, showExperienceLevelFilter }) => {

    const [searchTerm, setSearchTerm] = useState('');

    const [activeFilter, setActiveFilter] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedAvailabilities, setSelectedAvailabilities] = useState([]);
    const [selectedExperienceLevel, setSelectedExperienceLevel] = useState([]);

    useEffect(() => {
        onSearch(searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        onFilterChange({
            roles: selectedRoles,
            availability: selectedAvailabilities,
            experienceLevel: selectedExperienceLevel,
            skills: selectedSkills
        });
    }, [selectedRoles, selectedAvailabilities, selectedExperienceLevel, selectedSkills]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const toggleFilter = (filterName) => {
        setActiveFilter(activeFilter === filterName ? null : filterName);
    };

    const handleCheckboxChange = (event, setSelected, selected) => {
        const value = event.target.id;
        if (selected.includes(value)) {
            setSelected(selected.filter((item) => item !== value));
        } else {
            setSelected([...selected, value]);
        }
    };

    // Funciones para manejar la selección de skills en el filtro
    const handleSkillAdd = (skill) => {
        const newSelectedSkills = [...selectedSkills, skill];
        setSelectedSkills(newSelectedSkills);
    };

    const handleSkillRemove = (skill) => {
        const newSelectedSkills = selectedSkills.filter(s => s !== skill);
        setSelectedSkills(newSelectedSkills);
    };

    return (
        <form className="search-and-filters" onSubmit={(e) => e.preventDefault()}>

            <label htmlFor="search-input" className="visually-hidden">Buscar</label>
            <input
                type="search"
                id="search-input"
                className="skill-search-input"
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Buscar"
            />

            <ul className="search-and-filters__filters-toggle-container">

                <li className="search-and-filters__filter">
                    <button className={`search-and-filters__filter-toggle smaller-paragraph bold-text ${activeFilter === 'role' ? 'search-and-filters__filter-toggle-active' : ''}`} onClick={() => toggleFilter('role')}>
                        <div className="search-and-filters__filter-toggle__name">
                            Rol

                            {selectedRoles.length > 0 && (
                                <span className="filter-count-indicator">{selectedRoles.length}</span>
                            )}
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" fill="none">
                            <path stroke="#3B3B3C" strokeLinecap="round" strokeWidth="1.5" d="m1 1 4.146 3.554a.8.8 0 0 0 1.041 0L10.333 1" />
                        </svg>
                    </button>

                    {activeFilter === 'role' && (
                        <div className="search-and-filters__filter-dropdown">
                            <h2 className="title-18">Rol</h2>

                            <fieldset className="search-and-filters__checkboxes-container">
                                {roles.map((role) => (
                                    <div className="search-and-filters__checkbox" key={role}>
                                        <input
                                            type="checkbox"
                                            name="role"
                                            value={role}
                                            id={role}
                                            checked={selectedRoles.includes(role)}
                                            onChange={(e) => handleCheckboxChange(e, setSelectedRoles, selectedRoles)}
                                        />
                                        <label htmlFor={role} className="subtitle">{role}</label>
                                    </div>
                                ))}
                            </fieldset>
                        </div>
                    )}
                </li>

                <li className="search-and-filters__filter">
                    <button className={`search-and-filters__filter-toggle smaller-paragraph bold-text ${activeFilter === 'skills' ? 'search-and-filters__filter-toggle-active' : ''}`} onClick={() => toggleFilter('skills')}>
                        <div className="search-and-filters__filter-toggle__name">
                            Skills

                            {selectedSkills.length > 0 && (
                                <span className="filter-count-indicator">{selectedSkills.length}
                                </span>)}
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" fill="none"> <path stroke="#3B3B3C" strokeLinecap="round" strokeWidth="1.5" d="m1 1 4.146 3.554a.8.8 0 0 0 1.041 0L10.333 1" />
                        </svg>
                    </button>

                    {activeFilter === 'skills' && (
                        <div className="search-and-filters__filter-dropdown search-and-filters__filter-dropdown-skills">
                            <h2 className="title-18">Skills</h2>
                            <SkillSearch
                                selectedSkills={selectedSkills}
                                onSkillAdd={handleSkillAdd}
                                onSkillRemove={handleSkillRemove}
                            />
                        </div>
                    )}
                </li>

                <li className="search-and-filters__filter">
                    <button className={`search-and-filters__filter-toggle smaller-paragraph bold-text ${activeFilter === 'availability' ? 'search-and-filters__filter-toggle-active' : ''}`} onClick={() => toggleFilter('availability')}>
                        <div className="search-and-filters__filter-toggle__name">
                            Disponibilidad

                            {selectedAvailabilities.length > 0 && (
                                <span className="filter-count-indicator">{selectedAvailabilities.length}</span>
                            )}
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" fill="none">
                            <path stroke="#3B3B3C" strokeLinecap="round" strokeWidth="1.5" d="m1 1 4.146 3.554a.8.8 0 0 0 1.041 0L10.333 1" />
                        </svg>
                    </button>

                    {activeFilter === 'availability' && (
                        <div className="search-and-filters__filter-dropdown">
                            <h2 className="title-18">Disponibilidad</h2>

                            <fieldset className="search-and-filters__checkboxes-container">
                                {availabilities.map((availability) => (
                                    <div className="search-and-filters__checkbox" key={availability}>
                                        <input
                                            type="checkbox"
                                            name="availability"
                                            value={availability}
                                            id={availability}
                                            checked={selectedAvailabilities.includes(availability)}
                                            onChange={(e) => handleCheckboxChange(e, setSelectedAvailabilities, selectedAvailabilities)}
                                        />
                                        <label htmlFor={availability} className="subtitle">{availability}</label>
                                    </div>
                                ))}
                            </fieldset>
                        </div>
                    )}
                </li>

                {showExperienceLevelFilter && (
                    <li className="search-and-filters__filter">
                        <button className={`search-and-filters__filter-toggle smaller-paragraph bold-text ${activeFilter === 'experienceLevel' ? 'search-and-filters__filter-toggle-active' : ''}`} onClick={() => toggleFilter('experienceLevel')}>
                            <div className="search-and-filters__filter-toggle__name">
                                Nivel

                                {selectedExperienceLevel.length > 0 && (
                                    <span className="filter-count-indicator">{selectedExperienceLevel.length}</span>
                                )}
                            </div>

                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" fill="none">
                                <path stroke="#3B3B3C" strokeLinecap="round" strokeWidth="1.5" d="m1 1 4.146 3.554a.8.8 0 0 0 1.041 0L10.333 1" />
                            </svg>
                        </button>

                        {activeFilter === 'experienceLevel' && (
                            <div className="search-and-filters__filter-dropdown">
                                <h2 className="title-18">Nivel de conocimiento</h2>

                                <fieldset className="search-and-filters__checkboxes-container">
                                    {experienceLevels.map((level) => (
                                        <div className="search-and-filters__checkbox" key={level}>
                                            <input
                                                type="checkbox"
                                                name="experienceLevel"
                                                id={level}
                                                checked={selectedExperienceLevel.includes(level)}
                                                onChange={(e) => handleCheckboxChange(e, setSelectedExperienceLevel, selectedExperienceLevel)}
                                            />
                                            <label htmlFor={level} className="subtitle">{level}</label>
                                        </div>
                                    ))}
                                </fieldset>
                            </div>
                        )}
                    </li>
                )}

            </ul>

        </form >
    );
};

export default SearchAndFilters;