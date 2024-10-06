import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb+srv://alumnos:alumnos@cluster0.rufodhz.mongodb.net");
const db = client.db("AH20232CP1");

// Obtener los atajos de un proyecto
const getProjectShortcuts = async (projectId) => {

    try {
        await client.connect();
        const shortcuts = await db.collection('projects_shortcuts')
            .find({ project_id: new ObjectId(projectId) })
            .toArray();
        return shortcuts;
    } catch (error) {
        throw new Error(`Error al obtener los atajos: ${error.message}`);
    }
};

// Crear un nuevo atajo
const createProjectShortcut = async (projectId, shortcutData) => {

    try {
        await client.connect();

        const newShortcut = {
            project_id: new ObjectId(projectId),
            name: shortcutData.name,
            url: shortcutData.url,
            created_by: new ObjectId(shortcutData.created_by),
        };

        const result = await db.collection('projects_shortcuts').insertOne(newShortcut);

        return result;
    } catch (error) {
        throw new Error(`Error al crear el atajo: ${error.message}`);
    }
};

export {
    getProjectShortcuts,
    createProjectShortcut
}