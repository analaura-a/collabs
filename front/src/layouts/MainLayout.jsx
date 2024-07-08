import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import GuestNavbar from '../components/Navbar/GuestNavbar';
import AuthNavbar from '../components/Navbar/AuthNavbar';
import GuestFooter from '../components/Footer/GuestFooter';
import AuthFooter from '../components/Footer/AuthFooter';
import AuthContext from '../context/AuthContext';

const MainLayout = () => {

    const { authState } = useContext(AuthContext);
    const { token, user } = authState;

    return (
        <>

            {token && user ? <AuthNavbar /> : <GuestNavbar />}

            <Outlet />

            {token && user ? <AuthFooter /> : <GuestFooter />}

        </>
    )
}

export default MainLayout;