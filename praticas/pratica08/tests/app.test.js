const supertest = require('supertest');

const app = require('../app');

const request = supertest(app);

test('GET /produtos deve retornar 401 se não houver token', async () => {
  const response = await request.get('/produtos');

  expect(response.status).toBe(401);
  expect(response.type).toBe('application/json');
  expect(response.body).toHaveProperty('msg', 'Não autorizado');
});

test('GET /produtos deve retornar 401 se o token for inválido', async () => {
  const response = await request
    .get('/produtos')
    .set('Authorization', 'Bearer 123456789');

  expect(response.status).toBe(401);
  expect(response.type).toBe('application/json');
  expect(response.body).toHaveProperty('msg', 'Token inválido');
});

describe('Fluxo de Autenticação e Acesso a Rotas Protegidas', () => {

  let token;

  test('POST /usuarios/login deve autenticar e retornar um token', async () => {
    const response = await request
      .post('/usuarios/login')
      .send({
        usuario: 'email@exemplo.com',
        senha: 'abcd1234'
      });

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('token');

    token = response.body.token;
  });

  test('GET /produtos deve retornar 200 com um token válido', async () => {

    expect(token).toBeDefined();

    const response = await request
      .get('/produtos')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
  });

  test('POST /usuarios/renovar deve retornar 200 e um novo token', async () => {

    expect(token).toBeDefined();

    const response = await request
      .post('/usuarios/renovar')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('token');

    token = response.body.token;
  });

  test('GET /produtos deve retornar 200 com o token renovado', async () => {
    expect(token).toBeDefined();

    const response = await request
      .get('/produtos')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
  });
});