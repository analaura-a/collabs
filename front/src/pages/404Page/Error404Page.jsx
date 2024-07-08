import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GuestNavbar from "../../components/Navbar/GuestNavbar";
import AuthNavbar from '../../components/Navbar/AuthNavbar';
import GuestFooter from "../../components/Footer/GuestFooter";
import AuthFooter from '../../components/Footer/AuthFooter';
import Button from "../../components/Button/Button";
import AuthContext from '../../context/AuthContext';

const Error404Page = () => {

    const { authState } = useContext(AuthContext);
    const { token, user } = authState;
    const navigate = useNavigate();

    return (
        <>
            {token && user ? <AuthNavbar /> : <GuestNavbar />}

            <main className="container error-page">

                <div className="error-page__title">
                    <h1 className="title-40">¡Ups! Parece que esa página no existe</h1>
                    <p className="big-subtitle">Puede que la página que estés buscando no exista o fuese eliminada.</p>
                </div>

                <img src="assets/png/error-page.png" alt="Error 404: página no encontrada" />

                {token && user ? <Button size="large" width="full-then-fit" onClick={() => navigate('/inicio')}>Volver al inicio</Button> : <Button size="large" width="full-then-fit" onClick={() => navigate('/')}>Volver al inicio</Button>}

            </main>

            {token && user ? <AuthFooter /> : <GuestFooter />}
        </>
    )
}

export default Error404Page;