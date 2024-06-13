import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb+srv://alumnos:alumnos@cluster0.rufodhz.mongodb.net');
const db = client.db("AH20232CP1");

client.connect()
    .then(async () => {
        console.log("Conectado");
    })
    .catch(() => console.log("No me pude conectar"));