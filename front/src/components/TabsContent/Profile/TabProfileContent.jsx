import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/AuthContext';
import { getUserCollaborationStats } from '../../../services/userService.jsx';
import { useToast } from '../../../context/ToastContext.jsx';
import ContactInfo from "./ContactInfo.jsx"

const TabProfileContent = () => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const { addToast } = useToast();

    const fetchUserCollaborationStats = async () => {
        try {
            const statsData = await getUserCollaborationStats(user._id);
            setStats(statsData);
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al cargar las estadísticas del perfil',
                message: 'Ocurrió un error desconocido al intentar obtener las estadísticas. Inténtalo de nuevo más tarde.'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserCollaborationStats();
    }, [user._id]);

    if (loading) return <div>Cargando...</div>; //Reemplazar por componente de carga

    return (
        <section className="tab-profile-container">

            <div className="tab-profile__user-info-column">

                <div className="tab-profile__space-between">
                    <h2 className="title-18">Acerca de</h2>

                    {user.bio ? (
                        <>
                            <p className="paragraph">{user.bio}</p>
                        </>
                    ) : (
                        <p className="paragraph">Aún no agregaste información sobre ti.</p>
                    )}

                </div>

                <div className="tab-profile__space-between">
                    <h2 className="title-18">Perfil colaborativo</h2>
                    <ul className="tab-profile__user-info-column__collab-profile">
                        <li>
                            <div className="helper-purple-icon availability-icon"></div>
                            <div>
                                <h3 className="subtitle">Disponibilidad</h3>
                                <p className="helper-text">{user.availability}</p>
                            </div>
                        </li>

                        <li>
                            <div className="helper-purple-icon experience-level-icon"></div>
                            <div>
                                <h3 className="subtitle">Nivel de conocimiento</h3>
                                <p className="helper-text">{user.experience_level}</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="tab-profile__space-between">
                    <h2 className="title-18">Skills</h2>
                    <ul className="tab-profile__user-info-column__skills">
                        {user.skills.map((skill) => (
                            <li key={skill} className="smaller-paragraph">
                                {skill}
                            </li>
                        ))}
                    </ul>
                </div>

                {user.socials && <ContactInfo socials={user.socials} />}

            </div>

            <div className="tab-profile__collab-stats-column">

                <div className="tab-profile__space-between">
                    <h2 className="title-18">Estado</h2>
                    {stats.isCollaborating ? (
                        <div className="tab-profile__collab-stats-column__status">
                            <div>
                                <img src="../../assets/svg/purple-dot-status.svg" alt="Estatus" />
                                <p className="paragraph bold-text primary-color-text">Colaborando</p>
                            </div>
                            <p className="paragraph">Actualmente estás colaborando en <span className="medium-text primary-color-text">{stats.collaboratedProjects - stats.finishedProjects}</span> proyecto(s).</p>
                        </div>
                    ) : (
                        <div className="tab-profile__collab-stats-column__status">
                            <div>
                                <img src="../../assets/svg/purple-dot-status.svg" alt="Estatus" />
                                <p className="paragraph bold-text primary-color-text">Sin colaborar</p>
                            </div>
                            <p className="paragraph">Aún no estás colaborando en ningún proyecto.</p>
                        </div>
                    )}
                </div>

                <div className="tab-profile__space-between">
                    <h2 className="title-18">Estadísticas de colaboración</h2>
                    <ul className="tab-profile__collab-stats-column__stats">
                        <li>
                            <h3 className={`big-number-stat-placeholder ${stats.collaboratedProjects > 0 ? "primary-color-text" : ""}`}>{stats.collaboratedProjects}</h3>
                            <p className="smaller-paragraph">{stats.collaboratedProjects === 1 ? "Proyecto" : "Proyectos"} en los que colaboraste</p>
                        </li>
                        <li>
                            <h3 className={`big-number-stat-placeholder ${stats.finishedProjects > 0 ? "primary-color-text" : ""}`}>{stats.finishedProjects}</h3>
                            <p className="smaller-paragraph">{stats.finishedProjects === 1 ? "Proyecto" : "Proyectos"} que finalizaste</p>
                        </li>
                        <li>
                            <h3 className={`big-number-stat-placeholder ${stats.organizedProjects > 0 ? "primary-color-text" : ""}`}>{stats.organizedProjects}</h3>
                            <p className="smaller-paragraph">{stats.organizedProjects === 1 ? "Proyecto" : "Proyectos"} que organizaste</p>
                        </li>
                        <li>
                            <h3 className={`big-number-stat-placeholder ${stats.abandonedProjects > 0 ? "primary-color-text" : ""}`}>{stats.abandonedProjects}</h3>
                            <p className="smaller-paragraph">{stats.abandonedProjects === 1 ? "Proyecto" : "Proyectos"} que abandonaste</p>
                        </li>
                    </ul>
                </div>

            </div>

        </section>
    );
};

export default TabProfileContent;