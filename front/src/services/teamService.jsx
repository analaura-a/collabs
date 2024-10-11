const API_URL = 'http://localhost:3333/api';

export const addMemberToProjectTeam = async (projectId, userId, role, profile) => {

    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        const response = await fetch(`${API_URL}/project_teams`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({
                projectId,
                userId,
                role,    // Puede ser "Organizador" o "Colaborador"
                profile, // Perfil profesional
            }),
        });

        if (!response.ok) {
            throw new Error('Ocurrió un error al intentar agregar el miembro al equipo.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ocurrió un error al intentar agregar el miembro al equipo:', error);
        throw error;
    }
};

export const getActiveProjectMembers = async (projectId) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/projects/${projectId}/active-members`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar obtener el equipo del proyecto.');
    }

    return await response.json();
};

export const getAllProjectMembers = async (projectId) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/projects/${projectId}/all-members`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar obtener el equipo del proyecto.');
    }

    return await response.json();
};

export const getProjectOrganizers = async (projectId) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        const response = await fetch(`${API_URL}/projects/${projectId}/organizers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        });

        if (!response.ok) {
            throw new Error('Ocurrió un error al intentar obtener los organizadores del proyecto');
        }
        const organizers = await response.json();
        return organizers;
    } catch (error) {
        console.error('Error al obtener los organizadores:', error);
        throw error;
    }
};

export const getSharedCompletedProjects = async (reviewedUserId) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/users/${reviewedUserId}/shared-projects`, {
        method: 'GET',
        headers: {
            'auth-token': token,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar obtener los proyectos compartidos.');
    }

    const data = await response.json();
    return data;
};

export const checkUserInProjectTeam = async (projectId, userId) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/projects/${projectId}/team/check-user/${userId}`, {
        method: 'GET',
        headers: {
            'auth-token': token,
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error al verificar si el usuario está en el equipo.');
    }

    const data = await response.json();
    return data.isMember;
};

export const getUserRoleInProject = async (projectId, userId) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/projects/${projectId}/user/${userId}/role`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error al intentar obtener el rol del usuario.');
    }

    return await response.json();
};

export const removeUserFromProject = async (projectId, userId) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Token de autenticación no encontrado');
    }

    const response = await fetch(`${API_URL}/projects/${projectId}/team/${userId}/remove`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar eliminar al usuario del proyecto.');
    }

    return await response.json();
};

export const leaveProject = async (projectId, userId) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/projects/${projectId}/team/leave`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        },
        body: JSON.stringify({ userId })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar abandonar el proyecto.');
    }

    return await response.json();
};
