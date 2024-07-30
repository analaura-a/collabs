const API_URL = 'http://localhost:3333/api';

export const fetchSkills = async () => {

    const response = await fetch(`${API_URL}/skills`);

    if (!response.ok) {
        throw new Error(data.message || 'Ocurrió un error al intentar obtener la lista de skills, inténtalo de nuevo más tarde.')
    }

    return response.json();
};

export const addSkill = async (skill) => {

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const normalizedSkill = capitalizeFirstLetter(skill.trim());

    const response = await fetch(`${API_URL}/skills`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: normalizedSkill }),
    });

    if (!response.ok) {
        throw new Error(data.message || 'Ocurrió un error al intentar agregar la skill, inténtalo de nuevo más tarde.')
    }

    return response.json();
};
