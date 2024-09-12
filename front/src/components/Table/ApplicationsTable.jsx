import { Link } from 'react-router-dom';
import DropdownButton from '../Button/DropdownButton';

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const ApplicationsTable = ({ applications }) => {

    //Agregarles funcionalidad
    const dropdownOptions = [
        { title: 'Ver convocatoria', onClick: () => console.log('Opción 1 seleccionada') },
        { title: 'Cancelar postulación', onClick: () => console.log('Opción 2 seleccionada') }
    ];

    return (
        <>

            {/* Tabla (desktop) */}
            <table className="applications-table">

                <thead>
                    <tr>
                        <th className="light-paragraph medium-text">Proyecto</th>
                        <th className="light-paragraph medium-text">Organizador</th>
                        <th className="light-paragraph medium-text">Rol</th>
                        <th className="light-paragraph medium-text">Fecha enviada</th>
                        <th className="light-paragraph medium-text">Estado</th>
                        <th className="light-paragraph medium-text"></th>
                    </tr>
                </thead>

                <tbody>

                    {applications.map((application) => (

                        <tr key={application._id}>
                            <td className="subtitle-18 black-color-text">{application.project_name}</td>

                            <td>
                                <Link to={`/colaboradores/${application.organizer_username}`} className="application-card__host">
                                    {application.organizer_photo ? (
                                        <div className="application-card__host-photo">
                                            <img src={`${SERVER_BASE_URL}${application.organizer_photo}`} alt={`Foto de perfil de ${application.organizer_name}}`} />
                                        </div>
                                    ) : (
                                        <div className="application-card__host-photo">
                                            <img src="../assets/jpg/no-profile-picture.jpg" alt="Sin foto de perfil" />
                                        </div>
                                    )}

                                    <p className="subtitle black-color-text application-card__host-name">{application.organizer_name}</p>
                                </Link>
                            </td>

                            <td className="subtitle-18 black-color-text">{application.applied_role}</td>

                            <td className="subtitle-18 black-color-text">{new Date(application.created_at).toLocaleDateString()}</td>

                            <td>
                                <p className={`smaller-paragraph medium-text application-card__status ${application.status === 'Pendiente' ? 'status-yellow' : application.status === 'Aprobada' ? 'status-green' : 'status-red'}`}>{application.status}</p>
                            </td>

                            <td>
                                <DropdownButton options={dropdownOptions} className="applications-table__button" />
                            </td>
                        </tr>

                    ))}

                </tbody>

            </table>

            {/* Cards (mobile) */}
            <div className="applications-cards">

                {applications.map((application) => (

                    <article key={application._id} className="application-card">
                        <DropdownButton options={dropdownOptions} className="application-card__button" />

                        <ul>
                            <li className="application-card__title-and-value">
                                <h2 className="light-paragraph medium-text">Proyecto</h2>
                                <p className="subtitle-18 black-color-text">{application.project_name}</p>
                            </li>

                            <li className="application-card__title-and-value-bigger">
                                <h2 className="light-paragraph medium-text">Organizador</h2>
                                <Link to={`/colaboradores/${application.organizer_username}`} className="application-card__host">

                                    {application.organizer_photo ? (
                                        <div className="application-card__host-photo">
                                            <img src={`${SERVER_BASE_URL}${application.organizer_photo}`} alt={`Foto de perfil de ${application.organizer_name}}`} />
                                        </div>
                                    ) : (
                                        <div className="application-card__host-photo">
                                            <img src="../assets/jpg/no-profile-picture.jpg" alt="Sin foto de perfil" />
                                        </div>
                                    )}

                                    <p className="subtitle black-color-text application-card__host-name">{application.organizer_name}</p>
                                </Link>
                            </li>

                            <li className="application-card__title-and-value">
                                <h2 className="light-paragraph medium-text">Rol</h2>
                                <p className="subtitle-18 black-color-text">{application.applied_role}</p>
                            </li>

                            <li className="application-card__title-and-value">
                                <h2 className="light-paragraph medium-text">Fecha de postulación</h2>
                                <p className="subtitle-18 black-color-text">{new Date(application.created_at).toLocaleDateString()}</p>
                            </li>

                            <li className="application-card__title-and-value-bigger">
                                <h2 className="light-paragraph medium-text">Estado</h2>
                                <p className={`smaller-paragraph medium-text application-card__status ${application.status === 'Pendiente' ? 'status-yellow' : application.status === 'Aprobada' ? 'status-green' : 'status-red'}`}>{application.status}</p>
                            </li>
                        </ul>

                    </article>

                ))}

            </div>

        </>
    );
};

export default ApplicationsTable;