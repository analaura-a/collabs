import { MongoClient, ObjectId } from "mongodb";
import bcrypt from 'bcrypt'

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
            onboardingComplete: false
        };
        await users.insertOne(basicUserProfile);

    } catch (error) {
        throw new Error(error.message || 'Error del servidor, por favor inténtalo de nuevo más tarde.');
    } finally {
        await client.close();
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
    } finally {
        await client.close();
    }

}

export {
    createAccount,
    login
}