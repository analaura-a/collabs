import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { fetchUserProfileByUsername } from "../../services/userService";
import Button from "../../components/Button/Button";
import Tabs from '../../components/Tabs/Tabs';
import TabUserProfileContent from "../../components/TabsContent/Profile/TabUserProfileContent";
import TabUserReviewsContent from "../../components/TabsContent/Profile/TabUserReviewsContent";
import MessageIcon from '../../assets/svg/messages-2.svg?react';

const UserProfilePage = () => {

    const { authState } = useContext(AuthContext);

    const { username } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (authState.user && username === authState.user.username) {
            navigate('/mi-perfil');
        }
    }, [username, authState.user, navigate]);

    const loadUserProfile = async () => {
        try {
            const userData = await fetchUserProfileByUsername(username);
            setUser(userData);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUserProfile();
    }, [username]);

    useEffect(() => {
        if (!loading && !user) {
            navigate('*');
        }
    }, [loading, user, navigate]);

    if (loading) {
        return <div>Cargando...</div>; //Reemplazar por componente de carga
    }

    if (error) {
        return <div>Error: {error}</div>; //Error
    }

    const formatRoles = (roles) => {
        return roles.map((role, index) => (
            <React.Fragment key={index}>
                <span className="bolder-text">{role}</span>
                {index < roles.length - 2 ? ', ' : index === roles.length - 2 ? ' o ' : ''}
            </React.Fragment>
        ));
    };

    const formatJoinDate = (dateString) => {
        const options = { year: 'numeric', month: 'long' };
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', options);
    };

    const tabs = [
        { label: 'Perfil', content: <TabUserProfileContent /> },
        { label: 'Reseñas', content: <TabUserReviewsContent /> },
    ];

    return (
        <main>
            <div className="container profile-page-container">{/* contenedor general */}

                <section className="profile-page__header">

                    <div className="profile-page__header__profile-info">

                        <div className="profile-page__header__profile-info__photo-and-name-container">

                            {user.profile_pic ? (
                                <>
                                    {/* Insertar acá foto de perfil */}
                                </>
                            ) : (
                                <div className="profile-page__header__profile-info__photo-container">
                                    <img src="../assets/jpg/no-profile-picture.jpg" alt="Sin foto de perfil" />
                                </div>
                            )}

                            <div className="profile-page__header__profile-info__name-container">
                                <h1 className="title-32">{user.name} {user.last_name}</h1>
                                <p className="profile-username">@{user.username}</p>
                            </div>

                        </div>

                        <div className="profile-page__header__profile-info__bio-container">
                            <p className="profile-bio">Quiero unirme a colaborar en proyectos como {formatRoles(user.roles)}.</p>

                            <div>
                                {user.location &&
                                    <div className="profile-page__header__profile-info__bio-details-container">
                                        <img src="../assets/svg/location.svg" alt="Ubicación" />
                                        <p className="profile-bio__details">{user.location}</p>
                                    </div>}

                                <div className="profile-page__header__profile-info__bio-details-container">
                                    <img src="../assets/svg/calendar.svg" alt="Fecha de creación de cuenta" />
                                    <p className="profile-bio__details">Se unió en {formatJoinDate(user.createdAt)}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="profile-page__header__actions">

                        <Button color="secondary" width="full-then-fit" size="large">Enviar mensaje</Button>

                        <div className="profile-page__header__actions__portfolio-container">

                            <div className="title-with-icon">
                                <img src="../assets/svg/notes-with-background.svg" alt="Portfolio" />
                                <h2 className="title-18">Portfolio</h2>
                            </div>

                            {user.portfolio_link ? (
                                <>
                                    <a href="#" className="profile-page__header__actions__portfolio-container__portfolio-link"> {user.portfolio_link} <img src="../assets/svg/export.svg" alt="Link externo" /></a>
                                </>
                            ) : (
                                <>
                                    <p className="subtitle">{user.name} aún no agregó su portfolio.</p>
                                </>
                            )}

                            <Button width="fullwidth" size="large" icon={<MessageIcon />}>Invitar a colaborar</Button>

                        </div>

                    </div>

                </section>

                <Tabs tabs={tabs} />

            </div >
        </main >
    )
}

export default UserProfilePage;