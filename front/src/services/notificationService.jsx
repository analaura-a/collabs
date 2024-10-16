const API_URL = 'http://localhost:3333/api';

// Obtener todas las notificaciones de un usuario
export const getUserNotifications = async (userId) => {

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/users/${userId}/notifications`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar obtener las notificaciones del usuario.');
    }

    return await response.json();
};

// Crear una nueva notificación
export const createNotification = async (notificationData) => {

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/notifications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        },
        body: JSON.stringify(notificationData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar crear la notificación.');
    }

    return await response.json();
};

// Marcar todas las notificaciones de un usuario como leídas
export const markAllNotificationsAsRead = async (userId) => {

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/notifications/${userId}/read-all`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar marcar todas las notificaciones como leídas.');
    }

    return await response.json();
};

// Marcar una notificación específica como leída
export const markNotificationAsRead = async (notificationId) => {

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/notifications/${notificationId}/read`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar marcar la notificación como leída.');
    }

    return await response.json();
};