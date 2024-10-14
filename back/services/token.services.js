import jwt from 'jsonwebtoken';
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb+srv://alumnos:alumnos@cluster0.rufodhz.mongodb.net");
const db = client.db("AH20232CP1");
const tokenCollection = db.collection("tokens");
const JWT_SECRET = 'clave_secreta';

//Crear token
async function createToken(account) {

    const token = jwt.sign(account, "Clave Secreta")

    await client.connect()

    await tokenCollection.insertOne({ token, account_id: account._id })

    return token;
}

//Validar token
async function validateToken(token) {

    try {
        const payload = jwt.verify(token, "Clave Secreta")

        await client.connect()

        const activeSession = await tokenCollection.findOne({ token, account_id: new ObjectId(payload._id) })
        // console.log("Sesión activa:", activeSession)

        if (!activeSession) return null

        return payload

    } catch (error) {
        return null
    }

}

//Eliminar token
async function removeToken(token) {

    try {
        await client.connect();
        const result = await tokenCollection.deleteOne({ token });

        if (result.deletedCount === 0) {
            throw new Error('Token no encontrado.');
        }

        return { message: 'Sesión cerrada con éxito. ¡Te esperamos pronto!' };
    } catch (error) {
        throw new Error(`Error al eliminar el token: ${error.message}`);
    }

}

// Generar un token para el restablecimiento de contraseña
function generateResetToken(userId) {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' }); // Token válido por 1 hora
}

// Verificar el token de restablecimiento de contraseña
function verifyResetToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Token inválido o expirado.');
    }
}

export {
    createToken,
    validateToken,
    removeToken,
    generateResetToken,
    verifyResetToken
}