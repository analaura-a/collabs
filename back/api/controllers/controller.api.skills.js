import * as service from "../../services/skills.services.js";

//Obtener todas las skills
const getSkills = async (req, res) => {
    try {
        const skills = await service.getSkills();
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error al obtener la lista de skills.' });
    }
};

export {
    getSkills
}