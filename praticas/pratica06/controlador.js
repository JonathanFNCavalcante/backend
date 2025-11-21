const Tarefa = require('./modelo.js');

async function adicionarTarefa(nome) {
  const tarefa = new Tarefa(nome, false);
  
  await tarefa.init();
  await tarefa.inserir();
}

async function buscarTarefa(nome) {
  const tarefa = new Tarefa(nome, null);
  await tarefa.init();
  await tarefa.buscar();

  return tarefa;
}

async function atualizarTarefa(nome, concluida) {
  const tarefa = new Tarefa(nome, null);

  await tarefa.init();
  await tarefa.buscar();

  if (tarefa.id) {
    tarefa.concluida = concluida;

    await tarefa.alterar();
  } else {
    console.log(`Tarefa "${nome}" não encontrada para atualização.`);
  }
}

async function removerTarefa(nome) {
  const tarefa = new Tarefa(nome, null);

  await tarefa.init();
  await tarefa.buscar();

  if (tarefa.id) {
    await tarefa.deletar();
  } else {
    console.log(`Tarefa "${nome}" não encontrada para remoção.`);
  }
}

module.exports = {
  adicionarTarefa,
  buscarTarefa,
  atualizarTarefa,
  removerTarefa
};