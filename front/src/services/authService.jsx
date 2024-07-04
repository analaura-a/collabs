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

export const login = async (userData) => {

    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Ocurrió un error al intentar iniciar sesión, inténtalo de nuevo más tarde.'); //Revisar
    }

    return data;

};