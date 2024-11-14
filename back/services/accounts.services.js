import { MongoClient, ObjectId } from "mongodb";
import bcrypt from 'bcrypt';
import { sendResetPasswordEmail } from './email.services.js';
import { generateResetToken, verifyResetToken } from './token.services.js';
import { deleteProject } from './projects.services.js'
import { leaveGroupChat } from "./chats.services.js";

const client = new MongoClient("mongodb+srv://alumnos:alumnos@cluster0.rufodhz.mongodb.net");
const db = client.db("AH20232CP1");
const accounts = db.collection("accounts")
const users = db.collection("users")

async function createAccount(account) {

    try {

        await client.connect()

        //Verificar si el usuario existe
        const exists = await accounts.findOne({ email: account.email })
        if (exists) {
            throw new Error('Ya existe una cuenta asociada a ese correo electrónico.');
        }

        //Crear cuenta nueva
        const newAccount = { ...account }
        newAccount.password = await bcrypt.hash(account.password, 10)
        newAccount.onboardingComplete = false;
        newAccount.createdAt = new Date();

        const result = await accounts.insertOne(newAccount);
        const accountId = result.insertedId;

        //Crear un perfil básico asociado a la cuenta
        const basicUserProfile = {
            _id: accountId,
            email: newAccount.email,
            name: newAccount.name,
            last_name: newAccount.last_name,
            username: "user-" + accountId,
            profile_pic: null,
            bio: null,
            location: null,
            portfolio_link: null,
            onboardingComplete: false,
            socials: [
                { "name": "LinkedIn", "url": null },
                { "name": "GitHub", "username": null },
                { "name": "CodePen", "username": null },
                { "name": "Behance", "url": null },
                { "name": "Dribbble", "url": null },
                { "name": "Twitter", "username": null },
                { "name": "Instagram", "username": null },
            ],
            createdAt: newAccount.createdAt
        };
        await users.insertOne(basicUserProfile);

    } catch (error) {
        throw new Error(error.message || 'Error del servidor, por favor inténtalo de nuevo más tarde.');
    }

}

async function login(account) {

    try {

        await client.connect()

        //Verificar si la cuenta existe
        const accountExists = await accounts.findOne({ email: account.email })
        if (!accountExists) {
            throw new Error("No existe una cuenta asociada a ese correo electrónico.")
        }

        //Verificar si la contraseña es correcta
        const isMatch = await bcrypt.compare(account.password, accountExists.password)
        if (!isMatch) {
            throw new Error("La contraseña es incorrecta.")
        }

        //Devuelve los datos de la cuenta
        return { ...accountExists, password: undefined }

    } catch (error) {
        throw new Error(error.message || 'Error del servidor, por favor inténtalo de nuevo más tarde.');
    }

}

async function changePassword(userId, currentPassword, newPassword) {

    await client.connect()

    // Buscar usuario por ID
    const user = await db.collection('accounts').findOne({ _id: new ObjectId(userId) });
    if (!user) {
        throw new Error('Usuario no encontrado.');
    }

    // Verificar contraseña actual
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        throw new Error('La contraseña actual es incorrecta.');
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña
    await db.collection('accounts').updateOne(
        { _id: new ObjectId(userId) },
        { $set: { password: hashedPassword } }
    );

}

const updatePersonalProfileData = async (userId, accountData) => {

    await client.connect()

    await db.collection('accounts').updateOne(
        { _id: new ObjectId(userId) },
        { $set: accountData }
    );
};

// Solicitar restablecimiento de contraseña
async function requestPasswordReset(email) {

    // Verificar si el usuario existe
    const user = await db.collection('accounts').findOne({ email });
    if (!user) {
        throw new Error('No se encontró ninguna cuenta con ese correo electrónico.');
    }

    // Generar un token de restablecimiento
    const token = generateResetToken(user._id);

    // Enviar el correo de restablecimiento de contraseña
    await sendResetPasswordEmail(email, token);

};

// Restablecer la contraseña
async function resetPassword(token, newPassword) {

    // Verificar el token
    const decoded = verifyResetToken(token);
    const userId = decoded.id;

    // Verificar si el usuario existe
    const user = await db.collection('accounts').findOne({ _id: new ObjectId(userId) });
    if (!user) {
        throw new Error('El token es inválido o ha expirado.');
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña del usuario en la base de datos
    await db.collection('accounts').updateOne(
        { _id: new ObjectId(userId) },
        { $set: { password: hashedPassword } }
    );

}

// Eliminar una cuenta
const deleteAccount = async (userId) => {

    const userObjectId = new ObjectId(userId);

    try {
        await client.connect();

        // 1. Eliminar cuenta
        await db.collection('accounts').deleteOne({ _id: userObjectId });

        // 2. Eliminar perfil
        await db.collection('users').deleteOne({ _id: userObjectId });

        // 3. Eliminar tokens de autenticación activos
        await db.collection('tokens').deleteMany({ account_id: userObjectId });

        // 4. Eliminar notificaciones del usuario
        await db.collection('notifications').deleteMany({
            $or: [{ user_id: userObjectId }, { sender_id: userObjectId }]
        });

        // 5. Eliminar postulaciones del usuario
        await db.collection('projects_requests').deleteMany({ user_id: userObjectId });

        // 6. Eliminar reseñas del usuario
        await db.collection('projects_reviews').deleteMany({
            $or: [{ reviewer_id: userObjectId }, { reviewed_user_id: userObjectId }]
        });

        // 7. Eliminar proyectos creados por el usuario
        const userProjects = await db.collection('projects')
            .find({ founder_id: userObjectId })
            .toArray();

        for (const project of userProjects) {
            await deleteProject(project._id);
        }

        // 8. Eliminar colaboraciones activas del usuario
        const userCollaborations = await db.collection('projects_teams')
            .find({ user_id: userObjectId, role: 'Colaborador' })
            .toArray();

        for (const collaboration of userCollaborations) {
            const projectId = collaboration.project_id;

            // a. Abandonar el chat del proyecto (si existe)
            await leaveGroupChat(projectId, userObjectId);

            // b. Eliminar mensajes enviados por el usuario
            await db.collection('messages').deleteMany({
                chat_id: collaboration.project_id,
                sender_id: userObjectId
            });
        }

        // 9. Eliminar todas las participaciones en proyectos del usuario
        await db.collection('projects_teams').deleteMany({ user_id: userObjectId });

        // 10. Eliminar chats privados donde el usuario es participante
        await db.collection('chats').deleteMany({
            type: 'private',
            participants: userObjectId
        });

    } catch (error) {
        throw new Error(`Error al eliminar la cuenta y sus datos asociados: ${error.message}`);
    }
};

export {
    createAccount,
    login,
    changePassword,
    updatePersonalProfileData,
    requestPasswordReset,
    resetPassword,
    deleteAccount
}