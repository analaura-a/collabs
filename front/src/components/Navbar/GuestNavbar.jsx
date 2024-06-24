import { useEffect, useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
import smallLogo from '../../assets/svg/collabs-isotipo.svg';
import largeLogo from '../../assets/svg/collabs-logo.svg';

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

    const myRef = useRef(null);

    useEffect(() => {
        const navbarRef = myRef.current;
        if (navbarRef) {
            navbarRef.setAttribute('data-visible', "false");
        }
    }, [location])

    const handleNavbarToggle = () => {
        const navbarRef = myRef.current;

        if (navbarRef) {
            const currentVisibility = navbarRef.getAttribute('data-visible');
            console.log("Antes del click:", currentVisibility)

            const newVisibility = currentVisibility === 'true' ? 'false' : 'true';
            navbarRef.setAttribute('data-visible', newVisibility);
            console.log('Después del click:', newVisibility);
        }
    };

    return (
        <header className="navbar">

            <div className="container navbar-container">
                <Link to="/">
                    <picture>
                        <source media="(max-width: 386px)" srcSet={smallLogo} />
                        <source media="(min-width: 387px)" srcSet={largeLogo} />
                        <img src={largeLogo} alt="Collabs" />
                    </picture>
                </Link>

                <button className="mobile-nav-toggle" id="nav-toggle" aria-controls="primary-navigation" aria-expanded="false" onClick={handleNavbarToggle}></button>

                <nav>
                    <ul ref={myRef} id="primary-navigation" className="primary-navigation" data-visible="false">
                        <li>
                            <Link to="#que-es" className="navbar-text">Qué es</Link>
                        </li>
                        <li>
                            <Link to="#como-funciona" className="navbar-text">Cómo funciona</Link>
                        </li>
                        <li>
                            <Link to="/iniciar-sesion" className="navbar-text">Funcionalidades</Link>
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