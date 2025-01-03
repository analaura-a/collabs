import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { removeUserFromProject } from '../../services/teamService';
import { useToast } from '../../context/ToastContext';
import DropdownButton from '../Button/DropdownButton';
import Button from '../Button/Button';
import Modal from '../Modal/Modal'
import SendIcon from '../../assets/svg/send.svg?react';

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const TeamMemberCard = ({ member, projectType, projectStatus, userRole, projectId, onMemberRemoved }) => {

    const { profile_pic, name, last_name, username, bio, location, role, profile } = member;

    const navigate = useNavigate();

    const { addToast } = useToast();

    const { authState } = useContext(AuthContext);
    const loggedInUser = authState.user;
    const isCurrentUser = loggedInUser?.username === username;

    const [isModalOpen, setModalOpen] = useState(false);
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleRemoveMember = async () => {
        try {
            await removeUserFromProject(projectId, member.user_id);

            addToast({
                type: 'success',
                title: `Se eliminó a ${name} del proyecto con éxito.`,
                message: 'El equipo del proyecto fue actualizado correctamente.'
            });

            onMemberRemoved();
        } catch (error) {
            addToast({
                type: 'error',
                title: `Error al eliminar a ${name} del proyecto`,
                message: 'Ocurrió un error desconocido. Inténtalo de nuevo más tarde.'
            });
        }
    };

    return (
        <article className="user-card user-card__link">

            <div className="user-card__with-dropdown">
                {profile_pic ? (
                    <Link to={`/colaboradores/${username}`} className="user-card__profile-picture">
                        <img src={`${SERVER_BASE_URL}${profile_pic}`} alt={`Foto de perfil de ${name} ${last_name}.`} />
                    </Link>
                ) : (
                    <Link to={`/colaboradores/${username}`} className="user-card__profile-picture">
                        <img src="../assets/jpg/no-profile-picture.jpg" alt={`Foto de perfil de ${name} ${last_name}.`} />
                    </Link>
                )}

                {userRole === "Organizador" && !isCurrentUser && projectStatus != "Finalizado" &&
                    <DropdownButton options={[
                        {
                            title: 'Sacar del proyecto',
                            onClick: handleOpenModal
                        }
                    ]} />
                }
            </div>

            <div className="user-card__user-info">
                <div className="user-card__info-and-role">
                    <div className="user-card__name">
                        <h3 className="subtitle-18 bold-text">{name} {last_name}</h3>
                        {location && (
                            <p className="smaller-paragraph-light">{location}</p>
                        )}
                    </div>

                    {projectType === "Personal" ? (
                        <div className="user-card__user-role">
                            <img src="../assets/svg/purple-dot-status-darker.svg" alt="Estatus del proyecto" />
                            <p className="smaller-paragraph medium-text primary-color-text">{role}</p>
                        </div>
                    ) : (
                        <div className="user-card__user-role">
                            <p className="smaller-paragraph medium-text primary-color-text">@{username}</p>
                        </div>
                    )}

                </div>

                {bio ? (
                    <p className="subtitle truncated-description-3">{bio}</p>
                ) : (
                    <p className="subtitle">{name} {last_name} aún no agregó su biografía.</p>
                )}
            </div>

            {projectType === "Personal" &&
                <div className="user-card__professional-info">
                    <h4 className="subtitle bold-text">Rol en el proyecto</h4>
                    <ul className="user-card__roles">
                        <li className="smaller-paragraph">{profile}</li>
                    </ul>
                </div>
            }

            {projectStatus === "Finalizado" &&
                <div className="user-card__professional-info">
                    <h4 className="subtitle bold-text">¿Participó hasta el final?</h4>
                    <ul className="user-card__roles">
                        {member.status === "Activo" ? (
                            <li className="smaller-paragraph">Sí</li>
                        ) : (
                            <li className="smaller-paragraph">No</li>
                        )}
                    </ul>
                </div>
            }

            {projectStatus === "Finalizado" && !isCurrentUser &&
                <Button size="large" width="fullwidth" icon={<SendIcon />} onClick={() => navigate(`/mis-proyectos/${projectId}/reseñar/${member.user_id}`)}>Dejar una reseña</Button>
            }

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={`¿Quieres echar a ${name} ${last_name} del proyecto?`}
                subtitle="Cuidado, esta acción no se puede deshacer."
                actions={[
                    { label: 'Cancelar', color: 'secondary', size: "large", width: "fullwidth", onClick: handleCloseModal },
                    { label: 'Echar del proyecto', color: 'red', size: "large", width: "fullwidth", onClick: handleRemoveMember },
                ]}
            />

        </article>
    );
};

export default TeamMemberCard;
