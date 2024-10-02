import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { removeUserFromProject } from '../../services/teamService';
import DropdownButton from '../Button/DropdownButton';

const TeamMemberCard = ({ member, projectType, projectStatus, userRole, projectId, onMemberRemoved }) => {

    const { profile_pic, name, last_name, username, bio, location, role, profile } = member;

    const { authState } = useContext(AuthContext);
    const loggedInUser = authState.user;
    const isCurrentUser = loggedInUser?.username === username;

    const handleRemoveMember = async () => {
        try {
            await removeUserFromProject(projectId, member.user_id);

            console.log(`Se eliminó a ${name} del proyecto con éxito.`); //Mostrar al usuario

            onMemberRemoved();
        } catch (error) {
            console.error('Error al remover al miembro del proyecto:', error);
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

                {userRole === "Organizador" && !isCurrentUser &&
                    <DropdownButton options={[
                        {
                            title: 'Echar del proyecto',
                            onClick: handleRemoveMember
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
                    <h3 className="subtitle bold-text">Rol en el proyecto</h3>
                    <ul className="user-card__roles">
                        <li className="smaller-paragraph">{profile}</li>
                    </ul>
                </div>
            }

        </article>
    );
};

export default TeamMemberCard;
