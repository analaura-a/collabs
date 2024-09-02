import { Link } from 'react-router-dom';
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const UserCard = ({ user }) => {

    const { profile_pic, name, last_name, username, bio, location, roles } = user;

    return (
        <article className="user-card">
            <Link to={`/colaboradores/${username}`} className="user-card__link">

                {profile_pic ? (
                    <div className="user-card__profile-picture">
                        <img src={`${SERVER_BASE_URL}${profile_pic}`} alt={`Foto de perfil de ${name} ${last_name}.`} />
                    </div>
                ) : (
                    <div className="user-card__profile-picture">
                        <img src="../assets/jpg/no-profile-picture.jpg" alt={`Foto de perfil de ${name} ${last_name}.`} />
                    </div>
                )}

                <div className="user-card__user-info">
                    <div className="user-card__name">
                        <h2 className="subtitle-18 bold-text">{name} {last_name}</h2>
                        <p className="subtitle primary-color-text">@{username}</p>
                    </div>
                    <div className="user-card__about">
                        {bio ? (
                            <p className="subtitle truncated-description-3">{bio}</p>
                        ) : (
                            <p className="subtitle">{name} {last_name} aún no agregó su biografía.</p>
                        )}

                        {location && (
                            <p className="smaller-paragraph-light">{location}</p>
                        )}
                    </div>
                </div>

                <div className="user-card__professional-info">
                    <h3 className="subtitle bold-text">Perfil profesional</h3>
                    <ul className="user-card__roles">
                        {roles.map((role, index) => (
                            <li key={index} className="smaller-paragraph">{role}</li>
                        ))}
                    </ul>
                </div>

            </Link>
        </article>
    );
};

export default UserCard;
