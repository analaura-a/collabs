const API_URL = 'http://localhost:3333/api';

export const createReview = async (projectId, reviewedUserId, reviewData) => {

    const token = localStorage.getItem('token');
    if (!token) throw new Error('No se encontró el token de autenticación');

    const response = await fetch(`${API_URL}/project-reviews/${projectId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        },
        body: JSON.stringify({ ...reviewData, reviewedUserId })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar crear la reseña.');
    }

    return await response.json();
};

export const updateReview = async (projectId, reviewId, reviewData) => {

    const token = localStorage.getItem('token');
    if (!token) throw new Error('No se encontró el token de autenticación');

    const response = await fetch(`${API_URL}/project-reviews/${projectId}/${reviewId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        },
        body: JSON.stringify(reviewData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar actualizar la reseña.');
    }

    return await response.json();
};

export const getReview = async (projectId, reviewedUserId) => {

    const token = localStorage.getItem('token');
    if (!token) throw new Error('No se encontró el token de autenticación');

    const response = await fetch(`${API_URL}/projects/${projectId}/reviews?reviewedUserId=${reviewedUserId}`, {
        method: 'GET',
        headers: {
            'auth-token': token
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar obtener la reseña.');
    }

    return await response.json();
};

export const getUserReviews = async (userId) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/users/${userId}/reviews`, {
        method: 'GET',
        headers: {
            'auth-token': token
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar obtener las reseñas.');
    }

    return await response.json();
};
