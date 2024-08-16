import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb+srv://alumnos:alumnos@cluster0.rufodhz.mongodb.net");
const db = client.db("AH20232CP1");

//Obtener todos los usuarios
async function getUsers() {

    return db
        .collection("users")
        .find()
        .toArray();

}

//Obtener un usuario en específico por ID
async function getUserById(id) {

    // await client.connect();

    const user = await db.collection("users").findOne({ _id: new ObjectId(id) });

    if (!user) {
        throw new Error("No se encontró un perfil para ese usuario.")
    }

    return user;
}

//Obtener un usuario en específico por username
async function getUserByUsername(username) {
    await client.connect();
    try {
        const user = await db.collection('users').findOne({ username: username });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

//Verificar si ya existe un usuario con el mismo username
const isUsernameAvailable = async (username) => {
    try {
        await client.connect();
        const user = await db.collection("users").findOne({ username });
        if (user) {
            throw new Error('El nombre de usuario ya está en uso.');
        }
        return true;
    } catch (error) {
        throw new Error(error.message || 'Error al comprobar la disponibilidad del username.');
    } finally {
        await client.close();
    }
};

//Completar y agregar todos los datos del onboarding al perfil del usuario
const completeOnboarding = async (userId, onboardingData) => {
    try {
        await client.connect();
        const accountsCollection = db.collection('accounts');
        const usersCollection = db.collection('users');

        await accountsCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { onboardingComplete: true } }
        );

        const { _id, ...updateData } = onboardingData;
        updateData.onboardingComplete = true;

        await usersCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: updateData },
            { upsert: true }
        );
    } catch (error) {
        console.error('Ocurrió un error al completar el onboarding:', error);
        throw error;
    } finally {
        await client.close();
    }
};

//Editar un usuario en especifico
async function editUser(id, user) {
    const editedUser = await db.collection("users").updateOne({ _id: new ObjectId(id) }, { $set: user });
    return editedUser;
}

export {
    getUsers,
    getUserById,
    getUserByUsername,
    isUsernameAvailable,
    completeOnboarding,
    editUser
}