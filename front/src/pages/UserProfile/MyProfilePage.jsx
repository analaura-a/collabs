import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import Button from "../../components/Button/Button";
import Tabs from '../../components/Tabs/Tabs';
import TabProfileContent from '../../components/TabsContent/Profile/TabProfileContent';
import TabReviewsContent from '../../components/TabsContent/Profile/TabReviewsContent';
import EditIcon from '../../assets/svg/edit.svg?react';

const MyProfilePage = () => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    if (!user) {
        return <div>Cargando...</div>; //Reemplazar por componente de carga
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
        { label: 'Perfil', content: <TabProfileContent /> },
        { label: 'Reseñas', content: <TabReviewsContent /> },
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

                        <Button color="secondary" width="btn-full-then-fit" size="large">Editar perfil</Button>

                        <div className="profile-page__header__actions__portfolio-container">

                            <div className="title-with-icon">
                                <img src="../assets/svg/notes-with-background.svg" alt="Portfolio" />
                                <h2 className="title-18">Portfolio</h2>
                            </div>

                            {user.portfolio_link ? (
                                <>
                                    <a href="#" className="profile-page__header__actions__portfolio-container__portfolio-link">www.salvadorreynoso.com <img src="../assets/svg/export.svg" alt="Link externo" /></a>
                                    <Button width="fullwidth" size="large" icon={<EditIcon />}>Editar portfolio</Button>
                                </>
                            ) : (
                                <>
                                    <p className="subtitle">Aún no agregaste tu portfolio.</p>
                                    <Button width="fullwidth" size="large" icon={<EditIcon />}>Agregar portfolio</Button>
                                </>
                            )
                            }

                        </div>

                    </div>

                </section>

                <Tabs tabs={tabs} />

            </div >
        </main >
    )
}

export default MyProfilePage;