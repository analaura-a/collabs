import { Link } from 'react-router-dom';

const MyProjectCard = ({ project }) => {

    return (
        <article className="my-project-card">
            <Link to={`/mis-proyectos/${project._id}`} className="my-project-card__link">

                <p className="my-project-card__tag subtitle medium-text primary-color-text">{project.type}</p>

                <div className="my-project-card__info">
                    <h2 className="title-20 medium-text">{project.name}</h2>

                    <p className="paragraph truncated-description-3">{project.about}</p>

                    <div className="my-project-card__info__date">
                        <img src="../assets/svg/clock.svg" alt="Reloj" />
                        <p className="smaller-paragraph-light">Creado el {new Date(project.created_at).toLocaleDateString('en-GB')}</p>
                    </div>
                </div>

                <div className="my-project-card__team">
                    {project.type === "Personal" ? (
                        <h3 className="title-18">Colaboradores</h3>
                    ) : (
                        <h3 className="title-18">Organizadores</h3>
                    )}

                    {/* Mostrar dinámicamente: */}
                    <div className="my-project-card__team__photos">
                        <div className="my-project-card__team__profile-pic">
                            <img src="../assets/jpg/no-profile-picture.jpg" alt="Sin foto de perfil" />
                        </div>
                    </div>
                </div>

            </Link>
        </article>
    );

};

export default MyProjectCard;
