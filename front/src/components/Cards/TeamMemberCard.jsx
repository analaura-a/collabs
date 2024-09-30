import { Link } from 'react-router-dom';
import DropdownButton from '../Button/DropdownButton';

const TeamMemberCard = () => {

    return (
        <article className="user-card">
            <Link to={`/colaboradores/a`} className="user-card__link">

                <div className="user-card__with-dropdown">
                    <div className="user-card__profile-picture">
                        <img src="../assets/jpg/no-profile-picture.jpg" alt={`Foto de perfil de.`} />
                    </div>

                    <DropdownButton />
                </div>

                <div className="user-card__user-info">
                    <div className="user-card__info-and-role">
                        <div className="user-card__name">
                            <h3 className="subtitle-18 bold-text">Manuel Pérez</h3>
                            <p className="smaller-paragraph-light">Buenos Aires, Argentina</p>
                        </div>

                        <div className="user-card__user-role">
                            <img src="../assets/svg/purple-dot-status-darker.svg" alt="Estatus del proyecto" />
                            <p className="smaller-paragraph medium-text primary-color-text">Colaborador</p>
                        </div>
                    </div>

                    <p className="subtitle truncated-description-3">Me llamo Manuel y tengo 23 años. Soy un autodidacta del desarrollo frontend y estoy buscando ganar experiencia junto a otras personas para poder</p>
                </div>

                <div className="user-card__professional-info">
                    <h3 className="subtitle bold-text">Rol en el proyecto</h3>
                    <ul className="user-card__roles">
                        <li className="smaller-paragraph">Frontend Developer</li>
                    </ul>
                </div>

            </Link>
        </article>
    );
};

export default TeamMemberCard;
