import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import MessageIcon from '../../assets/svg/message-purple.svg?react';
import CheckIcon from '../../assets/svg/check.svg?react';
import CrossIcon from '../../assets/svg/x.svg?react';

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const ProjectApplicationsTable = ({ applications }) => {

    const navigate = useNavigate();

    return (
        <>
            {/* Tabla (desktop) */}
            <table className="applications-table project-applications-table">

                <thead>
                    <tr>
                        <th className="light-paragraph medium-text">Colaborador</th>
                        <th className="light-paragraph medium-text">Rol</th>
                        <th className="light-paragraph medium-text">Disponibilidad</th>
                        <th className="light-paragraph medium-text">Fecha de postulación</th>
                        <th className="light-paragraph medium-text">Mensaje</th>
                        <th className="light-paragraph medium-text"></th>
                    </tr>
                </thead>

                <tbody>

                    {applications.map(application => (
                        <tr key={application._id}>
                            <td>
                                <Link to={`/colaboradores/${application.user.username}`} className="application-card__host">
                                    {application.user.profile_pic ? (
                                        <div className="application-card__host-photo">
                                            <img src={`${SERVER_BASE_URL}${application.user.profile_pic}`} alt={`Foto de perfil de ${application.user.name}}`} />
                                        </div>
                                    ) : (
                                        <div className="application-card__host-photo">
                                            <img src="../assets/jpg/no-profile-picture.jpg" alt="Sin foto de perfil" />
                                        </div>
                                    )}

                                    <p className="subtitle black-color-text application-card__host-name">{application.user.name} {application.user.last_name}</p>
                                </Link>
                            </td>

                            <td className="subtitle-18 black-color-text">{application.applied_role}</td>

                            <td className="subtitle-18 black-color-text">{application.user.availability}</td>

                            <td className="subtitle-18 black-color-text">{new Date(application.created_at).toLocaleDateString('en-GB')}</td>

                            <td>
                                <Button size="small" color="secondary" icon={<MessageIcon />}>Leer</Button>
                            </td>

                            <td>
                                <div className="table-buttons">
                                    <Button size="small" icon={<CheckIcon />}>Aceptar</Button>
                                    <Button size="small" color="secondary" icon={<CrossIcon />}>Rechazar</Button>
                                </div>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>

            {/* Cards (mobile) */}
            <div className="applications-cards project-applications-cards">

                {applications.map(application => (
                    <article key={application._id} className="application-card">

                        <ul>
                            <li className="application-card__title-and-value">
                                <h2 className="light-paragraph medium-text">Colaborador</h2>
                                <Link to={`/colaboradores/${application.user.username}`} className="application-card__host">
                                    {application.user.profile_pic ? (
                                        <div className="application-card__host-photo">
                                            <img src={`${SERVER_BASE_URL}${application.user.profile_pic}`} alt={`Foto de perfil de ${application.user.name}}`} />
                                        </div>
                                    ) : (
                                        <div className="application-card__host-photo">
                                            <img src="../assets/jpg/no-profile-picture.jpg" alt="Sin foto de perfil" />
                                        </div>
                                    )}

                                    <p className="subtitle black-color-text application-card__host-name">{application.user.name} {application.user.last_name}</p>
                                </Link>
                            </li>

                            <li className="application-card__title-and-value">
                                <h2 className="light-paragraph medium-text">Rol</h2>
                                <p className="subtitle-18 black-color-text">{application.applied_role}</p>
                            </li>

                            <li className="application-card__title-and-value">
                                <h2 className="light-paragraph medium-text">Disponibilidad</h2>
                                <p className="subtitle-18 black-color-text">{application.user.availability}</p>
                            </li>

                            <li className="application-card__title-and-value">
                                <h2 className="light-paragraph medium-text">Fecha de postulación</h2>
                                <p className="subtitle-18 black-color-text">{new Date(application.created_at).toLocaleDateString('en-GB')}</p>
                            </li>

                            <li className="application-card__title-and-value-bigger">
                                <h2 className="light-paragraph medium-text">Mensaje</h2>
                                <Button size="small" color="secondary" icon={<MessageIcon />}>Leer</Button>
                            </li>

                            <li className="application-card__title-and-value-bigger">
                                <h2 className="light-paragraph medium-text">Unir al proyecto</h2>
                                <div className="table-buttons">
                                    <Button size="small" icon={<CheckIcon />}>Aceptar</Button>
                                    <Button size="small" color="secondary" icon={<CrossIcon />}>Rechazar</Button>
                                </div>
                            </li>
                        </ul>

                    </article>
                ))}

            </div>

        </>
    );
};

export default ProjectApplicationsTable;