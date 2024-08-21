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

//Verificar si ya existe un usuario con el mismo email
const checkIfEmailExists = async (newEmail) => {
    await client.connect();
    const emailExists = await db.collection("users").findOne({ email: newEmail });
    if (emailExists) {
        throw new Error("El email ya está en uso.");
    }
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

//Editar un usuario en especifico (SIN USAR)
// async function editUser(id, user) {
//     const editedUser = await db.collection("users").updateOne({ _id: new ObjectId(id) }, { $set: user });
//     return editedUser;
// }

//Editar los datos de la cuenta
async function updateUserAccountData(userId, newEmail, newUsername) {

    await client.connect();

    const updateFields = {};
    if (newEmail) {
        updateFields.email = newEmail;
    }
    if (newUsername) {
        updateFields.username = newUsername;
    }

    // Actualizar la colección accounts
    if (newEmail) {
        await db.collection("accounts").updateOne(
            { _id: new ObjectId(userId) },
            { $set: { email: newEmail } }
        );
    }

    // Actualizar la colección users
    if (Object.keys(updateFields).length > 0) {
        await db.collection("users").updateOne(
            { _id: new ObjectId(userId) },
            { $set: updateFields }
        );
    }
}

//Editar las preferencias del usuario
async function updateUserPreferencesData(userId, preferences) {

    await client.connect();

    await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $set: { preferences } }
    );
}

// Editar el link al portfolio
const updateUserPortfolioData = async (userId, portfolioLink) => {

    await client.connect();

    await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $set: { portfolio_link: portfolioLink } }
    );
};

// Editar los datos de contacto
async function updateUserSocialsData(userId, socials) {

    await client.connect();

    await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $set: { socials } }
    );
}

/*Editar los datos personales*/
// Subir la foto de perfil
const updateUserProfilePhotoData = async (userId, profilePhotoUrl) => {

    await client.connect();

    await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $set: { profile_pic: profilePhotoUrl } }
    );

    return await db.collection('users').findOne({ _id: new ObjectId(userId) });
};

// Editar los datos personales
const updateUserPersonalProfileData = async (userId, userProfileData) => {

    await client.connect();

    await db.collection('users').findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $set: userProfileData },
        { returnOriginal: false } 
    );
};

// Eliminar la foto de perfil
const deleteProfilePhoto = async (userId) => {

    await client.connect();

    const user = await db.collection('users').findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $set: { profile_pic: null } }, // Establecer profile_pic como null
        { returnOriginal: true } // Devuelve el documento original con la foto antes de eliminarla
    );

    return user; // Devuelve el documento original que contiene la ruta de la foto
};

export {
    getUsers,
    getUserById,
    getUserByUsername,
    isUsernameAvailable,
    checkIfEmailExists,
    completeOnboarding,
    // editUser,
    updateUserAccountData,
    updateUserPreferencesData,
    updateUserPortfolioData,
    updateUserSocialsData,
    updateUserProfilePhotoData,
    updateUserPersonalProfileData,
    deleteProfilePhoto
}