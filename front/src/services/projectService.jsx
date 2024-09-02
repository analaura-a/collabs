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