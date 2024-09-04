import { useState, useEffect } from 'react';
// const SearchAndFilters = ({ onSearch, onFilterChange, filters }) => {

const SearchAndFilters = ({ placeholder, onSearch }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState(null);

    useEffect(() => {
        onSearch(searchTerm); // Llamamos a la función de búsqueda cada vez que el término cambia
    }, [searchTerm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const toggleFilter = (filterName) => {
        setActiveFilter(activeFilter === filterName ? null : filterName);
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

                                <div className="search-and-filters__checkbox">
                                    <input type="checkbox" name="role" value="category1" id='alo' />
                                    <label htmlFor="alo" className="subtitle">UX/UI Designer</label>
                                </div>


                            </fieldset>
                        </div>
                    )}
                </li>

                <li className="search-and-filters__filter">
                    <button className={`search-and-filters__filter-toggle smaller-paragraph bold-text ${activeFilter === 'skills' ? 'search-and-filters__filter-toggle-active' : ''}`} onClick={() => toggleFilter('skills')}>
                        Skills
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" fill="none">
                            <path stroke="#3B3B3C" strokeLinecap="round" strokeWidth="1.5" d="m1 1 4.146 3.554a.8.8 0 0 0 1.041 0L10.333 1" />
                        </svg>
                    </button>

                    {activeFilter === 'skills' && (
                        <div className="search-and-filters__filter-dropdown">
                            <h2 className="title-18">Skills</h2>

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

                                <div className="search-and-filters__checkbox">
                                    <input type="checkbox" name="availability" value="category1" id='alo2' />
                                    <label htmlFor="alo2" className="subtitle">Media (3-4 horas/día)</label>
                                </div>


                            </fieldset>
                        </div>
                    )}
                </li>

            </ul>

        </form >
    );
};

export default SearchAndFilters;
