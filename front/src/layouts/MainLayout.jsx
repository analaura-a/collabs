import { Outlet } from 'react-router-dom';
import GuestNavbar from '../components/Navbar/GuestNavbar';
import AuthNavbar from '../components/Navbar/AuthNavbar';

const MainLayout = () => {

    return (
        <>
            {/* <GuestNavbar /> */}
            <AuthNavbar />

            <Outlet />

            <footer>
                Footer
            </footer>
        </>
    )
}

export default MainLayout;