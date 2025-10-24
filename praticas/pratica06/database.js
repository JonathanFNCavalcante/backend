const { MongoClient } = require('mongodb');
const url = "mongodb+srv://Jonathan:<21122005>@cluster0.dtbhjos.mongodb.net/";

const client = new MongoClient(url);

async function conectarDb() {
  try {
    await client.connect();
    console.log("Conectado com sucesso ao banco de dados!");
    return client.db('agenda');

  } catch (error) {
    console.error("Falha ao conectar com o banco de dados:", error);
    await client.close();
    process.exit(1);
  }
}

module.exports = { conectarDb };