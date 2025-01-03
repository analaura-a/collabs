const API_URL = import.meta.env.VITE_SERVER_API_URL;

export const getUsers = async () => {

    const response = await fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error al intentar obtener a los usuarios.');
    }

    return await response.json();
};

export const fetchUserProfileByUsername = async (username) => {
    try {
        const response = await fetch(`${API_URL}/users/username/${username}`);
        if (!response.ok) {
            throw new Error('Ocurrió un error al intentar encontrar al usuario');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getUserById = async (userId) => {

    const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Error al obtener detalles del usuario.');
    }

    return await response.json();
};

export const checkUsernameAvailability = async (username) => {

    const response = await fetch(`${API_URL}/users/check-username`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error al intentar comprobar el username.');
    }

    const data = await response.json();
    return data.isAvailable;

};

export const completeOnboarding = async (userId, onboardingData) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró un token.');
    }

    const response = await fetch(`${API_URL}/users/complete-onboarding`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        },
        body: JSON.stringify({ userId, onboardingData }),
    });

    if (!response.ok) {
        throw new Error('Ocurrió un error al intentar completar el onboarding.');
    }

    return response.json();

};

export const updateUserAccountData = async (userId, updatedFields) => {

    try {

        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        const response = await fetch(`${API_URL}/users/account`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({
                userId,
                ...updatedFields
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Ocurrió un error al intentar actualizar los datos de la cuenta.');
        }

        return data;
    } catch (error) {
        throw error;
    }

};

export const updateUserPreferencesData = async (userId, preferences) => {

    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        const response = await fetch(`${API_URL}/users/preferences`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({ userId, preferences })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Ocurrió un error al intentar actualizar las preferencias.');
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export const updateUserPortfolioData = async (userId, portfolioLink) => {

    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        const response = await fetch(`${API_URL}/users/portfolio`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({ userId, portfolioLink })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Ocurrió un error al intentar actualizar el portfolio.');
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export const updateUserSocialsData = async (userId, socials) => {

    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        const response = await fetch(`${API_URL}/users/socials`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({ userId, socials })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Ocurrió un error al intentar actualizar los datos de contacto.');
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export const updateUserProfilePhotoData = async (formDataPhoto) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/users/profile-photo`, {
        method: 'PATCH',
        headers: {
            'auth-token': token,
        },
        body: formDataPhoto
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Ocurrió un error al intentar subir la foto de perfil.');
    }

    return data;
};

export const updateUserPersonalProfileData = async (userId, updatedData) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        const response = await fetch(`${API_URL}/users/personal-profile`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({ userId, ...updatedData })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Ocurrió un error al intentar actualizar los datos personales.');
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export const deleteProfilePhoto = async (userId) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        const response = await fetch(`${API_URL}/users/profile-photo`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({
                userId
            })
        });

        if (!response.ok) {
            throw new Error(response.message || 'Ocurrió un error al intentar eliminar la foto de perfil.');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const updateUserRoles = async (userId, roles) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/users/professional-profile/roles`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        },
        body: JSON.stringify({ userId, roles })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const updatedUser = await response.json();
    return updatedUser;
};

export const updateUserSkills = async (userId, skills) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/users/professional-profile/skills`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        },
        body: JSON.stringify({ userId, skills })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const updatedUser = await response.json();
    return updatedUser;
};

export const updateUserExperienceLevel = async (userId, experience_level) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/users/professional-profile/experience`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        },
        body: JSON.stringify({ userId, experience_level })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const updatedUser = await response.json();
    return updatedUser;
};

export const updateUserAvailability = async (userId, availability) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/users/professional-profile/availability`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        },
        body: JSON.stringify({ userId, availability })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const updatedUser = await response.json();
    return updatedUser;
};

export const getUserCollaborationStats = async (userId) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/users/${userId}/collaboration-stats`, {
        method: 'GET',
        headers: {
            'auth-token': token
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error desconocido al intentar obtener estadísticas de colaboración.');
    }

    return await response.json();
};