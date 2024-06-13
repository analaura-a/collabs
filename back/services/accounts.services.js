import { MongoClient, ObjectId } from "mongodb";
import bcrypt from 'bcrypt'

const client = new MongoClient("mongodb+srv://alumnos:alumnos@cluster0.rufodhz.mongodb.net");
const db = client.db("AH20232CP1");
const accounts = db.collection("accounts")

async function createAccount(account) {

    await client.connect()

    const exists = await accounts.findOne({ email: account.email })

    if (exists) throw new Error("Esa cuenta ya existe")

    const newAccount = { ...account }

    newAccount.password = await bcrypt.hash(account.password, 10)

    await accounts.insertOne(newAccount)

}

async function login(account) {

    await client.connect()

    const accountExists = await accounts.findOne({ email: account.email })

    if (!accountExists) {
        throw new Error("Esa cuenta no existe")
    }

    const isMatch = await bcrypt.compare(account.password, accountExists.password)

    if (!isMatch) {
        throw new Error("La contraseña es incorrecta")
    }

    return { ...accountExists, password: undefined }

}

export {
    createAccount,
    login
}