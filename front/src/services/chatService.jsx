const API_URL = import.meta.env.VITE_SERVER_API_URL;

export const createChat = async ({ type, participants, project_id }) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/chats`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        },
        body: JSON.stringify({ type, participants, project_id })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar crear el chat.');
    }

    return await response.json();
};

export const getUserChats = async () => {

    const token = localStorage.getItem('token');

    if (!token) throw new Error('No se encontró el token de autenticación');

    const response = await fetch(`${API_URL}/user/chats`, {
        method: 'GET',
        headers: {
            'auth-token': token
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar obtener los chats.');
    }

    return await response.json();
};

export const getProjectChat = async (projectId) => {

    const token = localStorage.getItem('token');

    if (!token) throw new Error('No se encontró el token de autenticación');

    const response = await fetch(`${API_URL}/project/${projectId}/chat`, {
        method: 'GET',
        headers: {
            'auth-token': token
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar obtener el chat del proyecto.');
    }

    return await response.json();
};

export const leaveGroupChat = async (projectId) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/project/${projectId}/chat/leave`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar salir del chat');
    }

    return await response.json();
};