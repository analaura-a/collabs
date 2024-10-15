import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { deleteRequest } from '../../services/requestService';
import DropdownButton from '../Button/DropdownButton';
import { useToast } from '../../context/ToastContext';

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const ApplicationsTable = ({ applications, setApplications }) => {

    const { authState } = useContext(AuthContext);

    const { user } = authState;

    const { addToast } = useToast();

    const navigate = useNavigate();

    const handleCancelApplication = async (applicationId) => {
        try {
            await deleteRequest(applicationId, user._id);

            setApplications(prevApplications => prevApplications.filter(app => app._id !== applicationId));

            addToast({
                type: 'success',
                title: '¡Postulación cancelada con éxito!',
                message: 'La postulación fue eliminada correctamente.'
            });

        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al cancelar la postulación',
                message: error.message
            });
        }
    };

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

                            <td className="subtitle-18 black-color-text">{new Date(application.created_at).toLocaleDateString('en-GB')}</td>

                            <td>
                                <p className={`smaller-paragraph medium-text application-card__status ${application.status === 'Pendiente' ? 'status-yellow' : application.status === 'Aprobada' ? 'status-green' : 'status-red'}`}>{application.status}</p>
                            </td>

                            <td>
                                <DropdownButton className="applications-table__button" options={[
                                    {
                                        title: 'Ver convocatoria',
                                        onClick: () => navigate(`/proyectos/${application.project_id}`)
                                    },
                                    {
                                        title: 'Cancelar postulación',
                                        onClick: () => handleCancelApplication(application._id)
                                    }
                                ]} />
                            </td>
                        </tr>

                    ))}

                </tbody>

            </table>

            {/* Cards (mobile) */}
            <div className="applications-cards">

                {applications.map((application) => (

                    <article key={application._id} className="application-card">

                        <DropdownButton className="application-card__button" options={[
                            {
                                title: 'Ver convocatoria',
                                onClick: () => navigate(`/proyectos/${application.project_id}`)
                            },
                            {
                                title: 'Cancelar postulación',
                                onClick: () => handleCancelApplication(application._id)
                            }
                        ]} />

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
                                <p className="subtitle-18 black-color-text">{new Date(application.created_at).toLocaleDateString('en-GB')}</p>
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