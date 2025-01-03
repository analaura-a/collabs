import { ObjectId } from 'mongodb';
import { db, client } from '../db.js'

//Obtener todos los usuarios
async function getUsers() {

    return db
        .collection("users")
        .find()
        .toArray();

}

//Obtener un usuario en específico por ID
async function getUserById(id) {

    await client.connect();

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

// Obtener estadísticas de colaboración del usuario
const getUserCollaborationStats = async (userId) => {

    try {
        await client.connect();

        // Obtener todos los proyectos en los que el usuario participó
        const projectsTeams = await db.collection('projects_teams')
            .find({ user_id: new ObjectId(userId) })
            .toArray();

        if (!projectsTeams.length) {
            return {
                isCollaborating: false,
                collaboratedProjects: 0,
                finishedProjects: 0,
                organizedProjects: 0,
                abandonedProjects: 0
            };
        }

        // Obtener los estados de cada proyecto
        const projectIds = projectsTeams.map(project => project.project_id);
        const projectStatuses = await db.collection('projects')
            .find({ _id: { $in: projectIds } }, { projection: { status: 1 } })
            .toArray();

        // Filtrar proyectos por categorías:
        const collaboratedProjects = projectsTeams.length;  // Total de proyectos donde colaboró
        const finishedProjects = projectStatuses.filter((proj, index) =>
            proj.status === 'Finalizado' && projectsTeams[index].status === 'Activo').length; // Proyectos finalizados 
        const organizedProjects = projectsTeams.filter(proj => proj.role === 'Organizador').length; // Proyectos donde fue organizador
        const abandonedProjects = projectsTeams.filter(proj => proj.status === 'Inactivo').length; // Proyectos que abandonó

        // Verificar si el usuario está colaborando actualmente
        const isCollaborating = projectStatuses.some((proj, index) =>
            proj.status !== 'Finalizado' && projectsTeams[index].status === 'Activo');

        return {
            isCollaborating,
            collaboratedProjects,
            finishedProjects,
            organizedProjects,
            abandonedProjects
        };
    } catch (error) {
        throw new Error(`Error al obtener estadísticas de colaboración: ${error.message}`);
    }
};

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
    }
};

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

// Editar los roles profesionales
const updateUserRoles = async (userId, roles) => {
    try {
        await client.connect();
        const updatedUser = await db.collection('users').findOneAndUpdate(
            { _id: new ObjectId(userId) },
            { $set: { roles } },
            { returnDocument: 'after' }
        );
        if (!updatedUser) {
            throw new Error('Usuario no encontrado.');
        }
        return updatedUser;
    } catch (error) {
        throw new Error('Ocurrió un error al actualizar los roles.');
    }
};

// Editar las skills
const updateUserSkills = async (userId, skills) => {
    try {
        await client.connect();
        const updatedUser = await db.collection('users').findOneAndUpdate(
            { _id: new ObjectId(userId) },
            { $set: { skills } },
            { returnDocument: 'after' }
        );
        if (!updatedUser) {
            throw new Error('Usuario no encontrado');
        }
        return updatedUser;
    } catch (error) {
        throw new Error('Ocurrió un error al actualizar las skills.');
    }
};

// Editar el nivel de experiencia
const updateUserExperienceLevel = async (userId, experience_level) => {
    try {
        await client.connect();
        const updatedUser = await db.collection('users').findOneAndUpdate(
            { _id: new ObjectId(userId) },
            { $set: { experience_level } },
            { returnDocument: 'after' }
        );
        if (!updatedUser) {
            throw new Error('Usuario no encontrado');
        }
        return updatedUser;
    } catch (error) {
        throw new Error('Ocurrió un error al actualizar el nivel de conocimiento.');
    }
};

// Editar la disponibilidad
const updateUserAvailability = async (userId, availability) => {
    try {
        await client.connect();
        const updatedUser = await db.collection('users').findOneAndUpdate(
            { _id: new ObjectId(userId) },
            { $set: { availability } },
            { returnDocument: 'after' }
        );
        if (!updatedUser) {
            throw new Error('Usuario no encontrado');
        }
        return updatedUser;
    } catch (error) {
        throw new Error('Ocurrió un error al actualizar la disponibilidad.');
    }
};

// Eliminar la cuenta
const deleteAccount = async (userId) => {
    try {
        await client.connect();

        const userObjectId = new ObjectId(userId);

        // Eliminar al usuario de la colección "users"
        const userDeletionResult = await db.collection('users').deleteOne({ _id: userObjectId });
        if (userDeletionResult.deletedCount === 0) {
            throw new Error('No se encontró el usuario en la colección "users".');
        }

        // Eliminar al usuario de la colección "accounts"
        const accountDeletionResult = await db.collection('accounts').deleteOne({ _id: userObjectId });
        if (accountDeletionResult.deletedCount === 0) {
            throw new Error('No se encontró el usuario en la colección "accounts".');
        }

        // Eliminar los tokens del usuario de la colección "tokens"
        await db.collection('tokens').deleteMany({ account_id: userObjectId });

        //Agregar otras colecciones más adelante

    } catch (error) {
        throw new Error('Ocurrió un error al eliminar la cuenta: ' + error.message);
    }
};

export {
    getUsers,
    getUserById,
    getUserByUsername,
    getUserCollaborationStats,
    isUsernameAvailable,
    checkIfEmailExists,
    completeOnboarding,
    updateUserAccountData,
    updateUserPreferencesData,
    updateUserPortfolioData,
    updateUserSocialsData,
    updateUserProfilePhotoData,
    updateUserPersonalProfileData,
    deleteProfilePhoto,
    updateUserRoles,
    updateUserSkills,
    updateUserExperienceLevel,
    updateUserAvailability,
    deleteAccount
}