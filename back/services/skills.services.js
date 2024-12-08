import { db, client } from '../db.js'

//Obtener todas las skills
const getSkills = async () => {
    try {
        await client.connect();
        const skillsCollection = db.collection('skills');
        const skills = await skillsCollection.find({}).sort({ name: 1 }).toArray();
        return skills.map(skill => skill.name);
    } catch (error) {
        console.error('Error al obtener las skills:', error);
        throw error;
    }
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const addSkill = async (name) => {
    try {
        await client.connect();
        const skillsCollection = db.collection('skills');
        const normalizedSkill = capitalizeFirstLetter(name.trim());
        const existingSkill = await skillsCollection.findOne({ name: normalizedSkill });
        if (existingSkill) {
            throw new Error('Esa skill ya existe.');
        }
        await skillsCollection.insertOne({ name: normalizedSkill });
    } catch (error) {
        console.error('Error al agregar la skill:', error);
        throw error;
    }
};

export {
    getSkills,
    addSkill
}