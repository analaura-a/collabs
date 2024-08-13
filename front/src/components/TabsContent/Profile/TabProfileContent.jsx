import { useContext } from 'react';
import AuthContext from '../../../context/AuthContext';

const TabProfileContent = () => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    return (
        <section className="tab-profile-container">

           
        </section>
    );
};

export default TabProfileContent;