import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from "../Button/Button";
import smallLogo from '../../assets/svg/collabs-isotipo.svg';
import largeLogo from '../../assets/svg/collabs-logo.svg';

const GuestNavbar = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navigate = useNavigate();
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

    const primaryNavigation = useRef(null);
    const navToggle = useRef(null);

    useEffect(() => {
        const navbarRef = primaryNavigation.current;
        const navToggleRef = navToggle.current;

        if (navbarRef) {
            navbarRef.setAttribute('data-visible', "false");
        }
        if (navToggleRef) {
            navToggleRef.setAttribute('aria-expanded', "false");
        }

        setIsDropdownOpen(false)
    }, [location.pathname])

    const handleNavbarToggle = () => {
        const navbarRef = primaryNavigation.current;
        const navToggleRef = navToggle.current;

        if (navbarRef) {
            const currentVisibility = navbarRef.getAttribute('data-visible');

            const newVisibility = currentVisibility === 'true' ? 'false' : 'true';
            navbarRef.setAttribute('data-visible', newVisibility);
        }

        if (navToggleRef) {
            const isExpanded = navToggleRef.getAttribute('aria-expanded');

            const newValue = isExpanded === 'true' ? 'false' : 'true';
            navToggleRef.setAttribute('aria-expanded', newValue);
        }
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
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

                <button ref={navToggle} className="mobile-nav-toggle" id="nav-toggle" aria-controls="primary-navigation" aria-expanded="false" onClick={handleNavbarToggle}></button>

                <nav>
                    <ul ref={primaryNavigation} id="primary-navigation" className="primary-navigation" data-visible="false">
                        <li>
                            <Link to="/#que-es" className="navbar-text">Qué es</Link>
                        </li>
                        <li>
                            <Link to="#como-funciona" className="navbar-text">Cómo funciona</Link>
                        </li>
                        <li>
                            <Link to="/iniciar-sesion" className="navbar-text">Funcionalidades</Link>
                        </li>
                        <li>
                            <div className="nav-link-with-icon" onClick={handleDropdownToggle}>
                                <p className="navbar-text">Explorar</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 48 48" fill="none" className="icon-svg">
                                    <path stroke="#3E4B62" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2.5" d="m33 19-7.41 9.186c-.874 1.085-2.306 1.085-3.18 0L15 19"></path>
                                </svg>
                            </div>
                            <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                                <li>
                                    <Link to="/explorar/proyectos" className="navbar-text">Proyectos</Link>
                                </li>
                                <li>
                                    <Link to="/explorar/colaboradores" className="navbar-text">Colaboradores</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/donaciones" className="navbar-text">Donaciones</Link>
                        </li>
                    </ul>
                </nav>

                <Button size="small" onClick={() => navigate('/auth/crear-cuenta')}>Crear cuenta</Button>
            </div>

        </header>
    )
}

export default GuestNavbar;