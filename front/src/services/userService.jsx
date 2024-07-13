const API_URL = 'http://localhost:3333/api';

export const fetchUserProfile = async () => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token.');
    }

    const response = await fetch(`${API_URL}/user/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error al intentar obtener el perfil del usuario.');
    }

    return await response.json();
};

export const checkUsernameAvailability = async (username) => {

    const response = await fetch(`${API_URL}/users/check-username`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    });

    if (!response.ok) {
        throw new Error('Ocurrió un error al intentar comprobar el username.');
    }

    const data = await response.json();
    return data.isAvailable;

};