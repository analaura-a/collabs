import { useState, useEffect } from 'react';
// const SearchAndFilters = ({ onSearch, onFilterChange, filters }) => {

const SearchAndFilters = ({ placeholder, onSearch }) => {

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        onSearch(searchTerm); // Llamamos a la función de búsqueda cada vez que el término cambia
    }, [searchTerm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
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
        </form>

        // <div className="search-and-filters">

        //     <input
        //         type="text"
        //         placeholder="Buscar..."
        //         value={searchTerm}
        //         onChange={handleSearchChange}
        //     />

        //     {/* Filtros */}
        //     <div className="filters">
        //         <div className="filter-group">
        //             <label>Rol:</label>
        //             <select>
        //                 <option value="">Todos</option>
        //                 {/* Opciones de roles */}
        //             </select>
        //         </div>

        //         <div className="filter-group">
        //             <label>Skills:</label>
        //             <select>
        //                 <option value="">Todos</option>
        //                 {/* Opciones de skills */}
        //             </select>
        //         </div>

        //         <div className="filter-group">
        //             <label>Disponibilidad:</label>
        //             <select>
        //                 <option value="">Todos</option>
        //                 {/* Opciones de disponibilidad */}
        //             </select>
        //         </div>

        //         {/* {filters.experience_level !== undefined && (
        //             <div className="filter-group">
        //                 <label>Nivel de experiencia:</label>
        //                 <select onChange={(e) => handleFilterChange('experience_level', e.target.value)}>
        //                     <option value="">Todos</option>

        //                 </select>
        //             </div>
        //         )} */}
        //     </div>

        // </div>
    );
};

export default SearchAndFilters;
