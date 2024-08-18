import { useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import ContactInfo from "./ContactInfo.jsx"

const TabProfileContent = () => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

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
                    {user.collaborating_status ? (
                        // Mostrar dinámicamente
                        <div className="tab-profile__collab-stats-column__status">
                            <div></div>
                            <p className="paragraph">Actualmente estás colaborando en 1 proyecto.</p>
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

                <div className="tab-profile__space-between"> {/* Mostrar dinámicamente */}
                    <h2 className="title-18">Estadísticas de colaboración</h2>
                    <ul className="tab-profile__collab-stats-column__stats">
                        <li>
                            <h3 className="big-number-stat-placeholder">0</h3>
                            <p className="smaller-paragraph">Proyectos en los que colaboraste</p>
                        </li>
                        <li>
                            <h3 className="big-number-stat-placeholder">0</h3>
                            <p className="smaller-paragraph">Proyectos que finalizaste</p>
                        </li>
                        <li>
                            <h3 className="big-number-stat-placeholder">0</h3>
                            <p className="smaller-paragraph">Proyectos que organizaste</p>
                        </li>
                        <li>
                            <h3 className="big-number-stat-placeholder">0</h3>
                            <p className="smaller-paragraph">Proyectos que abandonaste</p>
                        </li>
                    </ul>
                </div>

            </div>

        </section>
    );
};

export default TabProfileContent;