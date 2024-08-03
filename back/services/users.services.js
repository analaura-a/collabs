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

//Obtener un usuario en específico
async function getUserById(id) {

    // await client.connect();

    const user = await db.collection("users").findOne({ _id: new ObjectId(id) });

    if (!user) {
        throw new Error("No se encontró un perfil para ese usuario.")
    }

    return user;
}

//Verificar si ya existe un usuario con el mismo username
const isUsernameAvailable = async (username) => {
    try {
        await client.connect();
        const user = await db.collection("users").findOne({ username });
        return !user;
    } catch (error) {
        throw new Error('Error al comprobar la disponibilidad del username.');
    } finally {
        await client.close();
    }
};

//Crear un nuevo perfil de usuario (vinculado a una cuenta)
//Deberá ser borrado:
async function createUser(account, userProfileData) {

    const userProfile = {
        ...userProfileData,
        email: account.email,
        _id: new ObjectId(account._id)
    }

    await client.connect()

    const exists = await db.collection("users").findOne({ email: account.email })

    if (exists) {
        throw new Error("Ya existe un perfil creado para ese usuario")
    }

    await db.collection("users").insertOne(userProfile)

    return userProfile;
}

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

        const userUpdateData = {
            _id: new ObjectId(userId),
            onboardingComplete: true,
            ...onboardingData,
        };

        await usersCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: userUpdateData },
            { upsert: true }
        );
    } catch (error) {
        console.error('Ocurrió un error al completar el onboarding:', error);
        throw error;
    } finally {
        await client.close();
    }
};

//Editar un usuario
async function editUser(id, user) {
    const editedUser = await db.collection("users").updateOne({ _id: new ObjectId(id) }, { $set: user });
    return editedUser;
}

export {
    getUsers,
    getUserById,
    isUsernameAvailable,
    createUser,
    completeOnboarding,
    editUser
}