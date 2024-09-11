import { Link } from 'react-router-dom';

const ApplicationsTable = () => {

    return (
        <>

            {/* Tabla (desktop) */}
            <table className="applications-table">

                <thead>
                    <tr>
                        <th className="light-paragraph medium-text">Proyecto</th>
                        <th className="light-paragraph medium-text">Organizador</th>
                        <th className="light-paragraph medium-text">Rol</th>
                        <th className="light-paragraph medium-text">Fecha enviada</th>
                        <th className="light-paragraph medium-text">Estado</th>
                        <th className="light-paragraph medium-text"></th>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td className="subtitle-18 black-color-text">Web para adoptar mascotas</td>

                        <td>
                            <Link to={`/perfil`} className="application-card__host">
                                <div className="application-card__host-photo">
                                    <img src="../assets/jpg/no-profile-picture.jpg" alt="Sin foto de perfil" />
                                </div>

                                <p className="subtitle black-color-text application-card__host-name">Julián Rossi</p>
                            </Link>
                        </td>

                        <td className="subtitle-18 black-color-text">UX/UI Designer</td>

                        <td className="subtitle-18 black-color-text">8/11/2023</td>

                        <td>
                            <p className="smaller-paragraph medium-text application-card__status status-green">Aprobada</p>
                        </td>

                        <td>
                            <button className="applications-table__button small-button-with-icon link-icon"></button>
                        </td>
                    </tr>

                </tbody>

            </table>

            {/* Cards (mobile) */}
            {/* <div className="applications-cards">

                <article className="application-card">
                    <ul>
                        <li className="application-card__title-and-value">
                            <h2 className="light-paragraph medium-text">Proyecto</h2>
                            <p className="subtitle-18 black-color-text">Web para adoptar mascotas</p>
                        </li>

                        <li className="application-card__title-and-value-bigger">
                            <h2 className="light-paragraph medium-text">Organizador</h2>
                            <Link to={`/perfil`} className="application-card__host">
                                <div className="application-card__host-photo">
                                    <img src="../assets/jpg/no-profile-picture.jpg" alt="Sin foto de perfil" />
                                </div>

                                <p className="subtitle black-color-text application-card__host-name">Julián Rossi</p>
                            </Link>
                        </li>

                        <li className="application-card__title-and-value">
                            <h2 className="light-paragraph medium-text">Rol</h2>
                            <p className="subtitle-18 black-color-text">UX/UI Designer</p>
                        </li>

                        <li className="application-card__title-and-value">
                            <h2 className="light-paragraph medium-text">Fecha de postulación</h2>
                            <p className="subtitle-18 black-color-text">8/11/2023</p>
                        </li>

                        <li className="application-card__title-and-value-bigger">
                            <h2 className="light-paragraph medium-text">Estado</h2>
                            <p className="smaller-paragraph medium-text application-card__status status-green">Aprobada</p>
                        </li>
                    </ul>

                    <button className="small-button-with-icon link-icon application-card__button"></button>
                </article>

            </div> */}

        </>
    );
};

export default ApplicationsTable;