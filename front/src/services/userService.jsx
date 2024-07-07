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