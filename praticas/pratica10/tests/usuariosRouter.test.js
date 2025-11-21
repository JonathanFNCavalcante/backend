const supertest = require('supertest');

const app = require('../app');

const request = supertest(app);

describe('API - Recurso /usuarios', () => {

    let id;
    let token;

    test('Deve criar um usuário com sucesso (201)', async () => {
        const response = await request.post('/usuarios')
            .send({ "email": "usuario@email.com", "senha": "abcd1234" });

        expect(response.status).toBe(201);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('email', "usuario@email.com");

        id = response.body._id;
    });

    test('Deve retornar erro 422 ao tentar criar usuário sem dados', async () => {
        const response = await request.post('/usuarios').send({});

        expect(response.status).toBe(422);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('msg', "Email e Senha são obrigatórios");
    });

    test('Deve realizar login com sucesso (200)', async () => {
        const response = await request.post('/usuarios/login')
            .send({ "usuario": "usuario@email.com", "senha": "abcd1234" });

        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('token');
        token = response.body.token;
    });

    test('Deve retornar 401 ao tentar logar sem credenciais', async () => {
        const response = await request.post('/usuarios/login').send({});

        expect(response.status).toBe(401);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('msg', "Credenciais inválidas");
    });

    test('Deve renovar o token com sucesso (200)', async () => {

        const response = await request.post('/usuarios/renovar')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('token');
         
    });

    test('Deve retornar 401 ao tentar renovar com token inválido', async () => {
        const response = await request.post('/usuarios/renovar')
            .set('Authorization', 'Bearer 123456789');

        expect(response.status).toBe(401);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('msg', "Token inválido");
    });

    test('Deve excluir o usuário criado (204)', async () => {
        const response = await request.delete(`/usuarios/${id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(204);
        expect(response.text).toBe('');
    });
});