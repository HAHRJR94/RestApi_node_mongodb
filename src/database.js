import MongoClient from 'mongodb';

export async function connect() {
    try {
        //Pasamos la dirección de la db, si no existe la crea
        const client = await MongoClient.connect('mongodb://localhost:27017', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        const db = client.db('node-restapi');
        console.log('DB is connected');
        return db;
    } catch (e) {
        console.log(e);
    }
}