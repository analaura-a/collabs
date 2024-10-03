const API_URL = 'http://localhost:3333/api';

export const getOpenProjects = async () => {

    const response = await fetch(`${API_URL}/projects/open`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error al intentar obtener los proyectos.');
    }

    return await response.json();
};

export const getProjectById = async (projectId) => {

    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        const response = await fetch(`${API_URL}/projects/${projectId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        });

        if (!response.ok) {
            throw new Error('Ocurrió un error al intentar encontrar el proyecto.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getUserProjects = async (userId) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/users/${userId}/projects`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error al obtener los proyectos del usuario');
    }

    return await response.json();
};

export const createProject = async (userId, projectData, type) => {

    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        const response = await fetch(`${API_URL}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({
                userId,
                projectData,
                type
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ocurrió un error al intentar crear el proyecto.');
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'Ocurrió un error al intentar crear el proyecto.');
    }
};

export const uploadProjectImage = async (projectId, projectImage) => {

    const formData = new FormData();
    formData.append('projectImage', projectImage);

    const response = await fetch(`${API_URL}/projects/${projectId}/image`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al subir la imagen del proyecto.');
    }

    return await response.json(); // Devolver la URL de la imagen subida
};

export const updateProjectDetails = async (projectId, projectData) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/projects/${projectId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        },
        body: JSON.stringify(projectData),
    });

    if (!response.ok) {
        throw new Error('Ocurrió un error al intentar actualizar los detalles del proyecto.');
    }

    return await response.json();
};

export const updateProjectOpenPositions = async (projectId, openPositions) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }
    const response = await fetch(`${API_URL}/projects/${projectId}/open-positions`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        },
        body: JSON.stringify({ open_positions: openPositions })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar actualizar la convocatoria del proyecto.');
    }

    return await response.json();
};

export const updateProjectStatus = async (projectId, newStatus) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Token de autenticación no encontrado');
    }

    const response = await fetch(`${API_URL}/projects/${projectId}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
        },
        body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar cambiar el estado del proyecto.');
    }

    return await response.json();
};