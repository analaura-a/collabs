const API_URL = 'http://localhost:3333/api';

export const register = async (userData) => {

    const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Ocurrió un error al intentar crear la cuenta, inténtalo de nuevo más tarde.'); //Revisar
    }

    return data;

};

export const login = async (credentials) => {

    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Ocurrió un error al intentar iniciar sesión, inténtalo de nuevo más tarde.'); //Revisar
    }

    return data;

};

export const logout = async (token) => {

    const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
        },
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Ocurrió un error al intentar cerrar la sesión.'); //Revisar
    }
};