import jwt from 'jsonwebtoken';
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb+srv://alumnos:alumnos@cluster0.rufodhz.mongodb.net");
const db = client.db("AH20232CP1");
const tokenCollection = db.collection("tokens")

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
    await client.connect()
    await tokenCollection.deleteOne({ token })
}


export {
    createToken,
    validateToken,
    removeToken
}