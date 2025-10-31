const readline = require('readline-sync');

const controlador = require('./controlador');

function menu() {
  console.log("\n--- GERENCIADOR DE TAREFAS ---");
  console.log("1. Adicionar tarefa");
  console.log("2. Buscar tarefa");
  console.log("3. Atualizar tarefa");
  console.log("4. Remover tarefa");
  console.log("5. Sair");
  console.log("------------------------------");
}

async function escolherOpcao(opcao) {
  switch (opcao) {

    case '1': {
      const nome = readline.question("Digite o nome da nova tarefa: ");
      await controlador.adicionarTarefa(nome);
      console.log("Tarefa adicionada com sucesso!");
      break;
    }

    case '2': {
      const nome = readline.question("Digite o nome da tarefa que deseja buscar: ");
      const tarefa = await controlador.buscarTarefa(nome);
    
      if (tarefa && tarefa.id) {
        console.log("--- Tarefa Encontrada ---");
        console.log(`ID: ${tarefa.id}`);
        console.log(`Nome: ${tarefa.nome}`);
        console.log(`Concluída: ${tarefa.concluida}`);
        console.log("-------------------------");
      }
      break;
    }

    case '3': {
      const nome = readline.question("Digite o nome da tarefa que deseja atualizar: ");
      const concluidaStr = readline.question("A tarefa foi concluida? (sim/nao): ").toLowerCase();
      const concluida = (concluidaStr === 'sim' || concluidaStr === 's');
      await controlador.atualizarTarefa(nome, concluida);
      break;
    }

    case '4': {
      const nome = readline.question("Digite o nome da tarefa que deseja remover: ");
      await controlador.removerTarefa(nome);
      break;
    }
    case '5': {
      console.log("Encerrando a aplicação...");
      process.exit(0);
    }
    default:
      console.log("Opção inválida. Por favor, escolha um número de 1 a 5.");
  }
  readline.keyInPause();
}

async function main() {
  while (true) {
    menu();
    const opcao = readline.question("Escolha uma opcao: ");
    await escolherOpcao(opcao);
  }
}

main();