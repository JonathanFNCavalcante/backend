const request = require('supertest');
const app = require('../app');

describe('Testes para a rota GET /tarefas', () => {
  it('Deve retornar status 200 e um conteúdo do tipo JSON', async () => {
    await request(app)
      .get('/tarefas')
      .expect(200)
      .expect('Content-Type', /json/);
  });
});

describe('Testes para as rotas de uma Tarefa específica', () => {
  let tarefaId; 

  it('f) Deve criar uma nova tarefa via POST, retornar status 201 e um JSON', async () => {
    const novaTarefa = { nome: 'Estudar Node', concluida: false };
    const response = await request(app)
      .post('/tarefas')
      .send(novaTarefa)
      .expect(201)
      .expect('Content-Type', /json/);
    expect(response.body).toHaveProperty('id');
    tarefaId = response.body.id;
  });

  it('g) Deve retornar uma tarefa específica pelo ID com status 200', async () => {
    const response = await request(app)
      .get(`/tarefas/${tarefaId}`)
      .expect(200)
      .expect('Content-Type', /json/);
    expect(response.body.id).toBe(tarefaId);
  });

  it('h) Deve retornar status 404 para uma tarefa com ID inexistente', async () => {
    await request(app)
      .get('/tarefas/1') 
      .expect(404)
      .expect('Content-Type', /json/);
  });

  it('i) Deve atualizar uma tarefa via PUT, retornar status 200 e um JSON', async () => {
    const tarefaAtualizada = {
      nome: 'Estudar Node e Express',
      concluida: true
    };
    await request(app)
      .put(`/tarefas/${tarefaId}`)
      .send(tarefaAtualizada)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('j) Deve retornar status 404 ao tentar atualizar uma tarefa inexistente', async () => {
    const tarefaAtualizada = {
      nome: 'Tarefa Inexistente',
      concluida: true
    };
    await request(app)
      .put('/tarefas/1')
      .send(tarefaAtualizada)
      .expect(404)
      .expect('Content-Type', /json/);
  });

  it('k) Deve deletar uma tarefa pelo ID e retornar status 204', async () => {
    await request(app)
      .delete(`/tarefas/${tarefaId}`) 
      .expect(204); 
  });

  it('l) Deve retornar status 404 ao tentar deletar uma tarefa inexistente', async () => {
    await request(app)
      .delete('/tarefas/1')
      .expect(404)
      .expect('Content-Type', /json/);
  });
});