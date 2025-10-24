const supertest = require('supertest');

const app = require('../app'); 

const request = supertest(app);

describe('Testes da API /produtos', () => {

    let idProdutoCriado;

    test('Deve retornar 201 e um JSON ao criar um produto (POST /produtos)', async () => {
        const response = await request.post('/produtos').send({
            nome: "Laranja",
            preco: 10.0
        });
        expect(response.status).toBe(201);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('_id');
        expect(response.body.nome).toBe('Laranja');
        expect(response.body.preco).toBe(10.0);

        idProdutoCriado = response.body._id;
    });

    test('Deve retornar 422 e msg de erro ao criar produto sem JSON (POST /produtos)', async () => {
        const response = await request.post('/produtos').send({}); 
        expect(response.status).toBe(422);
        expect(response.type).toBe('application/json');
        expect(response.body.msg).toBe('Nome e preço do produto são obrigatórios');
    });

    test('Deve retornar 200 e um array ao listar produtos (GET /produtos)', async () => {
        const response = await request.get('/produtos');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('Deve retornar 200 e um JSON ao buscar produto por id (GET /produtos/:id)', async () => {
        const response = await request.get(`/produtos/${idProdutoCriado}`);
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('_id', idProdutoCriado);
        expect(response.body.nome).toBe('Laranja'); 
        expect(response.body.preco).toBe(10.0);    
    });

    test('Deve retornar 400 e msg de erro ao buscar produto com id inválido (GET /produtos/0)', async () => {
        const response = await request.get('/produtos/0');
        expect(response.status).toBe(400);
        expect(response.type).toBe('application/json');
        expect(response.body.msg).toBe('Parâmetro inválido');
    });

    test('Deve retornar 404 e msg de erro ao buscar produto com id inexistente (GET /produtos/00...0)', async () => {
        const response = await request.get('/produtos/000000000000000000000000');
        expect(response.status).toBe(404);
        expect(response.type).toBe('application/json');
        expect(response.body.msg).toBe('Produto não encontrado');
    });

    test('Deve retornar 200 e JSON ao atualizar produto (PUT /produtos/:id)', async () => {
        const response = await request.put(`/produtos/${idProdutoCriado}`).send({
            nome: "Laranja Pera",
            preco: 18.0
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('_id', idProdutoCriado);
        expect(response.body.nome).toBe('Laranja Pera');
        expect(response.body.preco).toBe(18.0);
    });

    test('Deve retornar 422 e msg de erro ao atualizar produto sem JSON (PUT /produtos/:id)', async () => {
        const response = await request.put(`/produtos/${idProdutoCriado}`).send({});
        expect(response.status).toBe(422);
        expect(response.type).toBe('application/json');
        expect(response.body.msg).toBe('Nome e preço do produto são obrigatórios');
    });

    test('Deve retornar 400 e msg de erro ao atualizar produto com id inválido (PUT /produtos/0)', async () => {
        const response = await request.put('/produtos/0').send({ nome: "Invalido", preco: 1 });
        expect(response.status).toBe(400);
        expect(response.type).toBe('application/json');
        expect(response.body.msg).toBe('Parâmetro inválido');
    });

    test('Deve retornar 404 e msg de erro ao atualizar produto com id inexistente (PUT /produtos/00...0)', async () => {
        const response = await request.put('/produtos/000000000000000000000000').send({ nome: "Inexistente", preco: 1 });
        expect(response.status).toBe(404);
        expect(response.type).toBe('application/json');
        expect(response.body.msg).toBe('Produto não encontrado');
    });

    test('Deve retornar 204 e sem conteúdo ao deletar produto (DELETE /produtos/:id)', async () => {
        const response = await request.delete(`/produtos/${idProdutoCriado}`);
        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
    });

    test('Deve retornar 400 e msg de erro ao deletar produto com id inválido (DELETE /produtos/0)', async () => {
        const response = await request.delete('/produtos/0');
        expect(response.status).toBe(400);
        expect(response.type).toBe('application/json');
        expect(response.body.msg).toBe('Parâmetro inválido');
    });

    test('Deve retornar 404 e msg de erro ao deletar produto com id inexistente (DELETE /produtos/:id)', async () => {
    
        const response = await request.delete(`/produtos/${idProdutoCriado}`);
        expect(response.status).toBe(404);
        expect(response.type).toBe('application/json');
        expect(response.body.msg).toBe('Produto não encontrado');
    });

});