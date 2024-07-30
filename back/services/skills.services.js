import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb+srv://alumnos:alumnos@cluster0.rufodhz.mongodb.net");
const db = client.db("AH20232CP1");

//Obtener todas las skills
const getSkills = async () => {
    try {
        await client.connect();
        const skillsCollection = db.collection('skills'); 
        const skills = await skillsCollection.find({}).toArray();
        return skills.map(skill => skill.name);
    } catch (error) {
        console.error('Error al obtener las skills:', error);
        throw error;
    } finally {
        await client.close();
    }
};

export {
    getSkills
}