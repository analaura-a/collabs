import { useState } from "react";
import { Link } from 'react-router-dom';
import { acceptApplication, declineApplication } from '../../services/requestService';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import MessageIcon from '../../assets/svg/message-purple.svg?react';
import CheckIcon from '../../assets/svg/check.svg?react';
import CrossIcon from '../../assets/svg/x.svg?react';

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const ProjectApplicationsTable = ({ applications, projectId, reloadApplications }) => {

    const [selectedApplication, setSelectedApplication] = useState(null);

    const [isAcceptModalOpen, setAcceptModalOpen] = useState(false);
    const [isDeclineModalOpen, setDeclineModalOpen] = useState(false);

    const handleOpenAcceptModal = (application) => {
        setSelectedApplication(application)
        setAcceptModalOpen(true);
    }
    const handleCloseAcceptModal = () => {
        setSelectedApplication(null);
        setAcceptModalOpen(false);
    }

    const handleOpenDeclineModal = (application) => {
        setSelectedApplication(application)
        setDeclineModalOpen(true);
    }
    const handleCloseDeclineModal = () => {
        setSelectedApplication(null);
        setDeclineModalOpen(false);
    }

    const handleAccept = async () => {

        const { _id, user_id, applied_role } = selectedApplication;

        try {
            await acceptApplication(_id, projectId, user_id, applied_role);

            console.log('Postulación aceptada con éxito.'); //Mostrar al usuario

            reloadApplications();

            handleCloseAcceptModal();
        } catch (error) {
            console.error('Error al aceptar la postulación:', error);
        }
    };

    const handleDecline = async () => {

        const { _id } = selectedApplication;

        try {
            await declineApplication(_id, projectId);

            console.log('Postulación rechazada con éxito.'); //Mostrar al usuario

            reloadApplications();

            handleCloseDeclineModal();
        } catch (error) {
            console.error('Error al rechazar la postulación:', error);
        }
    };

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
                                {application.message ? (
                                    <Button size="small" color="secondary" icon={<MessageIcon />} onClick={() => handleOpenAcceptModal(application)}>Leer</Button>
                                ) : (
                                    <p className="subtitle-18 black-color-text">Sin mensaje</p>
                                )}
                            </td>

                            <td>
                                <div className="table-buttons">
                                    <Button size="small" icon={<CheckIcon />} onClick={() => handleOpenAcceptModal(application)}>Aceptar</Button>
                                    <Button size="small" color="secondary" icon={<CrossIcon />} onClick={() => handleOpenDeclineModal(application)}>Rechazar</Button>
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
                                {application.message ? (
                                    <Button size="small" width="fullwidth" color="secondary" icon={<MessageIcon />} onClick={() => handleOpenAcceptModal(application)}>Leer</Button>
                                ) : (
                                    <p className="subtitle-18 black-color-text">Sin mensaje</p>
                                )}
                            </li>

                            <li className="application-card__title-and-value-bigger">
                                <h2 className="light-paragraph medium-text">Unir al proyecto</h2>
                                <div className="applications-table__card-buttons">
                                    <Button size="small" width="fullwidth" icon={<CheckIcon />} onClick={() => handleOpenAcceptModal(application)}>Aceptar</Button>
                                    <Button size="small" width="fullwidth" color="secondary" icon={<CrossIcon />} onClick={() => handleOpenDeclineModal(application)}>Rechazar</Button>
                                </div>
                            </li>
                        </ul>

                    </article>
                ))}

            </div>

            <Modal
                isOpen={isAcceptModalOpen}
                onClose={handleCloseAcceptModal}
                title={`¿Quieres añadir a ${selectedApplication?.user?.name || ''} ${selectedApplication?.user?.last_name || ''} a colaborar en el proyecto?`}
                actions={[
                    { label: 'Cancelar', color: 'secondary', size: "large", width: "fullwidth", onClick: handleCloseAcceptModal },
                    { label: 'Añadir al equipo', color: 'primary', size: "large", width: "fullwidth", onClick: handleAccept },
                ]}
            >
                <div className="applications-table-modal__content">

                    <div className="applications-table-modal__content__user-data">
                        {selectedApplication?.user?.profile_pic ? (
                            <div className="application-card__host-photo application-card__host-photo-modal">
                                <img src={`${SERVER_BASE_URL}${selectedApplication.user.profile_pic}`} alt={`Foto de perfil de ${selectedApplication.user.name}}`} />
                            </div>
                        ) : (
                            <div className="application-card__host-photo application-card__host-photo-modal">
                                <img src="../assets/jpg/no-profile-picture.jpg" alt="Sin foto de perfil" />
                            </div>
                        )}

                        <div>
                            <p className="title-20 medium-text">{selectedApplication?.user?.name || ''} {selectedApplication?.user?.last_name || ''} <span className="primary-color-text">(@{selectedApplication?.user?.username})</span></p>
                            <p className="light-paragraph">{selectedApplication?.user?.location || 'Sin ubicación'}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="form-label">Su rol en el proyecto sería...</h3>
                        <p className="input">{selectedApplication?.applied_role}</p>
                    </div>

                    {selectedApplication?.message &&
                        <div>
                            <h3 className="form-label">Mensaje <span className="black-light-color-text">(¿Por qué deberían elegirme?)</span></h3>
                            <p className="input">{selectedApplication?.message}</p>
                        </div>
                    }

                </div>
            </Modal>

            <Modal
                isOpen={isDeclineModalOpen}
                onClose={handleCloseDeclineModal}
                title={`¿Quieres descartar la postulación de ${selectedApplication?.user?.name || ''} ${selectedApplication?.user?.last_name || ''} para colaborar en el proyecto?`}
                actions={[
                    { label: 'Cancelar', color: 'secondary', size: "large", width: "fullwidth", onClick: handleCloseDeclineModal },
                    { label: 'Eliminar postulación', color: 'red', size: "large", width: "fullwidth", onClick: handleDecline },
                ]}
            >
                <div className="applications-table-modal__content">

                    <div className="applications-table-modal__content__user-data">
                        {selectedApplication?.user?.profile_pic ? (
                            <div className="application-card__host-photo application-card__host-photo-modal">
                                <img src={`${SERVER_BASE_URL}${selectedApplication.user.profile_pic}`} alt={`Foto de perfil de ${selectedApplication.user.name}}`} />
                            </div>
                        ) : (
                            <div className="application-card__host-photo application-card__host-photo-modal">
                                <img src="../assets/jpg/no-profile-picture.jpg" alt="Sin foto de perfil" />
                            </div>
                        )}

                        <div>
                            <p className="title-20 medium-text">{selectedApplication?.user?.name || ''} {selectedApplication?.user?.last_name || ''} <span className="primary-color-text">(@{selectedApplication?.user?.username})</span></p>
                            <p className="light-paragraph">{selectedApplication?.user?.location || 'Sin ubicación'}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="form-label">Su rol en el proyecto sería...</h3>
                        <p className="input">{selectedApplication?.applied_role}</p>
                    </div>

                    {selectedApplication?.message &&
                        <div>
                            <h3 className="form-label">Mensaje <span className="black-light-color-text">(¿Por qué deberían elegirme?)</span></h3>
                            <p className="input">{selectedApplication?.message}</p>
                        </div>
                    }

                </div>
            </Modal>
        </>
    );
};

export default ProjectApplicationsTable;