const express = require('express');


let tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true }
];

const app = express();
app.use(express.json());


const logRequisicao = (req, res, next) => {
  const dataHora = new Date().toISOString();
  console.log(`[${dataHora}] ${req.method} ${req.originalUrl}`);
  next();
};
app.use(logRequisicao);


const tarefasRouter = express.Router();


const encontrarTarefa = (req, res, next) => {
  const tarefaId = parseInt(req.params.tarefaId);
  req.tarefa = tarefas.find(t => t.id === tarefaId);
  req.tarefaIndex = tarefas.findIndex(t => t.id === tarefaId);
  

  if (req.tarefa == null) {
    
    const err = new Error("Tarefa não localizada");
    err.status = 404;
    return next(err);
  }
  
  next(); 
};


tarefasRouter.get('/', (req, res) => {
  res.json(tarefas);
});


tarefasRouter.post('/', (req, res) => {
  const novaTarefa = {
    id: tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1,
    nome: req.body.nome,
    concluida: req.body.concluida || false
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});


tarefasRouter.get('/:tarefaId', encontrarTarefa, (req, res) => {
  res.json(req.tarefa);
});


tarefasRouter.put('/:tarefaId', encontrarTarefa, (req, res) => {
  const tarefaAtualizada = { ...req.tarefa, ...req.body };
  tarefas[req.tarefaIndex] = tarefaAtualizada;
  res.json(tarefaAtualizada);
});


tarefasRouter.delete('/:tarefaId', encontrarTarefa, (req, res) => {
  tarefas.splice(req.tarefaIndex, 1);
  res.status(204).send();
});


app.use('/tarefas', tarefasRouter);


app.use((err, req, res, next) => {
  
  const statusCode = err.status || 500;
  
  res.status(400).json({
    message: err.message 
  });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;