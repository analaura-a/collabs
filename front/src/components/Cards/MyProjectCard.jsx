import { Link } from 'react-router-dom';

const MyProjectCard = () => {

    return (
        <article className="my-project-card">
            <Link to={`/proyectos/`} className="my-project-card__link">

                <p className="my-project-card__tag subtitle medium-text primary-color-text">Personal</p>

                <div className="my-project-card__info">
                    <h2 className="title-20 medium-text">Web para adoptar mascotas rescatadas de la calle</h2>

                    <p className="paragraph">La idea es crear una web desde 0 para que mascotas sin hogar puedan ser adoptadas por personas buscando ul...</p>

                    <div className="my-project-card__info__date">
                        <img src="../assets/svg/clock.svg" alt="Reloj" />
                        <p className="smaller-paragraph-light">Creado el 19/10/2023</p>
                    </div>
                </div>

                <div className="my-project-card__team">
                    <h3 className="title-18">Colaboradores</h3>

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
