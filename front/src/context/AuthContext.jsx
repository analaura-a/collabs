import { createContext, useState, useEffect } from 'react';
import { login as loginService, logout as logoutService } from '../services/authService';
import { completeOnboarding as completeOnboardingService } from '../services/userService'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [authState, setAuthState] = useState({
        token: null,
        user: null,
        error: null,
        loading: true
    });

    useEffect(() => {

        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if (token && user) {
            setAuthState({ token, user, error: null, loading: false });
        } else {
            setAuthState((prevState) => ({ ...prevState, loading: false }));
        }

    }, []);

    const login = async (credentials) => {

        try {
            const { token, userProfile } = await loginService(credentials);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userProfile));
            setAuthState({ token, user: userProfile, error: null, loading: false });
        } catch (error) {
            setAuthState({ token: null, user: null, error: error.message, loading: false });
            throw error;
        }

    };

    const logout = async () => {

        try {
            const token = authState.token;
            await logoutService(token);

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setAuthState({ token: null, user: null, error: null, loading: false });
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            setAuthState({ error: error.message });
        }

    };

    const updateUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setAuthState((prevState) => ({ ...prevState, user }));
    };

    const completeOnboarding = async (userId, onboardingData) => {

        try {
            await completeOnboardingService(userId, onboardingData);
            const updatedUser = { ...authState.user, onboardingComplete: true, ...onboardingData };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setAuthState((prevState) => ({
                ...prevState,
                user: updatedUser,
            }));
        } catch (error) {
            console.error('Error al completar el onboarding:', error);
            setAuthState((prevState) => ({ ...prevState, error: error.message }));
            throw error;
        }

    };

    return (
        <AuthContext.Provider value={{ authState, login, logout, updateUser, completeOnboarding }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;