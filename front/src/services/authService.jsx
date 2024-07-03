const API_URL = 'http://localhost:3333/api/';

export const register = async (userData) => {

    const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'El registro falló');
    }

    return data;
    
};