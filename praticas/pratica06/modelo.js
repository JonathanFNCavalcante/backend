const { conectarDb } = require('./database.js');

class Tarefa {
  db = null;
  collection = null;

  constructor(nome, concluida) {
    this.nome = nome;
    this.concluida = concluida;
    this.id = null;
  }

  async init() {
    this.db = await conectarDb();
    this.collection = this.db.collection('tarefas');
  }

  async inserir() {
    if (!this.collection) {
        throw new Error("A conexão com o banco de dados não foi inicializada. Chame o método init() primeiro.");
    }
   
    const resultado = await this.collection.insertOne({
      nome: this.nome,
      concluida: this.concluida
    });
  
    this.id = resultado.insertedId;
    console.log(`Tarefa "${this.nome}" inserida com o ID: ${this.id}`);
  }

  async alterar() {
    if (!this.collection || !this.id) {
        throw new Error("A tarefa precisa ser inserida ou buscada antes de ser alterada. Verifique o ID.");
    }
    await this.collection.updateOne(
      { _id: this.id },
      { $set: { nome: this.nome, concluida: this.concluida } }
    );
    console.log(`Tarefa com ID "${this.id}" alterada.`);
  }

  async deletar() {
    if (!this.collection) {
        throw new Error("A conexão com o banco de dados não foi inicializada.");
    }
    await this.collection.deleteOne({ nome: this.nome });
    console.log(`Tarefa "${this.nome}" deletada.`);
  }

  async buscar() {
    if (!this.collection) {
        throw new Error("A conexão com o banco de dados não foi inicializada.");
    }
    const resultado = await this.collection.findOne({ nome: this.nome });

    if (resultado) {
      this.id = resultado._id;
      this.nome = resultado.nome;
      this.concluida = resultado.concluida;
      console.log(`Tarefa "${this.nome}" encontrada.`);
    } else {
      console.log(`Tarefa "${this.nome}" não encontrada.`);
    }
  }
}

module.exports = Tarefa;