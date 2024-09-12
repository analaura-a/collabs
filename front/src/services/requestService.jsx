const API_URL = 'http://localhost:3333/api';

export const getRequestsByUserId = async (userId) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/users/${userId}/requests`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }
    });

    if (!response.ok) {
        throw new Error('Ocurrió un error al obtener las postulaciones del usuario.');
    }

    return await response.json();
};