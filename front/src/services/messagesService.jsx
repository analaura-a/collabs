const API_URL = import.meta.env.VITE_SERVER_API_URL;

export const sendMessage = async ({ chat_id, text }) => {

    const token = localStorage.getItem('token');

    if (!token) throw new Error('No se encontró el token de autenticación');

    const response = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        },
        body: JSON.stringify({ chat_id, text })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar enviar el mensaje.');
    }

    return await response.json();
};

export const getChatMessages = async (chatId) => {

    const token = localStorage.getItem('token');

    if (!token) throw new Error('No se encontró el token de autenticación');

    const response = await fetch(`${API_URL}/chats/${chatId}/messages`, {
        method: 'GET',
        headers: {
            'auth-token': token
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar obtener los mensajes del chat.');
    }

    return await response.json();
};

export const markMessagesAsRead = async (chatId) => {

    const token = localStorage.getItem('token');

    if (!token) throw new Error('No se encontró el token de autenticación');

    const response = await fetch(`${API_URL}/chats/${chatId}/read`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar marcar los mensajes como leídos.');
    }

    return await response.json();
};