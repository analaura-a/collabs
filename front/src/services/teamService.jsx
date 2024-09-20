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