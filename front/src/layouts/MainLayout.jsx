import { Outlet } from 'react-router-dom';

const MainLayout = () => {

    return (
        <div>
            <h1>Navbar y footer</h1>
            <Outlet />
        </div>
    )
}

export default MainLayout;