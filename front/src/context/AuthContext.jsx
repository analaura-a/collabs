import { createContext, useState, useEffect } from 'react';
import { login as loginService } from '../services/authService';
// import { fetchUserProfile as fetchUserProfileService } from '../services/userService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [authState, setAuthState] = useState({
        token: null,
        user: null,
        error: null
    });

    useEffect(() => {

        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if (token && user) {
            setAuthState({ token, user, error: null });
        }

    }, []);

    const login = async (credentials) => {

        try {
            const { token, userProfile } = await loginService(credentials);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userProfile));
            setAuthState({ token, user: userProfile, error: null });
        } catch (error) {
            setAuthState({ token: null, user: null, error: error.message });
            throw error;
        }

    };

    const logout = () => {
        //Falta borrar el token en la database
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({ token: null, user: null, error: null });
    };

    const updateUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setAuthState((prevState) => ({ ...prevState, user }));
    };

    // const fetchUserProfile = async () => {
    //     try {
    //         const userProfile = await fetchUserProfileService();
    //         updateUser(userProfile);
    //     } catch (error) {
    //         console.error('Failed to fetch user profile', error);
    //         setAuthState((prevState) => ({ ...prevState, error: error.message }));
    //     }
    // };

    return (
        <AuthContext.Provider value={{ authState, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
