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