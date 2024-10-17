import { useEffect, useRef, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import smallLogo from '../../assets/svg/collabs-isotipo.svg';
import largeLogo from '../../assets/svg/collabs-logo.svg';
import AuthContext from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const AuthNavbar = () => {

    const { authState, logout } = useContext(AuthContext);
    const { user } = authState;

    const { addToast } = useToast();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isProfileDropdownOpen, setisProfileDropdownOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

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

    const handleProfileDropdownToggle = () => {
        setisProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleLogout = async () => {
        try {
            await logout();

            navigate('/auth/iniciar-sesion');

            addToast({
                type: 'success',
                title: 'Sesión cerrada con éxito',
                message: '¡Te esperamos de nuevo pronto!'
            });
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al al cerrar sesión',
                message: 'Ocurrió un error desconocido al intentar cerrar sesión. Inténtalo de nuevo más tarde.'
            });
        }
    };

    return (
        <header className="navbar">

            <div className="container navbar-container">
                <Link to="/inicio">
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
                            <Link to="/inicio" className="navbar-text">Inicio</Link>
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
                            <Link to="/mis-proyectos" className="navbar-text">Mis proyectos</Link>
                        </li>
                        <li>
                            <Link to="/postulaciones" className="navbar-text">Mis postulaciones</Link>
                        </li>
                        <li className="navbar-link-mobile">
                            <Link to="/mensajes" className="navbar-text">Mensajes</Link>
                        </li>

                    </ul>
                </nav>

                <ul className="navbar-buttons-container">
                    <li className="message-button">
                        <button className="navbar-button message" onClick={() => navigate('/mensajes')}></button>
                    </li>
                    <li className="notification-button">
                        <button className="navbar-button notification" onClick={() => navigate('/notificaciones')}></button>
                    </li>
                    <li className="profile-button" onClick={handleProfileDropdownToggle}>
                        <div className="navbar-profile-photo">
                            {user.profile_pic ? (
                                <img src={`${SERVER_BASE_URL}${user.profile_pic}`} alt={`${user.name} ${user.last_name}`} />
                            ) : (
                                <img src="/../assets/jpg/no-profile-picture.jpg" alt="Sin foto de perfil" />
                            )}
                        </div>
                        <ul className={`dropdown-menu ${isProfileDropdownOpen ? 'show' : ''}`}>
                            <li>
                                <Link to="/mi-perfil" className="navbar-text">Mi perfil</Link>
                            </li>
                            <li>
                                <Link to="/" className="navbar-text" onClick={handleLogout}>Cerrar sesión</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

        </header>
    )
}

export default AuthNavbar;