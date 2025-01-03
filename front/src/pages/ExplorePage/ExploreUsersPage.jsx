import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserCard from '../../components/Cards/UserCard';
import SearchAndFilters from '../../components/Inputs/SearchAndFilters';
import { getUsers } from '../../services/userService';
import { useToast } from '../../context/ToastContext';
import Loader from '../../components/Loader/Loader';

const ExploreUsersPage = () => {

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const [filters, setFilters] = useState({
        roles: [],
        availability: [],
        experienceLevel: [],
        skills: []
    });
    const [searchTerm, setSearchTerm] = useState('');

    const [loading, setLoading] = useState(true);

    const { addToast } = useToast();

    const fetchUsers = async () => {
        try {
            const fetchedUsers = await getUsers();
            setUsers(fetchedUsers);
            setFilteredUsers(fetchedUsers);
            setLoading(false);
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al obtener los colaboradores',
                message: 'Ocurrió un error desconocido al intentar obtener a los colaboradores. Inténtalo de nuevo más tarde.'
            });

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filterAndSearchUsers = (term, activeFilters) => {

        // Buscar por 'name', 'last_name' o 'username'
        let filteredBySearchTerm = users.filter(user =>
            user.name.toLowerCase().includes(term.toLowerCase()) ||
            user.last_name.toLowerCase().includes(term.toLowerCase()) ||
            user.username.toLowerCase().includes(term.toLowerCase())
        );

        // Filtros
        if (activeFilters.roles.length > 0) {
            filteredBySearchTerm = filteredBySearchTerm.filter(user =>
                activeFilters.roles.some(role => user.roles.includes(role))
            );
        }

        if (activeFilters.availability.length > 0) {
            filteredBySearchTerm = filteredBySearchTerm.filter(user =>
                activeFilters.availability.includes(user.availability)
            );
        }

        if (activeFilters.experienceLevel.length > 0) {
            filteredBySearchTerm = filteredBySearchTerm.filter(user =>
                activeFilters.experienceLevel.includes(user.experience_level)
            );
        }

        if (activeFilters.skills.length > 0) {
            filteredBySearchTerm = filteredBySearchTerm.filter(user =>
                activeFilters.skills.every(skill => user.skills.includes(skill))
            );
        }

        setFilteredUsers(filteredBySearchTerm);
    };

    // Manejar la búsqueda por palabras clave
    const handleSearch = (term) => {
        setSearchTerm(term);
        filterAndSearchUsers(term, filters);
    };

    // Manejar los cambios en los filtros
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        filterAndSearchUsers(searchTerm, newFilters);
    };

    if (loading) return <Loader message="Cargando colaboradores..." />;

    return (
        <main>
            <div className="container explore-page-container">

                <div className="explore-page__container-with-image">
                    <section className="explore-page__header">

                        <div className="explore-page__header___toggle light-paragraph">
                            <Link to="/explorar/proyectos">Proyectos</Link>
                            <Link to="/explorar/colaboradores" className="toggle-active">Colaboradores</Link>
                        </div>

                        <div className="explore-page__header__title-and-filters">
                            <h1 className="title-56">Encuentra colaboradores para tus proyectos</h1>

                            <SearchAndFilters
                                placeholder="Buscar personas..."
                                onSearch={handleSearch}
                                onFilterChange={handleFilterChange}
                                showExperienceLevelFilter={true} />
                        </div>

                    </section>

                    <div className="explore-page__image">
                        <img src="../assets/svg/collaborators-circle.svg" alt="Círculo de colaboradores" />
                    </div>
                </div>

                {filteredUsers.length > 0 ? (
                    <section className="explore-page__container-user-cards">

                        {filteredUsers.map(user => (
                            <UserCard key={user._id} user={user} />
                        ))}

                    </section>
                ) : (
                    <section className="explore-page__empty-state-container">
                        <h2 className="title-18">No se encontraron colaboradores que coincidan con esa búsqueda.</h2>
                    </section>
                )}

            </div>
        </main>
    )
}

export default ExploreUsersPage;