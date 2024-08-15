import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserProfileByUsername } from "../../../services/userService";

const TabUserProfileContent = () => {

    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUserProfile = async () => {
        try {
            const userData = await fetchUserProfileByUsername(username);
            setUser(userData);
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUserProfile();
    }, [username]);

    if (loading) {
        return <div>Cargando...</div>; //Reemplazar por componente de carga
    }

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
                        <p className="paragraph">{user.name} aún no agregó su biografía.</p>
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

                {user.socials &&
                    // Mostrar dinámicamente
                    <div className="tab-profile__space-between">
                        <h2 className="title-18">Datos de contacto</h2>
                        <ul className="tab-profile__user-info-column__socials">
                            <li>
                                <a href="#">
                                    <button className="small-button-with-icon linkedin-social"></button>
                                    <p className="smaller-paragraph">Linkedin</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                }

            </div>

            <div className="tab-profile__collab-stats-column">

                <div className="tab-profile__space-between"> {/* Mostrar dinámicamente */}
                    <h2 className="title-18">Estado</h2>
                    {user.collaborating_status ? (
                        <div className="tab-profile__collab-stats-column__status">
                            <div></div>
                            <p className="paragraph">{user.name} está colaborando en 1 proyecto.</p>
                        </div>
                    ) : (
                        <div className="tab-profile__collab-stats-column__status">
                            <div>
                                <img src="../../assets/svg/purple-dot-status.svg" alt="Estatus" />
                                <p className="paragraph bold-text primary-color-text">Sin colaborar</p>
                            </div>
                            <p className="paragraph">{user.name} no está colaborando en ningún proyecto.</p>
                        </div>
                    )}
                </div>

                <div className="tab-profile__space-between"> {/* Mostrar dinámicamente */}
                    <h2 className="title-18">Estadísticas de colaboración</h2>
                    <ul className="tab-profile__collab-stats-column__stats">
                        <li>
                            <h3 className="big-number-stat-placeholder">0</h3>
                            <p className="smaller-paragraph">Proyectos en los que colaboró</p>
                        </li>
                        <li>
                            <h3 className="big-number-stat-placeholder">0</h3>
                            <p className="smaller-paragraph">Proyectos que finalizó</p>
                        </li>
                        <li>
                            <h3 className="big-number-stat-placeholder">0</h3>
                            <p className="smaller-paragraph">Proyectos que organizó</p>
                        </li>
                        <li>
                            <h3 className="big-number-stat-placeholder">0</h3>
                            <p className="smaller-paragraph">Proyectos que abandonó</p>
                        </li>
                    </ul>
                </div>

            </div>

        </section>
    );
};

export default TabUserProfileContent;