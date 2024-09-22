import { Link } from 'react-router-dom';
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const ProjectCard = ({ project }) => {

    const { _id, cover, name, about, organizer_name, organizer_photo, open_positions } = project;

    return (
        <article className="user-card">
            <Link to={`/proyectos/${_id}`} className="project-card__link">

                <div className="project-card__photo">
                    <img src={cover ? `${SERVER_BASE_URL}${cover}` : "../assets/jpg/no-project-picture.jpg"} alt={`Portada del proyecto ${name}`} />
                </div>

                <div className="project-card__content">
                    <div className="project-card__project-info">
                        <div className="project-card__project-info__about">
                            <h2 className="subtitle-18 bold-text">{name}</h2>
                            <p className="light-paragraph truncated-description-4">{about}</p>
                        </div>

                        <div className="project-card__project-info__created-by">
                            <div className="project-card__project-info__created-by-img">
                                <img src={organizer_photo ? `${SERVER_BASE_URL}${organizer_photo}` : "../assets/jpg/no-profile-picture.jpg"} alt={`Foto de perfil de ${organizer_name}`} />
                            </div>

                            <p className="smaller-paragraph">Organizado por <span className="bold-text primary-color-text">{organizer_name}</span></p>
                        </div>
                    </div>

                    <div className="user-card__professional-info">
                        <h3 className="subtitle bold-text">Buscando</h3>
                        <ul className="user-card__roles">
                            {open_positions.map((role, index) => (
                                <li key={index} className="smaller-paragraph">{role.profile}</li>
                            ))}
                        </ul>
                    </div>
                </div>

            </Link>
        </article>
    );
};

export default ProjectCard;
