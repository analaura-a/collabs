import { Outlet } from 'react-router-dom';
import GuestNavbar from '../components/Navbar/GuestNavbar';
import AuthNavbar from '../components/Navbar/AuthNavbar';
import GuestFooter from '../components/Footer/GuestFooter';
import AuthFooter from '../components/Footer/AuthFooter';

const MainLayout = () => {

    return (
        <>
            {/* <GuestNavbar /> */}
            <AuthNavbar />

            <Outlet />

            {/* <GuestFooter /> */}
            <AuthFooter />
        </>
    )
}

export default MainLayout;