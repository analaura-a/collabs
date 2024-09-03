import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserCard from '../../components/Cards/UserCard';
import SearchAndFilters from '../../components/Inputs/SearchAndFilters';
import { getUsers } from '../../services/userService';

const ExploreUsersPage = () => {

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const fetchedUsers = await getUsers();
            setUsers(fetchedUsers);
            setFilteredUsers(fetchedUsers);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener a los usuarios: ', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Buscar usuarios por `name`, `last_name`, o `username`
    const handleSearch = (searchTerm) => {
        if (searchTerm.trim() === "") {
            setFilteredUsers(users);
        } else {
            const matchedUsers = users.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.username.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(matchedUsers);
        }
    };

    if (loading) return <div>Cargando colaboradores...</div>; //Componente de carga

    return (
        <main>
            <div className="container explore-page-container">

                <section className="explore-page__header">

                    <div className="explore-page__header___toggle light-paragraph">
                        <Link to="/explorar/proyectos">Proyectos</Link>
                        <Link to="/explorar/colaboradores" className="toggle-active">Colaboradores</Link>
                    </div>

                    <div className="explore-page__header__title-and-filters">
                        <h1 className="title-56">Encuentra colaboradores para tus proyectos</h1>

                        <SearchAndFilters
                            placeholder="Buscar personas..."
                            onSearch={handleSearch} />
                    </div>

                </section>

                <section className="explore-page__container-user-cards">

                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <UserCard key={user._id} user={user} />
                        ))
                    ) : (
                        <div>
                            No se encontraron colaboradores con esos términos. {/* Maquetar */}
                        </div>
                    )}

                </section>

            </div>
        </main>
    )
}

export default ExploreUsersPage;