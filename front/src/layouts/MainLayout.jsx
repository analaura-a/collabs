import { Outlet } from 'react-router-dom';
import GuestNavbar from '../components/Navbar/GuestNavbar';

const MainLayout = () => {

    return (
        <>
            <GuestNavbar />

            <Outlet />

            <footer>
                Footer
            </footer>
        </>
    )
}

export default MainLayout;