import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserCard from '../../components/Cards/UserCard';
import { getUsers } from '../../services/userService';

const ExploreUsersPage = () => {

    const [users, setUsers] = useState([]);
    // const [filteredUsers, setFilteredUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchUsers = () => {
        try {
            getUsers()
                .then((users) => {
                    setUsers(users)
                });

            setLoading(false);
        } catch (error) {
            console.error('Error al obtener a los usuarios: ', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        // setFilteredCollaborators(users);
        fetchUsers();
    }, []);

    if (loading) return <div>Cargando colaboradores...</div>; //Componente de carga

    return (
        <main>
            <div className="container explore-page-container">

                <section className="explore-page__header">

                    <div className="explore-page__header___toggle light-paragraph">
                        <Link to="/explorar/proyectos">Proyectos</Link>
                        <Link to="/explorar/colaboradores" className="toggle-active">Colaboradores</Link>
                    </div>

                    <div>
                        <h1 className="title-56">Encuentra colaboradores para tus proyectos</h1>

                        {/* Componente de búsqueda */}
                    </div>

                </section>

                <section className="explore-page__container-user-cards">

                    {users.map(user => (
                        <UserCard key={user._id} user={user} />
                    ))}

                </section>

            </div>
        </main>
    )
}

export default ExploreUsersPage;