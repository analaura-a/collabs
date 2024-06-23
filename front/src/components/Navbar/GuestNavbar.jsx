import { useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

const GuestNavbar = () => {

    const location = useLocation();

    useEffect(() => {
        const hash = location.hash;
        if (hash) {
            const element = document.getElementById(hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <header className="navbar">

            <div className="container navbar-container">
                <Link to="/">
                    <img src="assets/svg/collabs-logo.svg" alt="Collabs" />
                </Link>

                <button className="mobile-nav-toggle" id="nav-toggle" aria-controls="primary-navigation" aria-expanded="false"></button>

                <nav>
                    <ul id="primary-navigation" className="primary-navigation">
                        <li>
                            <Link to="#que-es" className="navbar-text">Qué es</Link>
                        </li>
                        <li>
                            <Link to="#como-funciona" className="navbar-text">Cómo funciona</Link>
                        </li>
                        <li>
                            <Link to="#funcionalidades" className="navbar-text">Funcionalidades</Link>
                        </li>
                        <li>
                            <div className="nav-link-with-icon">
                                <p className="navbar-text">Explorar</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 48 48" fill="none">
                                    <path stroke="#3E4B62" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2.5" d="m33 19-7.41 9.186c-.874 1.085-2.306 1.085-3.18 0L15 19"></path>
                                </svg>
                            </div>
                            <ul className="display-none">
                                <li>
                                    <Link to="#funcionalidades">Proyectos</Link>
                                </li>
                                <li>
                                    <Link to="#funcionalidades">Colaboradores</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>

                <button className="button-small">Crear cuenta</button>
            </div>

        </header>
    )
}

export default GuestNavbar;


