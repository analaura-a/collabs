const API_URL = import.meta.env.VITE_SERVER_API_URL;

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

export const changePassword = async (userId, currentPassword, newPassword) => {

    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No se encontró el token de autenticación.');
        }

        const response = await fetch(`${API_URL}/auth/change-password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({
                userId,
                currentPassword,
                newPassword
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Ocurrió un error al intentar cambiar la contraseña.');
        }

        return data;
    } catch (error) {
        throw error;
    }

};

export const deleteAccount = async (userId) => {

    try {
        const response = await fetch(`${API_URL}/auth/delete-account/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ocurrió un error al intentar eliminar la cuenta.');
        }

        return await response.json();

    } catch (error) {
        throw new Error(error.message);
    }
};