import { useState, useEffect } from 'react';
// const SearchAndFilters = ({ onSearch, onFilterChange, filters }) => {

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

const SearchAndFilters = ({ placeholder, onSearch, onFilterChange }) => {

    const [searchTerm, setSearchTerm] = useState('');

    const [activeFilter, setActiveFilter] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedAvailabilities, setSelectedAvailabilities] = useState([]);

    useEffect(() => {
        onSearch(searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        onFilterChange({ roles: selectedRoles, availability: selectedAvailabilities });
    }, [selectedRoles, selectedAvailabilities]);

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
                        Rol
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
                    <button className={`search-and-filters__filter-toggle smaller-paragraph bold-text ${activeFilter === 'availability' ? 'search-and-filters__filter-toggle-active' : ''}`} onClick={() => toggleFilter('availability')}>
                        Disponibilidad
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

            </ul>

        </form >
    );
};

export default SearchAndFilters;
