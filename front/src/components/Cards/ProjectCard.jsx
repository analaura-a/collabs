import { Link } from 'react-router-dom';
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const ProjectCard = ({ project }) => {

    const { _id, img, name, about, founder, open_positions } = project;

    return (
        <article className="user-card">
            <Link to={`/proyectos/${_id}`} className="project-card__link">

                <div className="project-card__photo">
                    <img src={img} alt={`Portada del proyecto ${name}.`} />
                </div>

                <div className="project-card__content">
                    <div className="project-card__project-info">
                        <div className="project-card__project-info__about">
                            <h2 className="subtitle-18 bold-text">{name}</h2>
                            <p className="light-paragraph truncated-description-4">{about}</p>
                        </div>

                        <div className="project-card__project-info__created-by">
                            <div className="project-card__project-info__created-by-img">
                                <img src="../assets/jpg/no-profile-picture.jpg" alt="Foto de perfil de {name}" />
                            </div>

                            <p className="smaller-paragraph">Organizado por <span className="bold-text primary-color-text">Ana Laura Almirón</span></p>
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
