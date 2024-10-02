const API_URL = 'http://localhost:3333/api';

export const getRequestsByProjectId = async (projectId) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/projects/${projectId}/requests`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar obtener las postulaciones.');
    }

    return await response.json();
};

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
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error al obtener las postulaciones del usuario.');
    }

    return await response.json();
};

export const createRequest = async (userId, requestData) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/project_requests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        },
        body: JSON.stringify(userId, requestData)
    });

    if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 409) {
            throw new Error('409');
        }

        throw new Error(errorData.message || 'Ocurrió un error al intentar enviar la postulación.');
    }

    return await response.json();
};

export const acceptApplication = async (requestId, projectId, userId, appliedRole) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró el token de autenticación.');
    }

    const response = await fetch(`${API_URL}/project_requests/${requestId}/accept`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
        },
        body: JSON.stringify({ projectId, userId, appliedRole }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar aceptar la postulación.');
    }

    return await response.json();
};

export const declineApplication = async (requestId, projectId) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró el token de autenticación.');
    }

    const response = await fetch(`${API_URL}/project_requests/${requestId}/decline`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
        },
        body: JSON.stringify({ projectId }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar declinar la postulación.');
    }

    return await response.json();
};

export const deleteRequest = async (requestId, userId) => {

    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        const response = await fetch(`${API_URL}/project_requests/${requestId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({ userId })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ocurrió un error al intentar cancelar la postulación.');
        }

        return response.json(); // Retorna el mensaje de éxito o los datos
    } catch (error) {
        console.error('Error al cancelar la postulación:', error);
        throw error;
    }
};