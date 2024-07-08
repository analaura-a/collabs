import { Link } from 'react-router-dom';

const AuthFooter = () => {

    return (
        <footer>

            <div className="container footer-container">

                <div className="footer-info">

                    <div className="footer-logo">
                        <Link to="/inicio">
                            <img src='../../assets/svg/collabs-logo.svg' alt="Collabs" />
                        </Link>
                        <p className='light-paragraph'>Busca proyectos, únete a colaborar y crece profesionalmente junto a otros.</p>
                    </div>

                    <ul className="footer-links">
                        <li>
                            <h2 className='footer-headings'>Explora</h2>
                            <ul>
                                <li>
                                    <Link to="/">Proyectos</Link>
                                </li>
                                <li>
                                    <Link to="/">Colaboradores</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h2 className='footer-headings'>Colabora</h2>
                            <ul>
                                <li>
                                    <Link to="#que-es">Mis proyectos</Link>
                                </li>
                                <li>
                                    <Link to="#como-funciona">Mis postulaciones</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h2 className='footer-headings'>Ponte en contacto</h2>
                            <ul>
                                <li>
                                    <a href="https://www.facebook.com" target="_blank">
                                        Facebook
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com" target="_blank">
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.discord.com" target="_blank">
                                        Discord
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className="footer-credits">
                    <p>Hecho con ❤ por Ana Laura Almirón y Brisa Marca.</p>
                    <p>Copyright © 2024 All Rights Reserved. </p>
                </div>

            </div>

        </footer>
    )
}

export default AuthFooter;