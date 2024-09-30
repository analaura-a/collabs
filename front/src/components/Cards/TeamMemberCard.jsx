import { Link } from 'react-router-dom';
import DropdownButton from '../Button/DropdownButton';

const TeamMemberCard = ({ member, projectType, projectStatus, userRole }) => {

    const { profile_pic, name, last_name, username, bio, location, role, profile } = member;

    return (
        <article className="user-card">
            <Link to={`/colaboradores/a`} className="user-card__link">

                <div className="user-card__with-dropdown">
                    {profile_pic ? (
                        <div className="user-card__profile-picture">
                            <img src={`${SERVER_BASE_URL}${profile_pic}`} alt={`Foto de perfil de ${name} ${last_name}.`} />
                        </div>
                    ) : (
                        <div className="user-card__profile-picture">
                            <img src="../assets/jpg/no-profile-picture.jpg" alt={`Foto de perfil de ${name} ${last_name}.`} />
                        </div>
                    )}

                    {userRole === "Organizador" &&
                        <DropdownButton />
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

            </Link>
        </article>
    );
};

export default TeamMemberCard;
