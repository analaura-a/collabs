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

//Agregar una nueva skill
const addSkill = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'El nombre de la skill es requerido.' });
        }
        await service.addSkill(name);
        res.status(201).json({ message: 'Skill agregada con éxito.' });
    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error al agregar la skill.' });
    }
};

export {
    getSkills,
    addSkill
}