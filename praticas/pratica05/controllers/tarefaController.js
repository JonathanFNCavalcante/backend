const tarefaModel = require('../models/tarefaModel');

const listar = (req, res) => {
  const resultado = tarefaModel.listar();
  res.json(resultado);
};

const buscarPeloId = (req, res) => {
  const { tarefaId } = req.params;
  const resultado = tarefaModel.buscarPeloId(tarefaId);

  if (resultado) {
    res.json(resultado);
  } else {
    res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
};

const criar = (req, res) => {
  const tarefa = req.body;
  const resultado = tarefaModel.criar(tarefa);
  res.status(201).json(resultado);
};

const atualizar = (req, res) => {
  const { tarefaId } = req.params;
  const tarefa = req.body;

  const resultado = tarefaModel.atualizar(tarefaId, tarefa);

  if (resultado) {
    res.json(resultado);
  } else {
    res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
};

const remover = (req, res) => {
  const { tarefaId } = req.params;
 
  const resultado = tarefaModel.remover(tarefaId);

  if (resultado) {
    res.status(204).end();
  } else {
    res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
};

module.exports = {
  listar,
  buscarPeloId,
  criar,
  atualizar,
  remover,
};