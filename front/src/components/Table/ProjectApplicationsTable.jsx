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

                    <tr>
                        <td>
                            <Link to={`/colaboradores/1`} className="application-card__host">
                                <div className="application-card__host-photo">
                                    <img src="../assets/jpg/no-profile-picture.jpg" alt="Sin foto de perfil" />
                                </div>

                                <p className="subtitle black-color-text application-card__host-name">Julián Rossi</p>
                            </Link>
                        </td>

                        <td className="subtitle-18 black-color-text">UX/UI Designer</td>

                        <td className="subtitle-18 black-color-text">Baja (1-2 horas/día)</td>

                        <td className="subtitle-18 black-color-text">9/23/2024</td>

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

                </tbody>

            </table>

            {/* Cards (mobile) */}
            <div className="applications-cards project-applications-cards">

                <article className="application-card">

                    <ul>
                        <li className="application-card__title-and-value">
                            <h2 className="light-paragraph medium-text">Colaborador</h2>
                            <Link to={`/colaboradores/1`} className="application-card__host">
                                <div className="application-card__host-photo">
                                    <img src="../assets/jpg/no-profile-picture.jpg" alt="Sin foto de perfil" />
                                </div>

                                <p className="subtitle black-color-text application-card__host-name">Julián Rossi</p>
                            </Link>
                        </li>

                        <li className="application-card__title-and-value">
                            <h2 className="light-paragraph medium-text">Rol</h2>
                            <p className="subtitle-18 black-color-text">UX/UI Designer</p>
                        </li>

                        <li className="application-card__title-and-value">
                            <h2 className="light-paragraph medium-text">Disponibilidad</h2>
                            <p className="subtitle-18 black-color-text">Baja (1-2 horas/día)</p>
                        </li>

                        <li className="application-card__title-and-value">
                            <h2 className="light-paragraph medium-text">Fecha de postulación</h2>
                            <p className="subtitle-18 black-color-text">9/23/2024</p>
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

            </div>

        </>
    );
};

export default ProjectApplicationsTable;