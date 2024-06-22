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
        <header>

            <Link to="/">
                <img src="/collabs-logo.svg" alt="Collabs" />
            </Link>

            <nav>
                <ul>
                    <li className="nav-item">
                        <Link to="#que-es">Qué es</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="#como-funciona">Cómo funciona</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="#funcionalidades">Funcionalidades</Link>
                    </li>
                    <li className="nav-item">
                        <p>Explorar</p>
                        <ul>
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

        </header>
    )
}

export default GuestNavbar;


